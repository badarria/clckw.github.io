const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./server/routes/routes');
const path = require('path');
const PORT = process.env.PORT || 5000;


app.use(cors())
app.use(express.json());//req.body
app.use('/', routes)
// app.use(express.static(path.join(__dirname, "client/build")))

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/build")))
}
console.log(path.join(__dirname, "client/build"))

app.listen(PORT, () => {
	console.log(`Server has started on port ${PORT}..`)
})