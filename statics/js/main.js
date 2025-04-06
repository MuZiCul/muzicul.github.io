// 域名跳转控制参数（1为开启跳转提示，0为关闭跳转提示）
const browserRedirectConfig = {
    'farmmemo.netlify.app': 1,  // 第一个链接的跳转控制
    'muzicul.github.io': 0      // 第二个链接的跳转控制
};

// 复制文本功能
function copyText(text) {
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = text;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // 使用Layui的提示组件
    layui.use('layer', function () {
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
        return 'at-no-mention';
    } else {
        return 'at-need-mention';
    }
}

function getSellClass(sell) {
    if (sell.includes('0')) {
        return 'at-no-mention';
    } else {
        return 'at-default';
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

// 渲染月度最佳温泉贡献奖励
function renderUpdates(containerId) {
    const container = document.getElementById(containerId);

    // 创建奖励内容区域
    const rewardContent = document.createElement('div');
    rewardContent.className = 'collapsible-section';

    // 创建奖励内容头部
    const rewardHeader = document.createElement('div');
    rewardHeader.className = 'collapsible-header';

    // 创建奖励内容标题
    const rewardTitle = document.createElement('div');
    rewardTitle.className = 'collapsible-title';
    rewardTitle.textContent = '奖励内容';
    rewardHeader.appendChild(rewardTitle);

    // 添加折叠图标
    const rewardIcon = document.createElement('span');
    rewardIcon.className = 'collapsible-icon';
    rewardIcon.innerHTML = '<i class="layui-icon layui-icon-down"></i>';
    rewardHeader.appendChild(rewardIcon);

    // 创建奖励内容区域
    const rewardListContainer = document.createElement('div');
    rewardListContainer.className = 'collapsible-content';

    // 创建奖励内容列表
    const rewardList = document.createElement('ul');
    rewardList.className = 'reward-list';
    commonData.updates.forEach(reward => {
        const li = document.createElement('li');
        li.className = 'reward-item';
        li.textContent = reward.content;
        rewardList.appendChild(li);
    });
    rewardListContainer.appendChild(rewardList);

    // 将头部和内容添加到奖励区域
    rewardContent.appendChild(rewardHeader);
    rewardContent.appendChild(rewardListContainer);

    // 创建奖励规则区域
    const ruleContent = document.createElement('div');
    ruleContent.className = 'collapsible-section';

    // 创建奖励规则头部
    const ruleHeader = document.createElement('div');
    ruleHeader.className = 'collapsible-header';

    // 创建奖励规则标题
    const ruleTitle = document.createElement('div');
    ruleTitle.className = 'collapsible-title';
    ruleTitle.textContent = '奖励规则';
    ruleHeader.appendChild(ruleTitle);

    // 添加折叠图标
    const ruleIcon = document.createElement('span');
    ruleIcon.className = 'collapsible-icon';
    ruleIcon.innerHTML = '<i class="layui-icon layui-icon-down"></i>';
    ruleHeader.appendChild(ruleIcon);

    // 创建奖励规则内容区域
    const ruleListContainer = document.createElement('div');
    ruleListContainer.className = 'collapsible-content';

    // 创建奖励规则列表
    const ruleList = document.createElement('ul');
    ruleList.className = 'rule-list';
    commonData.rules.forEach(rule => {
        const li = document.createElement('li');
        li.className = 'rule-item';
        li.textContent = rule.content;
        ruleList.appendChild(li);
    });
    ruleListContainer.appendChild(ruleList);

    // 将头部和内容添加到规则区域
    ruleContent.appendChild(ruleHeader);
    ruleContent.appendChild(ruleListContainer);

    // 将奖励内容和规则添加到容器
    container.appendChild(rewardContent);
    container.appendChild(ruleContent);

    // 添加折叠点击事件
    const sections = [rewardContent, ruleContent];
    sections.forEach(section => {
        const header = section.querySelector('.collapsible-header');
        header.addEventListener('click', function () {
            section.classList.toggle('active');
        });
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
            } else {
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
            uidBtn.onclick = function () {
                copyText(player.uid);
            };

            const nameBtn = document.createElement('button');
            nameBtn.className = 'copy-btn';
            nameBtn.innerHTML = '<i class="layui-icon layui-icon-edit"></i>复制昵称';
            nameBtn.onclick = function () {
                copyText(player.id);
            };

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
        headerDiv.addEventListener('click', function () {
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

    // 获取当前时间
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // 月份从0开始，所以+1
    const currentDate = now.getDate();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // 解析离开时间并判断是否已过期
    function isTimeValid(leaveTimeStr) {
        // 如果没有离开时间数据，显示该商人
        if (!leaveTimeStr) return true;

        // 解析格式如"4.1号20.36"的离开时间
        try {
            const match = leaveTimeStr.match(/(\d+)\.(\d+)号(\d+)\.(\d+)/);
            if (!match) return true; // 如果格式不匹配，默认显示

            const leaveMonth = parseInt(match[1]);
            const leaveDate = parseInt(match[2]);
            const leaveHour = parseInt(match[3]);
            const leaveMinute = parseInt(match[4]);

            // 比较日期和时间
            if (leaveMonth < currentMonth) return false;
            if (leaveMonth > currentMonth) return true;

            // 同月比较日期
            if (leaveDate < currentDate) return false;
            if (leaveDate > currentDate) return true;

            // 同日比较时间
            if (leaveHour < currentHour) return false;
            if (leaveHour > currentHour) return true;

            // 同小时比较分钟
            return leaveMinute >= currentMinute;
        } catch (e) {
            console.error("解析离开时间出错:", e);
            return true; // 出错时默认显示商人
        }
    }

    merchantData.merchants.forEach(merchant => {
        // 过滤已过期的商人
        const validPlayers = merchant.players.filter(player => isTimeValid(player.leaveTime));

        // 如果该类型的商人都已离开，则不显示该折叠区域
        if (validPlayers.length === 0) return;

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

        validPlayers.forEach(player => {
            const li = document.createElement('li');
            li.className = 'merchant-item';

            const infoDiv = document.createElement('div');
            infoDiv.className = 'merchant-info';

            const nameSpan = document.createElement('span');
            nameSpan.className = 'merchant-name';
            nameSpan.textContent = player.id;

            if (player.sell) {
                const sellSpan = document.createElement('span');
                sellSpan.className = `player-note ${getSellClass(player.at)}`;
                sellSpan.textContent = player.sell;
                nameSpan.appendChild(sellSpan);
            }
            if (player.note) {
                const noteSpan = document.createElement('span');
                noteSpan.className = `player-note noat-no-mention`;
                noteSpan.textContent = player.note;
                nameSpan.appendChild(noteSpan);
            }

            // 如果有note，创建标签
            if (player.at) {
                const atSpan = document.createElement('span');
                atSpan.className = `player-note ${getNoteClass(player.at)}`;
                let atText = player.at;
                if (!atText.startsWith('@')) {
                    atText = '@' + atText;
                }
                atSpan.textContent = atText;
                nameSpan.appendChild(atSpan);
            } else {
                const atSpan = document.createElement('span');
                const note_text = `@${player.id}`;
                atSpan.className = `player-note ${getNoteClass(note_text)}`;
                atSpan.textContent = note_text;
                nameSpan.appendChild(atSpan);
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
            uidBtn.onclick = function () {
                copyText(player.uid);
            };

            const nameBtn = document.createElement('button');
            nameBtn.className = 'copy-btn';
            nameBtn.innerHTML = '<i class="layui-icon layui-icon-edit"></i>复制昵称';
            nameBtn.onclick = function () {
                copyText(player.id);
            };

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
        headerDiv.addEventListener('click', function () {
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
        uidBtn.onclick = function () {
            copyText(player.uid);
        };

        const nameBtn = document.createElement('button');
        nameBtn.className = 'copy-btn';
        nameBtn.innerHTML = '<i class="layui-icon layui-icon-edit"></i>复制昵称';
        nameBtn.onclick = function () {
            copyText(player.id);
        };

        buttonsDiv.appendChild(uidBtn);
        buttonsDiv.appendChild(nameBtn);

        li.appendChild(infoDiv);
        li.appendChild(buttonsDiv);
        ul.appendChild(li);
    });

    container.appendChild(ul);
}

// 渲染本周活动内容
function renderWeekActivity(containerId) {
    const container = document.getElementById(containerId);

    // 获取当前日期
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 月份从0开始，所以+1
    const currentDate = now.getDate();

    // 格式化日期为YYYY-MM-DD格式
    const formatDate = (year, month, day) => {
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    };

    const currentDateStr = formatDate(currentYear, currentMonth, currentDate);

    // 查找当前日期所在的周
    let currentWeek = null;

    // 检查2025年周数表
    if (WeekData["2025年周数表"]) {
        currentWeek = WeekData["2025年周数表"].find(week => {
            const startDate = new Date(week.起始日期);
            const endDate = new Date(week.结束日期);
            const currentDateObj = new Date(currentDateStr);

            return currentDateObj >= startDate && currentDateObj <= endDate;
        });
    }

    // 创建活动内容区域
    const activityContent = document.createElement('div');
    activityContent.className = 'collapsible-section';

    // 创建活动内容头部
    const activityHeader = document.createElement('div');
    activityHeader.className = 'collapsible-header';

    // 创建活动内容标题
    const activityTitle = document.createElement('div');
    activityTitle.className = 'collapsible-title';

    if (currentWeek) {
        activityTitle.textContent = `第${currentWeek.周数}周活动 (${currentWeek.起始日期} 至 ${currentWeek.结束日期})`;
    } else {
        activityTitle.textContent = '元梦星期五';
    }

    activityHeader.appendChild(activityTitle);

    // 添加折叠图标
    const activityIcon = document.createElement('span');
    activityIcon.className = 'collapsible-icon';
    activityIcon.innerHTML = '<i class="layui-icon layui-icon-down"></i>';
    activityHeader.appendChild(activityIcon);

    // 创建活动内容区域
    const activityListContainer = document.createElement('div');
    activityListContainer.className = 'collapsible-content';

    // 创建活动内容列表
    const activityList = document.createElement('ul');
    activityList.className = 'activity-list';

    if (currentWeek && currentWeek.活动内容 && currentWeek.活动内容.length > 0) {
        currentWeek.活动内容.forEach(activity => {
            const li = document.createElement('li');
            li.className = 'activity-item';
            li.textContent = activity;
            activityList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.className = 'activity-item';
        li.textContent = '暂无活动信息';
        activityList.appendChild(li);
    }

    activityListContainer.appendChild(activityList);

    // 将头部和内容添加到活动区域
    activityContent.appendChild(activityHeader);
    activityContent.appendChild(activityListContainer);

    // 添加折叠点击事件
    activityHeader.addEventListener('click', function () {
        activityContent.classList.toggle('active');
    });

    // 将活动内容添加到容器
    container.appendChild(activityContent);
}

// 页面加载完成后
window.onload = function () {
    try {
        // 显示调试信息
        console.log("页面加载完成，开始渲染内容");

        // 检查必要的全局变量
        // const debugInfo = document.createElement('div');
        // debugInfo.id = 'debug-info';
        // debugInfo.style.cssText = 'position:fixed;top:10px;right:10px;background:rgba(255,0,0,0.8);color:white;padding:10px;z-index:9999;border-radius:5px;font-size:12px;';
        //
        // let missingData = [];
        // if (typeof commonData === 'undefined') missingData.push('commonData');
        // if (typeof playerData === 'undefined') missingData.push('playerData');
        // if (typeof merchantData === 'undefined') missingData.push('merchantData');
        // if (typeof WeekData === 'undefined') missingData.push('WeekData');
        //
        // if (missingData.length > 0) {
        //     debugInfo.textContent = `缺少数据: ${missingData.join(', ')}`;
        //     document.body.appendChild(debugInfo);
        //     console.error(`缺少必要数据: ${missingData.join(', ')}`);
        // } else {
        //     debugInfo.textContent = "数据已加载";
        //     debugInfo.style.background = 'rgba(0,255,0,0.8)';
        //     document.body.appendChild(debugInfo);
        //     console.log("所有必要数据已加载");
        // }

        // 隐藏加载动画
        document.getElementById('loading').style.display = 'none';

        // 渲染警告框
        console.log("渲染警告框");
        renderWarningBox('main-warning-box');
        renderWarningBox('merchant-warning-box');
        renderWarningBox('guide-warning-box');
        renderWarningBox('contribution-warning-box');

        // 渲染所有内容
        console.log("渲染月度最佳温泉贡献奖励");
        renderUpdates('update-section');
        renderUpdates('merchant-update-section');
        renderUpdates('guide-update-section');
        renderUpdates('contribution-reward-section');

        // 渲染本周活动
        console.log("渲染本周活动");
        renderWeekActivity('week-activity-section');

        console.log("渲染常用区");
        renderPlayerList(playerData.commonSection, 'common-section');
        console.log("渲染经验区");
        renderPlayerList(playerData.experienceSection, 'experience-section');
        console.log("渲染熟练度区");
        renderPlayerList(playerData.skillSection, 'skill-section');
        console.log("渲染金币区");
        renderPlayerList(playerData.coinSection, 'coin-section');

        console.log("渲染商人信息");
        renderMerchants('merchant-info-section');

        // 渲染各页面的攻略内容
        console.log("渲染攻略内容");
        renderGuides('guide-section');
        renderGuides('merchant-guide-section');
        renderGuides('guide-hotspring-section');
        renderGuides('guide-market-section');
        renderGuides('guide-other-section');
        renderGuides('guide-Friday-section');
        renderGuides('contribution-guide-section');

        console.log("渲染耻辱柱");
        renderShameList('shame-section');
        renderShameList('merchant-shame-section');
        renderShameList('contribution-shame-section');

        // 返回顶部和返回底部按钮
        const backToTopButtons = document.querySelectorAll('.back-to-top');
        const backToBottomButtons = document.querySelectorAll('.back-to-bottom');

        window.addEventListener('scroll', function () {
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
            btn.addEventListener('click', function () {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });

        backToBottomButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            });
        });

        // 导航按钮切换功能
        const navButtons = document.querySelectorAll('.nav-btn');

        navButtons.forEach(button => {
            button.addEventListener('click', function () {
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
    } catch (error) {
        // 创建错误信息显示
        const errorInfo = document.createElement('div');
        errorInfo.style.cssText = 'position:fixed;top:10px;left:10px;background:rgba(255,0,0,0.8);color:white;padding:10px;z-index:9999;border-radius:5px;max-width:80%;';
        errorInfo.innerHTML = `<strong>错误:</strong> ${error.message}<br><pre>${error.stack}</pre>`;
        document.body.appendChild(errorInfo);
        console.error('页面加载错误:', error);

        // 隐藏加载动画
        if (document.getElementById('loading')) {
            document.getElementById('loading').style.display = 'none';
        }
    }
}; 