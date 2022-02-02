#include <stdio.h>
#include <stdbool.h>


/********* LINEAR SEARCH ********/
//costo O(n)
int linerSearch( int arr[], int length, int element ) {
    for (int i = 0; i < length; i++)
        if (arr[i] == element) 
            return i;
    return -1;
}

/******** BINARY SEARCH ********/
//tiene como pre condicion que el array tiene que estar ordenado
//costo O(log(n))
//acorta por mitades la busqueda
int indexOf( int arr[], int length, int element ) {
    //is used only if the array is sort
    int low = 0;
    int high = length-1;

    while (low <= high) {

        int mid = (low + high) / 2; //always is an integer,
        //is better to use low + (high - low)/ 2;

        //printf("low: %d\nhigh: %d\nmid: %d\n", low, high, mid);
        
        if (arr[mid] == element) 
            return mid; //finish
        else if  (element < arr[mid]) 
            high = mid-1;
        else 
            low = mid+1;
    }
    return -1;
}

int recursiveIndexOf( int arr[], int low, int high, int element ) {
    if(low > high) return -1; //base condition
    int mid = low + (high - low) / 2;

    printf("low: %d\nhigh: %d\nmid: %d\n", low, high, mid);

    if (element == arr[mid]) //base condition
        return mid;
    else if ( element < arr[mid]) 
        return binarySearchRecursive(arr, low, mid-1, element);
    else 
        return binarySearchRecursive(arr, mid+1, high, element);
}

//este nos devuelve el primer indice donde esta el elemento
int firstIndexOf( int arr[], int length, int element ){
    //is used only if the array is sort
    int low = 0;
    int high = length-1;
    int result = -1;

    while (low <= high) {
        int mid = (low + high) / 2; //always is an integer,
        //printf("low: %d\nhigh: %d\nmid: %d\n", low, high, mid);
        if(arr[mid] == element) {
            result = mid;
            high = mid-1;
        }
        else if (element < arr[mid])
            high = mid-1;
        else 
            low = mid+1;
    }
    return result;
}

//este nos devuelve el ultimo indice donde esta el elemento
int lastIndexOf( int arr[], int length, int element ) {
    //is used only if the array is sort
    int low = 0;
    int high = length-1;
    int result = -1;

    while (low <= high) {
        int mid = (low + high) / 2; //always is an integer,
        //printf("low: %d\nhigh: %d\nmid: %d\n", low, high, mid);
        if(arr[mid] == element ){
            result = mid;
            low = mid+1;
        }
        else if (element < arr[mid])
            high = mid-1;
        else 
            low = mid+1;
    }
    return result;
}

//margin the both function above
int firstOrLastIndexOf( int arr[], int length, int element, bool searchFirst ) {
    //is used only if the array is sort
    int low = 0;
    int high = length-1;
    int result = -1;

    while (low <= high) {
        int mid = (low + high) / 2; //always is an integer,
        //printf("low: %d\nhigh: %d\nmid: %d\n", low, high, mid);
        if (arr[mid] == element) {
            result = mid;
            if(searchFirst) high = mid-1;
            else  low = mid+1;
        }
        else if (element < arr[mid])
            high = mid-1;
        else 
            low = mid+1;
    }
    return result;
}

///QUEREMOS SABER CUANTAS VECES SE REPITE UN NUMERO
int howMany( int arr[], int length, int element ) {
    int first = binarySearchTheFirst(arr, length, element);
    int last = binarySearchTheLast(arr, length, element);
    return (last - first + 1);
}

//ENCONTRAR CUANTAS VECES UN ARRAY FUE ROTADO CIRCULARMENTE CON BINARY SEARACH
int circularRotationCount( int a[], int size ) {
    int low = 0;
    int high = size-1;
    while (low <= high) {

        if (a[low] <= a[high]) 
            return low;

        int mid = (low + high) / 2;
        int next = (mid + 1) % size; //asi caalculamos el eleemento siguiente o anterior sin tener problemas con los limites del array
        int prev = (mid + size - 1) % size;

        if (a[mid] <= a[high] && a[mid] <= a[prev]) 
            return mid;
        else if (a[mid] <= a[high])  //acotamos el array a la mitad para la izquierda
            high = mid-1;
        else if (a[mid] >= a[low]) //acotamos el array a la mitad para la derecha
            low = mid+1;
    }
}

//ENCONTRAR ELEMENTOS EN UN ARRAY ROTADO CIRCULARMENTE
int circularArraySearch( int a[], int size, int el ) {
    int low = 0;
    int high = size-1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (el == a[mid]) 
            return mid;
        if (a[mid] <= a[high]) {
            if (el > a[mid] && el<= a[high])
                low = mid+1;
            else
                high = mid-1;
        }
        else{
            if (el >= a[low] && el < a[mid])
                high =mid-1;
            else
                low = mid+1;
        }
    }
}
