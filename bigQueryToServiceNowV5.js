// Set job to appear in job execution table in ServiceNow
gs.getSession().setScheduledJobId(current.sys_id);
gs.log("Job started: " + current.name, "Job Execution Tracker");

// Begin job
var raxDataJSON = new BigQueryConnectUtils().getData(); 
var raxDataParse = JSON.parse(raxDataJSON);

// Return columns data in format of object for example: [{"name": "email","type": "STRING","mode": "NULLABLE"},{"name": "level00","type": "STRING","mode":"NULLABLE"}]
var columnsJSON = raxDataParse.schema.fields;
var columnsTitleValue = []; // Store columns title name in array

for (var i = 0; i < columnsJSON.length; i++) {
    columnsTitleValue.push(columnsJSON[i].name);
}

var totalCount = raxDataParse.totalRows; // Total count in BigQuery table
var rowsRaxData = raxDataParse.rows; // Array of rows from BigQuery

gs.info("Total Rows in BigQuery Table: " + totalCount);

// Iterating through the Racker Roaster table in GCP BigQuery to insert or update data in the user org table
for (var x = 0; x < rowsRaxData.length; x++) {

    // Check if participant ID already exists in ServiceNow table
    var user = new GlideRecord('sn_customerservice_participant');
    user.addQuery('u_string_4', rowsRaxData[x].f[0].v); // Check BigQuery Table For New/Old PIDs
    user.query();

    // If duplicate PID is found, then update data in participant table
    if (user.next()) {
        var updatedFields = [];

        // Check and update fields if they have changed
        if (user.u_string_1 != rowsRaxData[x].f[1].v) {
            user.u_string_1 = rowsRaxData[x].f[1].v; // Update first name
            updatedFields.push("u_string_1");
        }
        if (user.u_string_2 != rowsRaxData[x].f[2].v) {
            user.u_string_2 = rowsRaxData[x].f[2].v; // Update middle name
            updatedFields.push("u_string_2");
        }
        if (user.u_string_3 != rowsRaxData[x].f[3].v) {
            user.u_string_3 = rowsRaxData[x].f[3].v; // Update last name
            updatedFields.push("u_string_3");
        }
        if (user.u_string_6 != rowsRaxData[x].f[4].v) {
            user.u_string_6 = rowsRaxData[x].f[4].v; // Update email
            updatedFields.push("u_string_6");
        }
        if (user.u_string_5 != rowsRaxData[x].f[5].v) {
            user.u_string_5 = rowsRaxData[x].f[5].v; // Update phone number
            updatedFields.push("u_string_5");
        }
        if (user.u_string_7 != rowsRaxData[x].f[6].v) {
            user.u_string_7 = rowsRaxData[x].f[6].v; // Update system
            updatedFields.push("u_string_7");
        }
        if (user.u_string_8 != rowsRaxData[x].f[7].v) {
            user.u_string_8 = rowsRaxData[x].f[7].v; // Update zipcode
            updatedFields.push("u_string_8");
        }

        // Perform the update if any fields were changed
        if (updatedFields.length > 0) {
            user.update();

            // Log record update with Sys ID, Participant ID, and updated fields
            gs.info("Record updated: Sys ID: " + user.sys_id + ", Participant ID: " + rowsRaxData[x].f[0].v + ", Updated Fields: " + updatedFields.join(", "));
        } else {
            gs.info("Record found but no updates needed: Sys ID: " + user.sys_id + ", Participant ID: " + rowsRaxData[x].f[0].v);
        }
    }

    // If new PID is found, then create new record in participant table
    else {
        var insertUser = new GlideRecord('sn_customerservice_participant');
        insertUser.initialize();
        insertUser.u_string_4 = rowsRaxData[x].f[0].v; // Participant ID
        insertUser.u_string_1 = rowsRaxData[x].f[1].v; // First name 
        insertUser.u_string_2 = rowsRaxData[x].f[2].v; // Middle name 
        insertUser.u_string_3 = rowsRaxData[x].f[3].v; // Last name
        insertUser.u_string_6 = rowsRaxData[x].f[4].v; // Email
        insertUser.u_string_5 = rowsRaxData[x].f[5].v; // Phone number
        insertUser.u_string_7 = rowsRaxData[x].f[6].v; // System
        insertUser.u_string_8 = rowsRaxData[x].f[7].v; // Zipcode
        insertUser.insert();
        
        // Log record insertion with Sys ID and Participant ID
        gs.info("Record inserted: Sys ID: " + insertUser.sys_id + ", Participant ID: " + rowsRaxData[x].f[0].v);
    }
}

// End job tracking in ServiceNow
gs.log("Job completed: " + current.name, "Job Execution Tracker");

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
