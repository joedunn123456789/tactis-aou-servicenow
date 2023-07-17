// JavaScript source code
// Get the current date and time
var now = new GlideDateTime();

// Calculate the date and time 60 days ago
var sixtyDaysAgo = new GlideDateTime();
sixtyDaysAgo.addDaysUTC(-60);

// Create a GlideRecord object for the User table
var userGr = new GlideRecord('sys_user');

// Define a query to find all users who haven't logged in since 60 days ago excluding sys admin account
userGr.addQuery('last_login_time', '<', sixtyDaysAgo);
userGr.addQuery('user_name', '!=', 'admin');
userGr.query();

// Loop through the results and disable each user account
while (userGr.next()) {
    userGr.setValue('locked_out', true);
    userGr.update();
}