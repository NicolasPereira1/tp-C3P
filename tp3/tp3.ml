(* Exercice 1 *)

type 'a bintree = Noeud of 'a * 'a bintree * 'a bintree
                | Feuille of 'a
                | Vide;;

let arbre1 =  Noeud ( 2, 
                Noeud ( 7, 
                    Feuille 2, Noeud ( 6, Feuille 5, Feuille 11)), 
                Noeud ( 5, 
                    Vide, Noeud ( 9, Feuille 4, Vide))
              );;

(* Exercice 2 *)

(* Q1 *)

let rec bintree_count_nodes a = match a with
  | Vide -> 0
  | Feuille _ -> 1
  | Noeud (_,n1,n2) -> 1 + (bintree_count_nodes n1) + (bintree_count_nodes n2);;

(* Q2 *)

let rec bintree_count_leaves a = match a with
  | Vide -> 0
  | Feuille _ -> 1
  | Noeud (_,n1,n2) -> (bintree_count_leaves n1) + (bintree_count_leaves n2);;

(* Q3 *)

let rec bintree_count_internal_nodes a = match a with
  | Noeud (_,n1,n2) -> 1 + (bintree_count_internal_nodes n1) + (bintree_count_internal_nodes n2)
  | _ -> 0;;

(* Exercice 3 *)

(* Q1 *)

let max a b = if a > b then a else b;;

let rec bintree_height a = match a with
  | Vide -> 0
  | Feuille _ -> 1
  | Noeud (_,n1,n2) -> max (1 + (bintree_height n1)) (1 +(bintree_height n2));;


(* Q2 *)

let arbre2 =  Noeud ( 2, 
                Noeud ( 5, 
                  Noeud ( 9, Vide, Feuille 4), Vide),
                Noeud ( 7, 
                  Noeud ( 6, Feuille 11, Feuille 5), Feuille 2)  
              );;

let bintree_is_mirror a b = 
  let rec aux (a,b) = match (a,b) with
    | (Vide,Vide) -> true
    | (Feuille _, Feuille _) -> true
    | (Noeud (_,a1,a2), Noeud(_,b1,b2)) -> (aux (a1,b2)) && (aux(a2,b1))
    | _ -> false
  in aux (a,b);;

(* Q3 *)

let rec bintree_is_symmetric a = match a with
  | Vide -> true
  | Feuille _ -> true
  | Noeud (_,n1,n2) -> if (bintree_height n1) = (bintree_height n2) then (bintree_is_symmetric n1) && (bintree_is_symmetric n2) else false;;

(* Exercie 4 *)

(* Q1 *)

let rec bintree_pre a = match a with
  | Vide -> []
  | Feuille x -> [x]
  | Noeud (x,n1,n2) ->  x::(bintree_pre n1)@(bintree_pre n2) ;;

(* Q2 *)

let rec bintree_post a = match a with
  | Vide -> []
  | Feuille x -> [x]
  | Noeud (x,n1,n2) ->  (bintree_post n1)@(bintree_post n2)@[x];;

(* Q3 *)

let rec bintree_in a = match a with
  | Vide -> []
  | Feuille x -> [x]
  | Noeud (x,n1,n2) ->  (bintree_in n1)@[x]@(bintree_in n2);;

(* Exercie 5 *)

(* Q1 *)

let rec bintree_insert t x = match t with
  | Vide -> Noeud (x, Vide, Vide)
  | Noeud (v, n1,n2) ->  if (v < x) 
                          then if (n2 = Vide) 
                                then 
                                  Noeud (v, n1, Noeud (x, Vide,Vide))
                                else
                                  bintree_insert n2 x
                          else 
                            if (n1 = Vide) 
                              then 
                                  Noeud (v, Noeud (x, Vide,Vide), n2)
                              else
                                bintree_insert n1 x
    | _ -> failwith "Erreur format arbre";;

(* Q2 *)

let rec bintree_search  t x = match t with
  | Vide -> false;
  | Noeud (v, n1, n2) -> if v = x
                          then 
                            true
                          else if v > x
                            then 
                              bintree_search n1 x
                          else
                            bintree_search n2 x
  | _ -> failwith "Erreur format arbre";;