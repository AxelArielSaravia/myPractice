/**
 * Use Arrays
 */
class ArrayQueue {
    #queue;
    
    /**
     * @param {Array} queue 
     */
    constructor(queue) {
        this.#queue = queue || [];
    }

    get length() { return this.#queue.length }
    
    /**
     * @param {*} n 
     * @returns {bool}
     */
    enQueue(n) {
        try {
            this.#queue.push(n);
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }

    deQueue() { return this.isEmpty() ? undefined : this.#queue.shift(); }

    /**
     * @returns {bool}
     */
    isEmpty() { return this.length === 0 };

    /**
     * @returns {*}
     */
    head() { return this.#queue[0]; }

    /**
     * @returns {Object}
     */
    get queue() {
        let obj = {}
        this.#queue.forEach( (el, i) => {
            obj[`_${i}`] = el;
        })
        return obj;
    }
}


class FixedArrayQueue {
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
export class NodeQueue {
    #val;
    #next;
    #length;
    
    static fromArray(arr) {
        try {
            const queue = new NodeQueue();
            let curr = queue;
            for (let i = 0; i < arr.length; i++) {
                curr.#val = arr[i];
                curr.#next = new NodeQueue();
                curr = curr.#next;
            }
            queue.#length = arr.length;
            return queue;
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
        this.#length = 0;
        
        if (vals.length > 0) {
           let list = NodeQueue.fromArray(vals);
           this.#val = list.#val;
           this.#next = list.#next;
           this.#length = list.#length;
           list = null;
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

    /**
     * @return {*}
     */
    get head() { return this.#val; }
    
    /**
     * @returns {number}
     */
    get length() { return this.#length }

    /**
     * Enqueue 
     * @param {*} x 
     * @returns {NodeQueue | false}
     */
    add(x) {
        try {
            let listNext = this;
            while (listNext.#next !== null) listNext = listNext.#next;
            listNext.#next = new NodeQueue(x);
            this.#length++;
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
            this.#length++;
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

/**
 * Use Objects  
 **/
class ObjectQueue {
    #queue;
    #length;

    static fromArray(arr) {
        try {
            const queue = new ObjectQueue();
            for (let i = 0; i < arr.length; i++) queue.#queue[i] = arr[i];
            queue.#length = arr.length;
            return queue;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    
    constructor(...vals) {
        this.#queue = {}
        this.#length = 0;

        if (vals.length > 0) {
            let queue = ObjectQueue.fromArray(vals);
            this.#queue = queue.#queue;
            this.#length = queue.#length;
        }
    }
    get length() { return this.#length }
    
    enqueue(val) {
        this.#queue[this.#length] = val;
        this.#length++;
    }
    dequeue() {
        if (this.isEmpty()) return;

        let res = this.#queue[0];
        let obj = {};
        for (let i = 1; i < this.#length; i++) obj[i-1] = this.#queue[i];
        this.#length--;
        this.#queue = obj;
        return res;
    }
    isEmpty() { return this.#length === 0 }
    valueOf() { return {...this.#queue} }
    head() { return this.isEmpty ? undefined : this.#queue[this.#length - 1] }
    clear() { this.#queue = {} }

}


class ObjectQueue2 {
    #count;
    #lowestCount;
    #queue;
    constructor() {
        this.#count = 0;
        this.#lowestCount = 0;
        this.#queue = {}
    }
    get length() { return this.#count - this.#lowestCount}

    enqueue(val) {
        this.#queue[this.#count] = val;
        this.#count++;
    }

    dequeue() {
        if (this.isEmpty()) return undefined;
        const res = this.#queue[this.#lowestCount];
        delete this.#queue[this.#lowestCount];
        this.#lowestCount++;
        
        if (this.isEmpty()) this.#lowestCount = this.#count = 0;

        return res;
    }

    front() { return this.isEmpty() ? undefined : this.#queue[this.#lowestCount]}
    isEmpty() { return this.length === 0 }
    clear() { 
        this.#lowestCount = this.#count = 0;
        this.#queue = {}
    }
}