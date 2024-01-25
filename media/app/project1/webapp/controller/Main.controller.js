sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("com.ta.mediaui.controller.mediaUpload", {
            onInit: function () {
            },

            _getBaseURL: function () {
                var oBaseUrl = this.getOwnerComponent().getManifestEntry("/sap.app/id").replaceAll(".", "/");
                return jQuery.sap.getModulePath(oBaseUrl)
            },

            /**
             * on File Change
             */
            onFileChange: function (oEvent) {
                var file = oEvent.getParameters("files").files[0];
                this.file = file;
            },

            /**
             * On File Upload
             */
            onUploadFile: function () {
                var oUploadSet = this.byId("__fileUploader");
                //Upload image
                var reader = new FileReader();
                reader.onload = function (oEvent) {
                    // get an access to the content of the file
                    this.content = oEvent.currentTarget.result;
                    this.createfile();
                }.bind(this);
                reader.readAsDataURL(this.file);

            },

            /**
             *  Create Operation to create an entry in CAP
             */
            createfile: function () {
                var that = this;

                // Data for the new entity
                var oNewEntry = {
                    "content": this.content,
                    "mediaType": this.file.type,
                    "fileName": this.file.name
                };
            
                // Get the OData model from the component
                var oModel = this.getOwnerComponent().getModel("oCAPModel");
            
                // Get the entity set from the model
                var oEntitySet = oModel.bindList("/MediaFile");
            
                // Create a new entity in the local model
                oEntitySet.create(oNewEntry);
            
                // Submit the changes to the server
                oModel.submitBatch("myBatchGroupId").then(function() {
                    // Success handling
                    sap.m.MessageToast.show("File uploaded successfully!");
                }).catch(function(oError) {
                    // Error handling
                    sap.m.MessageToast.show("Error uploading file: " + oError.message);
                });
            },


        });
    });