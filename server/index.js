const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db')

//middleware
app.use(cors())
app.use(express.json());//req.body

//ROUTES//


//GET (free masters list in this city, this time)

//POST (an order)

//POST a client (exist? add this client to clients)

//ADMIN PART
//GET (all clients, masters, city list)

//PUT (edit a client, master)

//DELETE (a client, master, city(?))

//POST (create new client, master, city)




app.listen(5000, () => {
	console.log('Server has started on port 5000..')
})