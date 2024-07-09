var raxDataJSON = new BigQueryConnectUtils().getData(); // Connects to Google Cloud Platform (GCP) via a Script include
var raxDataParse = JSON.parse(raxDataJSON); // Parses the JSON data retrieved from GCP

var columnsJSON = raxDataParse.schema.fields; // Retrieves column information from the parsed JSON
var columnsTitleValue = []; // Stores column titles

// Extracts column names and stores them in an array
for (var i = 0; i < columnsJSON.length; i++) {
    columnsTitleValue.push(columnsJSON[i].name);
}

var totalCount = raxDataParse.totalRows; // Total count of rows in the BigQuery table
var rowsRaxData = raxDataParse.rows; // Array of rows returned from BigQuery

// Iterates through each row of data from the BigQuery table
for (var x = 0; x < rowsRaxData.length; x++) {
    var user = new GlideRecord('sn_customerservice_participant');
    user.addQuery('u_string_4', rowsRaxData[x].f[0].v); // Query for existing records based on participant ID

    // Executes the query
    user.query();

    // Checks if a matching record exists
    if (user.next()) {
        // Update existing record if found
        user.u_string_1 = rowsRaxData[x].f[1].v; // Updates first name
        user.u_string_2 = rowsRaxData[x].f[2].v; // Updates middle name
        user.u_string_3 = rowsRaxData[x].f[3].v; // Updates last name
        user.u_string_6 = rowsRaxData[x].f[4].v; // Updates email
        user.u_string_5 = rowsRaxData[x].f[5].v; // Updates phone
        user.u_string_7 = rowsRaxData[x].f[6].v; // Updates system
        user.u_string_8 = rowsRaxData[x].f[7].v; // Updates zipcode

        // Perform the update operation
        if (!user.update()) {
            gs.error("Failed to update record with Participant ID: " + rowsRaxData[x].f[0].v);
            // Implement error handling, rollback, or retry logic as needed
        }
    } else {
        // Create a new record if no match is found
        var insertUser = new GlideRecord('sn_customerservice_participant');
        insertUser.initialize();
        insertUser.u_string_4 = rowsRaxData[x].f[0].v; // Sets participant ID
        insertUser.u_string_1 = rowsRaxData[x].f[1].v; // Sets first name 
        insertUser.u_string_2 = rowsRaxData[x].f[2].v; // Sets middle name 
        insertUser.u_string_3 = rowsRaxData[x].f[3].v; // Sets last name
        insertUser.u_string_6 = rowsRaxData[x].f[4].v; // Sets email
        insertUser.u_string_5 = rowsRaxData[x].f[5].v; // Sets phone number
        insertUser.u_string_7 = rowsRaxData[x].f[6].v; // Sets system
        insertUser.u_string_8 = rowsRaxData[x].f[7].v; // Sets zipcode

        // Perform the insert operation
        if (!insertUser.insert()) {
            gs.error("Failed to insert new record with Participant ID: " + rowsRaxData[x].f[0].v);
            // Implement error handling, rollback, or retry logic as needed
        }
    }
}
