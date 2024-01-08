// JavaScript source code
//prod enviornment
//script includes

var TactisPortalUtil = Class.create();
TactisPortalUtil.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getCases: function () {

        var userHasAccountManagerRole = gs.getUser().hasRole('sn_customerservice.customer_case_manager');
        var userIsContactOnAccount = this.checkIfUserIsContactOnAccount();


        if (userHasAccountManagerRole && userIsContactOnAccount) {

        }

    },

    checkIfUserIsContactOnAccount: function () {

    },


    type: 'TactisPortalUtil'


})
