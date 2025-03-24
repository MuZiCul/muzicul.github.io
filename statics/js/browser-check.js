// 检测是否在微信或QQ中打开并使用蒙版模式引导
function checkBrowser() {
    const ua = navigator.userAgent.toLowerCase();
    const isWechat = ua.indexOf('micromessenger') !== -1;
    const isQQ = ua.indexOf('qq') !== -1;

    // 只有在微信或QQ浏览器中才显示蒙版引导
    if (isWechat || isQQ) {
        // 创建蒙版引导元素
        createBrowserGuide();
    }
    // 在其他浏览器中不做任何处理，正常显示页面内容
}

// 创建浏览器引导蒙版
function createBrowserGuide() {
    // 防止重复创建
    if (document.getElementById('browser-guide-mask')) {
        return;
    }

    // 隐藏页面内容
    document.body.style.overflow = 'hidden';

    // 创建蒙版容器
    const mask = document.createElement('div');
    mask.id = 'browser-guide-mask';
    mask.style.position = 'fixed';
    mask.style.top = '0';
    mask.style.left = '0';
    mask.style.width = '100%';
    mask.style.height = '100%';
    mask.style.backgroundColor = '#1a1a1a';
    mask.style.zIndex = '999999';
    mask.style.display = 'flex';
    mask.style.flexDirection = 'column';
    mask.style.alignItems = 'center';
    mask.style.justifyContent = 'center';
    mask.style.color = '#fff';
    mask.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

    // 创建内容
    const guideContent = `
        <div style="width: 90%; max-width: 320px; text-align: center; padding: 20px;">
            <div style="width: 80px; height: 80px; background: #fff; border-radius: 20px; margin: 0 auto 20px; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 50px; height: 50px; background: linear-gradient(45deg, #2196F3, #00BCD4); border-radius: 50%;"></div>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 25px; height: 25px; background: #fff; border-radius: 50%;"></div>
            </div>
            <div style="font-size: 24px; font-weight: bold; margin: 20px 0;">请在浏览器中打开</div>
            <div style="position: absolute; top: 30px; right: 40px; font-size: 32px; animation: click 1.5s infinite;">👆</div>
            <div style="background: rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 20px; margin: 20px 0; text-align: left;">
                <div style="display: flex; align-items: center; margin: 15px 0;">
                    <div style="width: 28px; height: 28px; background: #fff; color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold; font-size: 16px;">1</div>
                    <div style="font-size: 16px; line-height: 1.5;">点击右上角的"..."按钮</div>
                </div>
                <div style="display: flex; align-items: center; margin: 15px 0;">
                    <div style="width: 28px; height: 28px; background: #fff; color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold; font-size: 16px;">2</div>
                    <div style="font-size: 16px; line-height: 1.5;">选择"在浏览器中打开"</div>
                </div>
            </div>
            <div style="width: 50px; height: 50px; background: #fff; border-radius: 12px; margin: 20px auto; position: relative;">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 30px; height: 30px; background: conic-gradient(from 0deg, #EA4335 90deg, #34A853 90deg 180deg, #FBBC05 180deg 270deg, #4285F4 270deg); border-radius: 50%;"></div>
            </div>
            <div style="font-size: 14px; color: #999; margin-top: 20px; line-height: 1.5;">
                建议使用Chrome浏览器<br>
                获得最佳浏览体验
            </div>
        </div>
    `;

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes click {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // 填充内容
    mask.innerHTML = guideContent;

    // 添加到页面
    document.body.appendChild(mask);
}

// 页面加载完成后执行检测
document.addEventListener('DOMContentLoaded', checkBrowser); 