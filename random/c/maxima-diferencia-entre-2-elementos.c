#include <stdio.h>
#include <limits.h>


void pedirArreglo( int a[], int n_max ){
    int i = 0;
    while( i < n_max ){
        printf( "Ingrese un entero en el indice %d: ", i);
        scanf("%d", &a[i]);
        i++;
    }
    return;
}

int max( int a, int b) {
    return a >= b ? a : b;
}

/**
 * Dado un arreglo arr[0,N) de enteros, 
 * encontrar la maxima diferencia entre dos elementos
 * (en orden el primero menos el segundo) 
*/

int maximaDiferenciaEnter2Elementos(int arr[], int length) {
    //{N>0}
    int n = 1,
        s = arr[0],
        r = INT_MIN;
    
    while (n < length) {
        r = max(r, s-arr[n]);
        s = max(s, arr[n]);
        n++;
    }
    return r;
}

int main() {
    int length;
    printf("Ingrese la longitud del array: ");
    scanf("%d", &length);
    int arr[length];
    pedirArreglo(arr, length);


    int res = maximaDiferenciaEnter2Elementos(arr, length);

    printf("la maxima diferencia entre dos elementos es: %d\n", res);

    return 0;
}