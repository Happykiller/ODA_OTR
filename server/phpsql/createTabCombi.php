<?php
namespace OTR;

require '../header.php';
require '../vendor/autoload.php';
require '../config/config.php';

use stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("nombre");
$INTERFACE = new OTRInterface($params);

//--------------------------------------------------------------------------
// phpsql/createTabCombi.php?nombre=9

//--------------------------------------------------------------------------
$nombre = $INTERFACE->inputs["nombre"];

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "DROP TABLE `tab_ort_combi_".$nombre."`;";
$params->typeSQL = OdaLibBd::SQL_SCRIPT;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

//--------------------------------------------------------------------------
$strSql = "CREATE TABLE IF NOT EXISTS `tab_ort_combi_".$nombre."` (
  `id` int(11) NOT NULL AUTO_INCREMENT,";
for ($i = 1; $i <= $nombre; $i++) {
    $strSql .= "`obj".$i."` int(1) NOT NULL,";
}
$strSql .= "  PRIMARY KEY (`id`)
);";
$params = new OdaPrepareReqSql();
$params->sql = $strSql;
$params->typeSQL = OdaLibBd::SQL_SCRIPT;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);	

//--------------------------------------------------------------------------
$monDec = bindec(str_pad("", $nombre , "1"));

for ($i = 1; $i <= $monDec; $i++) {
    $strSql = "INSERT INTO `tab_ort_combi_".$nombre."` VALUES (NULL";
    $strBin = str_pad(strrev(decbin($i)), $nombre , "0");
    for ($j = 0; $j < strlen($strBin); $j++) {
        $strSql .= ",  '".$strBin[$j]."'";
    }
    $strSql .= ");";
    $params = new OdaPrepareReqSql();
    $params->sql = $strSql;
    $params->typeSQL = OdaLibBd::SQL_SCRIPT;
    $retour = $INTERFACE->BD_ENGINE->reqODASQL($params);	
}