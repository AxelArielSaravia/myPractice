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
bool esCreciente(int arr[], int length) {
    //{P: N > 0}
    bool r = true;
    int n = 1;
    while (n < length) {
        r = r && arr[n-1] <= arr[n];
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


    int res = esCreciente(arr, length);

    printf("es creciente el array: %s\n", res ? "true" : "false");

    return 0;
}