unlockoutUsers();

function unlockoutUsers() {
        //Identify Table
    var users = new GlideRecord("sys_user");
        //Identify Filter Conditions For Query
    users.addEncodedQuery('active=true^roles=sn_customerservice.customer');
        //Initates Query
    users.query();
        //Prints Out The Following Information
    gs.print("User query: " + users.getEncodedQuery() + " = " + users.getRowCount());
        //While in Query, Do This to all you find
    while (users.next()) {
        users.last_login = '2023-04-06';
        users.last_login_time = '2023-04-06 12:00:00';
        users.locked_out = false;
        //Uncomment out the bottom line when you are ready to run this!
        //users.update();
        gs.print(users.getDisplayValue() + "added" + users. last_login() + users.last.login_time() + "and" + " was unlocked");
    }
}
