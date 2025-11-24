class CUI_Toolbar {
    constructor(target) {
        this.toolbarElement = target;
        if (!this.toolbarElement) return;

        this.contentElement = this.toolbarElement.querySelector('.toolbar_content');
        this.defaultElement = this.contentElement.querySelector('.toolbar_default');
        this.items1depth = Array.from(this.defaultElement.querySelectorAll(':scope > *'));
        this.itemWidths = this.items1depth.map(item => item.offsetWidth);

        this.listWidth = 0;
        // this.items1depth = Array.from(this.defaultElement.querySelectorAll(':scope > ul > li:not(.more)'));


        this.initialize();
    }

    initialize() {
        this.setMore();
        // this.setupResizeObserver();
        this.observeResize();
        this.updateDimensions();
    }

    get listWidth() {
        return this._listWidth;
    }

    set listWidth(value) {
        this._listWidth = parseInt(value, 10);
    }


    updateDimensions() {
        this.listWidth = this.contentElement.offsetWidth - 80;
    }

    observeResize() {
        const resizeObserver = new ResizeObserver(() => {
            this.updateDimensions();
            this.updateToolbar();
            this.closeContext();
        });
        resizeObserver.observe(document.body);
    }

    setMore () {
        const toolbarMore = document.createElement('div');
        toolbarMore.className = 'toolbar_more';

        const mainButton = document.createElement('button');
        mainButton.className = 'cui_button icon';
        mainButton.type = 'button';
        mainButton.setAttribute('data-cui-icon', 'ellipsis_vertical');
        mainButton.addEventListener("click", (event) => this.moreEventListener(event));

        const contextMenu = document.createElement('div');
        contextMenu.className = 'cui_context_menu';

        const dynamicMenu = document.createElement('div');
        dynamicMenu.className = 'contextmenu_dynamic';

        // 컨텍스트 메뉴에 동적 메뉴 추가
        contextMenu.appendChild(dynamicMenu);

        toolbarMore.appendChild(mainButton);
        toolbarMore.appendChild(contextMenu);

        this.contentElement.appendChild(toolbarMore);
        this.moreElement = toolbarMore;
        this.moreDynamicElement = toolbarMore.querySelector('.contextmenu_dynamic');
    }
    moreEventListener (event) {
        const button = event.target;
        const contextMenu = button.closest('.toolbar_more').querySelector('.cui_context_menu');
        const expanded = contextMenu.getAttribute('aria-expanded') || false;

        if(expanded){
            contextMenu.removeAttribute('aria-expanded');
        }else {
            contextMenu.setAttribute('aria-expanded', 'true');
        }
    }
    closeContext () {
        this.moreElement.querySelector('.cui_context_menu').removeAttribute('aria-expanded');
    }

    updateToolbar() {
        let toolbarWidth = 0;
        this.moreDynamicElement.innerHTML = '';
        this.items1depth.forEach((item, index) => {
            const itemWidth = this.itemWidths[index];
            toolbarWidth += itemWidth + 8;
            if (toolbarWidth > this.listWidth) {
                const clone = item.cloneNode(true);
                clone.removeAttribute("style");

                this.moreDynamicElement.append(clone);
                // this.applyEventListeners(clone);

                item.style.display = "none";
                this.moreElement.classList.add('on');
            } else {
                item.removeAttribute("style");
                this.moreElement.classList.remove('on');
            }
        });
    }




















    // setupResizeObserver() {
    //     const resizeObserver = new ResizeObserver(() => {
    //         this.updateToolbar();
    //     });
    //     resizeObserver.observe(this.toolbarElement);
    //     this.toolbarItems.forEach(item => resizeObserver.observe(item));
    // }


    // getOuterWidth(element) {
    //     const style = window.getComputedStyle(element);
    //     return element.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    // }
    //
    // updateToolbar() {
    //     const areaWidth = this.toolbarElement.offsetWidth;
    //     let totalWidth = 0;
    //
    //     if (this.moreElement) {
    //         this.moreElement.querySelector(`.${this.dynamicClass}`).innerHTML = '';
    //     }
    //
    //     this.toolbarItems.forEach((item, index) => {
    //         item.removeAttribute('aria-hidden');
    //         const itemWidth = this.itemWidths[index];
    //         const toolbarGap = parseInt(getComputedStyle(this.toolbarElement.querySelector('.toolbar_default')).getPropertyValue('gap'));
    //         const gap = index === 0 ? 0 : toolbarGap;
    //
    //         totalWidth += itemWidth + gap;
    //
    //         if (areaWidth < totalWidth + 40) {
    //             if (!this.moreElement) {
    //                 this.createMoreElement();
    //             }
    //
    //             const moreToggleWidth = this.toolbarElement.querySelector('.more_toggle').offsetWidth + toolbarGap;
    //
    //             if (areaWidth - moreToggleWidth < totalWidth) {
    //                 this.addToMoreMenu(item);
    //             }
    //         }
    //     });
    //
    //     if (areaWidth >= totalWidth + 40 && this.moreElement && !this.hasMore) {
    //         this.moreElement.remove();
    //         this.moreElement = null;
    //     }
    // }
    //
    // createMoreElement() {
    //     this.moreElement = document.createElement('div');
    //     this.moreElement.className = this.toolbarMoreClass;
    //
    //     const moreToggle = document.createElement('button');
    //     moreToggle.className = 'ui_button icon more_toggle';
    //     moreToggle.setAttribute('type', 'button');
    //     moreToggle.setAttribute('data-icon', 'more');
    //     moreToggle.setAttribute('data-toggle-menu', '');
    //
    //     const contextMenu = document.createElement('div');
    //     contextMenu.className = 'ui_context_menu';
    //
    //     const dynamicMenu = document.createElement('div');
    //     dynamicMenu.className = this.dynamicClass;
    //
    //     contextMenu.append(dynamicMenu);
    //     this.moreElement.append(moreToggle);
    //     this.moreElement.append(contextMenu);
    //     this.toolbarElement.append(this.moreElement);
    //
    //     this.hasMore = true;
    // }
    //
    // addToMoreMenu(item) {
    //     const clone = item.cloneNode(true);
    //     const dynamicMenu = this.moreElement.querySelector(`.${this.dynamicClass}`);
    //
    //     item.setAttribute('aria-hidden', 'true');
    //     dynamicMenu.append(clone);
    // }
}


const cui_toolbars = document.querySelectorAll('.cui_toolbar');
cui_toolbars.forEach(cui_toolbar => {
    new CUI_Toolbar(cui_toolbar);
})
