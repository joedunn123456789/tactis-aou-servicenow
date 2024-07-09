// Query Knowledge Bases
var kbGr = new GlideRecord('kb_knowledge');
kbGr.addQuery('valid_to', '<', new GlideDateTime());
kbGr.addQuery('is_parent', true); // Assuming is_parent is a boolean field indicating parent records
kbGr.query();

while (kbGr.next()) {
    // Check if the valid_to date is in the past
    var validTo = new GlideDateTime(kbGr.valid_to);
    var now = new GlideDateTime();
    if (validTo.before(now)) {
        // Update the valid_to date to one year into the future
        validTo.addYears(1);
        kbGr.valid_to = validTo.getDisplayValue();
        
        // Save the changes
        kbGr.update();
    }
}