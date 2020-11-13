const router = require('express').Router();
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwtGenerator = require("../utils/jwtGenerator")
const authorization = require("../middleware/authorization")

//post new
// router.post("/", async (req, res) => {
// 	try {
// 		const {name, password} = req.body;
// 		const saltRound = 10;
// 		const salt = await bcrypt.genSalt(saltRound);
// 		const bcryptPassword = await bcrypt.hash(password, salt);
// 		const newUser = await pool.query("INSERT INTO admin (name, password) VALUES ($1, $2) RETURNING *", [name, bcryptPassword])
// 		const token = jwtGenerator(newUser.rows[0].id);
// 		res.json({token})
//
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send("Server error")
// 	}
// })

router.post("/", async (req, res) => {
	try {
		const {name, password} = req.body;
		const user = await pool.query("SELECT * FROM admin WHERE name = $1", [name]);
		if (user.rows.length === 0) {
			return res.status(401).json("Name is incorrect");
		}
		const validPassword = await bcrypt.compare(password, user.rows[0].password);
		if (!validPassword) {
			return res.status(401).json("Password or email is incorrect")
		}
		const token = jwtGenerator(user.rows[0].id);
		res.json({token})

	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error")
	}
})

router.get("/verify", authorization, async (req, res) => {
	try {
		res.json(true);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error")
	}
})

module.exports = router;