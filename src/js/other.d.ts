/**
 * Get data attribute value of a DOM element
 * @param element e DOM element
 * @param string attrName Name of the data-attribute
 */
declare function getData(e: Element, attrName: string): any;
/**
 * Set data attribute for a DOM element
 * @param element e DOM element
 * @param string attrName Name of the data-attribute
 * @param string attrVal Value to be set for the attribute, default ''
 */
declare function setData(e: Element, attrName: string, attrVal?: string): void;
declare function debounce(fn: any, threshold: any): () => void;
