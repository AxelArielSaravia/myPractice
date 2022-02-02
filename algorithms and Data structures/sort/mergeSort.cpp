#include <iostream>
using namespace std;

//Use recursion

void merge(int arr[], int firstIndex, int midIndex, int lastIndex) {
    int fstLefth = firstIndex;   //first index of lefth arry
    int lstLefth = midIndex;     //last index of lefth arry
    int fstRigth = midIndex + 1; //first index of rigth arry
    int lstRigth = lastIndex;    //last index of rigth arry
    int i = firstIndex;          //the index of total array

    int* buffer = new int [lastIndex+1]; //for the totl size of the merged array
    for (int i = firstIndex; i <= lastIndex; buffer[i] = arr[i], i++);//duplicate the array

    while (fstLefth <= lstLefth && fstRigth <= lstRigth) {
        if (buffer[fstLefth] <= buffer[fstRigth])
            arr[i] = buffer[fstLefth],
            fstLefth++;
        else
            arr[i] = buffer[fstRigth],
            fstRigth++;
        i++;
    }

    while (fstLefth <= lstLefth) 
        arr[i] = buffer[fstLefth],
        i++,
        fstLefth++;
    
    while (fstRigth <= lstRigth) 
        arr[i] = buffer[fstRigth],
        i++,
        fstRigth++;
    delete [] buffer;
}

void mergeSort( int arr[], int firstIndex, int lastIndex ) {
    if (lastIndex <= firstIndex) return;

    int midIndex = (firstIndex+lastIndex) / 2;

    mergeSort(arr, 0, midIndex);
    mergeSort(arr, midIndex+1, lastIndex);
    merge(arr, firstIndex, midIndex, lastIndex);
}

