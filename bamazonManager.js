const mysql = require("mysql");
const inquirer = require("inquirer");
//connection to server
const connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bAmazonManager"
});
//connecting to server and running first function
connection.connect(function(err) {
  if (err) throw err;
  manager();
});	
	
	function manager(){
		inquirer
			.prompt({
			  name: "manage",
		      type: "list",
		      message: "What would you like to do?",
		      choices: ["View Products for sale", 
		      			"View Low Inventory",
		      			"Add to Inventory",
		      			"Add New Product"]
			})
			.then(function(answer) {
		      switch (answer.manage) {
		        case "View Products for sale":
		          runStart();
		          break;

		        case "View Low Inventory":
		          lowInv();
		          break;

		        case "Add to Inventory":
		          addInv();
		          break;

		        case "Add New Product":
		          addNewProduct();
		          break;
		      }
		    });
	}

//will show the user a welcome message with all products in store
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
				}) 
				connection.end();
	}


	function lowInv(){
		console.log("Items that need to be restocked")
		const query = "SELECT * FROM products";
				connection.query(query, function(err, res){
					// console.log(res)
					// console.log(res.stock_quantity);
					
						for (let i = 0; i < res.length; i++){
							if (res[i].stock_quantity <= 5){
							console.log("Id: " + res[i].item_id + "|  " +
							" Product: " + res[i].product_name + "|  " +
							" Department: " + res[i].department_name + "|  " +
							" Price: " + res[i].price + "|  " +
							" Stock: " + res[i].stock_quantity);
						}
					}
					connection.end();
				}) 
	}

//asks if the user wants to buy more items
	function addInv(){
		const query = "SELECT * FROM products";
				connection.query(query, function(err, res){

						for (let i = 0; i < res.length; i++){

							console.log("Id: " + res[i].item_id + "|  " +
							" Product: " + res[i].product_name + "|  " +
							" Department: " + res[i].department_name + "|  " +
							" Price: " + res[i].price + "|  " +
							" Stock: " + res[i].stock_quantity);
					}
		inquirer
			.prompt([
			 {
				name: "idq",
				type: "input",
				message: "Type in the product ID that you would like to add"
			 },
			 {
				name: "stockq",
				type: "input",
				message: "How many would you like to add?"
			 }
			])
		    .then(function(answer){
		
				let id = answer.idq;
				let correctId = parseFloat(id - 1);
				let userQuantity = answer.stockq;
				let numberQuant = parseFloat(userQuantity);
				const currentStock = res[correctId].stock_quantity + numberQuant;

				connection.query("UPDATE products SET ? WHERE ?",[
					 {
						stock_quantity: currentStock
					 },
					 {
						item_id: id
					 }
					], function(err, res){
					if (err) throw err;
					connection.end();
				})
			})
		})  
	}

	function addNewProduct(){

	connection.query("SELECT * FROM products", function(err,res){
		
		inquirer
			.prompt([
			{
				name: "product",
				type: "input",
				message: "What product would you like to add?"
			},
			{
				name: "department",
				type: "input",
				message: "Which department does this belong to?"
			},
			{
				name: "price",
				type: "input",
				message: "What price would you like this to be?"
			},
			{
				name: "stock",
				type: "input",
				message: "How much stock would you like to apply?"
			},
			])
			.then(function(answer){
				let prices = parseFloat(answer.price);
			
				let values = [[answer.product, answer.department, prices, answer.stock]];
				connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?",[values], function(err, res){
					if (err) throw err;
					console.log("Database Updated!");
					connection.end();
				})
			})
		})
	}