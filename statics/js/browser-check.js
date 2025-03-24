// 检测是否在微信或QQ中打开
function checkBrowser() {
    const ua = navigator.userAgent.toLowerCase();
    const isWechat = ua.indexOf('micromessenger') !== -1;
    const isQQ = ua.indexOf('qq') !== -1;
    
    if (isWechat || isQQ) {
        document.getElementById('wechatTip').style.display = 'block';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
}

// 页面加载完成后执行检测
document.addEventListener('DOMContentLoaded', checkBrowser); 