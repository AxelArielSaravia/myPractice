#include <iostream>
using namespace std;

//INSERTION SORT from O(n^2) to O(n)
void insertInThis( int arr[], int index ) {
    int key = arr[index];
    int j = index-1;
    cout<<"--- Sub-Iterations: ";
    while (j >= 0 && arr[j] > key) {
        arr[j+1] = arr[j];
        cout<<j<<" ";
        j--;
    }
    cout<<endl;
    arr[j+1] = key;
    return;
}

void insertionSort( int arr[], int size ) {
    int i = 1;
    cout<<"Iterations: \n";
    while (i < size) {
        cout<<" "<<i<<" ";
        insertInThis(arr, i);
        i++;
    }
    return;
}
//arr1 {1,2,4,3,5,6}; -> {1,2,3,4,5,6}
//arr2 {4,2,6,1,3,5}; -> {2,4,6,1,3,5} -> {1,2,4,6,3,5} -> {1,2,3,4,6,5} -> {1,2,3,4,5,6}
//arr3 {1,3,2,5,4,6}; -> {1,2,3,5,4,6}
//arr4 {3,5,2,6,1,4}; -> 
