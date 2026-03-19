class MenuLoader {
    constructor() {
        this.activePopup = null;
        this.activeMenu = null;
    }

    async loadMenuData() {
        try {
            const response = await fetch('js/data.json');
            const data = await response.json();
            return data.menu;
        } catch (error) {
            console.error('Erro ao carregar menu:', error);
            return {};
        }
    }

    createMenuButtons(menuData, container) {
        Object.keys(menuData).forEach(menuName => {
            const button = this.createMenuButton(menuName);
            container.appendChild(button);
            
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleSubmenu(menuName, menuData[menuName], button);
            });
        });
    }

    createMenuButton(name) {
        const button = document.createElement('button');
        button.className = 'menu-btn';
        button.textContent = name;
        button.dataset.menu = name;
        return button;
    }

    toggleSubmenu(menuName, submenuData, targetButton) {
        this.removeActivePopup();
        
        const popup = this.createSubmenuPopup(submenuData);
        document.body.appendChild(popup);
        
        const rect = targetButton.getBoundingClientRect();
        popup.style.left = `${rect.left}px`;
        
        this.activePopup = popup;
        this.activeMenu = targetButton;
        targetButton.classList.add('active');
        
        setTimeout(() => {
            document.addEventListener('click', this.handleClickOutside.bind(this));
        }, 0);
    }

    createSubmenuPopup(submenuData) {
        const popup = document.createElement('div');
        popup.className = 'submenu-popup';
        
        Object.keys(submenuData).forEach(submenuName => {
            const item = document.createElement('button');
            item.className = 'submenu-item';
            item.textContent = submenuName;
            item.dataset.category = submenuName;
            item.dataset.content = JSON.stringify(submenuData[submenuName]);
            
            popup.appendChild(item);
        });
        
        return popup;
    }

    removeActivePopup() {
        if (this.activePopup) {
            this.activePopup.remove();
            this.activePopup = null;
        }
        if (this.activeMenu) {
            this.activeMenu.classList.remove('active');
            this.activeMenu = null;
        }
    }

    handleClickOutside(event) {
        if (this.activePopup && !this.activePopup.contains(event.target) && 
            event.target !== this.activeMenu) {
            this.removeActivePopup();
            document.removeEventListener('click', this.handleClickOutside);
        }
    }
}