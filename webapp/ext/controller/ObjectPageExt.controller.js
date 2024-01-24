sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/mvc/ControllerExtension"
], function(MessageToast, ControllerExtension) {
    'use strict';

    return ControllerExtension.extend('ns.fiorielementses5.ext.controller.ObjectPageExt', {
        override: {
            onInit: function () {
                console.log(this)
            },
            beforeSaveExtension: function () {
                let that = this;
                let oController = this.getView().getController();
                let aValidatingFields = [
                    'contact_phonenumber',
                    'contact_faxnumber',
                    'contact_email'
                ]

                return new Promise(function(resolve, reject){
                    let bIsValid = aValidatingFields.every((x) => {
                        let sState = oController.byId(x).getValueState();
                        return !(sState == 'Error')
                    });

                    if (bIsValid){
                        resolve();
                    } else {
                        //show error dialog
                        that.ShowErrorDialog("Edit Error", "Please fix your editing errors before continuing");
                        reject();
                    }
                })
            }
        },
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
        },
        ShowErrorDialog: function (sTitle, sMessage) {
            let oDialog = new sap.m.Dialog({
                title: sTitle,
                content:[
                    new sap.m.VBox({
                        alignItems: sap.m.FlexAlignItems.Center,
                        items:[
                            new sap.m.Text({
                                text: sMessage
                            })
                        ]
                    })
                ],
                beginButton: new sap.m.Button({
                    text: "OK",
                    press: function () {
                        oDialog.close()
                    }
                }),
                afterClose: function () {
                    oDialog.destroy();
                }
            }).addStyleClass('errorDialog');

            oDialog.open();
        }
    }) 
});