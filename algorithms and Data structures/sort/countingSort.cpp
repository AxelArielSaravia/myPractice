/**
 * Counting sort is a stable sorting technique,
 * which is used to sort objects according to the keys that are small numbers. 
 * It counts the number of keys whose key values are same. 
 * This sorting technique is effective when the difference between different keys are not so big, 
 * otherwise, it can increase the space complexity.
 * 
 * Time Complexity: O(n+r)
 * Space Complexity: O(n+r)
 * 
 * 
 * Example:
 * Array: [2,4,6,3,2,6,8,9,1,2,5,0,0,4]
 * Max value: 9
 * Count Array[9]
 * 
 * Values [0,1,2,3,4,5,6,7,8,9]
 * Count  [1,1,3,2,2,1,2,0,1,1]
 * 
 * result [0,1,2,2,2,3,3,4,4,5,6,6,8,9]
 */

#include <iostream>
#include "utility.hpp"
using namespace std;

/**
 * @brief Get the MAX element of an array
 */
int getMax (int arr[], int size) {
  int max = arr[1];
  for (int i = 2; i <= size; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}


void countSort(int *arr, int size) {
  int i,
      MAX_LENGTH = getMax(arr, size) + 1,
      output[size],
      count[MAX_LENGTH];

  //Initialize count array to zero
  for (i = 0; i < MAX_LENGTH; i++) {
    count[i] = 0;
  }
  
  //Increase number count in count array
  for (i = 0; i < size; i++) {
    count[arr[i]]++;
  }
  cout << "Count Array: ";
  displayArray(count, MAX_LENGTH);

  //find cumulative frequency
  for (i = 1; i < MAX_LENGTH; i++) {
    count[i] += count[i - 1];
  }
  cout << "Count Array after cumulative: ";
  displayArray(count, MAX_LENGTH);

  //decrease count for same numbers
  for (i = size - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  displayArray(output, MAX_LENGTH);
  
  //store output array to main array
  for (i = 0; i < size; i++) {
    arr[i] = output[i];
  }
}

int * _countSort_(int *arr, int size) {
  int i,
      MAX_LENGTH = getMax(arr, size) + 1,
      output[size],
      count[MAX_LENGTH];

  //Initialize count array to zero
  for (i = 0; i < MAX_LENGTH; i++) {
    count[i] = 0;
  }
  
  //Increase number count in count array
  for (i = 0; i < size; i++) {
    count[arr[i]]++;
  }


  //find cumulative frequency
  for (i = 1; i < MAX_LENGTH; i++) {
    count[i] += count[i - 1];
  }

  //decrease count for same numbers
  for (i = size - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  return output;
}

int main() {
  /*   
    int n;
    cout << "Enter the number of elements: ";
    cin >> n;
    //Create an array with given number of elements
    int arr[n + 1];
    cout << "Enter elements: " << endl;

    for (int i = 1; i <= n; i++) {
      cin >> arr[i];
    } 
  */
  int arr[14] = {2,4,6,3,2,6,8,9,1,2,5,0,0,4};

  cout << "Array Before Sorting: ";
  displayArray(arr, 14);

  countSort(arr, 14);
  return 0;
}
