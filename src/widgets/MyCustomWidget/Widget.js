define([
    'dijit/_WidgetsInTemplateMixin',

    'dojo/_base/declare',
    'dojo/_base/lang',

    'jimu/BaseWidget'
], function (
    _WidgetsInTemplateMixin,
    declare,
    lang,
    BaseWidget
) {

    // Define your template widget code here
    var MyCustomWidgetObject = {
        baseClass: 'jimu-widget-MyCustomWidget',
        widgetName: "MyCustomWidget",
        postCreate: function () {
            this.inherited(arguments);
        },
        onOpen: function () {

        },
        onClose: function () {

        }
    };

    //To create a widget, you need to derive from BaseWidget.
    var MyCustomWidgetClass = declare([BaseWidget, _WidgetsInTemplateMixin], MyCustomWidgetObject);
    return MyCustomWidgetClass;
});
