/**
 * This is a siple class to create a simple interact with the DOM in vanilla JS
*/

//CREATE BY: Axarisar
//codepen: https://codepen.io/axelarielsaravia
//github: https://github.com/AxelArielSaravia 

/** Class representing a HTMLElement */
class DOMElement {
    #element;
    #parent;
    #children;
    #properties;

    /**
     * Create the element name and an object of properties (attributes)
     * @constructor
     * @param {string} element 
     * @param {Object} [properties]
     * @param {{validKey: (string|number|BigInt)}} [properties.attributes] - the validKey is an standar HTML attribute
     * @param {string | [string]} [properties.classList]
     * @param {string} [properties.sanitizeInnerHTML] //EXPERIMENTAL, DO NOT USED!!
     * @param {string} [properties.textContent]
     * @param {string} [properties.textAfter]
     */
    constructor(element, properties){
        this.#element = (typeof element === 'string' ? element : undefined);
        this.#parent = undefined;
        this.#children = undefined;
        this.#properties = {
            classList: undefined,
            id: undefined,
            sanitizeInnerHTML: undefined, //EXPERIMENTAL, DO NOT USED!!
            textContent: undefined,
            textAfter: undefined,
            attributes:undefined, 
        };

        if (typeof properties === 'object' && Object.getPrototypeOf(properties) === Object.prototype) {

            //claslist property
            if (typeof properties.classList === 'string' && properties.classList.length > 0) 
                this.#properties.classList = properties.classList;
            else if (Array.isArray(properties.classList) ) {
                let arr = properties.classList.filter( el => typeof el === 'string')
                this.#properties.classList = (arr.length !== 0 ? arr : undefined);
            }
            
            
            //id property
            if ((typeof properties.id === 'string' && properties.id.length > 0)|| typeof properties.id === 'number' || typeof properties.id === 'bigInt')
                this.#properties.id = properties.id;
            
            //textAfter property
            if (typeof properties.textAfter === 'string' && properties.textAfter.length > 0) 
                this.#properties.textAfter = properties.textAfter;

            //textConten property
            //if textContent is set, the sanitizeInnerHTML never use
            if (typeof properties.textContent === 'string' && properties.textContent.length > 0) 
                this.#properties.textContent = properties.textContent;
               
            
            //EXPERIMENTAL NOT USE
            //sanitize innerHTML property
            //(warning: is an experimental technology, and do not have any browser compatibility yet)
            else if (typeof properties.sanitizeInnerHTML === 'string' && properties.sanitizeInnerHTML.length > 0) {
                this.#properties.sanitizeInnerHTML = properties.sanitizeInnerHTML
            }

            //attributes property
            if (typeof properties.attributes === 'object' && Object.getPrototypeOf(properties.attributes) === Object.prototype) {
                let attr = Object.entries(properties.attributes);
                if (attr.length > 0)
                    this.#properties.attributes = properties.attributes;
            }
        }
    }
    
    /**
     * Create HTMLElement and set the attributes
     * 
     * @param {string} element 
     * @param {Object} [properties]
     * @param {{validKey: (string|number|BigInt)}} [properties.attributes] - the validKey is an standar HTML attribute
     * @param {string | [string]} [properties.classList]
     * @param {string} [properties.sanitizeInnerHTML] //EXPERIMENTAL, DO NOT USED!!
     * @param {string} [properties.textContent]
     * @returns {HTMLElement | undefined} if exist an error returns undefined
     */
    static toHTML(element, properties) {
        try{
            if (typeof element === 'string' && element.length > 0) {
                let HTMLElement;

                if (element.length === 0) {
                    HTMLElement = document.createDocumentFragment();
                }
                else {
                    HTMLElement = document.createElement(element);
                }

                if (typeof properties === 'object' && Object.getPrototypeOf(properties) === Object.prototype) {
    
                    //claslist property
                    if (typeof properties.classList === 'string' && properties.classList.length > 0) 
                        HTMLElement.classList.add(properties.classList);
                    
                    else if (Array.isArray(properties.classList) && properties.classList.length > 0) 
                        properties.classList.forEach( (el) => {
                            if (typeof el === 'string' && el.length > 0) 
                                HTMLElement.classList.add(el) 
                        });
                    
                    
                    //id property
                    if ((typeof properties.id === 'string' && properties.id.length > 0)|| typeof properties.id === 'number' || typeof properties.id === 'bigInt')
                        HTMLElement.setAttribute('id', `${properties.id}`);
                    
                    //textConten property
                    //if textContent is set, the DANGERInnerHTML and sanitizeInnerHTML never use
                    if (typeof properties.textContent === 'string' && properties.textContent.length > 0) 
                        HTMLElement.textContent = properties.textContent;
                    
                    //EXPERIMENTAL NOT USE
                    //sanitize innerHTML property
                    //(warning: is an experimental technology, and do not have any browser compatibility yet)
                    else if (typeof properties.sanitizeInnerHTML === 'string' && properties.sanitizeInnerHTML.length > 0) {
                        const sanitizer = new Sanitizer({
                            dropElements: ["script","nosript","style","link","title", "meta", "html", "head", "body", "!DOCTYPE html", "iframes", "embed", "object", "param", "data", "details", "dialog"],
                            dropAttributes: ["lang, onerror"],
                            allowCustomElements:false,
                            allowComments:false
                        })
                        HTMLElement.setHTML(properties.sanitizeInnerHTML, sanitizer);
                    }
    
                    //DANGER!!!! use the property .innerHTML is risky.
                    //Instead create new elements and append to the a parent
                    //or use child(), children() methods
                    //or use satinizeInnerHTML (warning: is an experimental technology, and do not have any browser compatibility yet)
                    //innerHTML property
                    else if (typeof properties.DANGERInnerHTML === 'string' && properties.DANGERInnerHTML.length > 0)
                        HTMLElement.innerHTML = properties.DANGERInnerHTML;
                
    
                    //attributes property
                    if (typeof properties.attributes === 'object' &&  Object.getPrototypeOf(properties.attributes) === Object.prototype) {
                        let attr = Object.entries(properties.attributes);
                        if (attr.length > 0) {
                            attr.forEach( (el) => {
                                let name = `${el[0]}`,
                                    value = `${el[1]}`;
                                HTMLElement.setAttribute(name, value)
                            });
                        }
                    }
                }
                return HTMLElement;

            } else {
                throw new Error("DOMElement.create() function throw an error; the type of the element property must be string and must have the length major than cero");
            }
        } catch (err) {
            console.error(err);
            return undefined;
        }
    }

    /**
     * @param {DOMElement} domElementProto 
     * @returns {Boolean}
     */
    static isDOMElement(domElementProto) {
        return (typeof domElementProto === "object" && Object.getPrototypeOf(domElementProto) === DOMElement.prototype)
    }

    /**
     * Copy the object with the exact values in these moment 
     * @returns {DOMElement} new DOMElement
     */
    static copy(domElement) { 
        let newDOMElement = new DOMElement(domElement.element, domElement.properties);
        newDOMElement.#children = domElement.#children;
        return newDOMElement;
    }

    get element() { return this.#element }
    get parent() { return this.#parent }
    get children() { return this.#children }
    get properties() { return this.#properties }

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

            const fragment = document.createDocumentFragment();
            const queue = [];
            queue.push({
                html: fragment,
                children: [root],
            });
        
            while (queue.length !== 0) {
                let head = queue.shift();

                if (head.children !== undefined) {
                    for (let child of head.children) {
                        let html = DOMElement.toHTML(child.element, child.properties);
                        head.html.appendChild(html);
                        queue.push({
                            html,
                            children: child.children,
                            textAfter: child.properties?.textAfter
                        });
                    }
                }
                if (head.textAfter !== undefined) {
                    let TextNode = document.createTextNode(head.textAfter)
                    head.html.appendChild(TextNode);
                }
            }

            if (append !== undefined) {
                append.appendChild(fragment);
                return fragment;
            }
            return fragment;

        } catch(err) {
            console.error(err)
            return undefined;
        }
    } 
  
    /**
     * Copy the object with the exact values in these moment
     * @returns {DOMElement} new DOMElement
     */
    copy() { return DOMElement.copy(this); }


    /**
     * Change the values of the object and return this
     * @param {(string | Object)} first - if is a string represent the element, and the second argument is the properties object
     *                                  else represent the properties object, and the second argument is ignored
     * @param {Object} [second]
     * @param {{validKey: (string|number|BigInt)}} [second.attributes] - the validKey is an standar HTML attribute
     * @param {string | [string]} [second.classList]
     * @param {string} [second.sanitizeInnerHTML] //EXPERIMENTAL NOT USE
     * @param {string} [second.textContent]
     * @param {string} [second.textAfter]
     * @returns {this}
     */
    change(first, second) {
        try{
            let bool = false;
            let properties;
            if (typeof first === 'string')
                this.#element = first;
            
            if (typeof first === 'object' && Object.getPrototypeOf(first) === Object.prototype) {
                properties = first;
                bool = true;
            }
            else if (typeof first === 'string' && typeof second === 'object' &&  Object.getPrototypeOf(second) === Object.prototype) {
                properties = second;
                bool = true;
            }

            if (bool) {
                 
                //this.#properties.classList
                if (properties.classList === false)
                    this.#properties.classList = undefined;
                else if (typeof properties.classList === 'string')
                    this.#properties.classList = properties.classList;
                else if (Array.isArray(properties.classList) ) {
                    let arr = properties.classList.filter( el => typeof el === 'string')
                    this.#properties.classList = (arr.length !== 0 ? arr : undefined);
                }
                

                //this.#properties.id
                if (properties.id === false) 
                    this.#properties.id = undefined;
                else if ((typeof properties.id === 'string' && properties.id.length > 0)|| typeof properties.id === 'number' || typeof properties.id === 'bigInt')
                    this.#properties.id = properties.id;

                //this.#properties.textAfter
                if (properties.textAfter === false)
                    this.#properties.textAfter = undefined;
                else if (typeof properties.textAfter === 'string' && properties.textAfter.length > 0) {
                    this.#properties.textAfter = properties.textAfter;
                }


                //EXPERIMENTAL NOT USE
                //sanitize innerHTML property
                //(warning: is an experimental technology, and do not have any browser compatibility yet)
                if (properties.sanitizeInnerHTML === false) 
                    this.#properties.sanitizeInnerHTML = undefined;
                else if (typeof properties.sanitizeInnerHTML === 'string' && properties.sanitizeInnerHTML.length > 0) {
                    this.#properties.sanitizeInnerHTML = properties.sanitizeInnerHTML;
                    this.#properties.DANGERInnerHTML = undefined;
                }

                //textConten property
                //if textContent is set, the DANGERInnerHTML and sanitizeInnerHTML never use
                if (properties.textContent === false)
                    this.#properties.textContent = undefined;
                else if (typeof properties.textContent === 'string' && properties.textContent.length > 0) {
                    this.#properties.textContent = properties.textContent;
                    this.#properties.sanitizeInnerHTML = undefined;
                }

                //this.#properties.attributes
                if (properties.attributes === false) 
                    this.#properties.attributes = undefined;
                else if (typeof properties.attributes === 'object' && Object.getPrototypeOf(properties.attributes) === Object.prototype)
                    this.#properties.attributes = properties.attributes;

            }
            return this;
        }
        catch(err){
            console.error(err);
            return undefined;
        }
    }

    /**
     * @param {string} element 
     * @param {Object} [properties]
     * @param {{validKey: (string|number|BigInt)}} [properties.attributes] - the validKey is an standar HTML attribute
     * @param {string | [string]} [properties.classList]
     * @param {string} [properties.sanitizeInnerHTML] //EXPERIMENTAL NOT USE
     * @param {string} [properties.textContent]
     * @param {string} [second.textAfter]
     * @returns {DOMElement | undefined} if exist an error returns undefined
     */
    child(element, properties) {
        try {
            if (element === undefined) 
                return undefined;  

            if (this.children === undefined)
                this.#children = [];
            
            let newDOMElement = new DOMElement(element, properties);
            newDOMElement.#parent = this;
            this.#children.push(newDOMElement);
            newDOMElement = null;

            if (this.children.length === 0) {
                this.#children = undefined;
                return undefined;
            } 
            return this.children[this.children.length-1];
        } catch (err) {
            console.error(err)
            return undefined;
        }

    }

    /**
     * @param {...(string | [string, Object])} elements
     * @param {string} [elements[0] ] - element
     * @param {Object} [elements[1] ] - properties
     * @param {{validKey: (string|number|BigInt)}} [elements[1].attributes ] - the validKey is an standar HTML attribute
     * @param {string | [string]} [elements[1].classList ]
     * @param {string} [elements[1].sanitizeInnerHTML ] //EXPERIMENTAL NOT USE
     * @param {string} [elements[1].textContent ]
     * @param {string} [elements[1].textAfter ]
     * @returns {[DOMElement] | undefined} if exist an error returns undefined
     */
    childs(...elements) {
        try {
            if (elements === undefined || elements.length === 0)
                return undefined;

            if (this.children === undefined)
                this.#children = [];

            elements.forEach(el => {
                let element = undefined;
                let properties = undefined;

                if (typeof el === "string")
                    element = el;
                else if (Array.isArray(el) && el.length !== 0) {
                    if (/* element */ el[0] === undefined) return;
                    element = el[0];
                    properties = el[1];
                }
                let newDOMElement = new DOMElement(element, properties);
                newDOMElement.#parent = this;
                this.#children.push(newDOMElement);
                newDOMElement = null;
            });

            if (this.children.length === 0) {
                this.#children = undefined;
                return undefined;
            } 
            return this.children;

        } catch (err) {
            console.error(err);
            return undefined
        }
    }
    
    /**
     * @param {DOMElement} domElement 
     * @returns {DOMElement | undefined}
     */
    addChild(domElement) {
        try {
            if (domElement === undefined) 
                return undefined;

            if (!DOMElement.isDOMElement(domElement)) 
                throw new Error("the argument is not a DOMElement");
            
            if (this.children === undefined)
                this.#children = [];

            let newDOMElement = domElement.copy();
            newDOMElement.#parent = this;
            this.#children.push(newDOMElement);
            
            return this.children[this.children.length-1];
        } catch (err) {
            console.error(err);
            return undefined;
        } 
    }

    /**
     * @param  {...DOMElement} domElements 
     * @returns {[DOMElement] | undefined}
     */
    addChilds(...domElements) {
        try {
            if (domElements === undefined || domElements.length === 0)  
                return undefined;
            domElements.forEach(el => this.addChild(el))
            return this.children;
        } catch (err) {
            console.error(err);
            return undefined;
        } 
    }

    /**
     * @param {string} txt 
     * @returns {this | undefined}
     */
    addText(txt) {
        try {
            if (typeof txt === "string") {
                this.#properties.textContent = txt;
            }
            return this;
        } catch (err) {
            console.error(err);
            return undefined;
        }
    }
    
    /**
     * @param {string} txt 
     * @param {boolean} parent 
     * @returns {this | undefined}
     */
    addTextAfter(txt, parent = true) {
        try {
            if (typeof txt === 'string') {
                if (typeof parent === 'boolean' && parent) {
                    if (this.parent !== undefined) {
                        this.parent.#properties.textAfter = txt;
                    }
                } else {
                    this.#properties.textAfter = txt;
                }
            }
            return this;
        } catch (err) {
            console.error(err);
            return undefined;
        }
    }
}