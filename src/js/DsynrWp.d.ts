declare class DsynrWp {
    ready(): void;
    getForm(formName: string, parent?: HTMLElement): void;
    ajax(params?: {}, parent?: HTMLElement): void;
}
declare let dw: DsynrWp;
