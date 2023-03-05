const prompt = require("prompt-sync")();

class User {
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }

    // user methods
    
    userCommand(splitup) {
        while (true) {
            console.log("1. Create a group");
            console.log("2. My Groups");
            console.log("3. Group Functions");
            console.log("0. Exit");

            var userChoice = prompt("Enter your choice: ");

            if (userChoice == 1) {
                var groupName = prompt("Enter the group name: ");

                splitup.createGroup(groupName, this);
            }
            else if (userChoice == 2) {
                // Display all groups where user is a member and admin
                console.log("\nYour Groups");
                console.log("-----------------");


                for (let groupName in splitup.groups) {

                    if (splitup.groups[groupName].usersAmount[this.name] != undefined) {

                        if (splitup.groups[groupName].admin == this.name) {
                            console.log(groupName + " (Admin)");
                        } else {
                            console.log(groupName);
                        }
                    }
                }

                console.log("-----------------\n");
            }
            else if (userChoice == 3) {
                var groupName = prompt("Enter the group name: ");

                // check if group exists
                if (splitup.groups[groupName] == undefined) {
                    console.log("Group does not exist");
                    continue;
                }

                var group = splitup.groups[groupName];

                group.groupCommand(splitup, this);

            }

            
            else if (userChoice == 0) {
                break;
            }
        }
    }

}


class Group {
    constructor(groupName, user) {
        this.groupName = groupName;
        this.usersAmount = {};
        this.usersAmount[user.name] = {};
        this.admin = user.name;
    }

    addMember(user) {
        if (this.usersAmount[user.name] != undefined) {
            console.log("User already exists");
            return;
        }
        this.usersAmount[user.name] = {};
    }

    addBill(amount,desc, user) {
        if (this.usersAmount[user.name] == undefined) {
            console.log("User does not exist");
            return;
        }

        
        var totalMembers = Object.keys(this.usersAmount).length;
        var amountPerMember = amount / totalMembers;

        Object.keys(this.usersAmount).forEach(member => {
            if (member != user.name) {
                console.log(member);
                if (this.usersAmount[user.name][member] == undefined) {
                    this.usersAmount[user.name][member] = 0;
                }

                if (this.usersAmount[member][user.name] == undefined) {
                    this.usersAmount[member][user.name] = 0;
                }

                this.usersAmount[user.name][member] += amountPerMember;
                this.usersAmount[member][user.name] -= amountPerMember;
            }
        });



        console.log(this.usersAmount);
        console.log(Object.keys(this.usersAmount));

  
        
        console.log("Bill added successfully");
    }

    groupCommand(splitup, user) {
        
        while (true) {
            console.log("1. Add a member");
            console.log("2. Add a bill");
            console.log("3. Check Balance");
            console.log("4. Pay Balance");
            console.log("5. Group Details");
           
            console.log("0. Exit group "+ this.groupName);

            var groupChoice = prompt("Enter your choice: ");

            if (groupChoice == 0) {
                break;
            }
            else if (groupChoice == 1) {
                var memberName = prompt("Enter the member name: ");

                // check if member exists
                if (splitup.users[memberName] == undefined) {
                    console.log("Member does not exist");
                    continue;
                }

                // check if member is already a member of the group

                if (splitup.groups[this.groupName].users[memberName] != undefined) {
                    console.log("Member is already a member of the group");
                    continue;
                }

                // check if current user is admin
                if (splitup.groups[this.groupName].admin != user.name) {
                    console.log("Only admin can add members");
                    continue;
                }

                // add member to group
                group.addMember(splitup.users[memberName]);
                console.log("Member added successfully");

            }
            else if (groupChoice == 2) {
                
                var billAmount = prompt("Enter the bill amount: ");
                var billDescription = prompt("Enter the bill description: ");

                // add bill to group
                this.addBill(billAmount, billDescription, user);

            }

            else if (groupChoice == 3) {
                console.log("Amount  Pending  " + user.name + ":");
                console.log("----------------------------");
                for (let memberName in this.usersAmount) {
                    if (memberName != user.name && this.usersAmount[user.name][memberName] != undefined && this.usersAmount[user.name][memberName] != 0) {

                        let amount = this.usersAmount[user.name][memberName];

                        if (amount > 0) {
                            console.log("Amount: " + amount + "/-  " + memberName + " owes you");
                        } else {
                            console.log("Amount: " + amount + "/-  You owe " + memberName);
                        }
                    }
                }
            }
            else if (groupChoice == 4) {
                let memberName = prompt("Enter the member name you want to pay: ");

                if (this.usersAmount[user.name][memberName] == undefined || this.usersAmount[user.name][memberName] >= 0) {
                    console.log("Member does not exist or you do not owe him/her");
                    continue;
                }

                let amount = prompt("Enter the amount you want to pay: ");

                if (amount > -this.usersAmount[user.name][memberName]) {
                    console.log("You cannot pay more than you owe");
                    continue;
                }

                this.usersAmount[user.name][memberName] += parseInt(amount);
                this.usersAmount[memberName][user.name] -= parseInt(amount);

                console.log("Amount paid successfully");
            }


            else if (groupChoice == 5) {
                
                // Display group name
                console.log("Group Name: " + this.groupName);

                console.log("----------------------------\n");
                // Display admin
                console.log("Admin: " + this.admin);

                console.log("Members: ");

                // Display all members of the group
                for (let memberName in this.usersAmount) {
                    console.log(memberName);
                }
            }

           
            else if (groupChoice == 0){
                break;
            }
        }

    }

}

class SplitUp {

    constructor() {
        this.users = {};
        this.groups = {};
    }

    addUser(name, password) {
        if (this.users[name] != undefined) {
            console.log("User already exists");
            return;
        }
        this.users[name] = new User(name, password);
    }

    createGroup(groupName, user) {
        if (this.groups[groupName] != undefined) {
            console.log("Group already exists");
            return;
        }
        this.groups[groupName] = new Group(groupName, user);
        console.log("Group created successfully");
    }
}


// export the class
module.exports = {
    User: User,
    Group: Group,
    SplitUp: SplitUp
};