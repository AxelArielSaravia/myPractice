const trampoline = fn => (...args) => {
    let result = fn(...args);
    while (typeof result === 'function'){
        result = result();
    }
    return result;
}


const sumatoria = (number, sum = 0) => {
    return (number === 0)
        ? sum
        : () => sumatoria( number - 1, sum + number);
}

const tsuma = trampoline(sumatoria)

const r = tsuma(10000000)
console.log(r)