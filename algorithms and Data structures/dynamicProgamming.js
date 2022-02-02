//FIBONACCI EXAMPLE
function fibBottomUp(n) {
    if (n > 1) {
        const F = [0,1];

        for (let i = 2; i <= n; i++) {
            F[i] = F[i - 1] + F[i - 2]
        }
        return F[n]
    } else {
        return (n < 0) ? new Error("The argument must be 0 or positive integer") : n;
    }
}

function fibTopDown(n) {
    if (arguments.length === 0) return undefined;
    if (n < 0) return new Error("The argument must be 0 or positive integer");
    
    const memo = {_0: 0, _1: 1}
    const recursive = (i) => {
        if (i === 0 || i === 1) return i;
        if (!memo[`_${i}`]) {
            memo[`_${i}`] = recursive(i-1) + recursive(i-2)
        }
        return memo[`_${i}`];
    }
    return recursive(n);
    
}
