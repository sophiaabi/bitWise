# bitWise

### Description: 
A bitwise command visualizer that will display a graphical representation of each operation and binary number. This visualizer allows the user to see the disassembled binary expression to help newer users learn bitwise operators.

Supports decimal, hexadecimal, and binary expressions.

Check out the website here: http://bitw1se.herokuapp.com/


### Repo Organization & Build Info 
```
/public: Contains the autocomplete feature files as well as the main javascript file for parsing user input and returning the correct binary operation output.
/test: Contains the unit tests using the Mocha javascript testing framework. 
	- To test, install Mocha through NPM. Then, change directory to the root of the project and run the command `mocha` to test.
/views: contains the template for our website.
Our database files are in the root directory.
```

### Run Locally
1. Install [PostgreSQL](https://www.postgresql.org/) and run the daemon in the background. Install Node.js and NPM.
2. Clone the repository.
3. Changing your working directory to the project root.
4. Run `node server.js` and navigate to `localhost:4000` in a browser.

Made for CSCI 3308

Members: Andy Stieber, Jay Hayward, Jackson Boynton, Shelby Keupp, Sophia AbiEzzi, Tiffany Phan