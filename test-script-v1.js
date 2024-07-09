// Define the Sys ID of the user whose cases we want to check
var userId = "insert_user_sys_id_here"; // Insert the Sys ID of the user you want to check here

// Query for cases assigned to the specified user
var grCases = new GlideRecord('sn_customerservice_case');
grCases.addQuery('assigned_to', userId); // Query by the Sys ID of the user
grCases.query();

// Initialize counters
var totalCases = 0;
var resolvedCases = 0;
var closedCases = 0;
var openCases = 0;

// Loop through the cases
while (grCases.next()) {
    totalCases++;
    
    // Check if the case is in a resolved state
    if (grCases.getValue('state') == 6) { // 6 represents the 'Resolved' state in our instance
        resolvedCases++;
        
        // Check if the case is not closed
        if (grCases.getValue('state') != 3) { // 3 represents the 'Closed' state in our instance
            // Close the case
            grCases.setValue('state', 3); // Set state to 'Closed'
            grCases.update();
            closedCases++;
        }
    } else {
        // Count cases that are not closed or resolved
        openCases++;
    }
}

// Notify the script executor
gs.info("Script execution summary:");
gs.info("Total cases found: " + totalCases);
gs.info("Cases in a resolved state: " + resolvedCases);
gs.info("Closed cases: " + closedCases);
gs.info("Cases not closed or resolved: " + openCases);