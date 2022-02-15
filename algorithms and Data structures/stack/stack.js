/**
 * Use Array
 */
class Stack {
    #stack
    /**
     * @param {Array} stack 
     */
    constructor(stack) {
        this.#stack = stack || [];
    }

    /**
     * @returns {number}
     */
    get length() {return this.#stack.length}

    /**
     * @param {Any} x 
     * @returns {bool}
     */
    push(x) {
        try {
            this.#stack.push(x);
            this.length = this.#stack.length;
            return true;
        } catch (err) {
            console.error(err);
            return false;
        } 
    }

    /**
     * @returns {bool}
     */
    isEmpty() { return this.length === 0 }

    /**
     * @returns {Any}
     */
    top() {return this.#stack[this.length-1]}

    /**
     * @returns {bool}
     */
    pop() {
        if (this.isEmpty()) return false;
        this.#stack.pop();
        this.length = this.#stack.length;
        return true;
    }

    getMin() {
        return this.#stack.reduce((acc, el) => {
            return acc = Math.min(el, acc);
        })
    }
}

/**
 * Use ListNode
 */
class DynamicStack {
    #val;
    #next;
    
    /**
     * @param {Array} arr 
     * @returns {DynamicStack | false}
     */
    static fromArray(arr) {
        try {
            let list = new DynamicStack();
            list.#val = (arr[arr.length-1] === undefined)? null: arr[arr.length-1];
            let nextList = list;

            for (let i = arr.length-2; i >= 0; i--) {
                nextList.#next = new DynamicStack();
                nextList = nextList.#next;
                nextList.#val = arr[i];
            }
            return list;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    /**
     * @param  {...any} vals 
     */
    constructor(...vals) {
        this.#val = null;
        this.#next = null;
        
        if (vals.length > 0) {
           let list = DynamicStack.fromArray(vals);
           this.#val = list.#val;
           this.#next = list.#next;
           list = null;
        }
    }
    

    /**
     * @return {{value, next}}
     */
    get view() {
        let obj = { value: this.#val, next: this.#next };
        let objNext = obj.next;
        let listNext = this.#next;
        while (listNext !== null) {
            objNext.value = listNext.#val;
            objNext.next = listNext.#next;
            objNext = objNext.next;
            listNext = listNext.#next;
        }
        return obj;
    }

    /**
     * @returns {number}
     */
    get length() {
        let n = 0;
        let listNext = (this.isEmpty()? null : this);
        while (listNext !== null) {
            listNext = listNext.#next;
            n++;
        }
        return n;
    }
    
    /**
     * @returns {any}
     */
    get top() { return this.#val; }

    /**
     * @returns {any}
     */
    get bottom() { 
        let listNext = (this.isEmpty()? null : this);
        while (listNext.#next !== null) listNext = listNext.#next;
        return listNext.#val; 
    }
    
    /**
     * @returns {bool}
     */
    isEmpty() { return (this.#val === null && this.#next === null); }

    /**
     * @param {*} value 
     * @returns {bool}
     */
    push(value) {
       try {
           if (this.isEmpty()) this.#val = value;
           else {
               let newList = new DynamicStack(this.#val);
               newList.#next = this.#next;
    
               this.#val = value;
               this.#next = newList;
           } 
    
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    
    /**
     * @returns {bool} 
     */
    pop() {
        if (this.isEmpty()) return false;
        if (this.#next === null) this.#val = null;
        else {
            this.#val = this.#next.#val;
            this.#next = this.#next.#next;
        }
        return true;
    }
    
    /**
     * @returns {Object | false} 
     */
    toObject() {
        let obj = {}
        let listNext = (this.isEmpty()? null : this);
        let n = this.length()-1;
        while (listNext !== null) {
            obj[n] = listNext.#val;
            listNext = listNext.#next;
            n--;
        }
        return obj;
    }

    /**
     * @returns {Array}
     */
    toArray() {
        let arr = [];
        let listNext = (this.isEmpty()? null : this);
        while (listNext !== null) {
            arr = [listNext.#val ,...arr];
            listNext = listNext.#next;
        }
        return arr;
    }

    toString() {
        let str = "";
        let listNext = (this.isEmpty()? null : this);
        while (listNext !== null) {
            str = listNext.#val + "" + str;
            listNext = listNext.#next;
        }
        return str;
    }
}