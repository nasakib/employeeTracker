var mysql = require("mysql");
var inquirer = require("inquirer");
var tabe = require("console.table"); //dependancies

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: "foofightERS",
	database: "employeeTrackerDB",
});

connection.connect(function(err) {
	if (err) throw err;
});
function startInterface() {
    inquirer.prompt({
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
  
          case "Update employee's role":
            updateRole().then(function(){
                connection.end();
            })
            break;
        }
      });
  };

function viewDeparts(){
    connection.query("SELECT * FROM department", function(err, answer) {
        console.log("");
        console.log("Departments:")
        console.log(answer);
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
      connection.query(`INSERT INTO employee (first_name, last_name) VALUES (${answer.fName}, ${answer.lName}, ${answer.rID});`);
          console.log();
          console.log("Inserted employee:")
          console.table(answer);
          console.log("-----------------------------------------------------------------------");
    });
    startInterface();
}

function addDepart(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department you would like to add?",
            name: "dName"
        }
    ]).then(function(answer){
        connection.query(`INSERT INTO department (name) VALUES (${answer.dName});`);
          console.log();
          console.log("Inserted department:")
          console.table(answer);
          console.log("-----------------------------------------------------------------------");
    });
    startInterface();
}
        

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the title of the role you would like to add?",
            name: "tName"
        },
        {
            type: "input",
            message: "What is the salary of the role you would like to add?",
            name: "salary"
        }
    ]).then(function(answer){
        connection.query(`INSERT INTO role (title, salary) VALUES (${answer.tName}, ${answer.salary});`);
          console.log();
          console.log("Inserted role:")
          console.table(answer);
          console.log("-----------------------------------------------------------------------");
    });
    startInterface();
}

function updateRole(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name that you would like to update?",
            name: "fName"
        },
        {
            type: "input",
            message: "What is the employee's last name that you would like to update?",
            name: "lName"
        }
    ]).then(function(){
        connection.connect(function(err) {
            if (err) throw err;
            con.query("SELECT * FROM roles", function(err, result) {
              if (err) throw err;
              console.log();
              console.log("Here are the current roles and role ID's avaliable:")
              console.table(result[0], result[1]);
              console.log("-----------------------------------------------------------------------");
            });
        })
    }).then(function(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's new role ID?",
            name: "rID"
        }
    ]).then(function(answer){
        connection.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES (${answer.fName}, ${answer.lName}, ${answer.rID});`);
          console.log();
          console.log("Updated information:")
          console.table(answer);
          console.log("-----------------------------------------------------------------------");
    });
    startInterface();
});
}

startInterface();
  