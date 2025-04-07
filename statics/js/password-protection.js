// 密码保护功能

// 声明全局formContainer变量
let formContainer;

// Base64解码函数
function decodeBase64(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

// 设置Cookie
function setCookie(name, value, days) {
    // 调试模式下不存储cookies
    if (commonData.passwordConfig.debug && 
        commonData.passwordConfig.debug.enabled && 
        commonData.passwordConfig.debug.noCookies) {
        console.log('[Debug] Cookie not stored due to debug.noCookies=true');
        return;
    }

    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
    
    if (commonData.passwordConfig.debug && 
        commonData.passwordConfig.debug.enabled && 
        commonData.passwordConfig.debug.showDebugInfo) {
        console.log(`[Debug] Cookie set: ${name}=${value}, expires in ${days} days`);
    }
}

// 获取Cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// 清除Cookie
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    
    if (commonData.passwordConfig.debug && 
        commonData.passwordConfig.debug.enabled && 
        commonData.passwordConfig.debug.showDebugInfo) {
        console.log(`[Debug] Cookie erased: ${name}`);
    }
}

// 清除所有与网站相关的Cookie
function clearAllSiteCookies() {
    eraseCookie('site_password_verified');
    
    if (commonData.passwordConfig.debug && 
        commonData.passwordConfig.debug.enabled && 
        commonData.passwordConfig.debug.showDebugInfo) {
        console.log('[Debug] All site cookies cleared');
    }
}

