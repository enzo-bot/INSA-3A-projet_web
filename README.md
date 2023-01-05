# __WORDLE__

## __Installation__

### __Pré-requis__

- _Node.js_
- _Node Package Manager_

Pour installer les dépendances, tapez la commande suivante :
```shell
npm install
```

## __Configuration__

L'application serveur peut-être configurée via les variables d'environnement suivantes (_voir fichier __.env___) :

| __Variable__                  | __Description__                                                               | __Valeur par défaut__ |
| ----------------------------- | ----------------------------------------------------------------------------- | --------------------- |
| __WORDLE_NAME__               | Nom de l'application.                                                         | _wordle_              |
| __WORDLE_PORT__               | Port d'écoute de l'application.                                               | ___Aucune___          |
| __WORDLE_PUBLIC_DIR__         | Dossier contenant les fichiers publics de l'application.                      | _public_              |
| __WORDLE_DICO_DIR__           | Dossier contenant les fichiers dictionnaires.                                 | _dico_                |
| __WORDLE_API_URL__            | URL de l'API.                                                                 | _api_                 |
| __WORDLE_MIN_LENGTH__         | Longueur minimale des mots choisis.                                           | _4_                   |
| __WORDLE_DEFAULT_DICO__       | Fichier du dictionnaire par défaut (_depuis le dossier __WORDLE_DICO_DIR___). | ___Aucune___          |
| __WORDLE_DEFAULT_MAX_LENTGH__ | Longueur maximale par défaut des mots choisis.                                | _5_                   |

## __Démarrage__

Pour lancer le __serveur HTTP__, tapez la commande suivante :
```shell
npm start
```

Rendez-vous ensuite à l'adresse indiquée :
```shell
> wordle@1.0.0 start
> node wordle

[wordle] API routes created (/api -> api.router).
[wordle] Routes created from public folder (/ -> /home/user/A3/Web/public).
[wordle] Started on : http://insa:3000/
[wordle.api] Added a new dico file : fr/capitales
[wordle.api] Added a new dico file : fr/dictionnaire
```