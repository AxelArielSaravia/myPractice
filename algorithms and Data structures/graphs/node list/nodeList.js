// Constructor
/**
 * @param {*} val 
 * @param {ListNode} next 
 */
function ListNode(val, next) {
    this.val = (val === undefined ? null : val)
    this.next = (next === undefined ? null : next)
}


//---------------//
//--- STATICS ---//
//---------------//
/**
 * @param {Array} arr 
 * @returns {ListNode | bool}
 */
ListNode.fromArray = function(arr) {
    try {
        let list = new ListNode(arr[0]);
        let nextList = list;

        for (let i = 1; i < arr.length; i++) {
            nextList.next = new ListNode(arr[i]);
            nextList = nextList.next;
        }
        return list;
    } catch (err) {
        console.error(err);
        return false;
    }
}


//--------------//
//---INHERITS---//
//--------------//
/**
 * @param {*} val 
 * @returns {ListNode | bool}
 */
ListNode.prototype.push = function(val) {
    try {
        let list = this;
        while (list.next) list = list.next;
        list.next = new ListNode(val);
        return this;

    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * @param {*} val 
 * @returns {ListNode | bool}
 */
ListNode.prototype.add = function(val) {
    try {
        this.next = new ListNode(this.val, this.next);
        this.val = val;
        return this;
    } catch (err) {
        console.log(err);
        return false;
    } 
}

/**
 * @returns {ListNode | bool}
 */
ListNode.prototype.pop = function() {
    try {
        if (this.next) {
            let list = this;
            while (list.next.next) list = list.next;
            list.next = null;
        } else {
            this.val = null;
            return false;
        }
        return this;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * @returns {ListNode | bool}
 */
ListNode.prototype.shift = function() {
    try {
        if (this.next === null) {
            this.val = null;
            return false;
        } else {a
            this.val = this.next.val;
            this.next = this.next.next;
        }

        return this;
    } catch (err) {
        console.error(err);
        return false
    }
}

/**
 * @param {*} between convert to string
 * @returns {string}
 */
ListNode.prototype.toString = function(between = "") {
    let str = this.val + (between + "");
    let listNext = this.next;
    while (listNext) {
        if (listNext.next === null) between = "";
        str += (listNext.val + (between + ""));
        listNext = listNext.next;
    }
    return str;
}

/**
 * @returns {Array}
 */
ListNode.prototype.toArray = function() {
    let arr = [this.val]
    let listNext = this.next;
    while (listNext) {
        arr[arr.length] = listNext.val;
        listNext = listNext.next;
    }
    return arr;
}