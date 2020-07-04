///<reference path="../Dsynr.ts"/>
class DsynrCarousel extends DsynrUIIElement {
    constructor(carouselContent, preferences = {}) {
        super(carouselContent, preferences);
        this.setCarousel();
    }
    setCarousel() {
        d.lfn('setCarousel');
        let carousel = d.getElementsByClass('carousel', document.body, true);
        let pane = d.getElementsBySelector('.scrollPane', carousel, true);
        let cards = d.getElementsBySelector('.card', pane);
        let totalCards = cards.length;
        let card = cards[0];
        let cardRoot = card.parentNode;
        let cardRootStyle = window.getComputedStyle(cardRoot);
        let cardW = card.clientWidth;
        let cardH = card.clientHeight;
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
    scrollCarousel() {
        let ths = this;
        // @ts-ignore
        d.getElementsByClass('carousel', document.body, true).scrollBy(1, 0);
        let scrolldelay = setTimeout(() => {
            ths.scrollCarousel();
        }, 10);
    }
}
//# sourceMappingURL=DsynrCarousel.js.map