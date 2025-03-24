// 检测是否在微信或QQ中打开
function checkBrowser() {
    const ua = navigator.userAgent.toLowerCase();
    const isWechat = ua.indexOf('micromessenger') !== -1;
    const isQQ = ua.indexOf('qq') !== -1;
    const currentUrl = window.location.href;
    const rootUrl = window.location.origin + '/';
    const hostname = window.location.hostname;

    // 如果是微信或QQ浏览器
    if (isWechat || isQQ) {
        // 如果当前不是引导页面，则跳转到引导页面
        if (!currentUrl.includes('browser-guide.html')) {
            window.location.href = 'browser-guide.html';
        }
    }
    // 如果不是微信和QQ浏览器
    else {
        // 如果当前是browser-guide.html页面，则跳转到根目录
        if (currentUrl.includes('browser-guide.html')) {
            window.location.href = rootUrl;
            return;
        }

        // 如果既不是index.html也不是根路径，也跳转到根目录
        const isIndexPage = currentUrl.includes('index.html');
        const isRootPath = currentUrl === rootUrl ||
                           currentUrl === window.location.origin ||
                           currentUrl.endsWith('/');

        if (!isIndexPage && !isRootPath) {
            window.location.href = rootUrl;
        }
    }
}

// 页面加载完成后执行检测
document.addEventListener('DOMContentLoaded', checkBrowser); 