// JavaScript source code
//locks users after 60 days of inactivity

var users = new GlideRecord('sys_user');
users.addQuery('active', true); // looks for users who are checked active
users.addQuery('locked_out', false); // looks for users who are not checked locked out
users.query();

var gdt = new GlideDateTime();

while (users.next()) {
    var dateLastLoginTime = new GlideDateTime(users.last_login_time); // makes last login time a variable
    dateLastLoginTime.addDays(60); // adds 60 days to last login time. change this number to increase or decrease time
    if (dateLastLoginTime.getValue() < gdt) {
        users.locked_out = true; // if user has not logged in 60 days after last login time or blank; check locked out
        users.update(); // update the profile
    }
}
