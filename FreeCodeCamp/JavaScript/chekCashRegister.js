/**
 *  
 * Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.
 * cid is a 2D array listing available currency.
 * 
 * The checkCashRegister() function should always return an object with a status key and a change key.
 * 
 * Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.
 * 
 * Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.
 * 
 * Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.
 * 
 * Currency Unit	Amount
 * Penny	$0.01 (PENNY)
 * Nickel	$0.05 (NICKEL)
 * Dime	$0.1 (DIME)
 * Quarter	$0.25 (QUARTER)
 * Dollar	$1 (ONE)
 * Five Dollars	$5 (FIVE)
 * Ten Dollars	$10 (TEN)
 * Twenty Dollars	$20 (TWENTY)
 * One-hundred Dollars	$100 (ONE HUNDRED)
 *
*/
function checkCashRegister(price, cash, cid) {

    //Virify if price and cash is a number, and if cid is an array
    if( typeof price !== 'number' ) return Error('price must be a number');
    else if( typeof cash !== 'number' ) return Error('price must be a number');
    else if( !(cid instanceof Array) ) return Error('cid must be an Array');
    //verify if it can pay
    else if( cash - price < 0 ) return Error('cash is minor to price');

    //table of units; value * 100 
    const units = {
        "ONE HUNDRED": 10000,
        "TWENTY": 2000,
        "TEN": 1000,
        "FIVE": 500,
        "ONE": 100, 
        "QUARTER": 25, 
        "DIME": 10, 
        "NICKEL": 5, 
        "PENNY": 1
    }
    //status messages
    const statusMsg = ["INSUFFICIENT_FUNDS", "CLOSED", "OPEN"];
    

    //variables
    let drawer = cid.reduce((newArr, e) => {
        newArr.push([e[0], e[1] * 100]);
        return newArr;
    }, []);

    let changeNum = (cash - price) * 100;

    //functions
    const insufficientFunds = () => {
        let founds = 0
        for( let i = drawer.length - 1; i >= 0; i-- ){
            if( units[drawer[i][0]] <= changeNum ) founds += drawer[i][1];
        }
        return (founds < changeNum)? true : false;
    }

    const isClosed = () => {
        let founds = drawer.reduce( (acc, cur) => { return acc + cur[1]; }, 0);
        return ( changeNum === founds )? true : false; 
    }

    //this function modify the array drawer
    const change = () => {
        let n = 0;
        let changeArr = [];
        for( let i = drawer.length - 1; i >= 0; i-- ){
            let unitName = drawer[i][0];

            //si el valor de la unidad es menor igual al valor del cambio 
            //Y el valor de la unidad de cartera es mayor o igual al valor de la unidad
            if( units[unitName] <= changeNum && drawer[i][1] >= units[unitName] ){ 
                
                //mientras el valor de la unidad de cartera es mayor o igual al valor de la unidad
                // Y la divicion entre el cambio y la unidad de cartera sea mayor o igual a 1
                while(drawer[i][1] >= units[unitName] && changeNum / units[unitName] >= 1 ){
                    //el numero de cambio de cada uniad 
                    n += units[unitName];
                    //restamos el cambio que ya tenemos
                    changeNum -= units[unitName];
                    //y restamos la cartera 
                    drawer[i][1] -= units[unitName];
                }
                changeArr.push([unitName, n / 100]);
                n = 0;
            }
        }
        return changeArr;
    }

    //Output
    //revisamos si hay suficientes fondos
    if( insufficientFunds() ) return { status: statusMsg[0], change: [] };
    //si el total de nuestros fondos es igual a el cambio, la cartera esta cerrada
    else if( isClosed() ) return { status: statusMsg[1], change: cid };
    
    else return { status: statusMsg[2], change: change() };
}

console.log(checkCashRegister(19.5, 20, [
    ["PENNY", 1.01], 
    ["NICKEL", 2.05], 
    ["DIME", 3.1], 
    ["QUARTER", 4.25], 
    ["ONE", 90], 
    ["FIVE", 55], 
    ["TEN", 20], 
    ["TWENTY", 60], 
    ["ONE HUNDRED", 100]]
));
console.log(checkCashRegister(3.26, 100, [
    ["PENNY", 1.01], 
    ["NICKEL", 2.05], 
    ["DIME", 3.1], 
    ["QUARTER", 4.25], 
    ["ONE", 90], 
    ["FIVE", 55], 
    ["TEN", 20], 
    ["TWENTY", 60], 
    ["ONE HUNDRED", 100]]
));
console.log(checkCashRegister(19.5, 20, [
    ["PENNY", 0.01], 
    ["NICKEL", 0], 
    ["DIME", 0], 
    ["QUARTER", 0], 
    ["ONE", 0], 
    ["FIVE", 0], 
    ["TEN", 0], 
    ["TWENTY", 0], 
    ["ONE HUNDRED", 0]]
));
console.log(checkCashRegister(19.5, 20, [
    ["PENNY", 0.01], 
    ["NICKEL", 0], 
    ["DIME", 0], 
    ["QUARTER", 0], 
    ["ONE", 1], 
    ["FIVE", 0], 
    ["TEN", 0], 
    ["TWENTY", 0], 
    ["ONE HUNDRED", 0]]
));
console.log(checkCashRegister(19.5, 20, [
    ["PENNY", 0.5], 
    ["NICKEL", 0], 
    ["DIME", 0], 
    ["QUARTER", 0], 
    ["ONE", 0], 
    ["FIVE", 0], 
    ["TEN", 0], 
    ["TWENTY", 0], 
    ["ONE HUNDRED", 0]]
));