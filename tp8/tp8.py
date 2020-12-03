# ------------------------------------------------------------------CLASSES------------------------------------------------------------------
class MatlExpression(object):
    def __init__(self):
        MatlExpression.dictionnaire
    
    @staticmethod
    def assigner(variable, valeur):
        MatlExpression.dictionnaire[variable.nom] = valeur.calcule()

class Valeur(MatlExpression):
    def __init__(self, a:float):
        self.a = a
    
    def calcule(self):
        return self.a

class Variable(MatlExpression):
    def __init__(self, nom:str):
        self.nom = nom
    
    def calcule(self):
        return MatlExpression.dictionnaire[self.nom]

class OperationUnaire(MatlExpression):
    def __init__(self, nom:str, a:MatlExpression):
        self.nom = nom
        self.a = a
    
    def calcule(self):
        return MatlExpression.dictionnaire[self.nom](self.a.calcule())

class OperationBinaire(MatlExpression):
    def __init__(self, symbole:str, a:MatlExpression, b:MatlExpression):
        self.symbole = symbole
        self.a = a
        self.b = b

    def calcule(self):
        if self.symbole == "+":
            return self.a.calcule() + self.b.calcule()
        elif self.symbole == "-":
            return self.a.calcule() - self.b.calcule()
        elif self.symbole == "*":
            return self.a.calcule() * self.b.calcule()
        elif self.symbole == "/":
            if self.b.calcule() != 0:
                return self.a.calcule() / self.b.calcule()
            else:
                print("Erreur division par 0")
        else:
            print("Erreur oppération inconnue")
# ------------------------------------------------------------------TESTS------------------------------------------------------------------
def test__Valeur():
    exp = Valeur(5)
    
    assert exp.calcule() == 5
    
def test__Variable():
    MatlExpression.dictionnaire = {}
    exp = Variable("toto")
    MatlExpression.assigner(exp, Valeur(42))

    assert exp.calcule() == 42

def test__OperationBinaire():
    exp1 = OperationBinaire("+", Valeur(5), Valeur(3))
    exp2 = OperationBinaire("-", Valeur(5), Valeur(3))
    exp3 = OperationBinaire("*", Valeur(5), Valeur(3))
    exp4 = OperationBinaire("/", Valeur(2352), Valeur(56))

    assert exp1.calcule() == 8
    assert exp2.calcule() == 2
    assert exp3.calcule() == 15
    assert exp4.calcule() == 42
# -------------------------------------------------------------FONCTIONS UNAIRE-------------------------------------------------------------
def carre(x):
    return x*x
    
def cube(x):
    return x*x*x

def abs(x):
    if x<0:
        return -x
    return x

exp1 = OperationBinaire("+", OperationBinaire("-",OperationBinaire("/",Valeur(21),Valeur(3)),Valeur(2)),Valeur(3))
print(exp1.calcule())


MatlExpression.dictionnaire = {"carre":carre}
exp2 = OperationUnaire("carre",Valeur(3))
print(exp2.calcule())