#include <stdio.h>

//input
//enteros
int pedirEntero( void ){
    int x;
    printf("Ingrese un entero: ");
    scanf("%d", &x);
    return x;
}

int pedirEnteroGen( char* s ){
    int x;
    printf("%s", s);
    scanf("%d", &x);
    return x;
}

void pedirArreglo( int a[], int n_max ){
    int i = 0;
    while( i < n_max ){
        printf( "Ingrese un entero en el indice %d: ", i);
        scanf("%d", &a[i]);
        i++;
    }
    return;
}

//float
void pedirArregloF( float a[], int n_max ){
    int i = 0;
    while( i < n_max ){
        printf( "Ingrese un flotante en el indice %d: ", i);
        scanf("%f", &a[i]);
        i++;
    }
    return;
}

//output
//entero
void imprimirEntero( char* c, int x){
    printf("%s%d\n", c, x);
    return;
}

void imprimirArreglo( int a[], int n_max ){
    int i = 0;
    while( i < n_max ){
        printf("Array[%d]: %d\n", i, a[i]);
        i++;
    }
    return;
}



//sumar elementos del array
int sumArray( int arr[], int length ) {
    int n = 0,
        x = 0;
    while (n < length) {
        x += arr[n];
        n++;
    }
    return x;
}
