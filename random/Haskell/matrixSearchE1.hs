{- 
 Encontrar todas las estructuras de 3x3 de cada array
 ejemplo:
  1  1  1
  0  1  0
  1  1  1
 
 Y sumar solo el siguiente contenido de la estructura:\
  1  1  0
     0   
  1  1  0
 
 devolver solo el bloque que esta suma genere el numero mas grande
-}


myMatrx1 = [
        [ 1, 1, 1, 0, 0, 0 ],
        [ 0, 1, 0, 0, 0, 0 ],
        [ 1, 1, 1, 0, 0, 0 ],
        [ 0, 0, 2, 4, 4, 0 ],
        [ 0, 0, 0, 2, 0, 0 ],
        [ 0, 0, 1, 2, 4, 0 ]
    ]--19

myMatrx2 = [
        [ -9, -9, -9, 1, 1, 1 ],
        [ 0, -9, 0, 4, 3, 2 ],
        [ -9, -9, -9, 1, 2, 3 ],
        [ 0, 0, 8, 6, 6, 0 ],
        [ 0, 0, 0, -2, 0, 0 ],
        [ 0, 0, 1, 2, 4, 0 ]
    ]--28

myMatrx3 = [
        [ 1, 1, 1, 0, 0, 0 ],
        [ 0, 1, 0, 0, 0, 0 ],
        [ 1, 1, 1, 0, 0, 0 ],
        [ 0, 9, 2, -4, -4, 0 ],
        [ 0, 0, 0, -2, 0, 0 ],
        [ 0, 0, -1, -2, -4, 0 ]
    ]--13

myMatrx4 = [
        [ -1, -1, 0, -9, -2, -2 ],
        [ -2, -1, -6, -8, -2, -5 ],
        [ -1, -1, -1, -2, -3, -4 ],
        [ -1, -9, -2, -4, -4, -5 ],
        [ -7, -3, -3, -2, -9, -9 ],
        [ -1, -3, -1, -2, -4, -5 ]
    ]--6

myMatrx5 = [
        [ 0, -4, -6, 0, -7, -6 ],
        [ -1, -2, -6, -8, -3, -1 ],
        [ -8, -4, -2, -8, -8, -6],
        [ -3, -1, -2, -5, -7, -4 ],
        [ -3, -5, -3, -6, -6, -6 ],
        [ -3, -6, 0, -8, -6, -7 ]
    ]--19
