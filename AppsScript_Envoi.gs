/**
 * Pointage DUFOUR — Réception des documents envoyés depuis l'appli.
 * Envoie le PDF par e-mail ET en garde une copie dans Google Drive,
 * rangée automatiquement dans un sous-dossier AU NOM de chaque personne.
 *
 * Tous les collègues utilisent la MÊME appli et la MÊME URL de script :
 * le script tourne sur TON compte, donc toutes les copies arrivent dans
 * TON Drive, classées par personne. Eux n'ont rien à installer côté Google.
 *
 * DÉPLOIEMENT (une seule fois) :
 *  1. https://script.google.com  →  Nouveau projet  →  colle ce code.
 *  2. Déployer  →  Nouveau déploiement  →  type « Application Web ».
 *       - Exécuter en tant que : Moi
 *       - Qui a accès : « Tout le monde »
 *  3. Autorise l'accès (Gmail + Drive) quand Google le demande.
 *  4. Copie l'URL « …/exec » et colle-la dans l'appli (onglet Heures → 📤 Envoi).
 *     Donne cette même URL à tes collègues (ils la collent dans leur appli).
 */

var DOSSIER_RACINE = "Pointages DUFOUR"; // dossier Drive racine de l'archivage

function doPost(e) {
  try {
    var p = JSON.parse(e.postData.contents);
    var email    = (p.email || "").trim();
    var filename = p.filename || "document.pdf";
    var label    = p.label || "Document";
    var oper     = (p.operateur || "").trim() || "Sans nom";
    var semaine  = p.semaine || "";

    var bytes = Utilities.base64Decode(p.pdf);
    var blob  = Utilities.newBlob(bytes, "application/pdf", filename);

    // --- Archive Drive : Pointages DUFOUR / <Personne> / <type> / <année> ---
    var annee = (semaine || "").slice(0, 4) || String(new Date().getFullYear());
    var racine   = dossier_(DriveApp.getRootFolder(), DOSSIER_RACINE);
    var fPerso   = dossier_(racine, nettoie_(oper));   // <-- dossier auto au nom de la personne
    var fType    = dossier_(fPerso, label);
    var fAnnee   = dossier_(fType, annee);
    var fichier  = fAnnee.createFile(blob);
    var lien = fichier.getUrl();

    // --- E-mail ---
    if (email) {
      var sujet = label + " — " + oper + (semaine ? (" — sem. du " + semaine) : "");
      var corps = "Bonjour,\n\nVeuillez trouver ci-joint : " + label +
                  "\nPersonne : " + oper +
                  (semaine ? ("\nSemaine du : " + semaine) : "") +
                  "\n\nCopie archivée : " + lien +
                  "\n\n— Envoi automatique depuis l'application.";
      MailApp.sendEmail({ to: email, subject: sujet, body: corps, attachments: [blob] });
    }

    return json_({ ok: true, drive: lien });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json_({ ok: true, msg: "Service d'envoi actif. Utilisez POST depuis l'appli." });
}

function dossier_(parent, nom) {
  var it = parent.getFoldersByName(nom);
  return it.hasNext() ? it.next() : parent.createFolder(nom);
}
function nettoie_(s) {               // nom de dossier sûr
  return String(s).replace(/[\/\\:*?"<>|]/g, "-").trim().slice(0, 80) || "Sans nom";
}
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
         .setMimeType(ContentService.MimeType.JSON);
}
