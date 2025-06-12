// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const navItems = document.querySelectorAll('.nav-links a');
    const contactForm = document.querySelector('.contact-form');
    const downloadBtns = document.querySelectorAll('.download-btn');
    
    // 移动端菜单切换
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        // 切换菜单图标
        const icon = menuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.background = '#fff';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'transparent';
        }
        
        // 更新当前活动导航项
        updateActiveNavItem();
    });
    
    // 平滑滚动到锚点
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取目标元素
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 计算滚动位置
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                // 平滑滚动
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 在移动端关闭菜单
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = menuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // 更新当前活动导航项
    function updateActiveNavItem() {
        // 获取所有部分
        const sections = document.querySelectorAll('section');
        
        // 确定当前滚动位置
        let current = '';
        const navHeight = navbar.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        // 更新活动导航项
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === current) {
                item.classList.add('active');
            }
        });
    }
    
    // 表单提交处理
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // 在实际应用中，这里应该发送AJAX请求到服务器
            // 这里我们只是模拟提交成功
            
            // 显示提交成功消息
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '提交成功!';
            submitBtn.style.backgroundColor = 'var(--success-color)';
            
            // 重置表单
            this.reset();
            
            // 恢复按钮状态
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        });
    }
    
    // 初始化页面时更新活动导航项
    updateActiveNavItem();

    // 处理下载按钮点击事件
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // 获取图片文件名
            const fileName = this.getAttribute('href').split('/').pop();
            
            // 创建提示元素
            const toast = document.createElement('div');
            toast.className = 'download-toast';
            
            try {
                // 检查图片是否存在
                fetch(this.getAttribute('href'))
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('图片不存在');
                        }
                        // 下载成功提示
                        toast.innerHTML = `<i class="fas fa-check"></i> 正在下载: ${fileName}`;
                        toast.style.backgroundColor = 'var(--success-color)';
                        
                        // 统计下载次数（实际项目中可以发送到服务器）
                        const downloads = localStorage.getItem('downloads') || '{}';
                        const downloadStats = JSON.parse(downloads);
                        downloadStats[fileName] = (downloadStats[fileName] || 0) + 1;
                        localStorage.setItem('downloads', JSON.stringify(downloadStats));
                    })
                    .catch(error => {
                        // 下载失败提示
                        e.preventDefault();
                        toast.innerHTML = `<i class="fas fa-exclamation-circle"></i> 下载失败: ${error.message}`;
                        toast.style.backgroundColor = 'var(--danger-color)';
                    });
            } catch (error) {
                // 处理其他错误
                e.preventDefault();
                toast.innerHTML = `<i class="fas fa-exclamation-circle"></i> 发生错误: ${error.message}`;
                toast.style.backgroundColor = 'var(--danger-color)';
            }

            // 显示提示
            document.body.appendChild(toast);
            
            // 3秒后移除提示
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 3000);
        });
    });
});

// 图片加载完成后的淡入效果
window.addEventListener('load', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.style.opacity = '1';
    });
});