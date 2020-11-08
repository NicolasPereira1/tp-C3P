#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int id;
    float montant;
    char * nom;
} compte;

compte * cree_compte (int id, float montant, char * nom) {
    compte * c = malloc(sizeof(compte));
    c->id = id;
    c->montant = montant;
    c->nom = nom;
}

void ajouter_montant_compte (compte * c, float m) {
    c->montant = c->montant + m;    
}

float montant_compte (compte * c) {
    return c->montant;    
}

int main(int argc, char const *argv[]){
    compte * c1 = cree_compte(1, 100.0, "Tony");

    printf("%f\n",montant_compte(c1));
    
    ajouter_montant_compte(c1, 50.0);
    
    printf("%f\n",montant_compte(c1));
    return 0;
}
