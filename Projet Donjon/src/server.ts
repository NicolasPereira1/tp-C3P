import express, { Response } from 'express';
import bodyParser from 'body-parser';
import { Joueur } from './Joueur';
import { Salle } from './Salle';
import { JSONFieldException } from './JSONFieldException';
import { EntiteNotFindException } from './EntiteNotFindException';

let app = express();
let idJoueur = 1;
let listeUtilisateur = new Map<number,Joueur>();

app.use( express.static( "public" ) );
app.use(bodyParser.json());

Salle.inisialiserDonjon();

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.post('/connect', function(req, res) {
    let joueur = new Joueur("Joueur "+idJoueur, 50, idJoueur, Salle.donjon[0]);
    listeUtilisateur.set(idJoueur,joueur);
    idJoueur++;
    res.send(listeUtilisateur.get(idJoueur-1)?.vue());
});

app.get('/:uid/regarder', function(req, res) {
    try{
        let joueur = listeUtilisateur.get(+req.params.uid);
        if(joueur == undefined)
            throw new EntiteNotFindException();
        res.send(joueur.salle.vue());
    }catch(err){
        gestionErreur(err, res);
    }
});

app.post('/:uid/deplacement', function(req, res) {
    try{
        let j = listeUtilisateur.get(+req.params.uid);
        if(j == undefined)
            throw new EntiteNotFindException();
        j.deplacer(req.body["direction"]);
        res.send(j.salle.vue());
    }catch(err){
        gestionErreur(err, res);
    }
});

app.post('/:attaquant/taper/:attaque', function(req, res){
    let j = listeUtilisateur.get(+req.params.attaquant);
    if(j != undefined){
        res.send(j.attaquer(+req.params.attaque));
    }
});

app.get('/:uid/examiner/:entite', function(req, res) {
    let j = listeUtilisateur.get(+req.params.uid);
    if(j != undefined)
        res.send(j.observerEntite(+req.params.entite));
});

app.get('/:uid/observerObjet/:objet', function(req, res) {
    let j = listeUtilisateur.get(+req.params.uid);
    if(j != undefined)
        res.send(j.observerObjet(+req.params.objet));
});

app.get('/:uid/prendre/:obj', function(req, res) {
    let j = listeUtilisateur.get(+req.params.uid);
    if(j != undefined){
        j.prendre(+req.params.obj);
        res.send(j.vue());
    }
});

app.get('/:uid/utiliser/:obj', function(req, res) {
    let j = listeUtilisateur.get(+req.params.uid);
    if(j != undefined){
        j.utiliser(+req.params.obj);
        res.send(j.vue());
    }
});

app.get('/:uid/deEquiper', function(req, res) {
    let j = listeUtilisateur.get(+req.params.uid);
    if(j != undefined){
    j.deEquiper();
        res.send(j.vue());
    }
});

app.listen(8080);

function gestionErreur(erreur:Error, res:Response):void{
    res.status(404);
    res.send("Aie");
}