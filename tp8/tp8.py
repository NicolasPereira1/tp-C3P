class MatlExpression(object):
    def __init__(self, val:object):
        self.val = val
    def valeur(self):
        if isinstance(self.val, int):
            return int(self.val)
        elif isinstance(self.val, MatlExpression):
            return self.val.calcule()

class OperationBinaire(MatlExpression):
    def __init__(self, symbole:str, a:MatlExpression, b:MatlExpression):
        self.symbole = symbole
        self.a = a
        self.b = b

    def calcule(self):
        if self.symbole == "+":
            return self.a.valeur() + self.b.valeur()
        elif self.symbole == "-":
            return self.a.valeur() - self.b.valeur()
        elif self.symbole == "*":
            return self.a.valeur() * self.b.valeur()
        elif self.symbole == "/":
            if self.b.valeur() != 0:
                return self.a.valeur() / self.b.valeur()
            else:
                print("Erreur division par 0")
        else:
            print("Erreur oppération inconnue")


exp1 = OperationBinaire("+", MatlExpression(5),MatlExpression(3))
print(exp1.calcule())