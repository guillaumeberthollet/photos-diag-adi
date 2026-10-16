// Configuration de l'appli Photos Diag.
// Ce fichier est public une fois en ligne : n'y mettez JAMAIS de token.
// Les tokens sont saisis sur chaque téléphone (écran « Configuration »)
// et restent stockés uniquement sur cet appareil.
window.APP_CONFIG = {
  // « App key » de l'appli Dropbox (onglet Settings de la console). Pas secret.
  DROPBOX_APP_KEY: "ptsvo17oqlxpxfc",

  // Dossier racine dans Dropbox.
  // Appli en mode « App folder » : laisser "" (les photos vont dans Applications/<nom de l'appli>/).
  // Appli en mode « Full Dropbox » : par exemple "/Diagnostiques".
  BASE_PATH: "",

  // Compression des photos avant envoi.
  MAX_SIDE: 2560,     // côté le plus long, en pixels
  JPEG_QUALITY: 0.8,

  // Format attendu du numéro de dossier (lettres, chiffres, tiret, underscore).
  DOSSIER_PATTERN: "^[A-Za-z0-9_-]{1,30}$",
};
