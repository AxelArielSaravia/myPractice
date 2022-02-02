#include <stdio.h>
#include <stdbool.h>
#include "binarySearch.h"

int main(void){
    int arr[7] = {1,2,3,3,3,6,7};
    int i = 7;
    int el; 
    printf("Enter a Integer: ");
    scanf("%d", &el);

    int bs = indexOf2(arr, i, el);
    (bs > -1)
            ? printf("%d is in the index: %d\n", el, bs)
            : printf("%d is not found\n", el);

    int bsLAST = firstOrLastIndexOf(arr, i, el, false);
    (bsLAST > -1)
            ? printf("The last index of %d is: %d\n", el, bsLAST)
            : printf("%d is not found\n", el);

    int howmany = howMany(arr, i, el);
    printf("There are %d %ds in the array\n", howmany, el);

    return 0;
}
