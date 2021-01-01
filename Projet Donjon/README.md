## Commandes relatives au serveur :

* npm run UML     -> Génere l'UML.
* npm run start   -> Démarre le serveur.
* npm run build   -> Convertit les fichiers Typescript en Javascript.
* npm run clear   -> Supprime les fichiers Javascript.

## Commandes relatives au protocole :

* curl --header "Content-Type: application/json" --request POST http://127.0.0.1:8080/connect
* curl --header "Content-Type: application/json" --request POST --data '{"direction":"B"}' http://127.0.0.1:8080/1/deplacement
* curl --header "Content-Type: application/json" --request POST http://127.0.0.1:8080/1/taper/0
