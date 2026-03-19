class ContentRenderer {
    renderContent(data, container) {
        container.innerHTML = '';
        
        if (typeof data === 'string') {
            this.renderTextContent(data, container);
        } else if (data.subcategoria) {
            this.renderSubcategoriaContent(data, container);
        } else {
            this.renderObjectContent(data, container);
        }
    }

    renderTextContent(text, container) {
        const card = this.createCard();
        const title = this.createTitle('Conteúdo');
        const content = this.createText(text);
        
        card.appendChild(title);
        card.appendChild(content);
        container.appendChild(card);
    }

    renderSubcategoriaContent(data, container) {
        const card = this.createCard();
        const title = this.createTitle('Subcategoria');
        const content = this.createText(data.subcategoria);
        
        card.appendChild(title);
        card.appendChild(content);
        container.appendChild(card);
    }

    renderObjectContent(obj, container) {
        const card = this.createCard();
        const title = this.createTitle('Itens');
        
        card.appendChild(title);
        
        Object.keys(obj).forEach(key => {
            if (key !== 'subcategoria') {
                const item = document.createElement('div');
                item.className = 'grid-item';
                
                const itemTitle = document.createElement('h3');
                itemTitle.textContent = key;
                itemTitle.style.marginBottom = '0.5rem';
                itemTitle.style.color = '#2c3e50';
                
                item.appendChild(itemTitle);
                
                if (typeof obj[key] === 'object') {
                    const subItem = document.createElement('p');
                    subItem.textContent = obj[key].subcategoria || JSON.stringify(obj[key]);
                    subItem.className = 'content-text';
                    item.appendChild(subItem);
                }
                
                card.appendChild(item);
            }
        });
        
        container.appendChild(card);
    }

    createCard() {
        const card = document.createElement('div');
        card.className = 'content-card';
        return card;
    }

    createTitle(text) {
        const title = document.createElement('h2');
        title.className = 'content-title';
        title.textContent = text;
        return title;
    }

    createText(text) {
        const p = document.createElement('p');
        p.className = 'content-text';
        p.textContent = text;
        return p;
    }
}