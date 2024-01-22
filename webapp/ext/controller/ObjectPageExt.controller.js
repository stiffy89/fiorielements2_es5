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
        }
    }) 
});