// JavaScript source code
// finds cases by assignment group and short description containing x. changes case fields and assigns existing kb.
// create new GlideRecord object for the 'sn_customerservice_case' table
var grCase = new GlideRecord('sn_customerservice_case');

// add query to look for cases assigned to group "Support Center Training"
grCase.addQuery('assignment_group', 'Support Center Training');

// add query to look for cases with short description containing "New Item Delivered"
grCase.addQuery('short_description', 'CONTAINS', 'New Item Delivered');

// execute the query
grCase.query();

while (grCase.next()) {
    // update contact type to 'mail'
    grCase.contact_type = 'mail';

    // update primary category to 'X'
    grCase.u_primary_category = 'X';

    // update sub category to 'Y'
    grCase.u_sub_category = 'Y';

    // update state to 'Resolved'
    grCase.state = 6;

    // update the record
    grCase.update();

    // attach knowledge article to the case, you need to have the sys_id of the article
    var knowledgeSysId = 'sys_id_of_knowledge_article';
    var grKnowledge = new GlideRecord('kb_knowledge');

    if (grKnowledge.get(knowledgeSysId)) {
        var grKnowledgeUse = new GlideRecord('kb_use');
        grKnowledgeUse.knowledge = grKnowledge.sys_id;
        grKnowledgeUse.user = grCase.opened_by;
        grKnowledgeUse.table_name = grCase.getTableName();
        grKnowledgeUse.table_sys_id = grCase.sys_id;
        grKnowledgeUse.insert();
    }
}