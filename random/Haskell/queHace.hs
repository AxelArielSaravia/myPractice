{- 
      crear un programa que cumpla con
      func.b.a.xs = [MAX p,q: 0<= p <= q < #xs && [ALL i: p <= i < q: b < xs!i < a]: q-p]
      es decir:
            "la funcion devuelve, sin tener en cuenta el último elemento de la lista, el mayor tamaño del
            segmento donde todos sus elementos tienen un valor en el intercalo (b,a)"


-}

func :: Int -> Int -> [Int] -> Int 
func _ _ [] = 0
func b a (x:xs) = max (funcPre b a (x:xs)) (func b a xs)
                where funcPre :: Int -> Int -> [Int] -> Int
                      funcPre _ _ [] = 0
                      funcPre _ _ [x] = 0
                      funcPre b a (x:xs)
                                    | b < x && x < a = funcPre b a xs + 1
                                    | otherwise = 0