// 攻略渲染相关的函数
function renderGuides(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 根据containerId渲染不同内容
    switch(containerId) {
        case 'guide-section':
        case 'guide-hotspring-section':
            renderHotSpringGuide(container);
            break;
        case 'guide-market-section':
        case 'merchant-guide-section':
            renderMarketGuide(container);
            break;
        case 'guide-other-section':
            renderFlowerGuide(container);
            break;
    }
}

function renderHotSpringGuide(container) {
    if (!guideData.hotSpringGuide || !guideData.hotSpringGuide.guides) return;

    guideData.hotSpringGuide.guides.forEach(guide => {
        const guideSection = document.createElement('div');
        guideSection.className = 'collapsible-section';

        const header = document.createElement('div');
        header.className = 'collapsible-header';

        const title = document.createElement('div');
        title.className = 'collapsible-title';
        title.textContent = guide.title;

        header.appendChild(title);

        const icon = document.createElement('span');
        icon.className = 'collapsible-icon';
        icon.innerHTML = '<i class="layui-icon layui-icon-down"></i>';
        header.appendChild(icon);

        const content = document.createElement('div');
        content.className = 'collapsible-content';

        const tipsList = document.createElement('ul');
        tipsList.className = 'tips-list';
        guide.tips.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            tipsList.appendChild(li);
        });

        content.appendChild(tipsList);
        guideSection.appendChild(header);
        guideSection.appendChild(content);
        container.appendChild(guideSection);

        // 添加点击事件
        header.addEventListener('click', () => {
            guideSection.classList.toggle('active');
        });
    });
}

function renderFlowerGuide(container) {
    if (!guideData.flowerGuide || !guideData.flowerGuide.guides) return;

    guideData.flowerGuide.guides.forEach(guide => {
        const guideSection = document.createElement('div');
        guideSection.className = 'collapsible-section';

        const header = document.createElement('div');
        header.className = 'collapsible-header';

        const title = document.createElement('div');
        title.className = 'collapsible-title';
        title.textContent = guide.title;

        header.appendChild(title);

        const icon = document.createElement('span');
        icon.className = 'collapsible-icon';
        icon.innerHTML = '<i class="layui-icon layui-icon-down"></i>';
        header.appendChild(icon);

        const content = document.createElement('div');
        content.className = 'collapsible-content';

        const tipsList = document.createElement('ul');
        tipsList.className = 'tips-list';
        guide.tips.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            tipsList.appendChild(li);
        });

        content.appendChild(tipsList);
        guideSection.appendChild(header);
        guideSection.appendChild(content);
        container.appendChild(guideSection);

        // 添加点击事件
        header.addEventListener('click', () => {
            guideSection.classList.toggle('active');
        });
    });
}

function renderMarketGuide(container) {
    if (!guideData.marketValueGuide) return;

    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'collapsible-section';

    const headerDiv = document.createElement('div');
    headerDiv.className = 'collapsible-header';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'collapsible-title';
    titleDiv.textContent = guideData.marketValueGuide.title;

    headerDiv.appendChild(titleDiv);

    const iconSpan = document.createElement('span');
    iconSpan.className = 'collapsible-icon';
    iconSpan.innerHTML = '<i class="layui-icon layui-icon-down"></i>';
    headerDiv.appendChild(iconSpan);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'collapsible-content';

    // 创建花卉卡片容器
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'flower-cards-container';

    // 创建每个花卉的卡片
    guideData.marketValueGuide.flowers.forEach(flower => {
        const card = document.createElement('div');
        card.className = 'flower-card';

        // 创建花卉名称和标签容器
        const nameContainer = document.createElement('div');
        nameContainer.className = 'flower-name';
        
        // 添加花卉名称
        const nameSpan = document.createElement('span');
        nameSpan.textContent = flower.name;
        nameContainer.appendChild(nameSpan);

        // 添加标签
        if (flower.tag) {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'layui-badge layui-bg-orange';
            tagSpan.style.marginLeft = '5px';
            tagSpan.textContent = flower.tag;
            nameContainer.appendChild(tagSpan);
        }

        card.appendChild(nameContainer);

        // 创建价值信息
        const valueInfo = document.createElement('div');
        valueInfo.className = 'flower-value-info';

        // 单次信息
        const singleInfo = document.createElement('div');
        singleInfo.className = 'value-item';
        singleInfo.innerHTML = `
            <span class="value-label">单次</span>
            <span class="value-amount">${flower.singleAmount}朵</span>
            <span class="value-price">${flower.singleValue}亿</span>
        `;
        valueInfo.appendChild(singleInfo);

        // 总计信息
        const totalInfo = document.createElement('div');
        totalInfo.className = 'value-item';
        totalInfo.innerHTML = `
            <span class="value-label">总计</span>
            <span class="value-amount">${flower.totalAmount}朵</span>
            <span class="value-price">${flower.totalValue}亿</span>
        `;
        valueInfo.appendChild(totalInfo);

        card.appendChild(valueInfo);
        cardsContainer.appendChild(card);
    });

    contentDiv.appendChild(cardsContainer);

    // 添加注意事项
    const notesList = document.createElement('ul');
    notesList.className = 'tips-list';
    guideData.marketValueGuide.notes.forEach(note => {
        const li = document.createElement('li');
        li.textContent = note;
        notesList.appendChild(li);
    });
    contentDiv.appendChild(notesList);

    // 将头部和内容添加到折叠区域
    sectionDiv.appendChild(headerDiv);
    sectionDiv.appendChild(contentDiv);

    // 添加折叠点击事件
    headerDiv.addEventListener('click', function() {
        const section = this.parentElement;
        section.classList.toggle('active');
    });

    container.appendChild(sectionDiv);
} 