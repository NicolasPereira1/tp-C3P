class MatlExpression(object):
    pass

class Valeur(MatlExpression):
    def __init__(self, a:float):
        self.a = a
    
    def calcule(self):
        return self.a

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


exp1 = OperationBinaire("+", OperationBinaire("-",OperationBinaire("/",Valeur(21),Valeur(3)),Valeur(2)),Valeur(3))
print(exp1.calcule())