const inquirer = require('inquirer');
const db = require('./db');

async function main() {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Delete an employee', 'Exit'],
    });

    switch (action) {
        case 'View all departments':
            const departments = await db.viewDepartments();
            console.table(departments);
            break;

        case 'View all roles':
            const roles = await db.viewRoles();
            console.table(roles);
            break;

        case 'View all employees':
            const employees = await db.viewEmployees();
            console.table(employees);
            break;

        case 'Add a department':
            const { deptName } = await inquirer.prompt({
                type: 'input',
                name: 'deptName',
                message: 'What is the name of the department?',
            });
            await db.addDepartment(deptName);
            console.log(`Added department ${deptName}`);
            break;

        case 'Add a role':
            const { title, salary, department_id } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is the title of the role?',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary for the role?',
                },
                {
                    type: 'input',
                    name: 'department_id',
                    message: 'What is the department ID for the role?',
                },
            ]);
            await db.addRole(title, salary, department_id);
            console.log(`Added role ${title}`);
            break;

        case 'Add an employee':
            const { firstName, lastName, role_id, manager_id } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the first name of the employee?',
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the last name of the employee?',
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'What is the role ID for the employee?',
                },
                {
                    type: 'input',
                    name: 'manager_id',
                    message: 'What is the manager ID for the employee?',
                },
            ]);
            await db.addEmployee(firstName, lastName, role_id, manager_id);
            console.log(`Added employee ${firstName} ${lastName}`);
            break;

        case 'Update an employee role':
            const { employeeId, newRoleId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeId',
                    message: 'What is the ID of the employee you want to update?',
                },
                {
                    type: 'input',
                    name: 'newRoleId',
                    message: 'What is the new role ID for the employee?',
                },
            ]);
            await db.updateEmployeeRole(employeeId, newRoleId);
            console.log(`Updated role for employee ${employeeId}`);
            break;

        case 'Delete an employee':
            const { empIdToDelete } = await inquirer.prompt({
                type: 'input',
                name: 'empIdToDelete',
                message: 'What is the ID of the employee you want to delete?',
            });
            await db.deleteEmployee(empIdToDelete);
            console.log(`Deleted employee with id ${empIdToDelete}`);
            break;

        case 'Delete a department':
            const { deptIdToDelete } = await inquirer.prompt({
                type: 'input',
                name: 'deptIdToDelete',
                message: 'What is the ID of the department you want to delete?',
            });
            await db.deleteDepartment(deptIdToDelete);
            console.log(`Deleted department with id ${deptIdToDelete}`);
            break;

        case 'Delete a role':
            const { roleIdToDelete } = await inquirer.prompt({
                type: 'input',
                name: 'roleIdToDelete',
                message: 'What is the ID of the role you want to delete?',
            });
            await db.deleteRole(roleIdToDelete);
            console.log(`Deleted role with id ${roleIdToDelete}`);
            break;

        case 'Exit':
            // Exit the application
            process.exit(0);

        default:
            console.log(`Sorry, I don't understand "${action}".`);
    }

    // Call main again to prompt for the next action
    main();
}

main();