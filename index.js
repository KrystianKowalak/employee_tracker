const inquirer = require("inquirer");
const { db } = require("./config/connection");

const startPrompt = [{
    type: "list",
    message: "Please select an option to get started:",
    choices: ["View all departments",
              "View all roles",
              "View all employees",
              "Add a department",
              "Add a role",
              "Add an employee",
              "Update an employee's role",
              "Exit",
    ],
    name: "selection"
}]

const selectionOptions = (answers) => {
    switch (answers.selection) {
        case "View all departments":
            viewDepartments();
            break;
        case "View all roles":
            viewRoles();
            break;
        case "View all employees":
            viewEmployees();
            break;
        case "Add a department":
            addDepartment();
            break;
        case "Add a role":
            addRole();
            break;
        case "Add an employee":
            addEmployee();
            break;
        case "Update an employee's role":
            updateEmployee();
            break;
        case "Exit":
            console.log("Exiting program!");
            process.exit(0);
        default:
            console.log("Outside switch statment options!");
            process.exit(0);
    }
}

const viewDepartments = () => {
    db.query("SELECT * FROM departments", (err, res) => {
        err ? console.error(err) : console.table(res);
        init();
    });
};

const viewRoles = () => {
    const query = `SELECT roles.id, roles.title, roles.salary, departments.department_name 
                   FROM roles 
                   JOIN departments
                   ON departments.id = roles.department_id`;
    db.query(query, (err, res) => {
      err ? console.error(err) : console.table(res);
      init();
    })
};

const viewEmployees = () => {
    const query = `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS job_title, roles.salary, department_name,
                   CONCAT(manager.first_name, " ", manager.last_name) AS manager
                   FROM employees
                   JOIN roles
                   ON roles.id = employees.roles_id
                   JOIN departments
                   ON departments.id = roles.department_id
                   LEFT JOIN employees AS manager
                   ON employees.manager_id = manager.id`;
    db.query(query, (err, res) => {
        err ? console.error(err) : console.table(res);
        init();
    })
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: "text",
            message: "Provide a name for the new department:",
            name: "department_name"
        }
    ])
    .then((answer => {
        db.query("INSERT INTO departments SET ? ", answer, (err, res) => {
            err ? console.error(err) : console.log(`${answer.department_name} department has been added.`)
            viewDepartments();
            init();
        });
    }))
};

const addRole = () => {
    db.query("SELECT * FROM departments", (err, res) => {
        if (err) {
            console.error(err);
        }
        const departments = res.map(resInfo => resInfo.department_name);
        inquirer.prompt([
            {
                type: "input",
                message: "Provide a name for the new role:",
                name: "title"
            },
            {
                type: "input",
                message: "Provide a salary for the new role:",
                name: "salary"
            },
            {
                type: "list",
                message: "Provide a department for the new role:",
                choices: departments,
                name: "department_name"
            }
        ])
        .then((answer => {
            const query = `SELECT id
                           FROM departments
                           WHERE department_name = ?`
            db.query(query, answer.department_name, (err, res) => {
                if (err) {
                    console.error(err);
                }
                [{ id }] = res;
                const newRole = {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: id
                }
                db.query("INSERT INTO roles SET ? ", newRole, (err, res) => {
                    err ? console.error(err) : console.log(`${answer.title} role has been added.`)
                    viewRoles();
                    init();
                });
            })
        }))
    });
}

const init = () => {
    inquirer
        .prompt(startPrompt)
        .then(function (answers) {
            selectionOptions(answers)
        })
}
  
init();