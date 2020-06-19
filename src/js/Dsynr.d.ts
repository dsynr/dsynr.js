declare class Dsynr {
    conf: {
        domain: string;
        defaultParent: HTMLElement;
        ani: {
            prefix: string;
            speed: {
                faster: string;
                default: string;
            };
            styles: {
                fadeIn: string;
                slideInDown: string;
                slideOutUp: string;
            };
        };
    };
    vw: number;
    vh: number;
    transitionEvent: any;
    requestDataset: {};
    totalRequestDatasets: number;
    documentScripts: Array<string>;
    private curReq;
    private readonly reqDataReady;
    /**
     * @todo
     * @param params
     */
    updateConfig(params: {}): void;
    constructor(conf?: {});
    protected defaultConf(): void;
    docReady(fn: Function): void;
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
    getRandArrayItem(mixed_arr: any): any;
    /**
     *
     * @param obj
     * @return {any}
     */
    getRandObjItem(obj: object): any;
    addProp(obj: object, propName: string, propVal?: any, overwrite?: boolean): any;
    /**
     *
     * @param obj
     * @param propSet
     */
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
    /**
     *
     * @param id
     * @param classes
     * @param parent
     */
    addDiv(id?: string, classes?: string, parent?: HTMLElement): HTMLElement;
    addText(txt: string | undefined, root: HTMLElement): void;
    getElementsBySelector(selector: string): any;
    getElementsByTag(tagName: string): NodeListOf<Element>;
    /**
     *
     * @param className
     */
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
    serialize(obj: object): string;
    ajax(url: string, saveAs?: string | boolean, data?: any, add2dom?: boolean, parent?: HTMLElement, method?: string): void;
    private setHeaders;
    private stateChanged;
    private failed;
    private succeeded;
    addFetchedData(requestResponse: string, parent?: HTMLElement): void;
    private showFetchedData;
    getPageScripts(dsynrUtil: Dsynr): void;
    IsJson(str: string): boolean;
    getAniClass(styleName: string): string;
    autoPrefixAniClasses(speed?: string): void;
    /**
     * Log to the console
     * @param data
     * @param isFormData
     */
    l(data: any, isFormData?: boolean): void;
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
declare let d: Dsynr;
