// 复制文本功能
function copyText(text) {
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = text;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    
    // 使用Layui的提示组件
    layui.use('layer', function(){
        var layer = layui.layer;
        layer.msg('已复制: ' + text, {
            time: 1000,
            icon: 1
        });
    });
}

// 获取备注类型的函数
function getNoteClass(note) {
    if (note.includes('无需艾特') || note.includes('无需@')) {
        return 'note-no-mention';
    } else if (note.includes('请先艾特') || note.includes('艾特') || note.includes('@') || note.includes('戳')) {
        return 'note-need-mention';
    } else {
        return 'note-default';
    }
}

// 渲染警告框
function renderWarningBox(containerId) {
    const container = document.getElementById(containerId);
    
    // 创建警告文本
    const warningP = document.createElement('p');
    warningP.className = 'warning-text';
    warningP.textContent = commonData.warningInfo.warningText;
    container.appendChild(warningP);
    
    // 创建通知文本
    const noticeP = document.createElement('p');
    noticeP.className = 'notice-text';
    
    // 将通知项目添加到通知文本中，使用<br>分隔
    noticeP.innerHTML = commonData.warningInfo.noticeItems.join('<br>');
    container.appendChild(noticeP);
}

// 渲染更新日志
function renderUpdates(containerId) {
    const container = document.getElementById(containerId);
    commonData.updates.forEach(update => {
        const p = document.createElement('p');
        p.className = 'update-info';
        p.textContent = `${update.date} ${update.content}`;
        container.appendChild(p);
    });
}

// 渲染玩家列表
function renderPlayerList(data, containerId) {
    const container = document.getElementById(containerId);
    
    data.forEach(section => {
        // 创建折叠区域
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'collapsible-section';
        
        // 创建折叠头部
        const headerDiv = document.createElement('div');
        headerDiv.className = 'collapsible-header';
        
        // 创建标题
        const titleDiv = document.createElement('div');
        titleDiv.className = 'collapsible-title';
        
        // 添加标题文本
        const titleText = document.createElement('span');
        titleText.textContent = section.title;
        titleDiv.appendChild(titleText);
        
        headerDiv.appendChild(titleDiv);
        
        // 添加折叠图标
        const iconSpan = document.createElement('span');
        iconSpan.className = 'collapsible-icon';
        iconSpan.innerHTML = '<i class="layui-icon layui-icon-down"></i>';
        headerDiv.appendChild(iconSpan);
        
        // 创建内容区域
        const contentDiv = document.createElement('div');
        contentDiv.className = 'collapsible-content';
        
        // 创建玩家列表
        const ul = document.createElement('ul');
        ul.className = 'player-list';
        
        section.players.forEach(player => {
            const li = document.createElement('li');
            li.className = 'player-item';
            
            const infoDiv = document.createElement('div');
            infoDiv.className = 'player-info';
            
            // 创建ID文本
            const idSpan = document.createElement('span');
            idSpan.className = 'player-id';
            idSpan.textContent = player.id;
            infoDiv.appendChild(idSpan);
            
            // 如果有note，创建标签
            if (player.note) {
                const noteSpan = document.createElement('span');
                noteSpan.className = `player-note ${getNoteClass(player.note)}`;
                noteSpan.textContent = player.note;
                infoDiv.appendChild(noteSpan);
            }else {
                const noteSpan = document.createElement('span');
                const note_text = `@${player.id}`;
                noteSpan.className = `player-note ${getNoteClass(note_text)}`;
                noteSpan.textContent = note_text;
                infoDiv.appendChild(noteSpan);
            }
            
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'copy-buttons';
            
            const uidBtn = document.createElement('button');
            uidBtn.className = 'copy-btn';
            uidBtn.innerHTML = '<i class="layui-icon layui-icon-username"></i>复制UID';
            uidBtn.onclick = function() { copyText(player.uid); };
            
            const nameBtn = document.createElement('button');
            nameBtn.className = 'copy-btn';
            nameBtn.innerHTML = '<i class="layui-icon layui-icon-edit"></i>复制昵称';
            nameBtn.onclick = function() { copyText(player.id); };
            
            buttonsDiv.appendChild(uidBtn);
            buttonsDiv.appendChild(nameBtn);
            
            li.appendChild(infoDiv);
            li.appendChild(buttonsDiv);
            ul.appendChild(li);
        });
        
        contentDiv.appendChild(ul);
        
        // 将头部和内容添加到折叠区域
        sectionDiv.appendChild(headerDiv);
        sectionDiv.appendChild(contentDiv);
        
        // 简化折叠点击事件处理
        headerDiv.addEventListener('click', function() {
            const section = this.parentElement;
            section.classList.toggle('active');
        });
        
        // 添加到容器
        container.appendChild(sectionDiv);
    });
}

