# Pointage DUFOUR — appli (heures · frais · chantiers)

Application web hors-ligne. 3 onglets : Mes heures, Mes frais, Mes chantiers.
Chaque document se **voit**, s'**enregistre** en PDF et s'**envoie** par e-mail
(avec copie archivée dans Drive).

## Fichiers
- `index.html` — l'appli complète (tout est embarqué, 100 % hors-ligne).
- `sw.js` — service worker (fonctionne hors-ligne une fois ouvert).
- `AppsScript_Envoi.gs` — script Google à déployer pour l'envoi e-mail + archive Drive.

## Mettre en ligne (GitHub Pages)
Pousse `index.html` et `sw.js` à la racine du dépôt → Settings → Pages →
branche `main`, dossier `/root`. L'appli est sur `https://<compte>.github.io/<repo>/`.
(Le fichier `index.html` fonctionne aussi seul, sans hébergement.)

## Activer l'envoi automatique (e-mail + archive Drive)
1. Ouvre `AppsScript_Envoi.gs` et suis les instructions en tête du fichier
   (coller dans script.google.com → déployer en Application Web → copier l'URL `…/exec`).
2. Dans l'appli : onglet **Heures → 📤 Envoi** → colle l'URL du script et vérifie l'e-mail
   destinataire (par défaut `pointages@dufour-groupe.com`).
3. Le bouton **📤 Envoyer** expédie alors le PDF de l'onglet courant au destinataire
   et en garde une copie dans Drive (dossier « Pointages DUFOUR »).

Sans URL de script, **Envoyer** ouvre simplement le partage du téléphone (tu envoies
le mail toi-même). Dans tous les cas, **Voir** affiche le PDF et **Enreg.** le télécharge.
