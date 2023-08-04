# Employment Tracker System - Module 12

The Employment Tracker System is a console-based Node.js application that allows you to interact with a database containing information about a company's departments, roles, and employees. You can perform multiple operations including viewing, adding, updating, and deleting records from the database.

## Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- A MySQL server (Local or hosted)

## Dependencies

This project uses the following Node.js packages:

- `inquirer` for interacting with the user via the console.
- `mysql2` to connect to a MySQL database.

You can install these by running `npm install` in the root directory of the project.

## Usage

1. First, you need to set up your database connection. Update the `db.js` file in the root directory of the project with the following content, replacing `'user'`, `'password'`, and `'database'` with your actual MySQL connection details:

```javascript
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'database'
});

...
```

2. To start the application, open a terminal in the root directory of the project and run:

```bash
node index.js
```

3. The application will prompt you to select an action. Use the arrow keys to select an action and press `Enter` to execute it.

4. Depending on the action you choose, the application may prompt you for more information (e.g., if you choose to add a department, it will ask you for the name of the department).

5. The application will show the results of your action in the console. For example, if you choose to view all departments, it will display a table of departments in the console.

6. After executing an action, the application will prompt you to select the next action. To exit the application, choose 'Exit'.

... 

## Live Video
URL: https://www.loom.com/share/eb15262322ac4c8196069caf0c4aa313


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
