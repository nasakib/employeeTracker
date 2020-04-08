var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTab = require("console.table");

var connection = mysql.createConnection({
	host: "localhost",
	port: 8080,

	// Your username
	user: "root",

	// Your password
	password: "root",
	database: "employeeTrackerDB",
});

connection.connect(function(err) {
	if (err) throw err;
});

module.exports = connection;