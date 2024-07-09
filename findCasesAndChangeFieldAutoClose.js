// Define the numeric value for the "Resolved" state
var resolvedStateValue = 6;

// Define the query conditions
var gr = new GlideRecord('sn_customerservice_case');
gr.addQuery('active', true);
gr.addQuery('auto_close', false);
gr.addQuery('state', resolvedStateValue);
gr.addNullQuery('action_status');

// Log the query being executed
gs.print('Executing query: active=true, auto_close=false, state=6 (Resolved), action_status=NULL');

// Execute the query
gr.query();
gs.print('Query executed successfully');

// Initialize an array to store the result
var results = [];

// Initialize the log message
var logMessage = '';

// Initialize a counter for the total number of matching records
var totalCount = 0;

// Check if there are any records returned
if (gr.hasNext()) {
    // Iterate through the results
    while (gr.next()) {
        var caseInfo = 'Case Number: ' + gr.getValue('number') + ', Sys ID: ' + gr.getValue('sys_id');
        results.push(caseInfo);
        logMessage += caseInfo + '\n';

        // Increment the total count
        totalCount++;

        // Update the auto_close field to true
        gr.setValue('auto_close', true);
        gr.update();

        // Debug print for each field value
        gs.print('Record updated: active=' + gr.getValue('active') + ', auto_close=' + gr.getValue('auto_close') + ', state=' + gr.getValue('state') + ', action_status=' + gr.getValue('action_status'));
    }

    // Output the list of matching records
    gs.print('Matching records (' + totalCount + ' cases found):\n' + results.join('\n'));
} else {
    gs.print('No records found matching the criteria');
}

// Output the total count at the end
gs.print('Total count of matching records: ' + totalCount);

// Create a new log entry in the System Log (syslog) table
var log = new GlideRecord('syslog');
log.initialize();
log.message = 'Total count of matching records: ' + totalCount + '\nMatching records:\n' + logMessage;
log.source = 'Background Script';
log.level = 'info'; // Can be 'info', 'warn', 'error', etc.
log.insert();
