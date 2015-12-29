<?php
namespace OTR;

require '../header.php';
require '../vendor/autoload.php';
require '../config/config.php';

use stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("code_user","id_mag");
$INTERFACE = new OTRInterface($params);

//--------------------------------------------------------------------------
// phpsql/getStatPaniers.php?code_user=FRO&id_mag=1

//--------------------------------------------------------------------------
$retourObj = new stdClass();

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT SUM(a.`obj_prix`) as 'somme'
    FROM `tab_ort` a
    WHERE 1=1
    AND a.`code_user` = :code_user
;";
$params->bindsValue = [
    "code_user" => $INTERFACE->inputs["code_user"]
];
$params->typeSQL = OdaLibBd::SQL_GET_ONE;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);
$retourObj->somme = $retour->data->somme;

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT SUM(a.`obj_tr`) as 'nbTr'
    FROM `tab_ort` a
    WHERE 1=1
    AND a.`code_user` = :code_user
;";
$params->bindsValue = [
    "code_user" => $INTERFACE->inputs["code_user"]
];
$params->typeSQL = OdaLibBd::SQL_GET_ONE;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);
$retourObj->nbTr = $retour->data->nbTr;

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT (a.`nbTicket` * a.`valeurTicket`) as 'panier'
    FROM `tab_ort_panier_cible` a
    WHERE 1=1
    AND a.`code_user` = :code_user
    AND a.`id_mag` = :id_mag
;";
$params->bindsValue = [
    "code_user" => $INTERFACE->inputs["code_user"]
    ,"id_mag" => $INTERFACE->inputs["id_mag"]
];
$params->typeSQL = OdaLibBd::SQL_GET_ONE;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);
$retourObj->panier = $retour->data->panier;

//--------------------------------------------------------------------------
$retourObj->nbPanierCible =  ceil($retourObj->somme / $retourObj->panier);

//--------------------------------------------------------------------------
$retourObj->nbTrByPanier =  ceil($retourObj->nbTr / $retourObj->nbPanierCible);

//--------------------------------------------------------------------------
$params = new stdClass();
$params->label = "resultat";
$params->value = $retourObj;
$INTERFACE->addDataObject($params);