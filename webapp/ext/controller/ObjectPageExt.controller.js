sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/mvc/ControllerExtension"
], function(MessageToast, ControllerExtension) {
    'use strict';

    return ControllerExtension.extend('ns.fiorielementses5.ext.controller.ObjectPageExt', {
        InitialsFormatter: function (sFirstName, sLastName){
            if (sFirstName && sLastName){
                return sFirstName.substring(0,1) + " " + sLastName.substring(0, 1);
            } else {
                return "";
            }
        },
        PhoneNumberValidation: function (oEvent) {
            let oSource = oEvent.getSource();
            let sValue = oEvent.getParameters().value;

            //check to see if our value matches the regex for phone numbers
            let reg = new RegExp('^[0-9]+$');

            if (sValue){
                if (sValue.length > 10 || !reg.test(sValue)){
                    oSource.setValueState('Error');
                    oSource.setValueStateText('Numbers only')
                    return;
                }
            }

            oSource.setValueState('None');
            oSource.setValueStateText('');
        },
        EmailValidation: function (oEvent) {
            let oSource = oEvent.getSource();
            let sValue = oEvent.getParameters().value;

            //check to see if our value matches the regex for email
            if (sValue){
                if (!(sValue.includes('@')) || !(sValue.includes('.com'))) {
                    oSource.setValueState('Error');
                    oSource.setValueStateText('Valid email addresses only')
                    return;
                }
            }

            oSource.setValueState('None');
            oSource.setValueStateText('');
        }
    }) 
});