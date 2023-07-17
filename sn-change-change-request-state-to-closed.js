// JavaScript source code
//For Use: Only for when Change Record is not "Normal"
// Get the Change Request record
var changeRequest = new GlideRecord('change_request');
changeRequest.addQuery('number', 'CHG0030049'); // Replace with the actual Change Request number
changeRequest.query();
if (changeRequest.next()) {

    // Set the state to Closed
    changeRequest.setValue('state', 3); // State 3 represents the Closed state
    changeRequest.update();

    gs.info('Change Request ' + changeRequest.number + ' has been closed.');

}

else {
    gs.error('Change Request not found.');
}