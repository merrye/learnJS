const express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	router = express.Router(),
	port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extend: true}));

router.get('/' , (req , res) => {
	res.send('<h1>Hello World</h1>');
});

router.post('/' , (req , res) => {
	const name = req.body.name;
	res.json({
		message: `Hello ${name}`
	});
});

router.get('/:name' , (req , res) => {
	res.send(`<h1>Hello ${req.params.name}</h1>`);
});

app.use('/home' , router);

app.listen(port);
console.log('Magic happens on port ' + port);