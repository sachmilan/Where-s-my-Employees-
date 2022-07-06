const inquirer = require('inquirer');
const mysql = require('mysql');
const express = require('express');
const { start } = require('repl');
const {connection} = require('./db/connection');
const router = express.Router();

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Qwerty@12345',
      database: 'company_db'
    },
    console.log('--- Connected to the company_db database! ---')
  );

function initiate(){
    inquirer.prompt([{
        type:'list',
        name:'choice',
        message:'What would you like to do?',
        choices:[
            'view all Employees',
            'Add an Employee',
            'View all roles',
            'Add role',
            'View all departments',
            'Add department',
            'Exit'
        ],
    }])
    .then((answer)=>{
        switch(answer.choice){
            case'view all Employees':
            viewEmployees();
            break;

            case'Add an Employee':
            newEmployee();
            break;

            case'View all roles':
            viewRoles();
            break;

            case'Add role':
            addRole();
            break;

            case'View all departments':
            viewDepartments();
            break;

            case'Add department':
            addDepartment();
            break;

            case'Quit':
            quit();
            break;

        }
    })
}


function viewEmployees() {
    const request = "SELECT * FROM employee";
    db.query(request, function (err, res) {
        if (err) throw err;
        console.log("Viewing All Employees");
        console.table(res);
        inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'select an option.',
                choices: [
                    'Main Menu',
                    'Quit'
                ],
            }
        ])
            .then((answer) => {
                switch (answer.choice) {
                    case 'Main Menu':
                        start();
                        break;
                    case 'Quit':
                        Quit();
                }
            })
    })
};

function newEmployee() {
    inquirer.prompt ([
        {
        type: 'input',
        message: 'Enter employee first name.',
        name: 'FirstName'
        },
        {
            type: 'input',
            message: 'Enter employee last name.',
            name: 'LastName'
        },
        {
            type: 'input',
            message: 'Enter employee ID number',
            name: 'EmployeeID'
        },
        {
            type: 'input',
            message: 'Enter thier managers ID',
            name: 'ManagerID'
        }
        
    ])
    .then(function (response) {
        db.query('INSERT INTO employee(first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)', 
        [response.FirstName, response.LastName, response.EmployeeID, response.ManagerID], function(err,res) {
            if (err) throw err;

            console.table(viewEmployees());
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'choice',
                    message: 'select an option.',
                    choices: [
                        'Main Menu',
                        'Quit'
                    ]
                }
            ])
           .then((answer) => {
               switch (answer.choice){
                   case 'Main Menu':
                       initiate();
                       break;
                       case 'Quit':
                           Quit();
               }
             })
        })
    })
}


function viewRoles() {
    const request = "SELECT * FROM roles";
    db.query(request, function (err, res) {
        if (err) throw err;
        console.log("Viewing All Roles");
        console.table(res);
        inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'select an option.',
                choices: [
                    'Main Menu',
                    'Quit'
                ],
            }
        ])
            .then((answer) => {
                switch (answer.choice) {
                    case 'Main Menu':
                        start();
                        break;
                    case 'Quit':
                        Quit();
                }
            })
        start();
    })
};

function addRole() {
    inquirer.prompt ([
        {
        type: 'input',
        message: 'Title?',
        name: 'Title'
        },
        {
            type: 'input',
            message: 'Salary?',
            name: 'Salary'
        },
        {
            type: 'input',
            message: 'DepartmentId',
            name: 'DepartmentId'
        }
    ])
    .then(function (response) {
        db.query('INSERT INTO roles(title,salary,department_id) VALUES (?,?,?)', 
        [response.Title, response.Salary, response.DepartmentId], function(err,response) {
            if (err) throw err;

            console.table(viewRoles());
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'choice',
                    message: 'select an option.',
                    choices: [
                        'Main Menu',
                        'Quit'
                    ]
                }
            ])
           .then((answer) => {
               switch (answer.choice){
                   case 'Main Menu':
                       initiate();
                       break;
                       case 'Quit':
                           Quit();
               }
             })
        })
    })
};


function viewDepartments() {
    const request = "SELECT * FROM department";
    db.query(request, function (err, res) {
        if (err) throw err;
        console.log("Viewing All Departments");
        console.table(res);
        inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'select an option.',
                choices: [
                    'Main Menu',
                    'Quit'
                ],
            }
        ])
            .then((answer) => {
                switch (answer.choice) {
                    case 'Main Menu':
                        start();
                        break;
                    case 'Quit':
                        Quit();
                }
            })
        start();
    })
};

function addDepartment() {
    inquirer.prompt ([
        {
        type: 'input',
        message: 'Department name?',
        name: 'Department_name'
        }
    ])
    .then(function (response) {
        db.query('INSERT INTO department(department_name) VALUES (?)', 
        [response.Department_name], function(err,response) {
            if (err) throw err;

            console.table(viewDepartments());
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'choice',
                    message: 'select an option.',
                    choices: [
                        'Main Menu',
                        'Quit'
                    ]
                }
            ])
           .then((answer) => {
               switch (answer.choice){
                   case 'Main Menu':
                       initiate();
                       break;
                       case 'Quit':
                           Quit();
               }
             })
        })
    })
}


function Quit() {
    console.log('Goodbye!');
    process.exit();

}

initiate();