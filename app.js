const prompt = require("prompt-sync")();

// import user amd groupclasses from classes.js
const { User, Group, SplitUp } = require("./classes");

let splitup = new SplitUp();


// ***************** TESTING  ***************** //
splitup.addUser("naruto", 1234);
splitup.addUser("hinata", 1234);
splitup.addUser("sasuke", 1234);
splitup.addUser("sakura", 1234);

// add group
splitup.createGroup("ramen", splitup.users["naruto"]);

console.log(splitup)

// add members to group

splitup.groups["ramen"].addMember(splitup.users["hinata"]);
splitup.groups["ramen"].addMember(splitup.users["sasuke"]);
splitup.groups["ramen"].addMember(splitup.users["sakura"]);



// *************** END OF TESTING ************* //





// a console for getting user input
while (true) {
    console.log("1. Login");
    console.log("2. Register");
    console.log("3. About");
    console.log("0. Exit");

    var choice = prompt("Enter your choice: ");
    console.log("Choice: " + choice);

    if (choice == 1) {
        console.log("Hello there! Welcome to SplitUp!");
        var username = prompt("Enter your username: ");
        var password = prompt("Enter your password: ");

        // check if user exists
        if (splitup.users[username] == undefined) {
            console.log("User does not exist");
            continue;
        }

        // check if password is correct
        if (splitup.users[username].password != password) {
            console.log("Wrong password");
            continue;
        }

        // login successful
        console.log("Login successful");
        console.log("Welcome " + username + "!");

        let user = splitup.users[username];

        // User commands
        user.userCommand(splitup);

    } else if (choice == 2) {

        var username = prompt("Enter your username: ");
        var password = prompt("Enter your password: ");

        // check if user exists
        if (splitup.users[username] != undefined) {
            console.log("User already exists");
            continue;
        }

        // register user
        splitup.addUser(username, password);
        console.log("User registered successfully");

    }
    else if (choice == 3) {
        console.log("About Split Up");
        console.log("SplitUp is a money management app that helps you split up your bills with your friends and family.");
    }
    else if (choice == 0) {
        break;
    }




}


