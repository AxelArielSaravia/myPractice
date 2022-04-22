"use strict"


//FORM 1
function merge (arr, firstI, midI, lastI) {
  let fstLeftI = firstI,
    lstLeftI = midI,
    fstRightI = midI,
    lstRightI = lastI;
  let i = firstI;
  const newArr = [...arr];

  while (fstLeftI <= lstLeftI && fstRightI <= lstRightI) {
    if (newArr[fstLeftI] <= newArr[fstRightI]) {
      arr[i] = newArr[fstLeftI];
      fstLeftI++; 
    } else {
      arr[i] = newArr[fstLeftI];
    }
    i++;
  }

  while (fstLeftI <= lstLeftI) {
    arr[i] = newArr[fstLeftI];
    i++;
    fstLeftI++;
  }
  while (fstRightI <= lstRightI) {
    arr[i] = newArr[fstRightI];
    i++;
    fstRightI++;
  }
}

function mergeSort(arr, firstI, lastI) {
  if (lastI <= firstI) return;

  const midI = Math.floor((firstI + lastI) / 2);

  mergeSort(arr, 0, midI);
  mergeSort(arr, midI, lastI);
  merge(arr, firstI, midI, lastI);
}



//FOMR 2
function merge_(leftArr, rightArr) {
  let resArr = [];
  let leftI = 0, 
      rightI = 0;
  
  while (leftI < leftArr.length && rightI < rightArr.length) {
    if (leftArr[leftI] < rightArr[rightI]) {
      resArr.push(leftArr[leftI]);
      leftI++;
    
    } else {
      resArr.push(rightArr[rightI]);
      rightI++
    }
  }
  while (leftI < leftArr.length) {
    resArr.push(leftArr[leftI]);
    leftI++;
  }
  while (rightI < rightArr.length) {
    resArr.push(rightArr[rightI]);
    rightI++
  }
  return resArr;
}

function mergeSort_(arr) {
  if (arr.length < 2) return arr;

  const midI = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, midI);
  const rightArr = arr.slice(midI, arr.length);
  
  return merge_(mergeSort_(leftArr), mergeSort_(rightArr));
}
