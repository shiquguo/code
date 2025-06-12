# 网站部署指南

本指南提供了将您的装修网站部署到服务器并使其可通过互联网访问的多种方法。

## 方法一：传统虚拟主机部署

适用于已购买虚拟主机服务的用户。

### 步骤：

1. **准备文件**
   - 确保所有网站文件（HTML、CSS、JS、图片等）已准备就绪
   - 检查所有文件路径是否正确（使用相对路径）

2. **获取FTP信息**
   - 从您的虚拟主机提供商获取以下信息：
     - FTP服务器地址
     - FTP用户名
     - FTP密码
     - 网站根目录路径

3. **使用FTP客户端上传文件**
   - 下载并安装FTP客户端软件（如FileZilla）
   - 使用提供的FTP信息连接到服务器
   - 导航到网站根目录（通常为`public_html`或`www`）
   - 上传所有网站文件到该目录

4. **设置域名**
   - 在域名注册商控制面板中，将域名的DNS指向您的虚拟主机
   - 等待DNS传播（可能需要24-48小时）

5. **测试网站**
   - 使用浏览器访问您的域名
   - 检查所有页面和功能是否正常工作

## 方法二：GitHub Pages部署

适用于希望免费托管静态网站的用户。

### 步骤：

1. **创建GitHub账户**
   - 如果没有GitHub账户，请在[github.com](https://github.com)注册

2. **创建新仓库**
   - 登录GitHub后，点击右上角"+"图标，选择"New repository"
   - 仓库名称格式为：`username.github.io`（将username替换为您的GitHub用户名）
   - 选择"Public"可见性
   - 点击"Create repository"

3. **上传网站文件**
   - 克隆仓库到本地：
     ```
     git clone https://github.com/username/username.github.io.git
     ```
   - 将所有网站文件复制到克隆的仓库文件夹中
   - 提交并推送文件：
     ```
     cd username.github.io
     git add .
     git commit -m "Initial website files"
     git push -u origin main
     ```

4. **启用GitHub Pages**
   - 在GitHub仓库页面，点击"Settings"
   - 滚动到"GitHub Pages"部分
   - 在"Source"下拉菜单中选择"main"分支
   - 点击"Save"

5. **访问网站**
   - 几分钟后，您的网站将在`https://username.github.io`上线
   - 您也可以在GitHub Pages设置中查看网站URL

6. **使用自定义域名（可选）**
   - 在仓库中创建名为`CNAME`的文件，内容为您的域名
   - 在域名注册商处添加CNAME记录，指向`username.github.io`
   - 在GitHub Pages设置中输入您的自定义域名并保存

## 方法三：Netlify部署

适用于希望获得现代化部署体验和额外功能的用户。

### 步骤：

1. **创建Netlify账户**
   - 访问[netlify.com](https://www.netlify.com)并注册账户
   - 可以使用GitHub、GitLab或Bitbucket账户登录

2. **准备Git仓库**
   - 将您的网站文件上传到GitHub、GitLab或Bitbucket仓库
   - 确保仓库包含所有必要的网站文件

3. **在Netlify创建新站点**
   - 登录Netlify后，点击"New site from Git"
   - 选择您的Git提供商（GitHub、GitLab或Bitbucket）
   - 授权Netlify访问您的仓库
   - 选择包含网站文件的仓库

4. **配置部署设置**
   - 选择要部署的分支（通常是`main`或`master`）
   - 基本构建设置可以留空（对于纯静态HTML网站）
   - 点击"Deploy site"

5. **自定义域名（可选）**
   - 在站点概览页面，点击"Domain settings"
   - 点击"Add custom domain"
   - 输入您的域名并按照说明进行DNS配置

6. **启用HTTPS（自动）**
   - Netlify自动为所有站点提供免费的SSL证书
   - 证书通常在添加自定义域名后几分钟内自动配置

## 方法四：云服务器部署

适用于需要更多控制权和自定义选项的用户。

### 步骤：

1. **购买云服务器**
   - 选择云服务提供商（如阿里云、腾讯云、AWS、DigitalOcean等）
   - 选择适合的配置（对于静态网站，最低配置即可）
   - 选择操作系统（推荐Ubuntu或CentOS）

2. **连接到服务器**
   - 使用SSH客户端（如PuTTY或终端）连接到服务器
   - 使用提供的IP地址、用户名和密码（或SSH密钥）

3. **安装Web服务器**
   - 对于Nginx：
     ```
     sudo apt update
     sudo apt install nginx
     sudo systemctl start nginx
     sudo systemctl enable nginx
     ```
   - 对于Apache：
     ```
     sudo apt update
     sudo apt install apache2
     sudo systemctl start apache2
     sudo systemctl enable apache2
     ```

4. **上传网站文件**
   - 使用SCP或SFTP将文件上传到服务器：
     ```
     scp -r /path/to/local/website/* user@server_ip:/var/www/html/
     ```
   - 或在服务器上使用Git克隆仓库：
     ```
     cd /var/www/html
     sudo git clone https://github.com/username/repository.git .
     ```

5. **配置Web服务器**
   - 对于Nginx，编辑配置文件：
     ```
     sudo nano /etc/nginx/sites-available/default
     ```
   - 基本配置示例：
     ```
     server {
         listen 80;
         server_name yourdomain.com www.yourdomain.com;
         root /var/www/html;
         index index.html;
         
         location / {
             try_files $uri $uri/ =404;
         }
     }
     ```
   - 重启Nginx：
     ```
     sudo systemctl restart nginx
     ```

6. **设置域名**
   - 在域名注册商处添加A记录，指向您的服务器IP地址
   - 等待DNS传播（可能需要24-48小时）

7. **配置SSL（可选但推荐）**
   - 安装Certbot：
     ```
     sudo apt install certbot python3-certbot-nginx
     ```
   - 获取并配置SSL证书：
     ```
     sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
     ```
   - 按照提示完成配置

## 部署后检查清单

无论选择哪种部署方法，请确保完成以下检查：

1. **功能测试**
   - 测试所有页面是否正常加载
   - 测试所有链接是否正常工作
   - 测试所有交互功能（如表单、下载按钮等）

2. **移动端兼容性**
   - 在不同设备上测试网站响应式设计
   - 确保在手机和平板电脑上显示正常

3. **性能优化**
   - 使用[Google PageSpeed Insights](https://pagespeed.web.dev/)测试性能
   - 根据建议优化图片和代码

4. **SEO检查**
   - 确保所有页面都有适当的标题和描述
   - 检查网站是否可被搜索引擎索引

5. **安全检查**
   - 确保使用HTTPS
   - 检查是否有任何暴露的敏感信息

## 常见问题解决

1. **图片不显示**
   - 检查图片路径是否正确
   - 确保图片已上传到正确位置

2. **CSS或JavaScript不加载**
   - 检查文件路径
   - 查看浏览器控制台是否有错误

3. **表单提交失败**
   - 静态网站需要额外服务来处理表单提交
   - 考虑使用Netlify Forms或Formspree等服务

4. **域名未生效**
   - DNS传播可能需要时间，请耐心等待
   - 使用[whatsmydns.net](https://www.whatsmydns.net/)检查DNS传播状态