'use strict'

const electron = require('electron')
const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron')
const path = require('path')

let mainWindow
let tray
let config = {}
let image = nativeImage.createFromPath(path.join(__dirname, 'icons', 'icon_16x16@2x.png'))

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
    // show: false,
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

  // mainWindow.once('ready-to-show', () => {
  //   mainWindow.show()
  //   mainWindow.focus()
  // })

  mainWindow.on('close', (e) => {
    if (process.platform === 'win32') {
      e.preventDefault()
      mainWindow.hide()
    } else {
      mainWindow = null
    }
  })
}

function showWindow() {
  mainWindow.show()
}

function closeHandle() {
  mainWindow.destroy()
  tray.destroy()
  app.quit()
}

app.on('ready', () => {
  createWindow()

  if (process.platform === 'win32') {
    tray = new Tray(image)
    tray.setToolTip('Landleg')
    const menu = Menu.buildFromTemplate([  
      { label: '退出',  click: closeHandle }
    ])
    tray.setContextMenu(menu)
    tray.on('click', showWindow)
  }
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
