var mysql = require("mysql");
var inquirer = require("inquirer");
var tabe = require("console.table"); //dependancies

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: "foofightERS",
	database: "employeetracker_DB",
});

connection.connect(function (err) {
	if (err) throw err;
});
function startInterface() {
	inquirer
		.prompt({
			type: "list",
			name: "start",
			message: "What would you like to do?",
			choices: [
				"View departments",
				"View roles",
				"View employees",
				"Add employee",
				"Add department",
				"Add role",
				"Update employee role",
				"Remove employee",
				"Remove department",
				"Remove role",
				"Exit",
			],
		})
		.then(function (answer) {
			console.log("You chose: " + answer.start);
			switch (answer.start) {
				case "View departments":
					viewDeparts();
					break;

				case "View roles":
					viewRoles();
					break;

				case "View employees":
					viewEmps();
					break;

				case "Add employee":
					addEmp();
					break;

				case "Add department":
					addDepart();
					break;

				case "Add role":
					addRole();
					break;

				case "Update employee role":
					updateRole();
					break;

				case "Remove employee":
					deleteEmp();
					break;

				case "Remove department":
					deleteDepart();
					break;

				case "Remove role":
					deleteRole();
					break;

				case "Exit":
					function exit() {
						console.log("Bye!");
						connection.end();
					}
					exit();
			}
		});
}

function viewDeparts() {
	connection.query("SELECT * FROM department", function (err, answer) {
		console.log("");
		console.table("Departments:");
		console.table(answer);
		console.log(
			"-----------------------------------------------------------------------"
		);
		startInterface();
	});
}

function viewRoles() {
	connection.query("SELECT * FROM role", function (err, answer) {
		console.log(
			"-----------------------------------------------------------------------"
		);
		console.log("Roles:");
		console.table(answer);
		console.log(
			"-----------------------------------------------------------------------"
		);
		startInterface();
	});
}

function viewEmps() {
	connection.query("SELECT * FROM employee", function (err, answer) {
		console.log(
			"-----------------------------------------------------------------------"
		);
		console.log("Employees:");
		console.table(answer);
		console.log(
			"-----------------------------------------------------------------------"
		);
		startInterface();
	});
}

function addEmp() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "Enter the new employee's first name:",
				name: "fName",
			},
			{
				type: "input",
				message: "Enter the new employee's last name:",
				name: "lName",
			},
			{
				type: "input",
				message: "Enter the new employee's role ID.",
				name: "rID",
			},
			{
				type: "input",
				message: "Enter employee's manager ID. Type 'null' if no manager.",
				name: "mID",
			},
		])
		.then(function (answer) {
			connection.query(
				`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.fName}", "${answer.lName}", ${answer.rID}, ${answer.mID});`
			);
			console.log();
			console.log("Inserted employee:");
			console.table(answer);
			console.log(
				"-----------------------------------------------------------------------"
			);
			viewEmps();
			startInterface();
		});
}

function addDepart() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "What is the name of the department you would like to add?",
				name: "dName",
			},
		])
		.then(function (answer) {
			connection.query(
				`INSERT INTO department (name) VALUES ("${answer.dName}");`
			);
			console.log();
			console.log("Inserted department:");
			console.table(answer);
			console.log(
				"-----------------------------------------------------------------------"
			);
			viewDeparts();
			startInterface();
		});
}

function addRole() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "What is the title of the role you would like to add?",
				name: "tName",
			},
			{
				type: "input",
				message: "What is the salary of the role you would like to add?",
				name: "salary",
			},
			{
				type: "input",
				message: "What is the department ID of the role?",
				name: "dID",
			},
		])
		.then(function (answer) {
			connection.query(
				`INSERT INTO role (title, salary, department_id) VALUES ("${answer.tName}", ${answer.salary}, ${answer.dID});`
			);
			console.log();
			console.log("Inserted role:");
			console.table(answer);
			console.log(
				"-----------------------------------------------------------------------"
			);
			viewRoles();
			startInterface();
		});
}

function viewInfo() {
	console.log("Here's some reference:");

	connection.query("SELECT * FROM employee", function (err, answer) {
		console.log(
			"-----------------------------------------------------------------------"
		);
		console.log("Employees:");
		console.table(answer);
		console.log(
			"-----------------------------------------------------------------------"
		);
	});
	connection.query("SELECT * FROM role", function (err, answer) {
		console.log(
			"-----------------------------------------------------------------------"
		);
		console.log("Roles:");
		console.table(answer);
		console.log(
			"-----------------------------------------------------------------------"
		);
		console.log("Type employee ID:");
	});
}

function updateRole() {
	viewInfo();
	inquirer
		.prompt([
			{
				type: "input",
				message: "Insert employee's ID in order to update role.",
				name: "eID",
			},
			{
				type: "input",
				message: "What is the employee's new role ID?",
				name: "rID",
			},
			{
				type: "input",
				message: "What is the employee's new manager ID?",
				name: "mID",
			},
		])
		.then(function (answer) {
			connection.query(
				`UPDATE employee SET role_id = ${answer.rID}, manager_id = ${answer.mID} WHERE id = ${answer.eID};`
			);
			console.log();
			console.log("Updated information:");
			console.table(answer);
			console.log(
				"-----------------------------------------------------------------------"
			);
			viewEmps();
			startInterface();
		});
}

function deleteDepart() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "What is the department you would like to remove?",
				name: "name",
			},
		])
		.then(function (answer) {
			connection.query(`DELETE FROM employee WHERE name = "${answer.name}";`);
			console.log("Deleted department:");
      console.table(answer);
      startInterface();
		});
}

function deleteRole() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "What is the role you would like to remove?",
				name: "name",
			},
		])
		.then(function (answer) {
			connection.query(`DELETE FROM role WHERE title = "${answer.name}";`);
			console.log("Deleted role:");
      console.table(answer);
      startInterface();
		});
}

function deleteEmp() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "Employee ID you would like to remove:",
				name: "eID",
			}
		])
		.then(function (answer) {
			connection.query(
				`DELETE FROM employee WHERE first_name = "${answer.eID}";`
			);
			console.log("Removed Employee:");
      console.table(answer);
      startInterface();
		});
}

// function total(){

// }

startInterface();