// 创建密码遮罩
function createPasswordOverlay() {
    // 检查是否需要清除Cookies
    if (commonData.passwordConfig.debug && 
        commonData.passwordConfig.debug.enabled && 
        commonData.passwordConfig.debug.clearCookiesOnLoad) {
        clearAllSiteCookies();
        
        if (commonData.passwordConfig.debug.showDebugInfo) {
            console.log('[Debug] Cookies cleared on page load due to debug.clearCookiesOnLoad=true');
        }
    }

    // 如果未启用密码保护，则不显示遮罩
    if (!commonData.passwordConfig || !commonData.passwordConfig.enabled) {
        return;
    }

    // 检查密码Cookie是否存在
    const passwordCookie = getCookie('site_password_verified');
    if (passwordCookie === 'true') {
        if (commonData.passwordConfig.debug && 
            commonData.passwordConfig.debug.enabled && 
            commonData.passwordConfig.debug.showDebugInfo) {
            console.log('[Debug] Password already verified, skipping password overlay');
        }
        return; // 已通过验证
    }

    // 创建遮罩容器
    const overlay = document.createElement('div');
    overlay.id = 'password-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--secondary-color) 0%, var(--primary-color) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    // 创建密码表单
    formContainer = document.createElement('div');
    formContainer.style.cssText = `
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        padding: 30px;
        width: 90%;
        max-width: 400px;
        text-align: center;
    `;

    // 标题
    const title = document.createElement('h2');
    title.textContent = commonData.passwordConfig.title || '请输入访问密码';
    title.style.cssText = `
        color: var(--primary-color);
        margin-bottom: 20px;
        font-size: 22px;
    `;
    formContainer.appendChild(title);

    // 说明文字
    const message = document.createElement('p');
    message.textContent = commonData.passwordConfig.message || '请输入访问密码继续浏览';
    message.style.cssText = `
        color: var(--accent-color);
        margin-bottom: 20px;
        font-size: 15px;
    `;
    formContainer.appendChild(message);

    // 密码输入框
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = '请输入密码，群内发送“温泉”获取';
    passwordInput.style.cssText = `
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        margin-bottom: 15px;
        font-size: 16px;
        outline: none;
        box-sizing: border-box;
    `;
    passwordInput.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary-color)';
    });
    passwordInput.addEventListener('blur', function() {
        this.style.borderColor = '#ddd';
    });
    formContainer.appendChild(passwordInput);

    // 错误信息
    const errorMsg = document.createElement('p');
    errorMsg.style.cssText = `
        color: var(--warning-color);
        margin-bottom: 15px;
        font-size: 14px;
        height: 20px;
        visibility: hidden;
    `;
    errorMsg.textContent = '密码错误，请重试';
    formContainer.appendChild(errorMsg);

    // 提交按钮
    const submitBtn = document.createElement('button');
    submitBtn.textContent = '验证';
    submitBtn.style.cssText = `
        background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 500;
        font-size: 16px;
        transition: all 0.3s;
        width: 100%;
    `;
    submitBtn.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
    submitBtn.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
    formContainer.appendChild(submitBtn);

    // 工具按钮容器
    const toolsContainer = document.createElement('div');
    toolsContainer.style.cssText = `
        margin-top: 15px;
        display: flex;
        justify-content: center;
        gap: 10px;
    `;

    // 添加加密工具按钮
    const encryptToolBtn = document.createElement('button');
    encryptToolBtn.textContent = '密码编码工具';
    encryptToolBtn.style.cssText = `
        background: transparent;
        color: var(--accent-color);
        border: 1px dashed var(--accent-color);
        padding: 6px 12px;
        border-radius: 15px;
        cursor: pointer;
        font-size: 13px;
        transition: all 0.3s;
    `;
    encryptToolBtn.addEventListener('mouseover', function() {
        this.style.backgroundColor = 'rgba(161, 140, 209, 0.1)';
    });
    encryptToolBtn.addEventListener('mouseout', function() {
        this.style.backgroundColor = 'transparent';
    });
    encryptToolBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showEncryptTool();
    });

    toolsContainer.appendChild(encryptToolBtn);
    
    // 如果调试模式开启，添加调试按钮
    if (commonData.passwordConfig.debug && commonData.passwordConfig.debug.enabled) {
        const debugBtn = document.createElement('button');
        debugBtn.textContent = 'Debug模式(已开启)';
        debugBtn.style.cssText = `
            background: transparent;
            color: #e67e22;
            border: 1px dashed #e67e22;
            padding: 6px 12px;
            border-radius: 15px;
            cursor: pointer;
            font-size: 13px;
            transition: all 0.3s;
        `;
        debugBtn.addEventListener('mouseover', function() {
            this.style.backgroundColor = 'rgba(230, 126, 34, 0.1)';
        });
        debugBtn.addEventListener('mouseout', function() {
            this.style.backgroundColor = 'transparent';
        });
        debugBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showDebugInfo();
        });
        
        toolsContainer.appendChild(debugBtn);
    }
    
    formContainer.appendChild(toolsContainer);

    // 处理表单提交
    function handleSubmit() {
        const inputPassword = passwordInput.value.trim();
        const correctPassword = decodeBase64(commonData.passwordConfig.encodedPassword);
        
        if (inputPassword === correctPassword) {
            // 设置Cookie
            setCookie('site_password_verified', 'true', commonData.passwordConfig.expireDays || 7);
            // 移除遮罩
            document.body.removeChild(overlay);
            
            if (commonData.passwordConfig.debug && 
                commonData.passwordConfig.debug.enabled && 
                commonData.passwordConfig.debug.showDebugInfo) {
                console.log('[Debug] Password verified successfully');
                
                if (commonData.passwordConfig.debug.noCookies) {
                    console.log('[Debug] Warning: Password will need to be re-entered on page reload (debug.noCookies=true)');
                }
            }
        } else {
            // 显示错误信息
            errorMsg.style.visibility = 'visible';
            passwordInput.style.borderColor = 'var(--warning-color)';
            // 震动效果
            formContainer.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(-5px)' },
                { transform: 'translateX(5px)' },
                { transform: 'translateX(0)' }
            ], {
                duration: 400,
                easing: 'ease-in-out'
            });
            
            if (commonData.passwordConfig.debug && 
                commonData.passwordConfig.debug.enabled && 
                commonData.passwordConfig.debug.showDebugInfo) {
                console.log('[Debug] Password verification failed');
            }
        }
    }

    // 绑定提交事件
    submitBtn.addEventListener('click', handleSubmit);
    passwordInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    });

    // 添加容器到遮罩
    overlay.appendChild(formContainer);
    // 添加遮罩到页面
    document.body.appendChild(overlay);

    // 自动聚焦输入框
    setTimeout(() => {
        passwordInput.focus();
    }, 300);
    
    // 显示调试信息
    if (commonData.passwordConfig.debug && 
        commonData.passwordConfig.debug.enabled && 
        commonData.passwordConfig.debug.showDebugInfo) {
        console.log('[Debug] Password overlay created');
        console.log('[Debug] Debug mode enabled with settings:', commonData.passwordConfig.debug);
    }
}

