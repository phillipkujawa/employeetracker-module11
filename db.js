const mysql = require('mysql2/promise');

// Create a connection pool (replace 'password' with your MySQL password)
const pool = mysql.createPool({
    host: '192.168.1.55',
    user: 'root',
    password: 'Walcott34',
    database: 'company_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Function to view all departments
async function viewDepartments() {
    const [rows, fields] = await pool.execute('SELECT * FROM department');
    return rows;
}

// Function to view all roles
async function viewRoles() {
    const [rows, fields] = await pool.execute(`
        SELECT role.id, title, salary, department.name AS department 
        FROM role 
        LEFT JOIN department ON department_id = department.id
    `);
    return rows;
}

// Function to view all employees
async function viewEmployees() {
    const [rows, fields] = await pool.execute(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
        FROM employee 
        LEFT JOIN role ON role_id = role.id 
        LEFT JOIN department ON department_id = department.id 
        LEFT JOIN employee manager ON employee.manager_id = manager.id
    `);
    return rows;
}

// Function to add a role
async function addRole(title, salary, department_id) {
    const [result] = await pool.execute(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [title, salary, department_id]);
    return result;
}

// Function to add an employee
async function addEmployee(first_name, last_name, role_id, manager_id) {
    const [result] = await pool.execute(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [first_name, last_name, role_id, manager_id]);
    return result;
}

// Function to update an employee role
async function updateEmployeeRole(employee_id, role_id) {
    const [result] = await pool.execute(`UPDATE employee SET role_id = ? WHERE id = ?`, [role_id, employee_id]);
    return result;
}

// Function to add a department
async function addDepartment(name) {
    const [result] = await pool.execute(`INSERT INTO department (name) VALUES (?)`, [name]);
    return result;
}


// Function to get all roles for inquirer prompts
async function getRoles() {
    const [rows, fields] = await pool.execute('SELECT id, title FROM role');
    return rows;
}

// Function to get all employees for inquirer prompts
async function getEmployees() {
    const [rows, fields] = await pool.execute('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee');
    return rows;
}

// Function to get all departments for inquirer prompts
async function getDepartments() {
    const [rows, fields] = await pool.execute('SELECT id, name FROM department');
    return rows;
}

// Function to delete an employee
async function deleteEmployee(employee_id) {
    const [result] = await pool.execute(`DELETE FROM employee WHERE id = ?`, [employee_id]);
    return result;
}

// Function to delete a department
async function deleteDepartment(department_id) {
    const [result] = await pool.execute(`DELETE FROM department WHERE id = ?`, [department_id]);
    return result;
}

// Function to delete a role
async function deleteRole(role_id) {
    const [result] = await pool.execute(`DELETE FROM role WHERE id = ?`, [role_id]);
    return result;
}

// Export functions
module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    getRoles,
    getEmployees,
    getDepartments,
    deleteEmployee,
    deleteDepartment,
    deleteRole
};
