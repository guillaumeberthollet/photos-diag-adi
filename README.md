# Photos Diag

Page web (PWA) pour iPhone : on saisit un numéro de dossier, on prend les photos, elles arrivent dans Dropbox dans un dossier portant ce numéro. Les photos ne passent pas par la pellicule.

- **Hors ligne** : les photos restent stockées dans la page et partent toutes seules dès que le réseau revient (quand l'appli est ouverte).
- **Rien n'est perdu** : si Safari recharge la page ou si le téléphone redémarre, les photos en attente sont toujours là. Une photo n'est effacée du téléphone qu'après confirmation de Dropbox.
- **Aucun secret dans le code** : les tokens sont saisis sur chaque téléphone et restent sur l'appareil.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | L'appli |
| `config.js` | Réglages (app key Dropbox, dossier racine, compression) |
| `manifest.json`, `icon-*.png` | Installation sur l'écran d'accueil |
| `sw.js` | Ouverture de l'appli sans réseau |
| `connect.html` | Page d'administration : produit un token de connexion longue durée |

## 1. Créer l'appli Dropbox

1. Aller sur https://www.dropbox.com/developers/apps → **Create app**.
2. **Scoped access** → **App folder** → nom de l'appli (ex. « Photos Diag »).
3. Onglet **Permissions** : cocher **files.content.write** → **Submit**.
4. Onglet **Settings** : noter l'**App key** et la copier dans `config.js` (`DROPBOX_APP_KEY`).
5. Toujours dans **Settings**, section **OAuth 2 → Redirect URIs**, ajouter l'adresse de l'appli une fois en ligne, par exemple :
   - `https://<compte>.github.io/<depot>/index.html`
   - `https://<compte>.github.io/<depot>/connect.html`

Les photos arrivent dans **Applications › <nom de l'appli> › <numéro de dossier>** du compte Dropbox connecté.

> ⚠️ La permission `files.content.write` permet aussi de supprimer ou d'écraser des fichiers dans ce dossier. L'appli ne le fait jamais, mais protégez le token : ne le publiez nulle part. En cas de perte d'un téléphone, révoquez l'accès dans Dropbox (Paramètres › Applications connectées).

## 2. Tester tout de suite (token court)

1. Dans la console Dropbox, onglet **Settings** → **Generated access token** → **Generate**. Ce token commence par `sl.` et dure environ 4 heures.
2. Sur le Mac, dans ce dossier :
   ```bash
   python3 -m http.server 8000
   ```
3. Sur l'iPhone (même Wi-Fi), ouvrir `http://<adresse IP du Mac>:8000` dans Safari.
4. Coller le token dans l'écran « Configuration » (copier sur le Mac puis coller sur l'iPhone fonctionne avec le presse-papiers universel).

En `http://` local, l'appareil photo et l'envoi fonctionnent, mais pas l'ouverture hors ligne ni la connexion « Se connecter à Dropbox » : il faut le `https://` de l'étape 4.

## 3. Usage normal (token longue durée)

Le token court expire. Pour un usage réel, il faut un **token de connexion** (refresh token) :

- **Option A** — sur chaque téléphone, écran Configuration → **Se connecter à Dropbox** (disponible une fois l'appli en `https://` et `DROPBOX_APP_KEY` renseignée).
- **Option B** — une seule fois sur un ordinateur, ouvrir `connect.html`, se connecter avec le compte qui doit recevoir les photos, copier le token affiché et le coller sur chaque téléphone. Pratique pour un compte Dropbox central sans donner son mot de passe aux diagnostiqueurs.

## 4. Mettre en ligne sur GitHub Pages

1. Créer un dépôt GitHub et y déposer tous les fichiers de ce dossier.
2. **Settings › Pages** → Source : **Deploy from a branch** → branche `main`, dossier `/ (root)`.
3. L'appli est disponible à `https://<compte>.github.io/<depot>/` après une minute.
4. Ajouter les deux Redirect URIs dans l'appli Dropbox (étape 1.5).

À chaque mise à jour des fichiers, changer `VERSION` dans `sw.js` pour que les téléphones récupèrent la nouvelle version.

## 5. Installer sur l'iPhone

Dans Safari, ouvrir l'adresse de l'appli → bouton **Partager** → **Sur l'écran d'accueil**. Puis faire la configuration **depuis l'icône de l'écran d'accueil** : l'appli installée a son propre stockage, séparé de Safari.
