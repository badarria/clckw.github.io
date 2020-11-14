const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./server/routes/routes');
const path = require('path');

const PORT = process.env.PORT || 5000;


const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://test-clckw.herokuapp.com']
const corsOptions = {
	origin: function (origin, callback) {
		console.log("** Origin of request " + origin)
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			console.log("Origin acceptable")
			callback(null, true)
		} else {
			console.log("Origin rejected")
			callback(new Error('Not allowed by CORS'))
		}
	}
}
app.use(cors(corsOptions))

app.use(cors())
app.use(express.json());
app.use('/', routes)


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/build")));
	// app.get('*', function(req, res) {
	// 	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
}


app.listen(PORT, () => {
	console.log(`Server has started on port ${PORT}..`)
})