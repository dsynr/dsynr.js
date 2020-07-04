declare class DsynrWp {
    conf: {
        formURL: string;
    };
    ready(): void;
    getForm(formName: string, parent?: HTMLElement, enableDsynrSelect?: boolean): void;
    ajax(params?: {}, parent?: HTMLElement): void;
}
declare let dw: DsynrWp;
