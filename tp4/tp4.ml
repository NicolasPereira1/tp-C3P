(* Exercice 1 *)

(* Q1 *)
type 'a matl =  OperationBinaire of 'a * 'a matl * 'a matl
              | OperationUnaire of 'a * 'a matl
              | Valeur of int;;

(* Q2 *)

let exp1 = OperationBinaire ( "+", OperationBinaire("+", Valeur 1, Valeur 2), Valeur (-3));;

(* Q3 *)

let rec evaluate_expr exp = match exp with
  | Valeur v -> v
  | OperationBinaire ("+",v1,v2) -> evaluate_expr v1 + evaluate_expr v2 
  | OperationBinaire ("-",v1,v2) -> evaluate_expr v1 - evaluate_expr v2 
  | OperationBinaire ("*",v1,v2) -> evaluate_expr v1 * evaluate_expr v2 
  | OperationBinaire ("/",v1,v2) -> evaluate_expr v1 / evaluate_expr v2 
  | _ -> failwith "Operations binaires seulement";;

(* Exercice 2 *)

(* Q1  *) 

(* On peut créer une liste de tuple à 2 éléments avec comme en premier une chaine de caratère contenant le nom de la fonction et en deuxième la fonction elle même. *)

let oppose x = x*(-1);;
let carre x = x*x;;
let cube x = x*x*x;;
let abs x = if x > 0 then x else -x;;

let listeDeFonction = [("oppose", oppose); ("carre", carre); ("cube", cube); ("abs",abs)];;

(* Q2 *)

let findFunction f =
  let rec aux f l = match l with
    | [] -> failwith "fonction inconnue"
    | (n,g)::t -> if n=f then g else aux f t
  in aux f [("oppose", oppose); ("carre", carre); ("cube", cube); ("abs",abs)];;

(* Q3 *)

let exp2 = OperationBinaire ( "+", OperationBinaire("+", OperationUnaire ("carre", Valeur 3), Valeur 2), Valeur (-3));;

let rec evaluate_expr' exp l = match exp with
  | Valeur v -> v
  | OperationBinaire ("+",v1,v2) -> evaluate_expr' v1 l + evaluate_expr' v2 l 
  | OperationBinaire ("-",v1,v2) -> evaluate_expr' v1 l - evaluate_expr' v2 l 
  | OperationBinaire ("*",v1,v2) -> evaluate_expr' v1 l * evaluate_expr' v2 l 
  | OperationBinaire ("/",v1,v2) -> evaluate_expr' v1 l / evaluate_expr' v2 l
  | OperationUnaire (n,v) -> 
    let rec aux f l = match l with
      | [] -> failwith "fonction inconnue"
      | (n,g)::t -> if n=f then g (evaluate_expr' v l) else aux f t
    in aux n l
  | _ -> failwith "Erreur";;

(* Q4 *)

let exp x n =
  let rec aux a r =
      if a = n then r else aux (a+1) (r*x)
  in aux 0 1;;

let exp3 = OperationBinaire ( "+", OperationBinaire("+", OperationUnaire ("carre", Valeur 3), OperationBinaire ("exp", Valeur 2, Valeur 3)), Valeur (-3));;

let rec findFunctionList f l = match l with
  | [] -> failwith "fonction inconnue"
  | (n,g)::t -> if n=f then g else findFunctionList f t;;
(* 
let rec evaluate_expr'' exp l = match exp with
  | Valeur v -> v
  | OperationBinaire ("+",v1,v2) -> evaluate_expr'' v1 l + evaluate_expr'' v2 l 
  | OperationBinaire ("-",v1,v2) -> evaluate_expr'' v1 l - evaluate_expr'' v2 l 
  | OperationBinaire ("*",v1,v2) -> evaluate_expr'' v1 l * evaluate_expr'' v2 l 
  | OperationBinaire ("/",v1,v2) -> evaluate_expr'' v1 l / evaluate_expr'' v2 l
  | OperationBinaire ("exp",v1,v2) -> exp (evaluate_expr'' v1 l) (evaluate_expr'' v2 l)
  | OperationUnaire (n,v) -> (findFunctionList n l) (evaluate_expr'' v l)
  | _ -> failwith "Erreur";; *)


(* Exercice 3 *)

(* Q1/Q2 *)

type 'a statement = Acces of bytes
                  | Assignation of bytes * int;;

(* Q3 *)

let exp4 = Assignation("a", evaluate_expr' (OperationBinaire("+", Valeur 6, OperationBinaire("*",Valeur 4, Valeur 5))) listeDeFonction);;

(* Q4 Si on veut pouvoir concerver ces informations dans une liste on doit pouvoir relier les valeurs aux noms des données, pour cela on peut utiliser un dictionnaire*)

(* Q5 *)

let rec findValue n d = match d with
  | [] -> failwith "La variable n'existe pas"
  | (x,v)::t -> if x=n then v else findValue n t;;

(* Oui on peut utiliser cette même fonction pour rechercher des opérations*)

(* Q6 Je pense la fonction devera retourner le nouveau dictionnaire*)

let rec insert n v d = match d with 
| [] -> [(n,v)]
| (a,x)::t -> if a=n then (a,v)::t else (a,x)::(insert n v t);; 

let evaluate_statement s d = match s with
    | Acces n -> failwith "Acces imposible"
    | Assignation (n,v) -> insert n v d;;

(* Exercice 4 *)

(* Q1 *)

type 'a matl2 = OperationBinaire2 of 'a * 'a matl2 * 'a matl2
              | OperationUnaire2 of 'a * 'a matl2
              | Valeur2 of int
              | Variable2 of bytes;;

(* Q3 *)

let rec evaluate_matl exp l d = match exp with
  | Variable2 v -> findValue v d
  | Valeur2 v -> v
  | OperationBinaire2 ("+",v1,v2) -> evaluate_matl v1 l d + evaluate_matl v2 l d 
  | OperationBinaire2 ("-",v1,v2) -> evaluate_matl v1 l d - evaluate_matl v2 l d 
  | OperationBinaire2 ("*",v1,v2) -> evaluate_matl v1 l d * evaluate_matl v2 l d 
  | OperationBinaire2 ("/",v1,v2) -> evaluate_matl v1 l d / evaluate_matl v2 l d
  | OperationUnaire2 (n,v) -> 
    let rec aux f l = match l with
      | [] -> failwith "fonction inconnue"
      | (n,g)::t -> if n=f then g (evaluate_matl v l d) else aux f t
    in aux n l
  | _ -> failwith "Erreur";;


(* Q2 *)
let dictionnaire = [];;
let dictionnaire = evaluate_statement (Assignation("a", evaluate_matl (OperationBinaire2("+", Valeur2 4, Valeur2 5)) listeDeFonction dictionnaire)) dictionnaire;;
let dictionnaire = evaluate_statement (Assignation("b", evaluate_matl (OperationBinaire2("+", Variable2 "a", Valeur2 1)) listeDeFonction dictionnaire)) dictionnaire;;

evaluate_matl (OperationBinaire2("+", Variable2 "a", Variable2 "b")) listeDeFonction dictionnaire;;

(* Exercice 5 *)

(* Q1  Je pense que cette fonctionnalité à déjà été implémenté lors de la question 3 de l'exercice 2*)


