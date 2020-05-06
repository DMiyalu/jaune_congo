// upload dependecies
const express = require('express');
const mysql = require('mysql');
const app = express();


// database config
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'dido',
  database: 'jauneCongo',
  password: '0804',
});

//Connect to database
connection.connect((erreur) => {
  if (erreur) {
    throw erreur;
  }
  console.log('La connexion à la base de données est établie');
});


// set middlware
app.use(express.static('static'));
app.set('view engine', 'ejs');
app.set('views');


// set routes
app.get('/produits', (request, response) => {
	connection.query('select * from produit', (erreur, resultat) => {
		if (erreur) throw erreur;
		console.log(resultat);
		return response.render('produits/all', { produits: resultat });
	});
});

app.get('/produits/:id', (request, response) => {
	connection.query(`select * from produit where id=${request.params.id}`, (erreur, resultat) => {
		if (erreur) throw erreur;
		return response.render('produits/details', { produits: resultat[0] });
    });
});




// build PORT
const PORT = 8000;
app.listen(PORT, () => {
	console.log(`Server run on localhost:${PORT}`);
})