#include <iostream>
using namespace std;

//Use recursion

void merge(int arr[], int firstIndex, int midIndex, int lastIndex) {
    int fstLeft = firstIndex;   //first index of lefth arry
    int lstLeft = midIndex;     //last index of lefth arry
    int fstRight = midIndex + 1; //first index of rigth arry
    int lstRight = lastIndex;    //last index of rigth arry
    int i = firstIndex;          //the index of total array

    int* buffer = new int [lastIndex+1]; //for the totl size of the merged array
    for (int i = firstIndex; i <= lastIndex; buffer[i] = arr[i], i++);//duplicate the array

    while (fstLeft <= lstLeft && fstRight <= lstRight) {
        if (buffer[fstLeft] <= buffer[fstRight])
            arr[i] = buffer[fstLeft],
            fstLeft++;
        else
            arr[i] = buffer[fstRight],
            fstRight++;
        i++;
    }

    while (fstLeft <= lstLeft) 
        arr[i] = buffer[fstLeft],
        i++,
        fstLeft++;
    
    while (fstRight <= lstRight) 
        arr[i] = buffer[fstRight],
        i++,
        fstRight++;
    delete [] buffer;
}

void mergeSort( int arr[], int firstIndex, int lastIndex ) {
    if (lastIndex <= firstIndex) return;

    int midIndex = (firstIndex+lastIndex) / 2;

    mergeSort(arr, 0, midIndex);
    mergeSort(arr, midIndex+1, lastIndex);
    merge(arr, firstIndex, midIndex, lastIndex);
}

