/* si en el array el numero es par multiplicar por 2 y si es impar por 3
*/

const nums = [1,2,3,4,5];

function modifyArray(nums) {
    const array = []
    nums.forEach(i => {
        if (i % 2 == 0) return array.push(i * 2);
        else return array.push(i * 3);
    })
    console.log(array);
    return array
}
modifyArray(nums)


//otra forma
function modifyArray2(nums) {

    nums.forEach((element, index) => {
	   nums[index] = element * (2 + element%2);
    });
    console.log(nums);
    return nums;
}
modifyArray2(nums)