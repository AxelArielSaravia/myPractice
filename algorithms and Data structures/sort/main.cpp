#include <iostream>
#include "utility.hpp"
#include "selectionSort.cpp"
#include "bubbleSort.cpp"
#include "intersectionSort.cpp"
#include "mergeSort.cpp"
#define MAX 10
using namespace std;

int main( void ) {
    int arr1[MAX];
    int arr2[MAX];
    arrayRandomInitializer(arr1, MAX);
    arrayRandomInitializer(arr2, MAX);

    int arr1b[MAX];
    int arr2b[MAX];
    copyArray(arr1, arr1b, MAX);
    copyArray(arr2, arr2b, MAX);

    int arr1c[MAX];
    int arr2c[MAX];
    copyArray(arr1, arr1c, MAX);
    copyArray(arr2, arr2c, MAX);

    int arr1d[MAX];
    int arr2d[MAX];
    copyArray(arr1, arr1d, MAX);
    copyArray(arr2, arr2d, MAX);

    cout<<"SELECTION SORT\n"<<endl;
    cout<<"arr1: ";
    displayArray(arr1, MAX);
    selectionSort(arr1, MAX);
    displayArray(arr1, MAX);
    cout<<endl;

    cout<<"arr2: ";
    displayArray(arr2, MAX);
    selectionSort(arr2, MAX);
    displayArray(arr2, MAX);
    cout<<endl;

    cout<<"BOOBLE SORT\n"<<endl;
    cout<<"arr1: ";
    displayArray(arr1b, MAX);
    bubbleSort(arr1b, MAX);
    displayArray(arr1b, MAX);
    cout<<endl;

    cout<<"arr2: ";
    displayArray(arr2b, MAX);
    bubbleSort(arr2b, MAX);
    displayArray(arr2b, MAX);
    cout<<endl;

    cout<<"INSERTION SORT\n"<<endl;
    cout<<"arr1: ";
    displayArray(arr1c, MAX);
    insertionSort(arr1c, MAX);
    displayArray(arr1c, MAX);
    cout<<endl;

    cout<<"arr2: ";
    displayArray(arr2c, MAX);
    insertionSort(arr2c, MAX);
    displayArray(arr2c, MAX);
    cout<<endl;
    
    cout<<"MERGE SORT\n"<<endl;
    cout<<"arr1: ";
    displayArray(arr1d, MAX);
    mergeSort(arr1d, 0, MAX-1);
    displayArray(arr1d, MAX);
    cout<<endl;

    cout<<"arr2: ";
    displayArray(arr2d, MAX);
    mergeSort(arr2d, 0, MAX-1);
    displayArray(arr2d, MAX);
    cout<<endl;
    return 0;
}