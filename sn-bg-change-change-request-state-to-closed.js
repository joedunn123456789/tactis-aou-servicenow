// JavaScript source code
// For Use: Only for when Change Record is not "Normal"
// SN Background Script

// Get the Change Request record
var changeRequest = new GlideRecord('change_request');
//Identify the specific change request to be changed
changeRequest.addQuery('number', 'CHG0030049'); 
//Query the Change Request table
changeRequest.query();
if (changeRequest.next()) {
    // Set the state to Closed
    changeRequest.setValue('state', 3); // State 3 represents the Closed state
    // Update the Record
    changeRequest.update();
    // Notify the User
    gs.info('Change Request ' + changeRequest.number + ' has been closed.');
}
else {
    //Notify user that the change request was not found
    gs.error('Change Request not found.');
}
