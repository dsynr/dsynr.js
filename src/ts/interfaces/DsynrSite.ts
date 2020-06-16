interface DsynrSite {

    config(): void

    ready(): void

    addListeners(): void

    showSearchPane(): void

    hideSearchPane(): void

    fillViewport(): void

    setVars(): void

    pauseActiveVideo(): void

    resumeActiveVideo(): void

    rootScrolled(): void

    minimizeLoad(): void

    restoreLoad(): void
}