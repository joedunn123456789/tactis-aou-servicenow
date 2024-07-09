// verify database input transaction
// run in background scripts in servicenow
var gr = new GlideRecord('sn_customerservice_case'); // enter table name
gr.addQuery('sys_id', 'be7adfc5872e46505e7b11fc3fbb3599'); // enter sys_id of record
gr.query();
if (gr.next()) {
    gs.print('Field Value: ' + gr.u_phase_1_1st_sms_date); // format is gr.tableName
} else {
    gs.print('Record not found.');
}