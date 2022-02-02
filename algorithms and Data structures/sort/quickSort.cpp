#include <iostream>
#include "utility.hpp"
#define MAX 10
using namespace std;



int partition( int arr[], int iStart, int iEnd ) {
    int pivot = arr[iEnd];
    int pIndex = iStart;
    for (int i = iStart; i < iEnd; i++){
        if (arr[i] <= pivot)
            swap(arr, i, pIndex),
            pIndex++;
    }
    swap(arr, pIndex, iEnd);
    return pIndex;
}


void quickSort( int arr[], int iStart,int iEnd ) {
    if (iStart < iEnd) {
        int pIndex = partition(arr, iStart, iEnd);
        quickSort(arr, iStart, pIndex-1);
        quickSort(arr, pIndex+1, iEnd);
    }
}

int main(void) {
    int arr[MAX];
    arrayRandomInitializer(arr, MAX);

    cout<<"Arr:"<<endl;
    displayArray(arr, MAX);

    quickSort(arr, 0, MAX-1);

    displayArray(arr, MAX);

    return 0;
}