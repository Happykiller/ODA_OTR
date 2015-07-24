/* global er */
//# sourceURL=OdaApp.js
// Library of tools for the exemple
/**
 * @author FRO
 * @date 15/05/08
 */

(function() {
    'use strict';

    var
        /* version */
        VERSION = '0.1'
    ;
    
    ////////////////////////// PRIVATE METHODS ////////////////////////
    /**
     * @name _init
     * @desc Initialize
     */
    function _init() {
        $.Oda.Event.addListener({name : "oda-fully-loaded", callback : function(e){
            $.Oda.App.startApp();
        }});
    }

    ////////////////////////// PUBLIC METHODS /////////////////////////
    $.Oda.App = {
        /* Version number */
        version: VERSION,
        
        /**
         * @param {Object} p_params
         * @param p_params.attr
         * @returns {$.Oda.App}
         */
        startApp: function (p_params) {
            try {
                $.Oda.Router.addRoute("home", {
                    "path" : "partials/home.html",
                    "title" : "oda-main.home-title",
                    "urls" : ["","home"],
                    "dependencies" : ["dataTables"],
                    "middleWares":["support","auth"]
                });

                $.Oda.Router.startRooter();

                return this;
            } catch (er) {
                $.Oda.Log.error("$.Oda.App.startApp : " + er.message);
                return null;
            }
        },

        Controler : {
            Home : {
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.Home.start}
                 */
                start : function (p_params) {
                    try {
                        var sql = "SELECT id, obj_label, obj_prix, obj_tr FROM `tab_ort` WHERE 1=1 AND `code_user` = '"+$.Oda.Session.code_user+"';";
                        var tabInput = { sql : sql };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"vendor/happykiller/oda/resources/phpsql/getSQL.php", {functionRetour : function(data){
                            //TODO disable add if max
                            var objDataTable = $.Oda.Tooling.objDataTableFromJsonArray(data.data.resultat.data);

                            var strhtml = '<table cellpadding="0" cellspacing="0" border="0" class="display hover" id="tableRecords"></table>';
                            $('#listItem').html(strhtml);

                            var oTable = $('#tableRecords').dataTable( {
                                "language": {
                                    "lengthMenu": $.Oda.I8n.get("oda-datatables","lengthMenu"),
                                    "search": $.Oda.I8n.get("oda-datatables","search"),
                                    "info": $.Oda.I8n.get("oda-datatables","info"),
                                    "paginate": {
                                        "first" : $.Oda.I8n.get("oda-datatables","first"),
                                        "last" : $.Oda.I8n.get("oda-datatables","last"),
                                        "next" : $.Oda.I8n.get("oda-datatables","next"),
                                        "previous" : $.Oda.I8n.get("oda-datatables","previous")
                                    }
                                },
                                "aaData": objDataTable.data,
                                "aoColumns": [
                                    { sTitle: $.Oda.I8n.get("home","article")  },
                                    { sTitle: $.Oda.I8n.get("home","price"), sClass: "dataTableColCenter"  },
                                    { sTitle: $.Oda.I8n.get("home","actions"), sClass: "dataTableColCenter"  }
                                ],
                                aoColumnDefs: [
                                    {
                                        mRender: function ( data, type, row ) {
                                            var tr = (row[objDataTable.entete["obj_tr"]] === "1")?"*":"";
                                            var strHtml = row[objDataTable.entete["obj_label"]]+tr;
                                            return strHtml;
                                        },
                                        aTargets: [ 0 ]
                                    },
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = row[objDataTable.entete["obj_prix"]]+"&euro;";
                                            return strHtml;
                                        },
                                        aTargets: [ 1 ]
                                    },
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = '<button onclick="$.Oda.App.Controler.Home.remove({id:' + row[objDataTable.entete["id"]] + '})" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>';
                                            //TODO
                                            strHtml += '&nbsp;<button onclick="$.Oda.App.Controler.Home.edit({id:' + row[objDataTable.entete["id"]] + '})" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>';
                                            return strHtml;
                                        },
                                        aTargets: [ 2 ]
                                    }
                                ],
                                "fnDrawCallback": function( oSettings ) {
                                    $('#tableRecords')
                                        .removeClass( 'display' )
                                        .addClass('table table-striped table-bordered');
                                }
                            });
                        }}, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.Home.start : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.Home.remove}
                 */
                remove : function (p_params) {
                    try {
                        var strSQL = "DELETE FROM `tab_ort` WHERE 1=1 AND `code_user` = '"+$.Oda.Session.code_user+"' AND id="+p_params.id+";";
                        var tabInput = { sql : strSQL };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"vendor/happykiller/oda/resources/phpsql/deleteSQL.php", {functionRetour : function(data){
                            $.Oda.App.Controler.Home.start();
                        }}, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.Home.remove : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.Home.addItem}
                 */
                addItem : function (p_params) {
                    try {
                        //TODO check $.Oda.App.Controler.Home.nb + nb < max
                        var footer = '<button oda-submit="submit" class="btn btn-info disabled" onclick="$.Oda.App.Controler.Home.add();" oda-label="oda-main.bt-submit">oda-main.bt-submit</button>';

                        var details = $.Oda.Display.TemplateHtml.create({
                            template : "edit-addItem"
                        });

                        $.Oda.Display.Popup.open({"label" : $.Oda.I8n.get('home', 'addItem'), "details" : details, "footer" : footer});

                        $.Oda.Scope.refresh = function(){
                            if(($("#name").data("isOk")) && ($("#nb").data("isOk")) && ($("#price").data("isOk"))){
                                $("#submit").removeClass("disabled");
                            }else{
                                $("#submit").addClass("disabled");
                            }
                        };

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.Home.addItem : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.Home.add}
                 */
                add : function (p_params) {
                    try {
                        var name = $("#name").val();
                        var nb = parseInt($("#nb").val());
                        var price = $("#price").val();
                        var tr = $("#tr").val();

                        var sql = "INSERT INTO `tab_ort` (`id` ,`code_user` ,`date_saisie` ,`obj_code` ,`obj_label` ,`obj_prix`, `obj_tr`) VALUES ";
                        for(var i = 0; i < nb; i++) {
                            var sep = (i !== 0)?",":"";
                            sql += sep + " (NULL , '" + $.Oda.Session.code_user + "', CURRENT_TIMESTAMP , '', '" + name + "', '" + price + "', '" + tr + "')";
                        }
                        var tabInput = { sql : sql };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"vendor/happykiller/oda/resources/phpsql/insertSQL.php", {functionRetour : function(data){
                            $.Oda.Display.Popup.close();
                            $.Oda.App.Controler.Home.start();
                        }}, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.add : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.Home.clean}
                 */
                clean : function (p_params) {
                    try {
                        var strSQL = "DELETE FROM `tab_ort` WHERE 1=1 AND `code_user` = '"+$.Oda.Session.code_user+"';";
                        var tabInput = { sql : strSQL };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"vendor/happykiller/oda/resources/phpsql/deleteSQL.php", {functionRetour : function(data){
                            $.Oda.App.Controler.Home.start();
                        }}, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.Home.clean : " + er.message);
                        return null;
                    }
                },
            }
        }

    };

    // Initialize
    _init();

})();
