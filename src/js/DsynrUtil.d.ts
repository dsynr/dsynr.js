/// <reference path="components/DsynrSelect.d.ts" />
/// <reference path="components/DsynrModal.d.ts" />
declare class DsynrUtil {
    vw: number;
    vh: number;
    transitionEvent: any;
    domain: string;
    requestDataset: {};
    totalRequestDatasets: number;
    documentScripts: Array<string>;
    private currentRequest;
    private reqDataReady;
    constructor();
    /**
     * @todo
     */
    gtag(type: any, name: any, other: any): void;
    /**
     * @todo
     */
    PING(type: any, name: any): void;
    /**
     * Get data attribute value of a DOM element
     * @param e
     * @param attrName
     */
    getData(e: Element, attrName: string): any;
    /**
     * Set data attribute for a DOM element
     * @param e
     * @param attrName
     * @param attrVal
     */
    setData(e: Element, attrName: string, attrVal?: string): void;
    debounce(fn: any, threshold: any): () => void;
    concatStr(strings: Array<any>, separator?: string): string;
    getPercentage(x: any, percent: any): number;
    getRandFloor(min?: number, max?: number): number;
    getRandNum(min?: number, max?: number): number;
    getRandDecimal(min?: number, max?: number, precision?: number): number;
    getRandomArbitrary(min: number, max: number): number;
    makeArray(collection: any): Array<any>;
    get_rand_array_item(mixed_arr: any): any;
    get_rand_obj_item(obj: object): any;
    addProp(obj: object, propName: string, propVal?: any, overwrite?: boolean): any;
    updateProps(obj: object, propSet: object): void;
    mergeObjs(main: object, sub: object): object;
    hasInstance(objList: Array<object>, obj: object): boolean;
    getRandColour(): string;
    getRandColourRGBA(maxO?: number, maxR?: number, maxG?: number, maxB?: number): string;
    /**
     *
     * @param val
     * @param unit
     */
    getCssDimension(val: number, unit?: string): string;
    randRadius(): number;
    randWidth(): number;
    /**
     *
     * @param e
     */
    getDimensions(e: HTMLElement): any;
    /**
     *
     * @param e
     */
    hide(e: HTMLElement): void;
    /**
     *
     * @param e
     * @param classes
     */
    addClass(e: HTMLElement, classes: string): void;
    /**
     *
     * @param e
     * @param classes
     */
    removeClass(e: HTMLElement, classes: string): void;
    /**
     *
     * @param e
     * @param classes
     */
    hasClass(e: HTMLElement, classes: string): boolean;
    addDiv(id?: string, classes?: string, parent?: HTMLElement): HTMLElement;
    addText(txt: string | undefined, root: HTMLElement): void;
    getElementsBySelector(selector: string): any;
    getElementsByTag(tagName: string): NodeListOf<Element>;
    getElementsByClass(className: string): HTMLCollection;
    getElementById(elementID: string): HTMLElement;
    addJS(src: string, id?: string): void;
    animateIn(): void;
    whichAnimationEvent(): any;
    addListener(eID: any, event: any, fn: any): void;
    removeListener(eID: any, event: any, fn: any): void;
    addEvent(e: HTMLCollection, listener: string, fn: VoidFunction): void;
    centereStage(e: HTMLElement): void;
    updateViewportVars(): void;
    getBounds(e: HTMLElement): ClientRect;
    isInViewportSlightly(e: HTMLElement): boolean;
    isInViewportMostly(e: any): boolean;
    request(uri: string, saveAs?: string | boolean): void;
    private setHeaders;
    private stateChanged;
    private failed;
    private succeeded;
    addFetchedData(requestResponse: string, parent?: HTMLElement): void;
    private showFetchedData;
    getPageScripts(): void;
    /**
     * Log to the console
     * @param data
     */
    l(data: any): void;
    /**
     * Log active function name
     * @param functionName
     */
    lfn(functionName: string): void;
    /**
     * Log click
     * @param element
     */
    lclk(element: string): void;
}
declare let d: DsynrUtil;
