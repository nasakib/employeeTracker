DROP DATABASE IF EXISTS employeeTracker_DB;

CREATE DATABASE employeetracker_DB;

USE employeetracker_DB;

CREATE TABLE department(
  id INT AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY(id)
);

CREATE TABLE role(
  id INT AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL (15,0),
  department_id INT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee(
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);