(* Exercice 1 *)
(* Q1 *) 

let rec integers1 n = match n with
  | 0 -> [0]
  | n -> integers1 (n-1) @ [n];;

(* Q2 *)
let integers2 n = 
  let rec aux x r =
    if x = n
      then  List.rev ([x] @ r)
    else
      aux (x+1) ([x] @ r)
  in aux 0 [];;

(* Q3 *)

let rec integers3 n = 
  let rec aux x r =
    if x = 0
      then x::r
    else
      aux (x-1) (x::r)
    in aux n [];;

(* Q4 *)
(* 
    L'execution de time integers3 100000;; se fait quasiment instantanément tant dis que time integers2 100000;; prend 15.21 milliseconde et time integers1 100000;; prend plusieurs secondes.
*)

(* Exercice 2 *)

(* Q1 *)

  let rec size l =
    let rec aux l s = match l with
      | [] -> s
      | h::r -> aux r (s+1)
    in aux l 0;;

  (* Q2 *)

let three_or_more l =
  if (size l) > 2
    then true
  else
    false;;

(* Q3 *)

let last l = match l with
  | [] -> failwith "Liste vide"
  | l -> List.hd (List.rev l);;

(* Q4 *)

let sum l = 
  let rec aux li s = match li with
    | [] -> s
    | h::r -> aux r (s+h)
  in aux l 0;;

(* Q5 *)

let rec find e l = match l with
  | [] -> false
  | h::r -> if h=e then true else find e r;;

(* Q6 *)

let rec nth n l = match l with
  | [] -> failwith "Il n'y a pas assez d'éléments dans cette liste"
  | h::r -> if n = 1 then h else nth (n-1) r;;

(* Q7 *)

let is_increasing l = match l with
  | [] -> failwith "La liste est vide"
  | _ -> let rec aux l1 e = match l1 with
      | [] -> true
      | h::r -> if h >= e then aux r h else false
    in aux l (List.hd l);;

(* Exercice 3 *)

(* Q1 *)

let list_copy l = 
  let rec aux l1 l2 = match l1 with
    | [] -> l2
    | h::r -> aux r (l2 @ [h])
  in aux l [];;

(* Q2 *)

let reverse l = 
  let rec aux l1 l2 = match l1 with
    | [] -> l2
    | h::r -> aux r ([h] @ l2)
  in aux l [];; 


(* Q3 *)

let rec flatten_list l = match l with
    | [] -> []
    | h::r -> h @ (flatten_list r);;

(* Q4 *)

let withouth_duplicates l = 
  let rec aux l x r = match l with
    | [] -> List.rev r
    | h::t -> if h=x then aux t h r else aux t h (h::r)
  in aux l 0 [];; 
 

(* Q4 *)

let records l =
  let rec aux l x r = match l with
  | [] -> List.rev r
  | h::t -> if h<x then aux t h r else aux t h (h::r)
in aux l (List.hd l) [];; 

(* Exercice 4 *)

(* Q1 *)

let filtre f l =
  let rec aux l r = match l with
    | [] -> List.rev r
    | h::t -> if f h then aux t (h::r) else aux t r
  in aux l [];;

(* Q2 *)

let collect f l =
  let rec aux l r = match l with
    | [] -> List.rev r
    | h::t -> aux t ((f h)::r)
  in aux l [];; 

(* Q3 *)
(* let reject f l = filtre !f l;; *)
let reject f l =
  let rec aux l r = match l with
    | [] -> List.rev r
    | h::t -> if f h then aux t r else aux t (h::r)
  in aux l [];;

(* Q4 *)

let rec includes e l = match l with
  | [] -> false;
  | h::t -> if h=e then true else includes e t;;

(* Q5 *)

let rec including l1 l2 = match l1 with
  | [] -> true
  | h::t -> if includes h l2 then including t l2 else false;;

(* Q6 *)

let rec excludes e l = match l with
  | [] -> true;
  | h::t -> if h=e then false else excludes e t;;

(* Q7 *)

let rec excluding l1 l2 = match l1 with
  | [] -> true
  | h::t -> if excludes h l2 then excluding t l2 else false;;

(* Q8 *)

let zip l1 l2 = 
  if size l1 <> size l2
    then failwith "Les deux listes ne sont pas de la même taille !" 
  else
    let rec aux (l1,l2) r = match (l1,l2) with
      | ([],[]) -> List.rev r
      | (h1::t1,h2::t2) -> aux (t1,t2) ((h1,h2)::r)
      | _ -> failwith "erreur"
    in aux (l1,l2) [];;

(* Exercice 5 *)

(* 
  Q1. Le type de |> est 'a -> ('a -> 'b) -> 'b 
*)

(* 
  Q2. On donne une liste [1;2;3;4] à la fonction List.filter via l'oppérateur |>.
      La fonction filter renvoit la liste des éléments qui valident l'expression booléenne passée après (les éléments pairs) on se a donc [2;4].
*)

(* Q3 *)

let combinaison l = l |> filtre pair |> withouth_duplicates |> reverse;;

(* Q4 *)

let nbrImpair l = l |> filtre impair |> size;;

(* Q4 *)

let nbrImpair l = l |> filtre impair |> size;;

(* Q5 *)

let toString l =
  let rec aux l r = match l with
    | [] -> r
    | h::t ->  aux t (r ^ (string_of_int h))
  in aux l "";;

(* Q6 *)

let carreImpair l = l |> filtre impair |> collect (expRecTail 2);;

