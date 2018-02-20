const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bAmazon"
});

connection.connect(function(err) {
  if (err) throw err;
  runStart();
});	
		
		// const query = "SELECT * FROM products";
		// let stock = connection.query(query, function(err,))

	function runStart(){
		console.log("Welcome to bAmazon these are our items for sale")
		const query = "SELECT * FROM products";
				connection.query(query, function(err, res){

					for (let i = 0; i < res.length; i++){

						console.log("Id: " + res[i].item_id + "|  " +
						" Product: " + res[i].product_name + "|  " +
						" Department: " + res[i].department_name + "|  " +
						" Price: " + res[i].price + "|  " +
						" Stock: " + res[i].stock_quantity);
					}
					question();
				}) 
	}


	function question(){
		inquirer
			.prompt([
			 {
				name: "idq",
				type: "input",
				message: "Type in the product ID that you would like to purchase"
			 },
			 {
				name: "stockq",
				type: "input",
				message: "How many would you like to purchase?"
			 }
			])
			.then(function(answer){
				// let quantity = answer.quantity;
				let id = answer.idq;
				let correctId = parseFloat(id - 1);
				let userQuantity = answer.stockq;

			const query = "SELECT * FROM products";

				connection.query(query, function(err, res){
					if (err) throw err;
					
					const currentStock = res[correctId].stock_quantity - userQuantity;

					console.log(currentStock);
					console.log(userQuantity);

					const queryTwo = "UPDATE products SET stock_quantity =" + connection.escape(currentStock) + "WHERE item_id =" + connection.escape(id);
						connection.query(queryTwo, function(err, res){
							if (err) throw err;

							console.log("DB UPDATEd");
							connection.end();
						})

					
				})
				// update();
				// connection.end();
			}) 	
	}

	
	//connection.query("UPDATE products SET ? WHERE ?")

	// SELECT SUM (stock_quantity) FROM products

	//if (stock_quantity <= 0){
	// 	console.log("Insufficient quantity!");
	// }

	// .then(function(answer){
	// 	console.log(res.stock_quantity - answer.stockq)
	// })
	