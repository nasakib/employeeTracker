var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTab = require("console.table"); //dependancies

var connection = mysql.createConnection({
	host: "localhost",
	port: 8080,

	user: "root",

	password: "root",
	database: "employeeTrackerDB",
});

connection.connect(function(err) {
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
          "Update employee role"
        ]
      }).then(function(answer) {
        console.log("You chose: " + answer);
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
  
          case "Update employee's role":
            updateRole();
            break;
        }
      });
  };
  startInterface();

function viewDeparts(){
    connection.query("SELECT * FROM department", function(err, answer) {
        console.log("-----------------------------------------------------------------------");
        console.log("Departments:")
        console.table(answer);
        console.log("-----------------------------------------------------------------------");
      });
      startInterface();

  }

function viewRoles(){
    connection.query("SELECT * FROM roles", function(err, answer) {
        console.log("-----------------------------------------------------------------------");
        console.log("Roles:")
        console.table(answer);
        console.log("-----------------------------------------------------------------------");
      });
      startInterface();
      
}

function viewEmps(){
    connection.query("SELECT * FROM employees", function(err, answer) {
        console.log("-----------------------------------------------------------------------");
        console.log("Employees:")
        console.table(answer);
        console.log("-----------------------------------------------------------------------");
      });
      startInterface();
      
}

function addEmp(){
    inquirer.prompt([
      {
        type: "input",
        message: "Enter the new employee's first name:",
        name: "fName"
      },
      {
        type: "input",
        message: "Enter the new employee's last name:",
        name: "lName"
      },
      {
        type: "input",
        message: "Enter the new employee's role ID:",
        name: "rID"
      }
    ]).then(function(answer) {
      connection.query('INSERT INTO employee (first_name, last_name) VALUES (${answer.fName}, ${answer.lName}, ${answer.rID});',
        function(err, answer) {
          if (err) {
            throw err;
          }
          console.log("-----------------------------------------------------------------------");
          console.log("Inserted employee:")
          console.table(answer);
          console.log("-----------------------------------------------------------------------");
        }
      );
      startInterface();
    });
      
}

function addDepart(){
      
}

function addRole(){
      
}

function updateRole(){
      
}
  