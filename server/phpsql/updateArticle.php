<?php
namespace OTR;

require '../header.php';
require '../vendor/autoload.php';
require '../config/config.php';

use \stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("id","label","price","tr");
$INTERFACE = new OTRInterface($params);

//--------------------------------------------------------------------------
// phpsql/updateArticle.php?id=1&label=Coucou&price=42.2&tr=1

//--------------------------------------------------------------------------

$params = new OdaPrepareReqSql();
$params->sql = "UPDATE `tab_ort_inventaire`
    SET `libelle` = :label, `prix` = :price, `tr` = :tr
    WHERE 1=1
    AND `id` = :id
;";
$params->bindsValue = [
    "id" => $INTERFACE->inputs["id"],
    "label" => $INTERFACE->inputs["label"],
    "price" => $INTERFACE->inputs["price"],
    "tr" => $INTERFACE->inputs["tr"]
];
$params->typeSQL = OdaLibBd::SQL_SCRIPT;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->value = $retour->nombre;
$INTERFACE->addDataStr($params);