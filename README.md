# landleg-electron

![](http://ww2.sinaimg.cn/large/006y8lVagw1f8rux8l7jzj303k03kq2s.jpg)

基于 [Vue.js](https://cn.vuejs.org/) + [Electron](http://electron.atom.io/) + [landleg-node](https://github.com/ahonn/landleg-node) 的伪天翼拨号应用

## 功能

- 美观的界面
- 记住账号密码
- 自动获取 IP、MAC 
- 可选手动设置 IP、MAC
- Windows 平台下关闭默认不退出，缩小至状态栏

## 下载

#### Windows [下载](https://pan.baidu.com/s/1nuEGDMp#list/path=%2FLandleg%2FLandleg-Electron-Windows&parentPath=%2FLandleg)
 
Windows 7 下存在兼容问题无法打开（没有经过完整测试），Windows 8 & Windows 10 完美运行

#### MacOS [下载](https://pan.baidu.com/s/1ge4J3ov#list/path=%2FLandleg%2FLandleg-Electron-MacOS&parentPath=%2FLandleg)
 
MacOS Sierra 10.12 完美运行，理论上其他版本也同样完美运行（其他版本未测试）

#### Linux [下载](https://pan.baidu.com/s/1pKOfXeb#list/path=%2FLandleg%2FLandleg-Electron-Linux&parentPath=%2FLandleg)

未测试，自行折腾

## 构建

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron app for production
npm run build

# run webpack in production
npm run pack
```

## 更新记录

#### 2016-10-18
- [修复] 修复右键菜单退出失效以及后台内存驻留的问题

#### 2016-10-16 
- [更新] Windows 平台下窗口关闭按钮默认不退出应用，应用缩小至状态栏。最小化按钮回归默认行为，即缩小至任务栏
- [添加] 添加学校选择，支持 电子科技大学中山学院，感谢 fuyuumi 的反馈

#### 2016-10-15
- [修复] 修复 Windows 平台下缩小后状态栏图标消失的 Bug

#### 2016-10-14
- [添加] Windows 平台下最小化缩小到状态栏
- [更新] 更新关于页面，重绘 Logo
- [修复] 修复手动设置时点击保存按钮无反馈信息，修改为填写时自动保存，移除保存按钮

## 联系 
Email: [ahonn95@outlook.com](mailto:ahonn95@outlook.com)

