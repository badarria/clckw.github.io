const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./server/routes');
const path = require('path');
const apiErrorHandler = require('./server/error/api-error-handler')

const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use('/', routes);
app.use(apiErrorHandler)


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/build")));
}

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
})

app.listen(PORT, () => {
	console.log(`Server has started on port ${PORT}..`)
})