#include <iostream>
using namespace std;

//UTILITY functions
void arrayRandomInitializer( int arr[], int size ) {
    for (int i = 0; i < size; arr[i++] = rand() / 100000);
    return;
}

void displayArray( int arr[], int size ) {
    for (int i = 0; i < size; cout<<arr[i++]<<" ");
    cout<<endl;
    return;
}

void copyArray( int a1[], int a2[], int size ) {
    for (int i = 0; i < size; i++) 
        a2[i] = a1[i]; 
    return;
}

void swap( int arr[], int firstI, int secondI ) {
    int temp = arr[firstI];
    arr[firstI] = arr[secondI];
    arr[secondI] = temp;
    return;
}
