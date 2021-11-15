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
 * Si cada elemento de un array tiene un valor igua; a; factoria; de su posicion
 */
bool valorIgualAlFactorial(int arr[], int length) {
    //{P: length >= 0}
    bool r = true;
    int s = 1;
    int n = 0;
    //{I: r = [Alli: 0<=i<n: arr[i] == i!]} (factorial de i = i!)
    while (n < length) {
        r = r && arr[n] == s;
        n++;
        s *= n; 
    }
    //{Q:  = [Alli: 0<=i<length: arr[i] == i!]}}
    return r;
}

int main() {
    int length;
    printf("Ingrese la longitud de los array: ");
    scanf("%d", &length);
    int arr[length];
    pedirArreglo(arr, length);



    bool res = valorIgualAlFactorial(arr, length);

    printf("todos los valores son iguales al factorial de su indice: %s\n", res ? "true" : "false");

    return 0;
}