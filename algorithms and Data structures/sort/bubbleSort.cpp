#include <iostream>
#include "utility.hpp"

using namespace std;

//BUBBLE SORT from O(n^2) to O(n)
bool bubble( int arr[], int size, int firstI ) {
    int i = size-1;
    int swapCount = 0;
    cout<<"--- Sub-iterations: ";
    while (i > firstI) {
        if (arr[i] < arr[i-1]) 
            swap(arr, i, i-1),
            swapCount++;
        cout<<i<<" ";
        i--;
    }
    cout<<endl;
    return swapCount > 0 ? true : false;
}

void bubbleSort( int arr[], int size ) {
    int i = 0;
    bool b = true;
    cout<< "Iterations: \n";
    while (i < size-1 && b) {
        cout<<" "<<i<<" ";
        b = bubble(arr, size, i);
        i++;
    }
    return;
}
//arr1 {1,2,4,3,5,6}; -> {1,2,3,4,5,6}
//arr2 {4,2,6,1,3,5}; -> {1,4,2,6,3,5} -> {1,2,4,3,6,5} -> {1,2,3,4,5,6}
//arr3 {1,3,2,5,4,6}; -> {1,2,3,4,5,6}
//arr4 {3,5,2,6,1,4}; -> {1,3,5,2,6,4} -> {1,2,3,5,4,6} -> {1,2,3,4,5,6}