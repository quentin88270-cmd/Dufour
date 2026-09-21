# Feuille de pointage — DUFOUR CELTIC LEVAGE

Application web **hors-ligne** (PWA) pour saisir et générer la feuille de pointage
hebdomadaire, puis l'enregistrer / la partager (Drive, mail, impression).
Tout est autonome : aucune dépendance externe, rien n'est envoyé sur Internet
(le PDF est fabriqué sur l'appareil).

## Contenu

```
index.html               ← l'application (tout est embarqué : pdf-lib, gabarit PDF, logique)
manifest.webmanifest     ← manifest PWA (nom, icônes, couleurs)
sw.js                    ← service worker (fonctionne hors-ligne une fois ouvert)
icons/                   ← icônes générées depuis le logo
  icon-192.png / icon-512.png
  icon-192-maskable.png / icon-512-maskable.png
  apple-touch-icon.png
  favicon.ico
README.md
```

## Mettre en ligne sur GitHub Pages

1. Crée un dépôt (ex. `pointage-dcl`) et pousse **tout le contenu de ce dossier à la racine**
   (le fichier `index.html` doit être à la racine du dépôt).
   ```bash
   git init
   git add .
   git commit -m "Feuille de pointage DCL — PWA"
   git branch -M main
   git remote add origin https://github.com/<toncompte>/pointage-dcl.git
   git push -u origin main
   ```
2. Dépôt → **Settings → Pages** → *Build and deployment* → **Source : Deploy from a branch**,
   branche `main`, dossier `/ (root)` → **Save**.
3. Au bout d'1–2 min, l'app est en ligne sur
   `https://<toncompte>.github.io/pointage-dcl/`.

Comme le site est servi en **HTTPS**, le bouton **Partager** et l'installation
« Ajouter à l'écran d'accueil » fonctionnent partout.

## Installer sur le téléphone

- **Android / Chrome** : ouvre l'URL → menu ⋮ → *Ajouter à l'écran d'accueil*
  (ou la bannière d'installation).
- **iPhone / Safari** : ouvre l'URL → bouton Partager → *Sur l'écran d'accueil*.

L'app s'ouvre alors en plein écran, hors-ligne, comme une vraie appli.

## Envoyer le PDF dans Drive

Le bouton **📁 Drive** ouvre directement le dossier Drive de destination.
Le bouton **Partager** ouvre la feuille de partage du téléphone : choisis
*Enregistrer dans Drive*, puis le bon dossier.

> Upload **automatique** dans un dossier Drive précis (sans passer par le partage) :
> possible mais nécessite une connexion Google (OAuth) + un identifiant client
> Google Cloud autorisé pour ce domaine. Sur demande.

## Modifier / développer

- Éditeur : VS Code (extension *Live Server* pour tester en `localhost`, utile car
  le partage de fichiers exige un contexte sécurisé).
- Test rapide hors-ligne : `python -m http.server` dans le dossier puis `http://localhost:8000`.
- L'app garde la saisie en cours dans le navigateur (localStorage, clé `fdp_dcl_v1`),
  semaine par semaine, avec sauvegarde automatique à chaque frappe.

## Notes techniques

- Le remplissage ne passe **pas** par le formulaire AcroForm du PDF d'origine
  (les apparences iOS ne s'affichaient pas dans tous les lecteurs). L'app **dessine**
  le texte et les croix aux coordonnées exactes des 837 champs, sur un gabarit aplati.
  Rendu identique partout (Chrome/PDFium, poppler, Aperçu, Acrobat) et à l'impression.
- Police Helvetica standard (accents FR gérés), pas de police externe à charger.
