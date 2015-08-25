SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE `@prefix@api_tab_rangs`;

INSERT INTO `@prefix@api_tab_rangs` (`id`, `labelle`, `indice`) VALUES
  (1, 'Administrateur', 1),
  (2, 'Superviseur', 10),
  (3, 'Responsable', 20),
  (4, 'Utilisateur', 30),
  (5, 'Visiteur', 99)
;

TRUNCATE TABLE `@prefix@api_tab_menu_categorie`;

INSERT INTO `@prefix@api_tab_menu_categorie` (`id`, `Description`) VALUES
  (1, 'L''accueil'),
  (2, 'Administration'),
  (3, 'Gestion'),
  (4, 'Rapports'),
  (99, 'Liens externs');

TRUNCATE TABLE `@prefix@api_tab_menu`;

INSERT INTO `@prefix@api_tab_menu` (`id`, `Description`, `Description_courte`, `id_categorie`, `Lien`) VALUES
  (1, 'Statistiques', 'Statistiques', 2, 'stats'),
  (2, 'Administration', 'Administration', 2, 'admin'),
  (3, 'Supervision', 'Supervision', 2, 'supervision')
;

TRUNCATE TABLE `@prefix@api_tab_menu_rangs_droit`;

INSERT INTO `@prefix@api_tab_menu_rangs_droit` (`id`, `id_rang`, `id_menu`) VALUES
  (1, 1, ';1;2;3;'),
  (2, 2, ';1;2;3;'),
  (3, 3, ';'),
  (4, 4, ';'),
  (5, 5, ';')
;

SET FOREIGN_KEY_CHECKS = 1;