declare class DsynrWp {
    conf: {
        loadURL: string;
    };
    ready(): void;
    load(loaderName: string, parent?: HTMLElement, enableDsynrSelect?: boolean): void;
    ajax(params?: {}, parent?: HTMLElement): void;
}
declare let dw: DsynrWp;
