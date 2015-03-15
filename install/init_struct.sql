-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Client: 127.0.0.1
-- Généré le : Ven 05 Avril 2013 à 13:03
-- Version du serveur: 5.5.16
-- Version de PHP: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données: `otr`
--

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort`
--

CREATE TABLE IF NOT EXISTS `tab_ort` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code_user` varchar(10) NOT NULL,
  `date_saisie` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `obj_code` int(11) NOT NULL,
  `obj_label` varchar(250) NOT NULL,
  `obj_prix` decimal(10,2) NOT NULL,
  `obj_tr` tinyint(2) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_1`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_2`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  `obj2` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_3`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_3` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  `obj2` int(1) NOT NULL,
  `obj3` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_4`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_4` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  `obj2` int(1) NOT NULL,
  `obj3` int(1) NOT NULL,
  `obj4` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_5`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_5` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  `obj2` int(1) NOT NULL,
  `obj3` int(1) NOT NULL,
  `obj4` int(1) NOT NULL,
  `obj5` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_6`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_6` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  `obj2` int(1) NOT NULL,
  `obj3` int(1) NOT NULL,
  `obj4` int(1) NOT NULL,
  `obj5` int(1) NOT NULL,
  `obj6` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_7`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_7` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  `obj2` int(1) NOT NULL,
  `obj3` int(1) NOT NULL,
  `obj4` int(1) NOT NULL,
  `obj5` int(1) NOT NULL,
  `obj6` int(1) NOT NULL,
  `obj7` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_8`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_8` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  `obj2` int(1) NOT NULL,
  `obj3` int(1) NOT NULL,
  `obj4` int(1) NOT NULL,
  `obj5` int(1) NOT NULL,
  `obj6` int(1) NOT NULL,
  `obj7` int(1) NOT NULL,
  `obj8` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_9`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_9` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  `obj2` int(1) NOT NULL,
  `obj3` int(1) NOT NULL,
  `obj4` int(1) NOT NULL,
  `obj5` int(1) NOT NULL,
  `obj6` int(1) NOT NULL,
  `obj7` int(1) NOT NULL,
  `obj8` int(1) NOT NULL,
  `obj9` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_10`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_10` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  `obj2` int(1) NOT NULL,
  `obj3` int(1) NOT NULL,
  `obj4` int(1) NOT NULL,
  `obj5` int(1) NOT NULL,
  `obj6` int(1) NOT NULL,
  `obj7` int(1) NOT NULL,
  `obj8` int(1) NOT NULL,
  `obj9` int(1) NOT NULL,
  `obj10` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_11`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_11` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  `obj2` int(1) NOT NULL,
  `obj3` int(1) NOT NULL,
  `obj4` int(1) NOT NULL,
  `obj5` int(1) NOT NULL,
  `obj6` int(1) NOT NULL,
  `obj7` int(1) NOT NULL,
  `obj8` int(1) NOT NULL,
  `obj9` int(1) NOT NULL,
  `obj10` int(1) NOT NULL,
  `obj11` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_12`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_12` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  `obj2` int(1) NOT NULL,
  `obj3` int(1) NOT NULL,
  `obj4` int(1) NOT NULL,
  `obj5` int(1) NOT NULL,
  `obj6` int(1) NOT NULL,
  `obj7` int(1) NOT NULL,
  `obj8` int(1) NOT NULL,
  `obj9` int(1) NOT NULL,
  `obj10` int(1) NOT NULL,
  `obj11` int(1) NOT NULL,
  `obj12` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_13`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_13` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  `obj2` int(1) NOT NULL,
  `obj3` int(1) NOT NULL,
  `obj4` int(1) NOT NULL,
  `obj5` int(1) NOT NULL,
  `obj6` int(1) NOT NULL,
  `obj7` int(1) NOT NULL,
  `obj8` int(1) NOT NULL,
  `obj9` int(1) NOT NULL,
  `obj10` int(1) NOT NULL,
  `obj11` int(1) NOT NULL,
  `obj12` int(1) NOT NULL,
  `obj13` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_14`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_14` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  `obj2` int(1) NOT NULL,
  `obj3` int(1) NOT NULL,
  `obj4` int(1) NOT NULL,
  `obj5` int(1) NOT NULL,
  `obj6` int(1) NOT NULL,
  `obj7` int(1) NOT NULL,
  `obj8` int(1) NOT NULL,
  `obj9` int(1) NOT NULL,
  `obj10` int(1) NOT NULL,
  `obj11` int(1) NOT NULL,
  `obj12` int(1) NOT NULL,
  `obj13` int(1) NOT NULL,
  `obj14` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_15`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_15` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  `obj2` int(1) NOT NULL,
  `obj3` int(1) NOT NULL,
  `obj4` int(1) NOT NULL,
  `obj5` int(1) NOT NULL,
  `obj6` int(1) NOT NULL,
  `obj7` int(1) NOT NULL,
  `obj8` int(1) NOT NULL,
  `obj9` int(1) NOT NULL,
  `obj10` int(1) NOT NULL,
  `obj11` int(1) NOT NULL,
  `obj12` int(1) NOT NULL,
  `obj13` int(1) NOT NULL,
  `obj14` int(1) NOT NULL,
  `obj15` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_16`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_16` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  `obj2` int(1) NOT NULL,
  `obj3` int(1) NOT NULL,
  `obj4` int(1) NOT NULL,
  `obj5` int(1) NOT NULL,
  `obj6` int(1) NOT NULL,
  `obj7` int(1) NOT NULL,
  `obj8` int(1) NOT NULL,
  `obj9` int(1) NOT NULL,
  `obj10` int(1) NOT NULL,
  `obj11` int(1) NOT NULL,
  `obj12` int(1) NOT NULL,
  `obj13` int(1) NOT NULL,
  `obj14` int(1) NOT NULL,
  `obj15` int(1) NOT NULL,
  `obj16` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_17`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_17` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  `obj2` int(1) NOT NULL,
  `obj3` int(1) NOT NULL,
  `obj4` int(1) NOT NULL,
  `obj5` int(1) NOT NULL,
  `obj6` int(1) NOT NULL,
  `obj7` int(1) NOT NULL,
  `obj8` int(1) NOT NULL,
  `obj9` int(1) NOT NULL,
  `obj10` int(1) NOT NULL,
  `obj11` int(1) NOT NULL,
  `obj12` int(1) NOT NULL,
  `obj13` int(1) NOT NULL,
  `obj14` int(1) NOT NULL,
  `obj15` int(1) NOT NULL,
  `obj16` int(1) NOT NULL,
  `obj17` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_18`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_18` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  `obj2` int(1) NOT NULL,
  `obj3` int(1) NOT NULL,
  `obj4` int(1) NOT NULL,
  `obj5` int(1) NOT NULL,
  `obj6` int(1) NOT NULL,
  `obj7` int(1) NOT NULL,
  `obj8` int(1) NOT NULL,
  `obj9` int(1) NOT NULL,
  `obj10` int(1) NOT NULL,
  `obj11` int(1) NOT NULL,
  `obj12` int(1) NOT NULL,
  `obj13` int(1) NOT NULL,
  `obj14` int(1) NOT NULL,
  `obj15` int(1) NOT NULL,
  `obj16` int(1) NOT NULL,
  `obj17` int(1) NOT NULL,
  `obj18` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_19`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_19` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  `obj2` int(1) NOT NULL,
  `obj3` int(1) NOT NULL,
  `obj4` int(1) NOT NULL,
  `obj5` int(1) NOT NULL,
  `obj6` int(1) NOT NULL,
  `obj7` int(1) NOT NULL,
  `obj8` int(1) NOT NULL,
  `obj9` int(1) NOT NULL,
  `obj10` int(1) NOT NULL,
  `obj11` int(1) NOT NULL,
  `obj12` int(1) NOT NULL,
  `obj13` int(1) NOT NULL,
  `obj14` int(1) NOT NULL,
  `obj15` int(1) NOT NULL,
  `obj16` int(1) NOT NULL,
  `obj17` int(1) NOT NULL,
  `obj18` int(1) NOT NULL,
  `obj19` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_combi_20`
--

CREATE TABLE IF NOT EXISTS `tab_ort_combi_20` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `obj1` int(1) NOT NULL,
  `obj2` int(1) NOT NULL,
  `obj3` int(1) NOT NULL,
  `obj4` int(1) NOT NULL,
  `obj5` int(1) NOT NULL,
  `obj6` int(1) NOT NULL,
  `obj7` int(1) NOT NULL,
  `obj8` int(1) NOT NULL,
  `obj9` int(1) NOT NULL,
  `obj10` int(1) NOT NULL,
  `obj11` int(1) NOT NULL,
  `obj12` int(1) NOT NULL,
  `obj13` int(1) NOT NULL,
  `obj14` int(1) NOT NULL,
  `obj15` int(1) NOT NULL,
  `obj16` int(1) NOT NULL,
  `obj17` int(1) NOT NULL,
  `obj18` int(1) NOT NULL,
  `obj19` int(1) NOT NULL,
  `obj20` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_panier_cible`
--

CREATE TABLE IF NOT EXISTS `tab_ort_inventaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_mag` int(4) NOT NULL DEFAULT '1',
  `libelle` varchar(250) NOT NULL,
  `prix` decimal(10,2) NOT NULL,
  `tr` tinyint(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `libelle` (`libelle`,`prix`,`id_mag`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_panier_cible`
--

CREATE TABLE IF NOT EXISTS `tab_ort_mags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `tab_ort_panier_cible`
--

CREATE TABLE IF NOT EXISTS `tab_ort_panier_cible` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code_user` varchar(50) NOT NULL,
  `nbTicket` int(11) NOT NULL,
  `valeurTicket` decimal(10,2) NOT NULL,
  `id_mag` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_user` (`code_user`)
);