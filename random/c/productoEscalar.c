#include <stdio.h>
#include <stdbool.h>


void pedirArreglo( int a[], int n_max ){
    int i = 0;
    while( i < n_max ){
        printf( "Ingrese un entero en el indice %d: ", i);
        scanf("%d", &a[i]);
        i++;
    }
    return;
}

/** 
 * Verificar si un arreglo de enteros esta ordenado en forma creciente
 */
int productoEscalar(int A[], int B[], int length) {
    int r = 0,
        n = 0;
    while (n < length) {
        r += A[n] * B[n];
        n++;
    }

    return r;
}

int main() {
    int length;
    printf("Ingrese la longitud de los array: ");
    scanf("%d", &length);

    int arrA[length];
    int arrB[length];
    
    printf("Array A\n");
    pedirArreglo(arrA, length);
    printf("Array B\n");
    pedirArreglo(arrB, length);


    int res = productoEscalar(arrA, arrB, length);

    printf(" el producto escalar de dos array es: %d\n", res);

    return 0;
}