// 显示调试信息面板
function showDebugInfo() {
    // 保存当前表单内容
    const currentForm = formContainer.innerHTML;
    
    // 清空表单
    formContainer.innerHTML = '';
    
    // 创建调试信息标题
    const debugTitle = document.createElement('h2');
    debugTitle.textContent = 'Debug 信息面板';
    debugTitle.style.cssText = `
        color: #e67e22;
        margin-bottom: 20px;
        font-size: 22px;
    `;
    formContainer.appendChild(debugTitle);
    
    // 说明文字
    const debugDesc = document.createElement('p');
    debugDesc.textContent = '当前密码保护调试配置';
    debugDesc.style.cssText = `
        color: var(--accent-color);
        margin-bottom: 20px;
        font-size: 15px;
    `;
    formContainer.appendChild(debugDesc);
    
    // 创建调试信息列表
    const debugInfoList = document.createElement('div');
    debugInfoList.style.cssText = `
        background-color: rgba(230, 126, 34, 0.1);
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 20px;
        text-align: left;
        font-family: monospace;
        font-size: 14px;
    `;
    
    // 添加调试信息
    const debugConfig = commonData.passwordConfig.debug;
    let debugInfoHTML = '';
    debugInfoHTML += `<div><strong>Debug 已启用</strong></div>`;
    debugInfoHTML += `<div style="margin-top:10px;"><strong>配置:</strong></div>`;
    debugInfoHTML += `<div>- noCookies: ${debugConfig.noCookies ? '开启' : '关闭'}</div>`;
    debugInfoHTML += `<div>- clearCookiesOnLoad: ${debugConfig.clearCookiesOnLoad ? '开启' : '关闭'}</div>`;
    debugInfoHTML += `<div>- showDebugInfo: ${debugConfig.showDebugInfo ? '开启' : '关闭'}</div>`;
    
    debugInfoHTML += `<div style="margin-top:10px;"><strong>Cookie 状态:</strong></div>`;
    const passwordCookie = getCookie('site_password_verified');
    debugInfoHTML += `<div>- site_password_verified: ${passwordCookie || '未设置'}</div>`;
    
    debugInfoHTML += `<div style="margin-top:10px;"><strong>密码信息:</strong></div>`;
    debugInfoHTML += `<div>- 编码后密码: ${commonData.passwordConfig.encodedPassword}</div>`;
    debugInfoHTML += `<div>- 解码后密码: ${decodeBase64(commonData.passwordConfig.encodedPassword)}</div>`;
    
    debugInfoList.innerHTML = debugInfoHTML;
    formContainer.appendChild(debugInfoList);
    
    // 创建操作按钮区域
    const btnGroup = document.createElement('div');
    btnGroup.style.cssText = `
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
    `;
    
    // 清除Cookie按钮
    const clearCookiesBtn = document.createElement('button');
    clearCookiesBtn.textContent = '清除所有Cookie';
    clearCookiesBtn.style.cssText = `
        flex: 1;
        background: #e67e22;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 500;
        font-size: 14px;
        transition: all 0.3s;
    `;
    clearCookiesBtn.addEventListener('click', function() {
        clearAllSiteCookies();
        // 刷新调试信息
        showDebugInfo();
    });
    
    // 刷新按钮
    const refreshBtn = document.createElement('button');
    refreshBtn.textContent = '刷新页面';
    refreshBtn.style.cssText = `
        flex: 1;
        background: white;
        color: #e67e22;
        border: 1px solid #e67e22;
        padding: 10px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 500;
        font-size: 14px;
        transition: all 0.3s;
    `;
    refreshBtn.addEventListener('click', function() {
        window.location.reload();
    });
    
    btnGroup.appendChild(clearCookiesBtn);
    btnGroup.appendChild(refreshBtn);
    formContainer.appendChild(btnGroup);
    
    // 返回按钮
    const backBtn = document.createElement('button');
    backBtn.textContent = '返回登录';
    backBtn.style.cssText = `
        background: transparent;
        color: var(--accent-color);
        border: 1px solid var(--accent-color);
        padding: 8px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 14px;
        width: 100%;
        transition: all 0.3s;
    `;
    backBtn.addEventListener('click', function() {
        // 恢复原来的表单
        formContainer.innerHTML = currentForm;
        
        // 重新绑定事件 - 这里无需手动重新绑定，因为我们会刷新页面重新获取DOM元素
        location.reload();
    });
    formContainer.appendChild(backBtn);
}

