const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
//connection to server

const connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bAmazon"
});
//connecting to server and running first function
connection.connect(function(err) {
  if (err) throw err;
  runStart();
});	
	
	// const totalProfit = product_sales - over_head_costs;

	function runStart(){
		inquirer
			.prompt({
			  name: "sup",
		      type: "list",
		      message: "What would you like to do?",
		      choices: [
		      			"View Products Sales by Department", 
		      			"Create New Department"
		      		   ]
			})
			.then(function(answer) {
		      switch (answer.sup) {
		        case "View Products Sales by Department":
		          viewProducts();
		          break;

		        case "Create New Department":
		          newDepartment();
		          break;
		      }
		    });
	}

	function viewProducts(){

		const query = "SELECT departments.*, SUM(products.product_sales) FROM products LEFT JOIN departments on products.department_name = departments.department_name GROUP BY department_id";
		
		connection.query(query, function(err, res){
				console.log(res);
				let table = cTable.getTable(res,[{test: 'test'}]);
				console.log(table);
			
			connection.end();
		})

	}


	function newDepartment(){

	connection.query("SELECT * FROM departments", function(err,res){
		
		inquirer
			.prompt([
			{
				name: "department",
				type: "input",
				message: "What type of department would you like to create?"
			},
			{
				name: "overhead",
				type: "input",
				message: "How much does the overhead cost?"
			}
			])
			.then(function(answer){
				let overheadcosts = parseFloat(answer.overhead);
			
				let values = [[answer.department, overheadcosts]];
				connection.query("INSERT INTO departments (department_name, over_head_costs) VALUES ?",[values], function(err, res){
					if (err) throw err;
					console.log("Database Updated!");
					connection.end();
				})
			})
		})
	}