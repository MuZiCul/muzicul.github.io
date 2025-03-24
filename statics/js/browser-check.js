// 检测是否在微信或QQ中打开
function checkBrowser() {
    const ua = navigator.userAgent.toLowerCase();
    const isWechat = ua.indexOf('micromessenger') !== -1;
    const isQQ = ua.indexOf('qq') !== -1;
    
    if (isWechat || isQQ) {
        // 如果当前不是引导页面，则跳转到引导页面
        if (!window.location.href.includes('browser-guide.html')) {
            window.location.href = 'browser-guide.html';
        }
    }
}

// 页面加载完成后执行检测
document.addEventListener('DOMContentLoaded', checkBrowser); 