// 显示加密工具
function showEncryptTool() {
    // 保存当前表单内容
    const currentForm = formContainer.innerHTML;
    
    // 清空表单
    formContainer.innerHTML = '';
    
    // 创建加密工具标题
    const toolTitle = document.createElement('h2');
    toolTitle.textContent = 'Base64 编码工具';
    toolTitle.style.cssText = `
        color: var(--primary-color);
        margin-bottom: 20px;
        font-size: 22px;
    `;
    formContainer.appendChild(toolTitle);
    
    // 说明文字
    const toolDesc = document.createElement('p');
    toolDesc.textContent = '输入明文密码，自动生成Base64编码';
    toolDesc.style.cssText = `
        color: var(--accent-color);
        margin-bottom: 20px;
        font-size: 15px;
    `;
    formContainer.appendChild(toolDesc);
    
    // 明文输入框
    const plainInput = document.createElement('input');
    plainInput.type = 'text';
    plainInput.placeholder = '请输入明文密码';
    plainInput.style.cssText = `
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        margin-bottom: 15px;
        font-size: 16px;
        outline: none;
        box-sizing: border-box;
    `;
    plainInput.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary-color)';
    });
    plainInput.addEventListener('blur', function() {
        this.style.borderColor = '#ddd';
    });
    formContainer.appendChild(plainInput);
    
    // 结果显示区
    const resultBox = document.createElement('div');
    resultBox.style.cssText = `
        background-color: rgba(161, 140, 209, 0.1);
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 15px;
        font-size: 15px;
        word-break: break-all;
        min-height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-color);
    `;
    resultBox.textContent = '编码结果将显示在这里';
    formContainer.appendChild(resultBox);
    
    // 创建操作按钮区域
    const btnGroup = document.createElement('div');
    btnGroup.style.cssText = `
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
    `;
    
    // 编码按钮
    const encodeBtn = document.createElement('button');
    encodeBtn.textContent = '生成编码';
    encodeBtn.style.cssText = `
        flex: 1;
        background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        padding: 10px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 500;
        font-size: 14px;
        transition: all 0.3s;
    `;
    encodeBtn.addEventListener('click', function() {
        const plainText = plainInput.value.trim();
        if (plainText) {
            // 使用Base64编码
            const encoded = btoa(encodeURIComponent(plainText));
            resultBox.textContent = encoded;
            
            // 添加复制成功的动画
            resultBox.style.backgroundColor = 'rgba(110, 214, 154, 0.2)';
            setTimeout(() => {
                resultBox.style.backgroundColor = 'rgba(161, 140, 209, 0.1)';
            }, 1000);
        } else {
            resultBox.textContent = '请输入明文密码';
            resultBox.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
            setTimeout(() => {
                resultBox.style.backgroundColor = 'rgba(161, 140, 209, 0.1)';
            }, 1000);
        }
    });
    
    // 复制按钮
    const copyBtn = document.createElement('button');
    copyBtn.textContent = '复制密文';
    copyBtn.style.cssText = `
        flex: 1;
        background: white;
        color: var(--primary-color);
        border: 1px solid var(--primary-color);
        padding: 10px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 500;
        font-size: 14px;
        transition: all 0.3s;
    `;
    copyBtn.addEventListener('click', function() {
        const content = resultBox.textContent;
        if (content && content !== '编码结果将显示在这里' && content !== '请输入明文密码') {
            // 创建临时元素并复制文本
            const tempInput = document.createElement('textarea');
            tempInput.value = content;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            // 显示复制成功提示
            copyBtn.textContent = '已复制!';
            copyBtn.style.backgroundColor = 'var(--primary-color)';
            copyBtn.style.color = 'white';
            setTimeout(() => {
                copyBtn.textContent = '复制密文';
                copyBtn.style.backgroundColor = 'white';
                copyBtn.style.color = 'var(--primary-color)';
            }, 1000);
        }
    });
    
    btnGroup.appendChild(encodeBtn);
    btnGroup.appendChild(copyBtn);
    formContainer.appendChild(btnGroup);
    
    // 返回按钮
    const backBtn = document.createElement('button');
    backBtn.textContent = '返回登录';
    backBtn.style.cssText = `
        background: transparent;
        color: var(--accent-color);
        border: 1px solid var(--accent-color);
        padding: 8px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 14px;
        width: 100%;
        transition: all 0.3s;
    `;
    backBtn.addEventListener('click', function() {
        // 恢复原来的表单
        formContainer.innerHTML = currentForm;
        
        // 重新绑定事件
        location.reload();
    });
    formContainer.appendChild(backBtn);
    
    // 自动聚焦输入框
    setTimeout(() => {
        plainInput.focus();
    }, 300);
}

// 在DOMContentLoaded事件中调用
document.addEventListener('DOMContentLoaded', createPasswordOverlay); 