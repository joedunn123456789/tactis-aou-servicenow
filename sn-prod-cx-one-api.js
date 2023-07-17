// JavaScript source code
// production code
var CXoneAPI = Class.create();
CXoneAPI.prototype = {
    initialize: function () {
        this.enable = gs.getProperty('sn_csm_workspace.int.cxone.enable').toString();
        if (this.enable != "true") {
            this._error('initialize',
                'Integration disabled by sys_property [sn_csm_workspace.int.cxone.enable]');
            return '';
        }
        this.errorLogging = gs.getProperty('sn_csm_workspace.int.cxone.error_logging').toString();
        this.token = this.getAuth();
        if (!this.token) {
            this._error('initialize', 'Bearer token failure');
            return '';
        }

    },

    requestWorkItem: function (gr, pocName, scriptId) {
        var pointOfContactName = pocName ? pocName + '' : 'Work Item Routing';
        var script = scriptId ? scriptId + '' : '91051465';
        var pointOfContact = pointOfContactName + ' - ' + script;
        var grEval = (gr && gr.isValidRecord());
        var workItemID = grEval ? gr.sys_id + '' : '';
        var url = grEval ? gs.getProperty('glide.servlet.uri') + gr.getLink(true) + '' : '';
        try {
            var request = new sn_ws.RESTMessageV2('NICE CXone', 'requestWorkItem');
            request.setStringParameterNoEscape('pointOfContact', '91051465 - Work Item Routing');
            request.setStringParameterNoEscape('workItemID', workItemID);
            request.setStringParameterNoEscape('from', url);
            request.setStringParameterNoEscape('token', this.token);
            var response = request.execute();
            var responseBody = response.getBody();
            var httpStatus = response.getStatusCode();
        } catch (ex) {
            this._error('getAuth', ex.message + '');
            return '';
        }
        var data = responseBody ? JSON.parse(responseBody) : '';
        var contactId = data && data.contactId ? data.contactId.toString() : '';
        return contactId;
    },

    _execute: function (request) {
        try {
            var response = request.execute();
            var responseBody = response.getBody();
            var httpStatus = response.getStatusCode();
        } catch (ex) {
            var message = ex.message;
            this._error('_execute', message);
            return '';
        }
        var data = responseBody ? JSON.parse(responseBody) : '';
        return data;
    },

    getAuth: function () {
        var clientId = gs.getProperty('sn_csm_workspace.int.cxone.client_id').toString();
        var clientSecret = gs.getProperty('sn_csm_workspace.int.cxone.client_secret').toString();
        try {
            var request = new sn_ws.RESTMessageV2('NICE CXone', 'getAccessKey');
            request.setStringParameterNoEscape('client_id', clientId);
            request.setStringParameterNoEscape('client_secret', clientSecret);
            var response = request.execute();
            var responseBody = response.getBody();
            var httpStatus = response.getStatusCode();
        } catch (ex) {
            this._error('getAuth', ex.message + '');
            return '';
        }
        var data = responseBody ? JSON.parse(responseBody) : '';
        var accessToken = data && data.access_token ? data.access_token.toString() : '';
        return accessToken;
    },

    _error: function (met, mes) {
        if (this.errorLogging != "true") {
            return '';
        }
        gs.error('CXoneAPI >>  Error: [method:' + met + '] >> ' + mes);
        return '';
    },

    type: 'CXoneAPI'
};
