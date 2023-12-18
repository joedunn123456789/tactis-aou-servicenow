// JavaScript source code
//servicenow business rule
//Place in business rule on case table

(function executeRule(current, previous /*null when async*/) {
    // Targetting the Customer Service Task
    var cTaskGr = new GlideRecord("sn_customerservice_task");
    // 	Querying for the parent account and ensure it is the same one
    cTaskGr.addQuery("parent", current.getValue("sys_id"));
    cTaskGr.addQuery('state', '!=', '3');
    cTaskGr.query();

    // 	While there are open tasks affiliated with this case, we will then automatically close it.
    while (cTaskGr.next()) {
        cTaskGr.setValue("state", "3");
        cTaskGr.update();
    }
})(current, previous);
