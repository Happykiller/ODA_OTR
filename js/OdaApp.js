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
                basketConfig : {
                    valeurPanierType : 16.0,
                    valeurTicket : 8.0,
                    mag : "1",
                    magName : "Picard",
                    nbTicket : 2
                },
                worker : null,
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

                        var sql = "SELECT nbTicket, valeurTicket, nom, id_mag FROM `tab_ort_panier_cible` a, `tab_ort_mags` b WHERE 1=1 AND a.id_mag = b.id AND `code_user` = '"+$.Oda.Session.code_user+"';";
                        var tabInput = { sql : sql };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"vendor/happykiller/oda/resources/phpsql/getSQL.php", {functionRetour : function(data){
                            var retours = data.data.resultat.data;

                            if(data.data.resultat.nombre === "0"){
                                var strSQL = "REPLACE `tab_ort_panier_cible` (`code_user` ,`nbTicket` ,`valeurTicket`, `id_mag`) VALUES ('"+$.Oda.Sesssion.code_user+"', 2,  8, 0);";
                                var tabInput = { sql : sql };
                                var call = $.Oda.Interface.callRest($.Oda.Context.rest+"vendor/happykiller/oda/resources/phpsql/insertSQL.php", {functionRetour : function(data){}},tabInput);
                            }else{
                                $.Oda.App.Controler.Home.basketConfig.nbTicket = parseInt(retours[0]["nbTicket"]);
                                $.Oda.App.Controler.Home.basketConfig.valeurTicket = parseFloat(retours[0]["valeurTicket"]).toFixed(2);
                                $.Oda.App.Controler.Home.basketConfig.magName = retours[0]["nom"];
                                $.Oda.App.Controler.Home.basketConfig.mag = retours[0]["id_mag"];
                            }
                        }},tabInput);

                        $.Oda.App.Controler.Home.worker = $.Oda.Worker.initWorker("monWorker", {}, function(){

                            function messageHandler(event) {
                                try {
                                    var messageSent = event.data;

                                    switch (messageSent.cmd) {
                                        case 'start':
                                            var strhtml = "Hello World";

                                            var p_code_user = messageSent.parameter.code_user;
                                            var p_valeurPanierType = messageSent.parameter.valeurPanierType;
                                            var p_mag = messageSent.parameter.mag;

                                            var dataPool = { baskets : []};

                                            var entree = new Date;
                                            var entree = entree.getTime();

                                            var percent = Math.round(0);
                                            this.postMessage(new $Oda.message('avancement', {"value" : percent}));

                                            var tabListObj = new Array();
                                            var subTabListObj = new Array();

                                            var sql = "SELECT id, obj_label, obj_prix, obj_tr FROM `tab_ort` WHERE 1=1 AND `code_user` = '"+p_code_user+"';";
                                            var tabInput = { sql : sql };
                                            var return_json = $Oda.callRest($Oda.Context.rest+"vendor/happykiller/oda/resources/phpsql/getSQL.php", {}, tabInput);

                                            var returnSql = return_json.data.resultat.data;

                                            for (var indice in returnSql) {
                                                subTabListObj = new Array();
                                                subTabListObj[0] = "0";
                                                subTabListObj[1] = returnSql[indice]["obj_label"];
                                                subTabListObj[2] = returnSql[indice]["obj_prix"];
                                                subTabListObj[3] = returnSql[indice]["obj_tr"];
                                                tabListObj[returnSql[indice]["id"]] = subTabListObj;
                                            }

                                            var tabInput = { "code_user" : p_code_user, "id_mag" : p_mag };
                                            var return_json = $Oda.callRest($Oda.Context.rest+"phpsql/getStatPaniers.php", {}, tabInput);
                                            var statsPanier = return_json.data.resultat;

                                            var tabPaniers = new Array();

                                            var strListeId = "";
                                            var nbListeId = 0;
                                            for (var indice in tabListObj) {
                                                if(tabListObj[indice][0] == "0"){
                                                    strListeId += indice+",";
                                                    nbListeId += 1;
                                                }
                                            }
                                            strListeId = strListeId.substring(0,strListeId.length-1);

                                            var essai = 1;
                                            var nbPanier = 0;

                                            while(strListeId.length > 0){
                                                var panierRest = statsPanier.nbPanierCible - nbPanier;
                                                var old_strListeId = strListeId;

                                                var tabInput = { "listeId" : strListeId, "panierMax" : p_valeurPanierType, "essai" : essai };
                                                var return_json = $Oda.callRest($Oda.Context.rest+"phpsql/getCombi.php", {}, tabInput);
                                                var returnSql = return_json["data"]["resultat"]["data"][0];

                                                var tabContenuPanier = new Array();
                                                var nbTrRest = 0;
                                                for (var i = 1; i <= nbListeId; i++) {
                                                    var objId = returnSql["id_"+i];
                                                    var objPris = returnSql["obj"+i];
                                                    var objTr = returnSql["obj_tr"+i];
                                                    tabListObj[objId][0] = objPris;
                                                    if(objPris == "1"){
                                                        tabContenuPanier[tabContenuPanier.length] = "id:"+objId;
                                                    }else if(objTr == "1"){
                                                        nbTrRest++;
                                                    }
                                                }
                                                tabContenuPanier[tabContenuPanier.length] = "total:"+ returnSql["total"];
                                                var rab = (nbTrRest-panierRest);
                                                var oldTotal = 0;

                                                //opti essai
                                                while((rab>=1)&&((returnSql["total"] != p_valeurPanierType)&&(oldTotal < parseFloat(returnSql["total"])))){
                                                    essai++;
                                                    var tabInput = { "listeId" : strListeId, "panierMax" : p_valeurPanierType, "essai" : essai };
                                                    var return_json = $Oda.callRest($Oda.Context.rest+"phpsql/getCombi.php", {}, tabInput);
                                                    var returnSql = return_json["data"]["resultat"]["data"][0];

                                                    var tabContenuPanier = new Array();
                                                    var nbTrRest = 0;
                                                    for (var i = 1; i <= nbListeId; i++) {
                                                        var objId = returnSql["id_"+i];
                                                        var objPris = returnSql["obj"+i];
                                                        var objTr = returnSql["obj_tr"+i];
                                                        tabListObj[objId][0] = objPris;
                                                        if(objPris == "1"){
                                                            tabContenuPanier[tabContenuPanier.length] = "id:"+objId;
                                                        }else if(objTr == "1"){
                                                            nbTrRest++;
                                                        }
                                                    }
                                                    tabContenuPanier[tabContenuPanier.length] = "total:"+ returnSql["total"];
                                                    rab = (nbTrRest-panierRest);
                                                }

                                                tabPaniers[tabPaniers.length] = tabContenuPanier;

                                                var strListeId = "";
                                                var nbListeId = 0;
                                                for (var indice in tabListObj) {
                                                    if(tabListObj[indice][0] == "0"){
                                                        strListeId += indice+",";
                                                        nbListeId += 1;
                                                    }
                                                }
                                                strListeId = strListeId.substring(0,strListeId.length-1);

                                                nbPanier++;
                                                var percent = Math.round(nbPanier/statsPanier.nbPanierCible*90);
                                                this.postMessage(new $Oda.message('avancement', {"value" : percent}));

                                                if(old_strListeId == strListeId){
                                                    break;
                                                }
                                            }

                                            var strhtml = "";
                                            nbPanier = 0;

                                            if(tabPaniers.length > 0){

                                                var nblignes = (tabPaniers.length % 3) + 1;
                                                var panierCourant = 0;

                                                for (var i = 0; i < nblignes; i++) {

                                                    for (var j = 0; j < 3; j++) {

                                                        if(tabPaniers[panierCourant] != undefined){

                                                            nbPanier += 1;

                                                            strhtml += '<table class="table table-bordered table-condensed table-hover">';
                                                            strhtml += "<thead>";
                                                            strhtml += "<TR bgcolor=\"#585858\" style=\"text-shadow:none;color:white;\">";
                                                            strhtml += "<TH>Article</TH>";
                                                            strhtml += "<TH style='width: 50px;'>Prix</TH>";
                                                            strhtml += "</TR>";
                                                            strhtml += "</thead>";
                                                            strhtml += "<tbody>";
                                                            for (var indice in tabPaniers[panierCourant]) {
                                                                var id = tabPaniers[panierCourant][indice].split(":");
                                                                strhtml += "<TR>";
                                                                if(id[0] == "id"){
                                                                    strhtml += "<TD>"+tabListObj[id[1]][1]+((tabListObj[id[1]][3]=="1")?"*":"")+"</TD>";
                                                                    strhtml += "<TD>"+tabListObj[id[1]][2]+"&euro;</TD>";
                                                                }else{
                                                                    strhtml += "<TD><b>Total</b> ("+(p_valeurPanierType - parseFloat(id[1])).toFixed(2)+"&euro;)</TD>";
                                                                    strhtml += "<TD><b>"+id[1]+"&euro;</b></TD>";
                                                                }
                                                                strhtml += "</TR>";
                                                            }
                                                            strhtml += "</tbody>";
                                                            strhtml += "</table>";
                                                        }
                                                        panierCourant += 1;
                                                    }
                                                }
                                            }

                                            var nb_article_restant = 0;
                                            for (var indice in tabListObj) {
                                                if(tabListObj[indice][0] == "0"){
                                                    nb_article_restant += 1;
                                                }
                                            }

                                            if(nb_article_restant > 0){

                                                nbPanier += 1;

                                                strhtml += "Articles qui ne peuvent être mis dans des panniers payables par Ticket Restaurant : <br>";

                                                strhtml += '<table class="table table-bordered table-condensed table-hover">';
                                                strhtml += "<thead>";
                                                strhtml += "<TR bgcolor=\"#585858\" style=\"text-shadow:none;color:white;\">";
                                                strhtml += "<TH>Article</TH>";
                                                strhtml += "<TH style='width: 50px;'>Prix</TH>";
                                                strhtml += "</TR>";
                                                strhtml += "</thead>";
                                                strhtml += "<tbody>";
                                                for (var indice in tabListObj) {
                                                    if(tabListObj[indice][0] == "0"){
                                                        strhtml += "<TR>";
                                                        strhtml += "<TD>"+tabListObj[indice][1]+"</TD>";
                                                        strhtml += "<TD>"+tabListObj[indice][2]+"&euro;</TD>";
                                                        strhtml += "</TR>";
                                                    }
                                                }
                                                strhtml += "</tbody>";
                                                strhtml += "</table>";
                                            }

                                            var sql = "SELECT id, libelle, prix FROM `tab_ort_inventaire` WHERE 1=1 AND TR = 1 AND id_mag = "+p_mag+" ORDER BY prix asc LIMIT 0 , 5";
                                            var tabInput = { sql : sql };
                                            var return_json = $Oda.callRest($Oda.Context.rest+"vendor/happykiller/oda/resources/phpsql/getSQL.php", {}, tabInput);
                                            var returnSql = return_json["data"]["resultat"]["data"];

                                            nbPanier += 1;

                                            strhtml += "Sudgestion d'article pour vos paniers : <br>";
                                            strhtml += '<table class="table table-bordered table-condensed table-hover">';
                                            strhtml += "<thead>";
                                            strhtml += "<TR bgcolor=\"#585858\" style=\"text-shadow:none;color:white;\">";
                                            strhtml += "<TH>Article</TH>";
                                            strhtml += "<TH style='width: 50px;'>Prix</TH>";
                                            strhtml += "<TH style='width: 50px;'>Actions</TH>";
                                            strhtml += "</thead>";
                                            strhtml += "<tbody>";
                                            for (var indice in returnSql) {
                                                strhtml += "<TR>";
                                                strhtml += "<TD>"+returnSql[indice]["libelle"]+"</TD>";
                                                strhtml += "<TD>"+returnSql[indice]["prix"]+"&euro;</TD>";

                                                strhtml += '<TD style="text-align: center;"><button onclick="$.Oda.App.Controler.Home.add('+returnSql[indice]["id"]+');" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button></TD>';

                                                strhtml += "</TR>";
                                            }
                                            strhtml += "</tbody>";
                                            strhtml += "</table>";

                                            var fin = new Date;
                                            var fin = fin.getTime();
                                            var secondes = Math.round((fin-entree)/1000);
                                            var hhmmss = convertSecondsToTime(secondes);
                                            this.postMessage(new $Oda.message('stats',{"stats" : hhmmss}));

                                            this.postMessage(new $Oda.message('resultats',{"html" : strhtml}));
                                            break;
                                    }
                                }catch (er) {
                                    this.postMessage("Erreur : " + er.message);
                                }
                            }

                            /**
                             * @name convertSecondsToTime
                             * @desc Seconds to hh:mm:ss
                             * @param {int} p_second
                             * @returns {String}
                             */
                            function convertSecondsToTime(p_second) {
                                try {
                                    var sec_num = p_second;
                                    var hours   = Math.floor(sec_num / 3600);
                                    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
                                    var seconds = sec_num - (hours * 3600) - (minutes * 60);

                                    if (hours   < 10) {hours   = "0"+hours;}
                                    if (minutes < 10) {minutes = "0"+minutes;}
                                    if (seconds < 10) {seconds = "0"+seconds;}
                                    var time    = hours+':'+minutes+':'+seconds;
                                    return time;
                                } catch (er) {
                                    this.postMessage("Erreur : " + er.message);
                                }
                            }

                            this.addEventListener('message', messageHandler, false);
                        },function(msg){
                            switch (msg.cmd) {
                                case 'stats' :
                                    $('#stats').html("Dur&eacute;e du traitement en "+msg.parameter.stats+".");
                                    break;
                                case 'avancement' :
                                    $('#progressBar')
                                        .css('width', msg.parameter.value+'%')
                                        .attr('aria-valuenow', msg.parameter.value)
                                        .text(msg.parameter.value+"%");
                                    break;
                                case 'resultats' :
                                    $('#div_displayBasket').html(msg.parameter.html);
                                    break;
                            }
                        });

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
                        var footer = '<button oda-submit="submit" class="btn btn-info disabled" disabled onclick="$.Oda.App.Controler.Home.add();" oda-label="oda-main.bt-submit">oda-main.bt-submit</button>';

                        var details = $.Oda.Display.TemplateHtml.create({
                            template : "edit-addItem"
                        });

                        $.Oda.Display.Popup.open({"label" : $.Oda.I8n.get('home', 'addItem'), "details" : details, "footer" : footer});

                        $.Oda.Scope.refresh = function(){
                            if(($("#name").data("isOk")) && ($("#nb").data("isOk")) && ($("#price").data("isOk"))){
                                $("#submit").removeClass("disabled");
                                $("#submit").removeAttr("disabled");
                            }else {
                                $("#submit").addClass("disabled");
                                $("#submit").attr("disabled", true);
                            }
                        };

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.Home.addItem : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Integer} id
                 * @returns {$.Oda.App.Controler.Home.add}
                 */
                add : function (p_id) {
                    try {
                        var name = "";
                        var nb = 1;
                        var price = 0;
                        var tr = 0;
                        if($.Oda.Tooling.isUndefined(p_id)){
                            name = $("#name").val();
                            nb = parseInt($("#nb").val());
                            price = parseFloat($("#price").val()).toFixed(2);
                            tr = ($("#tr").prop('checked'))?1:0
                        }else{
                            var sql = "SELECT id, libelle, prix, tr FROM `tab_ort_inventaire` WHERE 1=1 AND `id` = '"+p_id+"';";
                            var tabInput = { sql : sql };
                            var returnSql = $.Oda.Interface.callRest($.Oda.Context.rest+"vendor/happykiller/oda/resources/phpsql/getSQL.php", {}, tabInput);
                            var article = returnSql.data.resultat.data[0];

                            name = article.libelle;
                            nb = 1;
                            price = parseFloat(article.prix).toFixed(2);
                            tr = parseInt(article.tr);
                        }

                        var sql = "INSERT INTO `tab_ort` (`code_user` ,`date_saisie` ,`obj_code` ,`obj_label` ,`obj_prix`, `obj_tr`) VALUES ";
                        for(var i = 0; i < nb; i++) {
                            var sep = (i !== 0)?",":"";
                            sql += sep + " ('" + $.Oda.Session.code_user + "', CURRENT_TIMESTAMP , '', '" + name + "', '" + price + "', '" + tr + "')";
                        }
                        var tabInput = { sql : sql };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"vendor/happykiller/oda/resources/phpsql/insertSQL.php", {functionRetour : function(data){
                            $.Oda.Display.Popup.close();
                            $.Oda.App.Controler.Home.start();
                        }}, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.Home.add : " + er.message);
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
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.Home.config}
                 */
                config : function (p_params) {
                    try {
                        var footer = '<button oda-submit="submit" class="btn btn-info disabled" disabled onclick="$.Oda.App.Controler.Home.saveConfig();" oda-label="oda-main.bt-submit">oda-main.bt-submit</button>';

                        var strShops = '<option value="1" selected>1</option><option value="2">2</option>';

                        var details = $.Oda.Display.TemplateHtml.create({
                            template : "edit-configure",
                            scope : {
                                nb : $.Oda.App.Controler.Home.basketConfig.nbTicket,
                                value : $.Oda.App.Controler.Home.basketConfig.valeurTicket,
                                shop : $.Oda.App.Controler.Home.basketConfig.mag
                            }
                        });

                        $.Oda.Display.Popup.open({"label" : $.Oda.I8n.get('home', 'config'), "details" : details, "footer" : footer});

                        $.Oda.Scope.refresh = function(){
                            if(($("#nb").data("isOk")) && ($("#value").data("isOk")) && ($("#shop").data("isOk"))){
                                $("#submit").removeClass("disabled");
                                $("#submit").removeAttr("disabled");
                            }else{
                                $("#submit").addClass("disabled");
                                $("#submit").attr("disabled", true);
                            }
                        };

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.Home.config : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.Home.saveConfig}
                 */
                saveConfig : function (p_params) {
                    try {
                        var nb = parseInt($("#nb").val());
                        var value = parseFloat($("#value").val()).toFixed(2);
                        var shop = $("#shop").val();

                        var sql = "REPLACE `tab_ort_panier_cible` (`code_user`, `nbTicket`, `valeurTicket`, `id_mag`) VALUES ('"+$.Oda.Session.code_user+"', '"+nb+"', '"+value+"', '"+shop+"');";
                        var tabInput = { sql : sql };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"vendor/happykiller/oda/resources/phpsql/insertSQL.php", {functionRetour : function(data){
                            $.Oda.Display.Popup.close();
                            $.Oda.App.Controler.Home.basketConfig.nbTicket = nb;
                            $.Oda.App.Controler.Home.basketConfig.valeurTicket = value;
                            $.Oda.App.Controler.Home.basketConfig.valeurPanierType = value * nb;
                            $.Oda.App.Controler.Home.basketConfig.mag = shop;
                        }}, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.Home.saveConfig : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.Home.calculate}
                 */
                calculate : function (p_params) {
                    try {
                        var footer = '<button oda-submit="submit" class="btn btn-info disabled" disabled onclick="$.Oda.App.Controler.Home.saveConfig();" oda-label="oda-main.bt-submit">oda-main.bt-submit</button>';

                        var strShops = '<option value="1" selected>1</option><option value="2">2</option>';

                        var details = $.Oda.Display.TemplateHtml.create({
                            template : "view-calculate",
                            scope : {
                            }
                        });

                        $.Oda.Display.Popup.open({"label" : $.Oda.I8n.get('home', 'calculate'), "details" : details});

                        var json_param = {"code_user" : $.Oda.Session.code_user, "valeurPanierType" : $.Oda.App.Controler.Home.basketConfig.valeurPanierType, "mag" : $.Oda.App.Controler.Home.basketConfig.mag};
                        $.Oda.App.Controler.Home.worker.postMessage(new $.Oda.Worker.message('start', json_param));

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.Home.calculate : " + er.message);
                        return null;
                    }
                },
            }
        }

    };

    // Initialize
    _init();

})();
