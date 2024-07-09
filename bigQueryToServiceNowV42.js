// Log start of script execution
gs.info("Script execution started.");

// Retrieve data from BigQuery
var raxDataJSON = new BigQueryConnectUtils().getData();
var raxDataParse = JSON.parse(raxDataJSON);
var columnsJSON = raxDataParse.schema.fields;
var columnsTitleValue = [];

// Log column information
for (var i = 0; i < columnsJSON.length; i++) {
    columnsTitleValue.push(columnsJSON[i].name);
}
gs.info("Retrieved column information: " + JSON.stringify(columnsTitleValue));

var totalCount = raxDataParse.totalRows;
var rowsRaxData = raxDataParse.rows;

// Log total count of rows retrieved
gs.info("Total rows retrieved from BigQuery: " + totalCount);

// Iterating through the Racker Roaster table in GCP BigQuery to insert or update data in the user org table
for (var x = 0; x < rowsRaxData.length; x++) {
    var user = new GlideRecord('sn_customerservice_participant');
    user.addQuery('u_string_4', rowsRaxData[x].f[0].v);
    user.query();

    if (user.next()) {
        // Update existing record
        user.u_string_1 = rowsRaxData[x].f[1].v;
        user.u_string_2 = rowsRaxData[x].f[2].v;
        user.u_string_3 = rowsRaxData[x].f[3].v;
        user.u_string_6 = rowsRaxData[x].f[4].v;
        user.u_string_5 = rowsRaxData[x].f[5].v;
        user.u_string_7 = rowsRaxData[x].f[6].v;
        user.u_string_8 = rowsRaxData[x].f[7].v;
        user.update();
        gs.info("Updating record with sys_id: " + user.sys_id + ", participant_id: " + rowsRaxData[x].f[0].v);
    } else {
        // Insert new record
        var insertUser = new GlideRecord('sn_customerservice_participant');
        insertUser.initialize();
        insertUser.u_string_4 = rowsRaxData[x].f[0].v;
        insertUser.u_string_1 = rowsRaxData[x].f[1].v;
        insertUser.u_string_2 = rowsRaxData[x].f[2].v;
        insertUser.u_string_3 = rowsRaxData[x].f[3].v;
        insertUser.u_string_6 = rowsRaxData[x].f[4].v;
        insertUser.u_string_5 = rowsRaxData[x].f[5].v;
        insertUser.u_string_7 = rowsRaxData[x].f[6].v;
        insertUser.u_string_8 = rowsRaxData[x].f[7].v;
        var newRecordSysId = insertUser.insert();
        gs.info("Inserted new record with Participant ID: " + rowsRaxData[x].f[0].v + " and sys_id: " + newRecordSysId);
    }
}

// Log end of script execution
gs.info("Script execution completed.");
