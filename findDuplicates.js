var table = 'sn_customerservice_participant';
var columns = ['u_string_4', /*/'u_column_2', 'u_column_3'*/];
var pivotColumn = 'u_string_4';
var duplicateFinder = new GlideAggregate(table);

for (var i = 0; i < columns.length; i++) {
    duplicateFinder.groupBy(columns[i]);
}

duplicateFinder.addAggregate('COUNT', pivotColumn);
duplicateFinder.query();

while (duplicateFinder.next()) {
    var count = parseInt(duplicateFinder.getAggregate('COUNT', pivotColumn));
    if (count > 1){
        var message = count + ' found \n\t' + gs.getProperty('glide.servlet.uri') + table + '_list.do?sysparm_query=';
        for(var i = 0; i < columns.length; i++){
            message += columns[i] + '=' + duplicateFinder[columns[i]] + '^';
        }
        gs.log(message);
    }
}