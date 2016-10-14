'use strict'

const electron = require('electron')
const { app, BrowserWindow, Menu, Tray } = require('electron')
const path = require('path')

let mainWindow
let config = {}

if (process.env.NODE_ENV === 'development') {
  config = require('../config')
  config.url = `http://localhost:${config.port}`
} else {
  config.devtron = false
  config.url = `file://${__dirname}/dist/index.html`
}

function createWindow () {
  
  let width = 300
  let height = 400
  if (process.platform === 'win32') {
    width = 320
  }

  mainWindow = new BrowserWindow({
    height: height,
    width: width,
    closable: false,
    // resizable: false,
    maximizable: false,
    devTools: true
  })

  mainWindow.loadURL(config.url)

  if (process.env.NODE_ENV === 'development') {
    BrowserWindow.addDevToolsExtension(path.join(__dirname, '../node_modules/devtron'))

    let installExtension = require('electron-devtools-installer')

    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then((name) => mainWindow.webContents.openDevTools())
      .catch((err) => console.log('An error occurred: ', err))
  }

  mainWindow.on('close', () => {
    mainWindow.hide()
  })

  console.log('mainWindow opened')
}

function showWindow() {
  mainWindow.show()
}

function closeHandle() {
  app.quit()
}

app.on('ready', () => {
  createWindow()

  let tray
  tray = new Tray(path.join(__dirname, '/icons/icon_black.png'))
  tray.setToolTip('miaoLian.in')
  const menu = Menu.buildFromTemplate([  
    { label: '显示窗口', click: showWindow },
    { label: '退出',  click: closeHandle }
  ])
  tray.setContextMenu(menu)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
