/**
 * This is a siple class to create a simple interact with the DOM in vanilla JS
*/

//CREATE BY: Axarisar
//codepen: https://codepen.io/axelarielsaravia
//github: https://github.com/AxelArielSaravia 



/* Class representing a HTMLElement */
export default class DOMElement {
    #type;
    #parent;
    #children;
    #props;

    /**
     * @param {string} type 
     * @param {Object} props 
     * @returns 
     */
    static createHTML(type, props) {
        try {  
            if (typeof type === 'string') {
                let HTMLElement;
                let bool = false;

                if (type.length === 0)  {
                    HTMLElement = document.createDocumentFragment();
                } else {
                    HTMLElement = document.createElement(type)
                    bool = true
                }

                if (bool 
                 && typeof props === 'object'
                 && props !== null
                 && Object.getPrototypeOf(props) === Object.prototype
                ) {
                    const keys = Object.keys(props);
                    for (const key of keys) {
                        //claslist property
                        if (key === "classList") {
                            if (typeof props.classList === 'string' 
                            && props.classList.length > 0
                            ) {
                                HTMLElement.classList.add(props.classList);
                            } else if (Array.isArray(props.classList) 
                            && props.classList.length > 0
                            ) {
                                props.classList.forEach( (el) => {
                                    if (typeof el === 'string' && el.length > 0) {
                                        HTMLElement.classList.add(el);
                                    }
                                });
                            }
                        //style property
                        } else if (key === "style") {
                            if (typeof props.style === "object" 
                             && props.style !== null
                             && Object.is(Object.getPrototypeOf(props.style), Object.prototype)
                            ) {
                                try {
                                    const styles = Object.entries(props.style);
                                    for (const [name, value] of styles) {
                                        HTMLElement.style[name] = value;
                                    }
                                } catch (err) {
                                   console.log(err);
                                }
                            }
                        //textContent property
                        } else if (key === "textContent") {
                            if (typeof props.textContent === 'string' 
                             && props.textContent.length > 0
                            ) {
                                HTMLElement.textContent = props.textContent;
                            } 
                            
                        //all other key-value pair will set as HTML attributes    
                        } else {
                            if (typeof key === 'string'
                             && typeof props[key] === 'string'
                             ) {
                                HTMLElement.setAttribute(key, props[key])
                            }
                        }
                    }
                }
                return HTMLElement;
            } else {
                throw new Error("The type of type property must exist and be string");
            }
        } catch (err) {
            console.error(err);
            return undefined;
        }
    }
    
    /**
     * 
     * @param {string} type 
     * @param {Object} props 
     * @param {Object} children 
     * @returns 
     */
    static toHTML(type, props, children) {
        try{
            const ROOT = { type, props, children }
            const fragment = document.createDocumentFragment();
            
            const queue = [{
                node: fragment,
                children: [ROOT],
            }];
        
            while (queue.length !== 0) {
                const head = queue.shift();

                if (head.children !== undefined) {
                    for (let child of head.children) {
                        let node;

                        if (typeof child === "object" 
                         && child !== null
                         && Object.is(Object.getPrototypeOf(child), Object.prototype) 
                         || DOMElement.isDOMElement(child)
                        ) {
                            node = DOMElement.createHTML(child.type, child.props);
                            
                        } else if (typeof child === "string" 
                          && child.length > 0
                        ) {
                            node = document.createTextNode(child);
                        }
                        
                        if (node !== undefined) {
                            //the problem to append a fragment in to a fragment
                            if (head.node.nodeType === 11 && node.nodeType === 11){
                                node = head.node;
                            } else {
                                head.node.appendChild(node);
                            }
                            
                            queue.push({
                                node,
                                children: child?.children,
                            });
                        }
                    }
                }
            }

            return fragment;

        } catch(err) {
            console.error(err)
            return undefined;
        }
    }

    /**
     * Verify if the object is a DOMElement
     * @param {DOMElement} domElementProto 
     * @returns {Boolean}
     */
     static isDOMElement(domElementProto) {
        return (typeof domElementProto === "object"
        && domElementProto !== null 
        && Object.getPrototypeOf(domElementProto) === DOMElement.prototype);
    }

    /**
     * Copy the object with the exact values in these moment 
     * @returns {DOMElement} new DOMElement
     */
    static copy(domElement) {
        try {
            if (!DOMElement.isDOMElement(domElement)) {
                throw new Error("The argument is not a DOMElement object");
            }
            const newDOMElement = new DOMElement(domElement.type, domElement.props, domElement.children);
            if (domElement.#parent !== undefined) {
                newDOMElement.#parent = domElement.#parent;
            }
            return newDOMElement;

        } catch (err) {

        }
    }

