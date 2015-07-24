<?php
namespace OTR;

require '../header.php';
require '../vendor/autoload.php';
require '../include/config.php';

use stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("listeId","panierMax","essai");
$INTERFACE = new OTRInterface($params);

//--------------------------------------------------------------------------
// phpsql/getCombi.php?tag=1&listeId=299,301,305&panierMax=16&essai=1

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "select SUM(obj_prix) <= ".$INTERFACE->inputs["panierMax"]." as result, SUM(obj_prix) as somme
    from `tab_ort` a
    where 1=1 
    and a.`id` in (".$INTERFACE->inputs["listeId"].") 
;";
$params->typeSQL = OdaLibBd::SQL_GET_ONE;
$retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

//--------------------------------------------------------------------------
$result = $retour->data->result;
$somme = $retour->data->somme;

$listeId = explode(",", $INTERFACE->inputs["listeId"]);

$SizeListeId = count($listeId);

$resultats = new \Oda\OdaRetourReqSql();

if($result == "0"){

    $strSql = "SELECT 
    ";

    for ($i = 1; $i <= $SizeListeId; $i++) {
        $strSql .= "d.id_".$i." , d.obj".$i.", d.obj_tr".$i.",
        ";
    }

    $strSql .= "d.total
    FROM (
        SELECT *
        FROM (
            SELECT
    ";

    for ($i = 1; $i <= $SizeListeId; $i++) {
        $strSql .= "a".$i.".id as id_".$i." , b.obj".$i.", a".$i.".`obj_tr` as 'obj_tr".$i."',
        ";
    }

    $strSql .= "(
    ";

    for ($i = 1; $i <= $SizeListeId; $i++) {
        $strSql .= "(a".$i.".obj_prix * b.obj".$i.") +
        ";
    }

    $strSql .= "0) total,";

    $strSql .= "(
    ";

    for ($i = 1; $i <= $SizeListeId; $i++) {
        $strSql .= "(a".$i.".obj_tr * b.obj".$i.") +
        ";
    }

    $strSql .= "0) nb_obj_tr

    FROM
    ";

    for ($i = 1; $i <= $SizeListeId; $i++) {
        $strSql .= "`tab_ort` a".$i.", 
        ";
    }

    $strSql .= "`tab_ort_combi_".$SizeListeId."` b
    WHERE 1=1
    ";

    for ($i = 1; $i <= $SizeListeId; $i++) {
        $strSql .= "AND a".$i.".id = ".$listeId[$i-1]."
        ";
    }

    $strSql .= ") c
        WHERE 1=1
        AND c.nb_obj_tr = ".$INTERFACE->inputs["essai"]."
        AND c.total <= ".$INTERFACE->inputs["panierMax"]."
        ORDER BY c.total desc
        LIMIT 0, 1
    ) d
    ;";
    $params = new OdaPrepareReqSql();
    $params->sql = $strSql;
    $params->typeSQL = OdaLibBd::SQL_GET_ALL;
    $resultats = $INTERFACE->BD_ENGINE->reqODASQL($params)->data;
    
    if($resultats->nombre == 0){
        $array = array();
        $subArray = array();
        for ($i = 1; $i <= $SizeListeId; $i++) {
            $subArray["id_".($i)] = $listeId[$i-1];
            $subArray["obj".($i)] = 0;
        }
        $subArray["total"] = 0;
        $array[0] = $subArray;
        $resultats->nombre = 1;
        $resultats->data = $array;
    }
}else{
    $array = array();
    $subArray = array();
    for ($i = 1; $i <= $SizeListeId; $i++) {
        $subArray["id_".($i)] = $listeId[$i-1];
        $subArray["obj".($i)] = 1;
    }
    $subArray["total"] = $somme;
    $array[0] = $subArray;
    $resultats->nombre = 1;
    $resultats->data = $array;
}

$params = new stdClass();
$params->label = "resultat";
$params->value = $resultats;
$INTERFACE->addDataObject($params);