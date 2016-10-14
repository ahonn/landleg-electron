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
    mainWindow = null
  })

  mainWindow.on('minimize', () => {
    mainWindow.hide()
  })

  console.log('mainWindow opened')
}

function toggleWindow() {
  if (mainWindow.isVisible()){
    mainWindow.hide()
  } else {
    mainWindow.show()
  }
}

function closeHandle() {
  // mainWindow = null
  app.quit()
}

app.on('ready', () => {
  createWindow()

  let tray
  if (process.platform === 'win32') {
    tray = new Tray(path.join(__dirname, '/icons/icon_white.png'))
  } else {
    tray = new Tray(path.join(__dirname, '/icons/icon_black.png'))
  }
  tray.setToolTip('Landleg')
  const menu = Menu.buildFromTemplate([  
    { label: '退出',  click: closeHandle }
  ])
  tray.setContextMenu(menu)
  tray.on('click', toggleWindow)
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
