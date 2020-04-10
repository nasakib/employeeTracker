INSERT INTO department (name) VALUES ("Engineer"), ("Marketing"), ("Management"), ("Research and Development"), ("Kinda just there");

INSERT INTO role (title, salary, department_id) VALUES ("Front-End Engineer", 75000, 1), ("Back-End Engineer", 70000, 1), ("Social Media Analyst", 50000, 2), ("Human Resources Manager", 100000, 3), ("Tech Lead", 200000, 3), ("Product Researcher", 80000, 4), ("Who hired you??", 300000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kevin", "Hart", 5), ("Mufasa", "Bad Lion", 7, 1), ("Carl", "Jung", 4, 1);