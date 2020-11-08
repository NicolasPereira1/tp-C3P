typedef struct _compte compte;

struct  _compte {
    int id;
    float montant;
    char nom[50];
};

void cree_compte (compte * c, int id, float montant, char * nom) {
    c = malloc(sizeof(compte));
    c->id = id;
    c->montant = montant;
    c->nom = nom;
}

float ajouter_montant_compte (compte * c, float m) {
    c->montant = c->montant + m;    
}

float montant_compte (compte * c) {
    return c->montant;    
}