class App {
    constructor() {
        this.menuLoader = new MenuLoader();
        this.contentRenderer = new ContentRenderer();
        this.mainContainer = document.getElementById('mainContent');
        this.menuContainer = document.getElementById('jsonBtns');
        
        this.init();
    }

    async init() {
        await this.setupMenu();
        this.setupEventListeners();
    }

    async setupMenu() {
        const menuData = await this.menuLoader.loadMenuData();
        this.menuLoader.createMenuButtons(menuData, this.menuContainer);
        
        this.menuContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('submenu-item')) {
                const content = JSON.parse(e.target.dataset.content);
                this.contentRenderer.renderContent(content, this.mainContainer);
                this.menuLoader.removeActivePopup();
            }
        });
    }

    setupEventListeners() {
        document.getElementById('otherBtn').addEventListener('click', () => {
            this.contentRenderer.renderTextContent('Conteúdo do outro botão', this.mainContainer);
        });

        document.getElementById('email').addEventListener('click', () => {
            this.contentRenderer.renderTextContent('email@exemplo.com', this.mainContainer);
        });

        document.getElementById('socialMedia').addEventListener('click', () => {
            this.contentRenderer.renderContent({
                'Facebook': 'facebook.com/exemplo',
                'Twitter': 'twitter.com/exemplo',
                'Instagram': 'instagram.com/exemplo'
            }, this.mainContainer);
        });

        document.getElementById('donate').addEventListener('click', () => {
            this.contentRenderer.renderTextContent('Obrigado pelo seu apoio!', this.mainContainer);
        });
    }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new App();
});