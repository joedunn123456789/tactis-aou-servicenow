// JavaScript source code
// NiceCXOne and ServiceNow Integration
(function executeRule(current, previous /*null when async*/) {
// call CXOneAPI (Script Includes)
    var contactId = new sn_csm_workspace.CXoneAPI().requestWorkItem(current);

})(current, previous);
