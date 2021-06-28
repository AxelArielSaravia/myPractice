const nums = [2,3,6,6,5]
nums.sort()

function getSecondLargest(nums) {
    let largest = nums[0];
    let secondLargest = nums[0];

    for (n in nums) {
        if (nums[n] > largest){
            secondLargest = largest
            largest = nums[n]
        }
        if (nums[n] > secondLargest && nums[n] < largest){
            secondLargest = nums[n]
        }
    }
    return secondLargest;
}
getSecondLargest(nums)





// function getSecondLargest(nums) {
//     console.log( nums.slice(4).toString());
// }
// getSecondLargest(nums)