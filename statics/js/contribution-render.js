// 渲染贡献榜列表
function renderContributionList() {
    const contributionSection = document.getElementById('contribution-section');
    if (!contributionSection) return;

    // 清空现有内容
    contributionSection.innerHTML = '<h2 class="section-title">月度贡献榜 TOP 10</h2>';

    const contributionList = document.createElement('div');
    contributionList.className = 'contribution-list';
    contributionList.id = 'contribution-list';

    // 按积分降序排序贡献榜数据，并过滤掉积分为0的用户
    const sortedContributions = [...contributionData.contributions]
        .filter(contributor => contributor.points > 0)
        .sort((a, b) => b.points - a.points);
    
    // 存储排序后的数据到window对象，以便"查看更多"功能使用
    window.sortedContributionData = sortedContributions;
    
    // 初始显示前10名
    renderContributionCards(contributionList, sortedContributions, 0, 10);

    contributionSection.appendChild(contributionList);
    
    // 如果数据超过10条，添加"查看更多"按钮
    if (sortedContributions.length > 10) {
        const loadMoreContainer = document.createElement('div');
        loadMoreContainer.className = 'load-more-container';
        
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.className = 'load-more-btn';
        loadMoreBtn.textContent = '查看更多';
        loadMoreBtn.setAttribute('data-current-count', '10');
        
        loadMoreBtn.addEventListener('click', loadMoreContributions);
        
        loadMoreContainer.appendChild(loadMoreBtn);
        contributionSection.appendChild(loadMoreContainer);
    }
}

// 渲染贡献卡片
function renderContributionCards(container, data, startIndex, endIndex) {
    for (let i = startIndex; i < endIndex && i < data.length; i++) {
        const contributor = data[i];
        
        const card = document.createElement('div');
        card.className = 'contribution-card';

        // 创建头部信息
        const header = document.createElement('div');
        header.className = 'contribution-header';

        // 排名（根据当前索引计算）
        const rank = document.createElement('div');
        rank.className = 'contribution-rank';
        rank.textContent = i + 1;

        // 贡献者信息
        const info = document.createElement('div');
        info.className = 'contribution-info';

        const name = document.createElement('div');
        name.className = 'contributor-name';
        name.textContent = contributor.name;

        const points = document.createElement('div');
        points.className = 'contributor-points';
        points.textContent = `贡献积分：${contributor.points}`;

        info.appendChild(name);
        info.appendChild(points);
        header.appendChild(rank);
        header.appendChild(info);

        // 创建贡献详情
        const details = document.createElement('div');
        details.className = 'contribution-details';

        if (contributor.contributions && contributor.contributions.length > 0) {
            contributor.contributions.forEach(contribution => {
                const item = document.createElement('div');
                item.className = 'contribution-item';
                item.textContent = contribution;
                details.appendChild(item);
            });
        }

        card.appendChild(header);
        card.appendChild(details);
        container.appendChild(card);
    }
}

// 加载更多贡献者
function loadMoreContributions() {
    const currentCount = parseInt(this.getAttribute('data-current-count'));
    const contributionList = document.getElementById('contribution-list');
    const sortedContributions = window.sortedContributionData;
    
    if (!sortedContributions) return;
    
    // 下一批10个贡献者
    const nextEndIndex = currentCount + 10;
    
    // 渲染新的贡献卡片
    renderContributionCards(contributionList, sortedContributions, currentCount, nextEndIndex);
    
    // 更新当前数量
    this.setAttribute('data-current-count', nextEndIndex);
    
    // 如果已显示全部数据，隐藏按钮
    if (nextEndIndex >= sortedContributions.length) {
        this.style.display = 'none';
    }
}

// 页面加载完成后渲染贡献榜
document.addEventListener('DOMContentLoaded', () => {
    renderContributionList();
}); 