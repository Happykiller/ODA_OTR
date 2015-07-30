<?php
namespace OTR;

require '../header.php';
require '../vendor/autoload.php';
require '../include/config.php';

use stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("id_mag");
$INTERFACE = new OTRInterface($params);

//--------------------------------------------------------------------------
// phpsql/getArticleAutoCompl.php?milis=123450&id_mag=1

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT a.`id`,a.`id_mag`, a.`libelle`, a.`prix`, a.`tr`
    FROM `tab_ort_inventaire` a
    WHERE 1=1
    AND a.`id_mag` = :id_mag
    ORDER BY `libelle` DESC
    LIMIT 0 , 30
;";
$params->bindsValue = [
    "id_mag" => $INTERFACE->inputs["id_mag"]
];
$params->typeSQL = OdaLibBd::SQL_GET_ALL;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

//--------------------------------------------------------------------------
$params = new stdClass();
$params->label = "resultat";
$params->retourSql = $retour;
$INTERFACE->addDataReqSQL($params);