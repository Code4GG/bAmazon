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
				let numberQuant = parseFloat(userQuantity);



			const query = "SELECT * FROM products";

				connection.query(query, function(err, res){
					if (err) throw err;
					
					const currentStock = res[correctId].stock_quantity - userQuantity;
					const totalPrice = numberQuant * res[correctId].price;

					console.log(currentStock);
					console.log("Your purchase will cost: $" + totalPrice + ".00");

					if (currentStock === 0){
						currentStock === 0;
						console.log("Insufficient quantity!");
						connection.end();
					} else {

						connection.query("UPDATE products SET ? WHERE ?",
						[
						 {
							stock_quantity: currentStock
						 },
						 {
							item_id: id
						 }
						], function(err, res){
							if (err) throw err;

							console.log("DB UPDATEd");
						})
					}
					yesno();
				})
			
			}) 
	}

	function yesno(){
		inquirer
			.prompt({
		      name: "continue",
		      type: "rawlist",
		      message: "Would you like to purchase anything else?",
		      choices: ["YES", "NO"]
		    })
		    .then(function(answer){
		    	if (answer.continue.toUpperCase() === "Yes"){
		    		runStart();
		    	} else{
		    		console.log("Thanks for shopping!");
		    		connection.end();
		    	}
		    })
	}
	