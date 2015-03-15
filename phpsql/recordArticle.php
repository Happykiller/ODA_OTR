<?php
namespace OTR;
use stdClass, \Oda\OdaPrepareInterface, \Oda\OdaPrepareReqSql, \Oda\OdaLibBd;
//--------------------------------------------------------------------------
//Header
require("../API/php/header.php");
require("../php/OTRInterface.php");

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("id_mag","libelle","prix","tr");
$INTERFACE = new OTRInterface($params);

//--------------------------------------------------------------------------
// phpsql/recordArticle.php?milis=123450&id_mag=1&libelle=article&prix=14.90&tr=1

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "REPLACE INTO `tab_ort_inventaire` (`id_mag`, `libelle`, `prix`, `tr`) VALUES (:id_mag,:libelle,:prix,:tr)
;";
$params->bindsValue = [
    "id_mag" => $INTERFACE->inputs["id_mag"]
    , "libelle" => $INTERFACE->inputs["libelle"]
    , "prix" => $INTERFACE->inputs["prix"]
    , "tr" => $INTERFACE->inputs["tr"]
];
$params->typeSQL = OdaLibBd::SQL_SCRIPT;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->value = $retour->nombre;
$INTERFACE->addDataStr($params);