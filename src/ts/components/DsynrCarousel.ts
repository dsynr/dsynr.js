///<reference path="../Dsynr.ts"/>
class DsynrCarousel extends DsynrUIIElement {

    private instanceRoot: HTMLElement;
    private instanceRootClass: string;

    private parentSizingClass: string;
    private windowSizingClass: string;
    private underlayClass: string;
    private overlayClass: string;
    private disableUnderlay: boolean;
    private useOverlay: boolean;

    private adoptParent: boolean;
    private autoDestroy: boolean;
    private respectBounds: boolean;

    private animateUnderlay: boolean;
    private displayTogether: boolean;
    private animateModal: boolean;
    private carouselAnimateInClass: string;
    private carouselAnimateAttentionClass: string;
    private carouselAnimateOutClass: string;

    constructor(carouselContent: HTMLElement, preferences: object = {}) {
        super(carouselContent, preferences);
        this.setCarousel();
    }

    private setCarousel(): void {
        d.lfn('setCarousel');
        let carousel: any = d.getElementsByClass('carousel', document.body, true);
        let pane: any = d.getElementsBySelector('.scrollPane', carousel, true);
        let cards: any = d.getElementsBySelector('.card', pane);
        let totalCards: number = cards.length;
        let card: any = cards[0];
        let cardRoot: any = card.parentNode;
        let cardRootStyle = window.getComputedStyle(cardRoot);
        let cardW: number = card.clientWidth;
        let cardH: number = card.clientHeight;
        console.log(pane);
        pane.style.width = d.getCssDimension((cardW + parseInt(cardRootStyle.marginLeft) + parseInt(cardRootStyle.marginRight)) * totalCards);
        pane.style.height = d.getCssDimension(cardH);
        d.addListener(cards, 'mouseenter', (e) => {
            d.toggleClass(e, 'shadow-lg', 'shadow');
        });
        d.addListener(cards, 'mouseleave', (e) => {
            d.toggleClass(e, 'shadow', 'shadow-lg');
        });
        this.scrollCarousel();
    }

    private scrollCarousel() {
        let ths = this;
        // @ts-ignore
        d.getElementsByClass('carousel', document.body, true).scrollBy(1, 0);
        let scrolldelay = setTimeout(() => {
            ths.scrollCarousel();
        }, 10);
    }
}