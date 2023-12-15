var raxDataJSON = new BigQueryConnectUtils().getData(); //Script include to connect GCP 
var raxDataParse = JSON.parse(raxDataJSON);

//return columns data in format of object for example : [{"name": "email","type": "STRING","mode": "NULLABLE"},{"name": "level00","type": "STRING","mode":"NULLABLE"}]
var columnsJSON = raxDataParse.schema.fields;

var columnsTitleValue = []; //store columns title name in array

for (var i = 0; i < columnsJSON.length; i++) {
	columnsTitleValue.push(columnsJSON[i].name);
}


var totalCount = raxDataParse.totalRows; //total count in BigQuery table
var rowsRaxData = raxDataParse.rows; //its return array

function getSysID(userName) {
	if (userName) {
		var user = new GlideRecord('sn_customerservice_participant');
		user.addQuery('u_name', check_name);
		user.query();
		if (user.next()) {
			return user.getValue('sys_id');
		}
	} else {
		return '';
	}
}

//iterating through the Racker Roaster table in GCP BigQuery to insert or update data in the user org table
for (var x = 0; x < rowsRaxData.length; x++) {

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
	| cch_l2                    -->   8   |   
	| cch_l3                    -->   9   |   
	| cch_l4                    -->   10  |   
	| cch_l5                    -->   11  |   
	| cch_l6                    -->   12  |   
	| cch_l7                    -->   13  |   
	|=====================================|

*/
	var user = new GlideRecord('sn_customerservice_participant');
	user.addQuery('u_string_4', rowsRaxData[x].f[0].v);
	//user.addQuery('u_string_1', rowsRaxData[x].f[1].v);
	//user.addQuery('u_string_2', rowsRaxData[x].f[2].v);
	//user.addQuery('u_string_3', rowsRaxData[x].f[3].v);
	//user.addQuery('u_string_6', rowsRaxData[x].f[4].v);
	//user.addQuery('u_string_5', rowsRaxData[x].f[5].v);
	//user.addQuery('u_string_7', rowsRaxData[x].f[6].v);
	user.query();


	//  If duplicate records are discovered, then data in user org table will be updated. 
	if (user.next()) {

		//user.u_string_4 = getSysID(rowsRaxData[x].f[0].v); //unique identified pid
		user.u_string_4 = rowsRaxData[x].f[0].v; //pid
		user.u_string_1 = rowsRaxData[x].f[1].v; //first name
		user.u_string_2 = rowsRaxData[x].f[2].v; //middle name
		user.u_string_3 = rowsRaxData[x].f[3].v; //last name
		user.u_string_6 = rowsRaxData[x].f[4].v; //email
		user.u_string_5 = rowsRaxData[x].f[5].v; //phone
		user.u_string_7 = rowsRaxData[x].f[6].v; //system
		user.u_zipcode = rowsRaxData[x].f[7].v; //zipcode
		user.update();
	}

	// 	If duplicate records are not discovered, then data in user org table will be inserted. 
	else {
		var insertUser = new GlideRecord('sn_customerservice_participant');
		insertUser.initialize();
		//insertUser.u_string_4 = getSysID(rowsRaxData[x].f[0].v);
		insertUser.u_string_4 = rowsRaxData[x].f[0].v; //participant id
		insertUser.u_string_1 = rowsRaxData[x].f[1].v; //first_name 
		insertUser.u_string_2 = rowsRaxData[x].f[2].v; //middle name 
		insertUser.u_string_3 = rowsRaxData[x].f[3].v; //last name
		insertUser.u_string_6 = rowsRaxData[x].f[4].v; //email
		insertUser.u_string_5 = rowsRaxData[x].f[5].v; //phone number
		insertUser.u_string_7 = rowsRaxData[x].f[6].v; //system
		insertUser.u_zipcode = rowsRaxData[x].f[7].v; //zipcode
		insertUser.insert();
	}
}