// JavaScript source code
//This script uses a business rule to automatically copy the notes from the task to the parent case when the task is updated.
(function executeRule(current, previous) {
    var parentCase = new GlideRecord("sn_customerservice_case");// Replace 'table_name' with the name of the table where the parent case is stored.
    parentCase.addQuery("parent", current.getValue("sys_id"));
    parentCase.query();
    if (parentCase.next()) {
        parentCase.work_notes = current.work_notes;
        parentCase.field_notes = current.field_notes;
        parentCase.update();
    }
})(current, previous);
