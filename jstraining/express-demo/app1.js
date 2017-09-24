const express = require('express'),
	app = express(),
	router = express.Router(),
	port = process.env.PORT || 8080;

router.get('' , (req , res) => {
	res.send('<h1>Hello World</h1>');
})

app.use('/home' , router);

app.listen(port);
console.log('Magic happens on port ' + port);