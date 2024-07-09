try {
    // Retrieve data from BigQuery using a script include
    var raxDataJSON = new BigQueryConnectUtils().getData(); 
    // Parse the JSON data retrieved from BigQuery
    var raxDataParse = JSON.parse(raxDataJSON); 

    // Ensure schema and fields are defined
    if (!raxDataParse.schema || !raxDataParse.schema.fields) {
        gs.error('Schema fields are not defined in the retrieved data.');
    } else {
        // Extract column information from the schema
        var columnsJSON = raxDataParse.schema.fields;
        var columnsTitleValue = []; // Store column titles in an array

        // Loop through the column data to extract column names
        for (var i = 0; i < columnsJSON.length; i++) {
            columnsTitleValue.push(columnsJSON[i].name);
        }

        // Get the total number of rows in the BigQuery table
        var totalCount = raxDataParse.totalRows; 
        // Get the row data from the BigQuery table
        var rowsRaxData = raxDataParse.rows; 

        // Iterate through each row of data retrieved from BigQuery
        for (var x = 0; x < rowsRaxData.length; x++) {
            gs.info('Processing row ' + x + ' of ' + rowsRaxData.length);

            /* 
            The table below provides a guide for iterating the JSON data from BigQuery's roaster table.
            |=====================================|
            | Fields                        INDEX |
            |=====================================|
            | participant_id            -->   0   |   
            | first_name                -->   1   |   
            | middle_name               -->   2   |   
            | last_name                 -->   3   |   
            | email                     -->   4   |   
            | phone_number              -->   5   |   
            | participant_origin        -->   6   |   
            | zipcode                   -->   7   |   
            | not used                  -->   8   |   
            | not used                  -->   9   |   
            | not used                  -->   10  |   
            | not used                  -->   11  |   
            | not used                  -->   12  |   
            | not used                  -->   13  |   
            |=====================================|
            */

            // Create a new GlideRecord instance for the participant table
            var user = new GlideRecord('sn_customerservice_participant');
            // Query the participant table for a matching participant ID (PID)
            user.addQuery('u_string_4', rowsRaxData[x].f[0].v); // Check Big Query Table For New/Old PIDs
            // The following lines are commented out but can be used to add more query parameters
            // user.addQuery('u_string_1', rowsRaxData[x].f[1].v);
            // user.addQuery('u_string_2', rowsRaxData[x].f[2].v);
            // user.addQuery('u_string_3', rowsRaxData[x].f[3].v);
            // user.addQuery('u_string_6', rowsRaxData[x].f[4].v);
            // user.addQuery('u_string_5', rowsRaxData[x].f[5].v);
            // user.addQuery('u_string_7', rowsRaxData[x].f[6].v);
            // user.addQuery('u_string_8', rowsRaxData[x].f[7].v);
            user.query();

            // If a matching participant ID is found, update the existing record
            if (user.next()) {
                // The following line is commented out to disable PID from being changed
                // user.u_string_4 = getSysID(rowsRaxData[x].f[0].v); // Unique identified PID
                // user.u_string_4 = rowsRaxData[x].f[0].v; // PID - commented out to disable PID from being changed.
                user.u_string_1 = rowsRaxData[x].f[1].v; // First name
                user.u_string_2 = rowsRaxData[x].f[2].v; // Middle name
                user.u_string_3 = rowsRaxData[x].f[3].v; // Last name
                user.u_string_6 = rowsRaxData[x].f[4].v; // Email
                user.u_string_5 = rowsRaxData[x].f[5].v; // Phone
                user.u_string_7 = rowsRaxData[x].f[6].v; // System
                user.u_string_8 = rowsRaxData[x].f[7].v; // Zipcode
                user.update(); // Update the record in the database
            }

            // If no matching participant ID is found, create a new record
            else {
                var insertUser = new GlideRecord('sn_customerservice_participant');
                insertUser.initialize(); // Initialize a new record
                // The following line is commented out to disable using an alternate method for PID
                // insertUser.u_string_4 = getSysID(rowsRaxData[x].f[0].v);
                insertUser.u_string_4 = rowsRaxData[x].f[0].v; // Participant ID
                insertUser.u_string_1 = rowsRaxData[x].f[1].v; // First name
                insertUser.u_string_2 = rowsRaxData[x].f[2].v; // Middle name
                insertUser.u_string_3 = rowsRaxData[x].f[3].v; // Last name
                insertUser.u_string_6 = rowsRaxData[x].f[4].v; // Email
                insertUser.u_string_5 = rowsRaxData[x].f[5].v; // Phone number
                insertUser.u_string_7 = rowsRaxData[x].f[6].v; // System
                insertUser.u_string_8 = rowsRaxData[x].f[7].v; // Zipcode
                insertUser.insert(); // Insert the new record into the database
            }
        }
    }
} catch (e) {
    // Log an error message if an exception occurs
    gs.error('An error occurred: ' + e.message);
}
