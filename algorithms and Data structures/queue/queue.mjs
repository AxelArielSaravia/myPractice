/**
 * Use Arrays
 */
export class Queue {
    #queue;
    /**
     * @param {Array} queue 
     */
    constructor(queue) {
        this.#queue = queue || [];
        this.length =  this.#queue.length;
    }
    /**
     * @param {*} n 
     * @returns {bool}
     */
    enQueue(n) {
        try {
            this.#queue.push(n);
            this.length = this.#queue.length;
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }

    /**
     * @returns {bool}
     */
    deQueue() {
        if (this.isEmpty()) return false;
        else {
            this.#queue.shift();
            this.length = this.#queue.length;
            return true;
        } 
    }

    /**
     * @returns {bool}
     */
    isEmpty() { return this.length === 0 };

    /**
     * @returns {*}
     */
    head() {
        return this.#queue[0];
    }

    /**
     * @returns {Object}
     */
    queue() {
        let obj = {}
        this.#queue.forEach( (el, i) => {
            obj[`_${i}`] = el;
        })
        return obj;
    }
}


export class FixedQueue {
    #queue;
    #max;
    #start;
    #end;

    /**
     * @param {number} n 
     */
    constructor(n = 10){
        this.#queue = new Array(n);
        this.#max = n;
        this.#start = 0;
        this.#end = 0;
    }

    /**
     * @returns {Object}
     */
    get view() {
        let n = this.#start;
        let i = 0;
        let obj = {}
        while (i !== this.#max && !!this.#queue[n]) {
            obj[`${i}`] = this.#queue[n];
            i++;
            n = (n + 1) % this.#max;
        }
        obj.full = i === this.#max;
        obj.empty = this.isEmpty();
        return obj;
    }
    
    /**
     * @returns {*}
     */
    get head() {
        return this.#queue[this.#start];
    }

    /**
     * @param {*} x 
     * @returns {bool}
     */
    enQueue(x) {
        if (!this.#queue[this.#end]) {
            this.#queue[this.#end] = x;

            this.#end = (this.#end + 1) % this.#max;
            return true;
        } else {
            return false;
        }
    }

    /**
     * @returns {bool} 
     */
    deQueue() {
        if (this.isEmpty()) return false;

        this.#queue[this.#start] = undefined;
        this.#start = (this.#start + 1) % this.#max;
        return true;
    }
    
    /**
     * @returns {bool} 
     */
    isEmpty() {
        return (typeof this.#queue[this.#start] === "undefined");
    }


}


/**
 * Use ListNode
 */
export class DynamicQueue {
    #val;
    #next;

    /**
     * @param  {...any} vals 
     */
    constructor(...vals) {
        this.#val = null;
        this.#next = null;
        
        if (vals.length > 0) {
           let list = DynamicQueue.fromArray(vals);
           this.#val = list.#val;
           this.#next = list.#next;
           list = null;
        }
    }

    /**
     * @param {Array} arr 
     * @returns {DynamicQueue | false}
     */
    static fromArray(arr) {
        try {
            let list = new DynamicQueue();
            list.#val = (arr[0] === undefined)? null: arr[0];
            let nextList = list;
            
            for (let i = 1; i < arr.length; i++) {
                nextList.#next = new DynamicQueue();
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
     * @returns {Object}
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

    get head() { return this.#val; }
    
    /**
     * @returns {number}
     */
    get length() {
        let listNext = (this.isEmpty()? null : this);
        let n = 0;
        while (listNext !== null) {     
            n++; 
            listNext = listNext.#next;
        }
        return n;
    }

    /**
     * Enqueue 
     * @param {*} x 
     * @returns {DynamicQueue | false}
     */
    add(x) {
       try {
        let listNext = this;
        while (listNext.#next !== null) listNext = listNext.#next;
        listNext.#next = new DynamicQueue(x);
        return this;

       } catch (err) {
           console.error(err);
           return false;
       }
    }

    /**
     * Dequeue
     * @returns {* | false}
     */
    delete() {
        if (this.isEmpty()) return false;
        let res = this.#val;
        if (this.#next === null) {
            this.#val = null;
        } else {
            this.#val = this.#next.#val;
            this.#next = this.#next.#next;
        }
        return res;
    }

    /**
     * @returns {bool}
     */
    isEmpty() { return (this.#val === null && this.#next === null); }

    /**
     * @returns {Object}
     */
    toObject() {
        let obj = {}
        let listNext = (this.isEmpty()? null : this);
        let n = 0;
        while (listNext !== null) {
            obj[n] = listNext.#val;
            listNext = listNext.#next;
            n++;
        }
        return obj;
    }

    /**
     * @returns {Array}
     */
    toArray() {
        let arr = []
        let listNext = (this.isEmpty()? null : this);
        while (listNext !== null) {
            arr[arr.length] = listNext.#val;
            listNext = listNext.#next;
        }
        return arr;
    }
}
