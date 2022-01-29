#include <stdio.h>
#include <stdbool.h>


void pedirArreglo( double a[], int n_max ){
    int i = 0;
    while( i < n_max ){
        printf( "Ingrese un entero en el indice %d: ", i);
        scanf("%lf", &a[i]);
        i++;
    }
    return;
}

/** 
 * calcular la varianza de los valores almacenados en un array
 * nota: la varianza de n valores {x_1,...,x_n} se define: [SUMi: 1<=i<=n: (x_i - prom.x)^2]/n
 */

double promedioArray(double arr[], int length) {
    double r = arr[0];
    int n = 1;
    while (n < length) {
        r += arr[n];
        n++;
    }
    r /= (double)length;
    return r;
}
double invarianzaArray(double arr[], int length) {
    double p = promedioArray(arr, length);
    double r = (arr[0] - p) * (arr[0] - p);
    int n = 1;
    while (n < length) {
        r += (arr[n] - p) * (arr[n] - p);
        n++;
    }
    r /= (double)length;

    return r;
}

int main() {
    int length;
    printf("Ingrese la longitud de los array: ");
    scanf("%d", &length);
    double arr[length];
    pedirArreglo(arr, length);



    double res = invarianzaArray(arr, length);

    printf("la invarianza es: %lf\n", res);

    return 0;
}