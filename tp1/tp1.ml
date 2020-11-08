(* Exercice 1. *)

(* Q3 float, tuple, list, erreur : Unbound value a, char, bytes, bool, unit (cela correspond à void en C), list, int list, list de tuple int * bool, erreur bool et int sont deux types différent. *)

(* Q4  *)
    (* a. et b.    (1,2.0);; *)
    (* c.          ["toto";"titi"];; *)
    (* d.          ([true;false;false], "tata");; *)
    (* e.          let a in (a, 2);; *)

(* Q5 *) let x = 12 and y = 15 in x+y;;

(* Exercice 2. *)

(* Q1 *) let max a b = if a>b then a else b;;
(* Q2 *) let min a b c = if a<b then if a<c then a else c else b;;
(* Q3 *) let pair a = if a mod 2 = 0 then string_of_int a else "odd";;
(* Q5 *) let q4 a = if a<10 then "small" else "large";;

(* Exercice 3. *)

(* Q1 *) let average a b c = (a + b + c) / 3;;
         let average a b c = (a +. b +. c) /. 3.;;
(* Q2 *) let implies a b = if a && b then true else false;;
(* Q3 
    fst : 'a * 'b -> 'a = <fun>
    snd : 'a * 'b -> 'b = <fun>
    
    Q4  fst prend un tuple d'éléments et renvoit le premier tant dis que snd renvoit le second *)
 (* Q5 *)
    let inv a = (snd a, fst a);;
    let inv' a = match a with
    | (b,c) -> (c,b);;

(* Exercice 4. *)

(* Q1 *)
let rec fib a = 
    if a = 0 
        then 0 
    else if a = 1 
        then 1 
    else 
        fib (a-1)+fib(a-2);;

(* Exercice 5. *)

let rec pgcd m n = 
    if m = 0
        then n
    else if m > n
        then pgcd n m
    else
        pgcd (n mod m) m ;;

(* Exercice 6. *)

let rec pair = function
    | 0 -> true
    | n -> impair (n-1)
    and impair = function
    | 0 -> false
    | n-> pair (n-1)

(* Exercice 7. *)

let fact n =
    let rec aux a r =
        if a = n
            then r
        else
            aux (a+1) (r*(a+1))
    in aux 0 1;;

(* Exercice 8. *)

let fibRecTail n =
    let rec aux a r1 r2 =
        if a = n
            then r2
        else
            aux (a+1) r2 (r1 + r2)
    in aux 0 0 1;;

(* Exercice 9. *)

 (* Q1 *)
let rec exp x n =
    if n = 0
        then 1
    else
        x * exp x (n-1);;

(* Q2 *)
let expRecTail x n =
    let rec aux a r =
        if a = n
            then r
        else
            aux (a+1) (r*x)
    in aux 0 1;;

(* Q3 *)
let expRecTailCount x n =
    let rec aux a r c =
        if a = n
            then (r,n)
        else
            aux (a+1) (r*x) (c+1)
    in aux 0 1 0;;

(* Exercice 10. *)
(* 
let sommeDouble n m =
    let rec aux1 a r
        let rec aux2 b
            if b=m 
                then r
            else 
                aux2 (b+1) (r+b)
        in a r
    in n 0;; *)