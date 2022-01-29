#include <stdio.h>
#include <assert.h>


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
 * determinar la suma de segmentos maxima del arreglo
*/

int segmentoMaximo(int arr[], int length) {
    // N = length
    //{P: N > 0}
    int n = 0,
        u = 0,
        r = 0;
    //{I: r = [Maxp,q: 0<=p<=q<=n: sum.p.q] && 0 <= n <= N && u = [MAXp: 0<=p<=n: sum.p.n]}
    // sum.p.n = [SUMi: p<=i<q: arr.i]
    while (n < length) {
        u = max(u + arr[n], 0);
        r = max(r,u);
        n++;
    }
    //{I: r = [Maxp,q: 0<=p<=q<=N: sum.p.q] }
    // sum.p.n = [SUMi: p<=i<q: arr.i]
    return r;
}

int main() {
    int length;
    printf("Ingrese la longitud del array: ");
    scanf("%d", &length);
    int arr[length];
    pedirArreglo(arr, length);


    int res = segmentoMaximo(arr, length);

    printf("la suma del segmento maximo es: %d\n", res);

    return 0;
}