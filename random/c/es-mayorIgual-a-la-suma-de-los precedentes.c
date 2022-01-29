#include <stdio.h>
#include <assert.h>
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
 * determinar si alguno de sus elementos es igual a la suma de todos los elementos que lo preceden
*/

bool esMayorIgualALaSumaDeLosPrecedentes(int arr[], int length) {
    //{P: N > 0}
    assert(length > 0);
    int n = 0,
        s = 0;
    bool r = false;
    //{I: r = [∃i: 0<=i<n: arr.i = sum.i] && 0<= n <= N && s = sum.n}
    //nota: sum.i = [Σj: 0 <=j<i: A.j]
    while (n < length && !r) {
        r = r || arr[n] == s;
        s += arr[n];
        n++;
    }
    //{Q: r = [∃i: 0<=i<length: arr.i = sum.i]}
    return r;
} 
int main() {
    int length;
    printf("Ingrese la longitud del array: ");
    scanf("%d", &length);
    int arr[length];
    pedirArreglo(arr, length);


    int res = esMayorIgualALaSumaDeLosPrecedentes(arr, length);

    printf("¿existe un elemento que es igual a la suma de todos los elementos que lo preceden?: %s\n", res ? "true":"false" );

    return 0;
}