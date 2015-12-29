<?php
$config = \Oda\SimpleObject\OdaConfig::getInstance();
$config->urlServer = "http://localhost/otr/server/";
$config->resourcesPath = "resources/";

$config->BD_ENGINE->prefixTable = 'otr-';
$config->BD_ENGINE->base = 'otr';
$config->BD_ENGINE->mdp = 'hunter';
$config->BD_ENGINE->host = 'localhost';
$config->BD_ENGINE->login = 'otr';