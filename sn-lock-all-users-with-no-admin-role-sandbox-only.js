lockoutUsers();
// DO NOT USE IN PRODUCTION. CODE AS IS WILL LOCK OUT ALL USERS WITHOUT ADMIN ROLE
function lockoutUsers() {
    var users = new GlideRecord("sys_user");
    users.addEncodedQuery('active=true^roles!=admin');
    users.query();
    gs.print("User query: " + users.getEncodedQuery() + " = " + users.getRowCount());
    while (users.next()) {
        users.locked_out = true;
        //Uncomment out the bottom line when you are ready to run this!
        //users.update();
        gs.print(users.getDisplayValue() + " was disabled");
    }
}