    /**
     * @constructor
     * @param {string} type 
     * @param {Object} [props] 
     * @param {string} [props.classList]
     * @param {Object} [props.style]
     * @param {string} [props.textContent]
     * @param {string} [props.any] // any other key-value pair will be a HTML attribute
     * @param {[DOMElement | string]} [children] 
     */
    constructor(type, props, children) {
        this.#type = (typeof type === 'string' ? type : undefined);
        this.#parent = undefined;
        this.#children = (Array.isArray(children)
            ? children
            : undefined
        );
        this.#props = (
            typeof props === "object" 
            && props !== null 
            && Object.is(Object.getPrototypeOf(props), Object.prototype) 
            ? props
            : {
                classList: undefined,
                style: undefined,
                textContent: undefined,
            }
        );
    }

    get type() { return this.#type }
    get parent() { return this.#parent }
    get children() { return this.#children }
    get props() { return this.#props }

    /**
     * Create DOM element and set the attributes
     * see create() static method
     * @param {HTMLElement} [append]
     * @returns {DocumentFragment | undefined}
     */
    toHTML(append) { 
        try{
            let root = this;
            while (root.parent !== undefined) {
                root = root.parent;
            }
            const fragment = DOMElement.toHTML(root.type, root.props, root.children)
            
            if (append !== undefined) {
                append.appendChild(fragment);
                return;
            }
            return fragment;

        } catch(err) {
            console.error(err)
            return undefined;
        }
    }


    /**
     * DEFINE a ELEMENT CHILD
     * 
     * @param {string} type 
     * @param {Object} [props]
     * @param {string} [props.classList]
     * @param {Object} [props.style]
     * @param {string} [props.textContent]
     * @param {string} [props.any] // any other key-value pair will be a HTML attribute
     * @param {Object | DOMElement} [children]
     * @returns {DOMElement | undefined} if exist an error returns undefined
     */
    defineElementChild(type, props, children) {
        try {
            if (typeof type === "string") {
                if (this.children === undefined) {
                    this.#children = [];
                }
                
                let newDOMElement = new DOMElement(type, props, children);
                newDOMElement.#parent = this;
                this.#children.push(newDOMElement);
                newDOMElement = null;
    
                return this.children[this.children.length-1];
            }


        } catch (err) {
            console.error(err);
            return undefined;
        }
    }

    /**
     * DEFINE a TEXT NODEs AND/OR ELEMENTs CHILDREN
     * 
     * @param {[string| {type, props, children}]} children 
     * @returns 
     */
    defineChildren(children) {
        try {
            if (Array.isArray(children) && children.length > 0) {
                if (this.children === undefined) {
                    this.#children = [];
                }
    
                children.forEach(child => {
                    if (typeof child === "string") {
                        this.#children.push(child);

                    } else if (typeof child === "object" 
                     && child !== null 
                     && Object.is(Object.getPrototypeOf(child), Object.prototype)
                     && typeof child.type === "string"
                    ) {
                        let newDOMElement = new DOMElement(child.type, child.props, child.children);
                        newDOMElement.#parent = this;
        
                        this.#children.push(newDOMElement);
                        newDOMElement = null;
                    }
                });
                if (this.children.length === 0) {
                    this.#children = undefined;
                    return undefined;
                } 
                return this;
            }

        } catch (err) {
            console.error(err);
            return undefined
        }
    }

    /**
     * DEFINE a TEXT NODE CHILD
     * 
     * @param {string} text 
     * @returns 
     */
    defineTextChild(text) {
        try {
            if (typeof text === "string" && text.length > 0) {
                if (this.children === undefined) {
                    this.#children = [];
                }
                this.#children.push(text);

                return this;
            }
        } catch (err) {
            console.error(err);
            return undefined;
        }
    }

    /**
     * @param {DOMElement} domElement 
     * @returns {DOMElement | undefined}
     */
    addElementChild(domElement) {
        try {
            if (!DOMElement.isDOMElement(domElement)) {
                throw new Error("the argument is not a DOMElement");
            }
            if (this.children === undefined) {
                this.#children = [];
            }

            let newDOMElement = DOMElement.copy(domElement);
            newDOMElement.#parent = this;
            this.#children.push(newDOMElement);

            newDOMElement = null;
            return this.children[this.children.length - 1];

        } catch (err) {
            console.error(err);
            return undefined;
        } 
    }
    valueOf() { return DOMElement.prototype; }
    
}