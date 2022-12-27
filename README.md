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

L'application serveur peut-être configurée via le fichier __.env__ contenant les variables suivantes :

| __Variable__ | __Description__ | __Valeur par défaut__ |
| ------------ | --------------- | --------------------- |
| __WORDLE_PORT__ | Port d'écoute de l'application. | _3000_ |
| __WORDLE_DICO__ | Fichier du dictionnaire (_depuis le dossier __dico___). | _fr.txt_ |

## __Démarrage__

Pour lancer le __serveur HTTP__, tapez la commande suivante :
```shell
npm start
```

Rendez-vous ensuite à l'adresse suivante : http://localhost:3000/