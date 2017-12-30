const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs')

//here middleware is used to get req 
app.use((req, res, next)=>{
	var now = new Date().toString()
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err)=> {
			if (err){
			console.log('Unable to append to server.log.')
			}
	});
	//obligatory prob 
	next();	
})



app.use ((req, res, next)=>{

	res.render('maintenance.hbs');
})
// you will need to put this after the mainteance page, like this you will note have 
// a html page active while your in maintenance 
// this is how it is done, with order so maintenance before everything. 
//express middleware to get a directory
app.use(express.static(__dirname + '/public'));



/*

 * instead of putting the year in each templates of hbs
 * i juste registred hbs dot register helper, the name of function
 * and what it do 
 * */
hbs.registerHelper('getCurrentYear', ()=> {
	return new Date().getFullYear()
});


hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
})

//set up a handler for http request
app.get('/', (req, res) => {
	
	//res.send('<h1> hello Express!</h1>');
	res.render('home.hbs', {
		pageTitle: 'Home page',
		welcomeMessage: 'Welcome to site',
	})
	
	})

	app.get('/about', (req, res)=>{
		res.render('about.hbs', {
			pageTitle: 'About Page',
		});
	});

	app.get('/bad',(req, res)=>{
		res.send({
			errorMessage: 'Unable to handle request'
		});

	})

app.listen(3000, ()=>{
	console.log('Server is up on port 3000');
});
