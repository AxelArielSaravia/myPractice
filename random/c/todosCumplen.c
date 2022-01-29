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
 * Dado un arreglo arr[0,N) de enteros, 
 * hacer un programa que cumpla Q: r = [Alli : 0 <= i < N : A.(N-(i+1)) <= 2^i]
 */

bool myFunction(int arr[], int length) {
    // N = length
    // A = arr
    //{P: N>=0}
    bool r = true;
    int s = 1;
    int n = 0;
    //{I: r = [Alli : 0 <= i < N : A.(N-(i+1)) <= 2^i] AND 0 <= n <= N AND }
    while (n < length) {
        r = r && arr[length-(n+1)] <= s;
        printf("is t: %d <= s: %d ? r: %d;  n <- %d;\n", arr[length-(n+1)],s,r,n);
        s *= 2;
        n++;
    }
    //{Q}
    return r;
}
int main() {
    int length;
    printf("Ingrese la longitud de los array: ");
    scanf("%d", &length);
    int arr[length];
    pedirArreglo(arr, length);



    bool res = myFunction(arr, length);

    printf("respuesta: %s\n", res ? "true" : "false");

    return 0;
}