// 渲染商人信息
function renderMerchants(containerId) {
    const container = document.getElementById(containerId);
    
    merchantData.merchants.forEach(merchant => {
        // 创建折叠区域
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'collapsible-section';
        
        // 创建折叠头部
        const headerDiv = document.createElement('div');
        headerDiv.className = 'collapsible-header';
        
        // 创建标题
        const titleDiv = document.createElement('div');
        titleDiv.className = 'collapsible-title';
        titleDiv.textContent = `${merchant.type}商人`;
        
        headerDiv.appendChild(titleDiv);
        
        // 添加折叠图标
        const iconSpan = document.createElement('span');
        iconSpan.className = 'collapsible-icon';
        iconSpan.innerHTML = '<i class="layui-icon layui-icon-down"></i>';
        headerDiv.appendChild(iconSpan);
        
        // 创建内容区域
        const contentDiv = document.createElement('div');
        contentDiv.className = 'collapsible-content';
        
        // 创建商人列表
        const ul = document.createElement('ul');
        ul.className = 'merchant-list';
        
        merchant.players.forEach(player => {
            const li = document.createElement('li');
            li.className = 'merchant-item';
            
            const infoDiv = document.createElement('div');
            infoDiv.className = 'merchant-info';
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'merchant-name';
            nameSpan.textContent = player.id;
            
            // 如果有note，创建标签
            if (player.note) {
                const noteSpan = document.createElement('span');
                noteSpan.className = `player-note ${getNoteClass(player.note)}`;
                noteSpan.textContent = player.note;
                nameSpan.appendChild(noteSpan);
            }else {
                const noteSpan = document.createElement('span');
                const note_text = `@${player.id}`;
                noteSpan.className = `player-note ${getNoteClass(note_text)}`;
                noteSpan.textContent = note_text;
                nameSpan.appendChild(noteSpan);
            }
            
            const timeSpan = document.createElement('span');
            timeSpan.className = 'merchant-time';
            timeSpan.textContent = `离开时间：${player.leaveTime}`;
            
            infoDiv.appendChild(nameSpan);
            infoDiv.appendChild(timeSpan);
            
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'copy-buttons';
            
            const uidBtn = document.createElement('button');
            uidBtn.className = 'copy-btn';
            uidBtn.innerHTML = '<i class="layui-icon layui-icon-username"></i>复制UID';
            uidBtn.onclick = function() { copyText(player.uid); };
            
            const nameBtn = document.createElement('button');
            nameBtn.className = 'copy-btn';
            nameBtn.innerHTML = '<i class="layui-icon layui-icon-edit"></i>复制昵称';
            nameBtn.onclick = function() { copyText(player.id); };
            
            buttonsDiv.appendChild(uidBtn);
            buttonsDiv.appendChild(nameBtn);
            
            li.appendChild(infoDiv);
            li.appendChild(buttonsDiv);
            ul.appendChild(li);
        });
        
        contentDiv.appendChild(ul);
        
        // 将头部和内容添加到折叠区域
        sectionDiv.appendChild(headerDiv);
        sectionDiv.appendChild(contentDiv);
        
        // 简化折叠点击事件处理
        headerDiv.addEventListener('click', function() {
            const section = this.parentElement;
            section.classList.toggle('active');
        });
        
        // 添加到容器
        container.appendChild(sectionDiv);
    });
}


    

