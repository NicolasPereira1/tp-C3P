import express, { Response } from 'express';
import bodyParser from 'body-parser';
import { Joueur } from './Donjon/Joueur';
import { Salle } from './Donjon/Salle';
import { JSONFieldException } from './Exceptions/JSONFieldException';
import { EntiteNotFoundException } from './Exceptions/EntiteNotFoundException';
import { ObjectNotFoundException } from './Exceptions/ObjectNotFoundException';
import { CommandNotFoundException } from './Exceptions/CommandNotFoundException';
import { NoAccessException } from './Exceptions/NoAccessException';

let app = express();
let idJoueur = 101;
let listeUtilisateur = new Map<number,Joueur>();

app.use( express.static( "public" ) );
app.use(bodyParser.json());

Salle.inisialiserDonjon();

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.post('/connect', function(req, res) {
    let joueur = new Joueur("Joueur "+(idJoueur-100), 50, idJoueur, Salle.donjon[0]);
    listeUtilisateur.set(idJoueur,joueur);
    idJoueur++;
    res.send(listeUtilisateur.get(idJoueur-1)?.vue());
});

app.get('/:uid/regarder', function(req, res) {
    try{
        let joueur = listeUtilisateur.get(+req.params.uid);
        if(joueur == undefined)
            throw new EntiteNotFoundException();
        res.send(joueur.salle.vue());
    }catch(err){
        gestionErreur(err, res);
    }
});

app.post('/:uid/deplacement', function(req, res) {
    try{
        let j = listeUtilisateur.get(+req.params.uid);
        if(j == undefined)
            throw new EntiteNotFoundException();
        j.deplacer(req.body["direction"]);
        res.send(j.salle.vue());
    }catch(err){
        gestionErreur(err, res);
    }
});

app.post('/:attaquant/taper/:attaque', function(req, res){
    try{
        let j = listeUtilisateur.get(+req.params.attaquant);
        if(j == undefined)
            throw new EntiteNotFoundException();
        res.send(j.attaquer(+req.params.attaque));
    }catch(err){
        gestionErreur(err, res);
    }
});

app.get('/:uid/examiner/:entite', function(req, res) {
    try{
        let j = listeUtilisateur.get(+req.params.uid);
        if(j == undefined)
            throw new EntiteNotFoundException();
        res.send(j.observerEntite(+req.params.entite));
    }catch(err){
        gestionErreur(err, res);
    }
});

app.get('/:uid/observerObjet/:objet', function(req, res) {
    try{
        let j = listeUtilisateur.get(+req.params.uid);
        if(j == undefined)
            throw new EntiteNotFoundException();
        res.send(j.observerObjet(+req.params.objet));
    }catch(err){
        gestionErreur(err, res);
    }
});

app.get('/:uid/prendre/:obj', function(req, res) {
    try{
        let j = listeUtilisateur.get(+req.params.uid);
        if(j == undefined)
            throw new EntiteNotFoundException();
        j.prendre(+req.params.obj);
        res.send(j.vue());
    }catch(err){
        gestionErreur(err, res);
    }
});

app.get('/:uid/utiliser/:obj', function(req, res) {
    try{
        let j = listeUtilisateur.get(+req.params.uid);
        if(j == undefined)
            throw new EntiteNotFoundException();
        j.utiliser(+req.params.obj);
        res.send(j.vue());
    }catch(err){
        gestionErreur(err, res);
    }
});

app.get('/:uid/deEquiper', function(req, res) {
    try{
        let j = listeUtilisateur.get(+req.params.uid);
        if(j == undefined)
            throw new EntiteNotFoundException();
        j.deEquiper();
        res.send(j.vue());
    }catch(err){
        gestionErreur(err, res);
    }
});

app.get('/*', function(req, res){
    gestionErreur(new CommandNotFoundException(), res);
});

app.post('/*', function(req, res){
    gestionErreur(new CommandNotFoundException(), res);
});

app.listen(8080);

function gestionErreur(erreur:Error, res:Response):void{
    /*
        fight entre joueurs
    */

    res.status(400);
    if(erreur instanceof JSONFieldException){
        res.send({ "type": "ERREUR_JSON", "message": erreur.message});
        return;
    }
    
    res.status(404);
    if(erreur instanceof EntiteNotFoundException){
        res.send({ "type": "NON_TROUVE", "message": erreur.message});
        return;
    }
    if(erreur instanceof CommandNotFoundException){
        res.send({ "type": "COMMANDE_ERRONEE", "message": erreur.message});
        return;
    }

    res.status(409);
    if(erreur instanceof NoAccessException){
        res.send({ "type": "MUR", "message": erreur.message});
        return;
    }
    else if(erreur instanceof EntiteNotFoundException){
        res.send({ "type": "MORT", "message": erreur.message});
        return;
    }
    else if(erreur instanceof ObjectNotFoundException){
        res.send({ "type": "DISPARU", "message": erreur.message});
        return;
    }
}