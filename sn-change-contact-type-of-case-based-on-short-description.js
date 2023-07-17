// JavaScript source code
// Get all cases from the current instance case table
var grCases = new GlideRecord('sn_customerservice_case');
grCases.query();

// Loop through each case
while (grCases.next()) {
    var shortDesc = grCases.getValue('short_description');

    // Check if the short description contains "x"
    if (shortDesc.includes("mailroom")) {
        // Change the type from email to mail
        grCases.setValue('contact_type', 'mail');
        grCases.update();
    }
}
