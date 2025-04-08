// 渲染扶贫用户列表
function renderPovertyPlayers(containerId) {
    const container = document.getElementById(containerId);
    
    // 清空容器内容
    if (container) {
        container.innerHTML = '';
    } else {
        console.error(`找不到容器: ${containerId}`);
        return;
    }
    
    // 创建扶贫说明区域
    const instructionsDiv = document.createElement('div');
    instructionsDiv.className = 'poverty-instructions';
    
    // 添加扶贫说明内容
    povertyData.povertyInstructions.forEach(instruction => {
        const p = document.createElement('p');
        p.className = 'instruction-item';
        // 添加警示符号
        p.innerHTML = `<span class="warning-icon">⚠️</span> ${instruction}`;
        instructionsDiv.appendChild(p);
    });
    
    // 将说明添加到容器
    container.appendChild(instructionsDiv);
    
    // 创建用户列表
    const playerList = document.createElement('ul');
    playerList.className = 'player-list';
    
    // 遍历扶贫用户数据
    povertyData.povertyPlayers.forEach(player => {
        // 创建用户项
        const li = document.createElement('li');
        li.className = 'player-item poverty-player-item';
        
        // 创建用户信息区域
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
        }
        
        // 创建按钮区域
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'copy-buttons';
        
        // 创建复制ID按钮
        const nameBtn = document.createElement('button');
        nameBtn.className = 'copy-btn';
        nameBtn.innerHTML = '<i class="layui-icon layui-icon-edit"></i>复制昵称';
        nameBtn.onclick = function() {
            copyText(player.id);
        };
        
        // 创建复制UID按钮
        const uidBtn = document.createElement('button');
        uidBtn.className = 'copy-btn';
        uidBtn.innerHTML = '<i class="layui-icon layui-icon-username"></i>复制UID';
        uidBtn.onclick = function() {
            copyText(player.uid);
        };
        
        // 添加按钮到按钮区域
        buttonsDiv.appendChild(nameBtn);
        
        // 只有当UID不为"000"时，才添加复制UID的按钮
        if (player.uid !== "000") {
            buttonsDiv.appendChild(uidBtn);
        }
        
        // 将信息和按钮添加到用户项
        li.appendChild(infoDiv);
        li.appendChild(buttonsDiv);
        
        // 将用户项添加到列表
        playerList.appendChild(li);
    });
    
    // 将用户列表添加到容器
    container.appendChild(playerList);
}

// DOM加载完成后
document.addEventListener('DOMContentLoaded', function() {
    // 渲染扶贫用户列表
    if (document.getElementById('poverty-players-list')) {
        renderPovertyPlayers('poverty-players-list');
    }
}); 