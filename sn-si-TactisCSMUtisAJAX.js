// JavaScript source code
//prod enviornment
//script includes

var TactisCSMUtilsAJAX = Class.create();
TactisCSMUtilsAJAX.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    getCaseTasks: function () {

        var caseNumber = this.getParameter("sysparm_number");
        var actualNumberOfCaseTasks;
        var cTaskGr = new GlideAggregate("sn_customerservice_task");
        cTaskGr.addQuery("parent", caseNumber);
        cTaskGr.addQuery("state", "1");
        cTaskGr.addAggregate("COUNT");
        cTaskGr.query();


        while (cTaskGr.next()) {
            actualNumberOfCaseTasks = cTaskGr.getAggregate("COUNT");


        }
        return actualNumberOfCaseTasks;
    },

    closeCaseTasks: function () {
        var caseId = this.getParameter("sysparm_case_id");
        var closeCtaskGr = new GlideRecord("sn_customerservice_task");
        closeCtaskGr.addQuery("parent", caseId);
        closeCtaskGr.addQuery("state", "1");
        closeCtaskGr.query();


        while (closeCtaskGr.next()) {
            gs.log("MPG does this work in the while loop")
            closeCtaskGr.setValue("state", "3");
            closeCtaskGr.work_notes = "This task was closed by the parent";
            closeCtaskGr.update();
        }
        return true;
    },

    type: 'TactisCSMUtilsAJAX'
});
