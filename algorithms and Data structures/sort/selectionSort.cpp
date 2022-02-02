#include <iostream>

using namespace std;

//SELECTION SORT always O(n^2)
void simpleSort( int arr[], int size ) {
    for (int i = 0; i < size-1; i++) {
        for (int j = i+1; j < size; j++) {
            //asending order
            if( arr[j] < arr[i] )
                swap(arr, i, j);
            //descendig order
            //if( arr[j] > arr[i] )
            //    swap(arr, i, j);
        }
    }
    return;
}

//other form to write
int indexOfSmallest( int arr[], int size, int index ) {
    int i = index;
    int j = i;
    cout<<"--- Sub-iteration: ";
     while (i < size) {
        if (arr[i] < arr[j]) 
            j = i;
        cout<<i<<" ";
        i++;
    }
    cout<<endl;
    return j;
}

void selectionSort( int arr[], int size ) {
    int i = 0;
    cout<<"Iterations: \n";
    while (i < size-1) {
        cout<<" "<<i<<" ";
        int j = indexOfSmallest(arr, size, i);
        swap(arr, i, j);
        i++;
    }
    return;
}
//arr1 {1,2,4,3,5,6}; -> {1,2,3,4,5,6}
//arr2 {4,2,6,1,3,5}; -> 
//arr3 {1,3,2,5,4,6}; -> 
//arr4 {3,5,2,6,1,4}; -> 