// 简化版功能实现  
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成');
    
    // 修复按钮点击问题 - 确保按钮在最上层
    const heroButtons = document.querySelector('.hero-buttons');
    const heroSocial = document.querySelector('.hero-social');
    if (heroButtons) {
        heroButtons.style.position = 'relative';
        heroButtons.style.zIndex = '1000';
    }
    if (heroSocial) {
        heroSocial.style.position = 'relative';
        heroSocial.style.zIndex = '1000';
    }
    
    // 1. View Projects 平滑滚动
    const viewProjectsBtn = document.querySelector('a[href="#projects"].btn-primary');
    console.log('找到 View Projects 按钮:', viewProjectsBtn);
    if (viewProjectsBtn) {
        // 添加多种事件监听
        viewProjectsBtn.addEventListener('click', function(e) {
            console.log('View Projects 按钮被点击');
            e.preventDefault();
            e.stopPropagation();
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                console.log('开始滚动到项目部分');
            }
        });
        
        // 添加鼠标事件测试
        viewProjectsBtn.addEventListener('mouseenter', function() {
            console.log('鼠标进入 View Projects 按钮');
        });
        
        console.log('View Projects 按钮已绑定');
    } else {
        console.log('未找到 View Projects 按钮');
    }
    
    // 2. Google Scholar 按钮 (已有target="_blank")
    const scholarBtn = document.querySelector('a[href*="scholar.google"]');
    console.log('找到 Google Scholar 按钮:', scholarBtn);
    if (scholarBtn) {
        scholarBtn.addEventListener('click', function(e) {
            console.log('Google Scholar 按钮被点击');
            showNotification('Opening Google Scholar...', 2000);
        });
        console.log('Google Scholar 按钮已绑定');
    }
    
    // 3. Quant Project PDF 按钮
    const quantBtn = document.querySelector('a[href$=".pdf"]');
    console.log('找到 Quant Project 按钮:', quantBtn);
    if (quantBtn) {
        quantBtn.addEventListener('click', function(e) {
            console.log('Quant Project 按钮被点击');
            showNotification('Opening quantitative project document...', 2000);
        });
        console.log('Quant Project 按钮已绑定');
    }
    
    // 4. 邮件按钮
    const emailBtns = document.querySelectorAll('a[href^="mailto:"]');
    console.log('找到邮件按钮数量:', emailBtns.length);
    emailBtns.forEach((btn, index) => {
        console.log('邮件按钮', index, ':', btn);
        btn.addEventListener('click', function(e) {
            console.log('邮件按钮被点击');
            e.preventDefault();
            e.stopPropagation();
            const email = this.href.replace('mailto:', '');
            
            // 复制邮箱
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email address copied: ' + email, 3000);
                    console.log('邮箱已复制');
                }).catch(() => {
                    showNotification('Email address: ' + email, 3000);
                });
            } else {
                showNotification('Email address: ' + email, 3000);
            }
            
            // 延迟打开邮件客户端
            setTimeout(() => {
                window.location.href = this.href;
            }, 1000);
        });
    });
    
    // 5. 电话按钮
    const phoneBtns = document.querySelectorAll('a[href^="tel:"]');
    console.log('找到电话按钮数量:', phoneBtns.length);
    phoneBtns.forEach((btn, index) => {
        console.log('电话按钮', index, ':', btn);
        btn.addEventListener('click', function(e) {
            console.log('电话按钮被点击');
            const phone = this.href.replace('tel:', '');
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            
            if (isMobile) {
                // 移动端：自动拨号
                showNotification('Dialing: ' + phone, 2000);
            } else {
                // 桌面端：复制号码
                e.preventDefault();
                e.stopPropagation();
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(phone).then(() => {
                        showNotification('Phone number copied: ' + phone, 3000);
                        console.log('电话号码已复制');
                    }).catch(() => {
                        showNotification('Phone number: ' + phone, 3000);
                    });
                } else {
                    showNotification('Phone number: ' + phone, 3000);
                }
            }
        });
    });
    
    // 6. 导航菜单平滑滚动
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 7. 移动端菜单
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
});

// 通知函数
function showNotification(message, duration = 3000) {
    // 移除现有通知
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // 创建通知
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #007bff;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// CSS 动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(26, 26, 46, 0.98);
        padding: 1rem;
    }
    .hamburger.active span:nth-child(1) { transform: rotate(-45deg) translate(-5px, 6px); }
    .hamburger.active span:nth-child(2) { opacity: 0; }
    .hamburger.active span:nth-child(3) { transform: rotate(45deg) translate(-5px, -6px); }
    @media (max-width: 768px) {
        .nav-menu { display: none; }
    }
`;
document.head.appendChild(style);