// 渲染耻辱柱
function renderShameList(containerId) {
    const container = document.getElementById(containerId);
    
    // 创建标题（如果HTML中没有）
    if (!container.querySelector('.section-title')) {
        const h2 = document.createElement('h2');
        h2.className = 'section-title';
        h2.textContent = '耻辱柱（偷菜曝光区）';
        container.appendChild(h2);
    }
    
    // 创建玩家列表
    const ul = document.createElement('ul');
    ul.className = 'player-list';
    
    playerData.shamePlayers.forEach(player => {
        const li = document.createElement('li');
        li.className = 'player-item';
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'player-info';
        
        // 创建ID文本
        const idSpan = document.createElement('span');
        idSpan.className = 'player-id';
        idSpan.textContent = `ID:${player.id}`;
        infoDiv.appendChild(idSpan);
        
        // 如果有note，创建标签
        if (player.note) {
            const noteSpan = document.createElement('span');
            noteSpan.className = `player-note ${getNoteClass(player.note)}`;
            noteSpan.textContent = player.note;
            infoDiv.appendChild(noteSpan);
        }
        
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'copy-buttons';
        
        const uidBtn = document.createElement('button');
        uidBtn.className = 'copy-btn';
        uidBtn.innerHTML = '<i class="layui-icon layui-icon-username"></i>复制UID';
        uidBtn.onclick = function() { copyText(player.uid); };
        
        const nameBtn = document.createElement('button');
        nameBtn.className = 'copy-btn';
        nameBtn.innerHTML = '<i class="layui-icon layui-icon-edit"></i>复制昵称';
        nameBtn.onclick = function() { copyText(player.id); };
        
        buttonsDiv.appendChild(uidBtn);
        buttonsDiv.appendChild(nameBtn);
        
        li.appendChild(infoDiv);
        li.appendChild(buttonsDiv);
        ul.appendChild(li);
    });
    
    container.appendChild(ul);
}

// 页面加载完成后
window.onload = function() {
    // 隐藏加载动画
    document.getElementById('loading').style.display = 'none';
    
    // 渲染警告框
    renderWarningBox('main-warning-box');
    renderWarningBox('merchant-warning-box');
    renderWarningBox('guide-warning-box');
    
    // 渲染所有内容
    renderUpdates('update-section');
    renderUpdates('merchant-update-section');
    renderUpdates('guide-update-section');

    renderPlayerList(playerData.commonSection, 'common-section');
    renderPlayerList(playerData.experienceSection, 'experience-section');
    renderPlayerList(playerData.skillSection, 'skill-section');
    renderPlayerList(playerData.coinSection, 'coin-section');
    
    renderMerchants('merchant-info-section');
    
    // 渲染各页面的攻略内容
    renderGuides('guide-section');
    renderGuides('merchant-guide-section');
    renderGuides('guide-hotspring-section');
    renderGuides('guide-market-section');
    renderGuides('guide-other-section');
    
    renderShameList('shame-section');
    renderShameList('merchant-shame-section');
    
    // 返回顶部和返回底部按钮
    const backToTopButtons = document.querySelectorAll('.back-to-top');
    const backToBottomButtons = document.querySelectorAll('.back-to-bottom');
    
    window.addEventListener('scroll', function() {
        // 计算页面总高度
        const totalHeight = document.body.scrollHeight;
        // 计算视口高度
        const viewportHeight = window.innerHeight;
        // 计算当前滚动位置
        const scrollPosition = window.pageYOffset;
        
        // 当滚动超过300px时显示返回顶部按钮
        if (scrollPosition > 300) {
            backToTopButtons.forEach(btn => btn.classList.add('visible'));
        } else {
            backToTopButtons.forEach(btn => btn.classList.remove('visible'));
        }
        
        // 当距离底部超过300px时显示返回底部按钮
        if (totalHeight - viewportHeight - scrollPosition > 300) {
            backToBottomButtons.forEach(btn => btn.classList.add('visible'));
        } else {
            backToBottomButtons.forEach(btn => btn.classList.remove('visible'));
        }
    });
    
    backToTopButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    backToBottomButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        });
    });
    
    // 导航按钮切换功能
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // 给当前点击的按钮添加active类
            this.classList.add('active');
            
            // 获取目标内容区域
            const targetId = this.getAttribute('data-target');
            
            // 隐藏所有内容区域
            document.querySelectorAll('.content-area').forEach(area => {
                area.classList.remove('active');
            });
            
            // 显示目标内容区域
            document.getElementById(targetId).classList.add('active');
            
            // 滚动到顶部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}; 