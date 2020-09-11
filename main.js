const path = require('path');
const os = require('os');
const url = require('url');
const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const slash = require('slash');

let mainWindow;
let aboutWindow;

let isDev = false;
let isMac = process.platform === 'darwin';

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === 'development'
) {
  isDev = true;
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: isDev ? 900 : 500,
    height: 800,
    resizable: false,
    show: false,
    backgroundColor: 'white',
    icon: `${__dirname}/assets/icon.png`,
    webPreferences: {
      nodeIntegration: true
    }
  });

  let indexPath;

  if (isDev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    });
  }

  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    // Open devtools if dev
    if (isDev) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS
      } = require('electron-devtools-installer');

      installExtension(REACT_DEVELOPER_TOOLS).catch(err =>
        console.log('Error loading React DevTools: ', err)
      );
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', () => {
  createMainWindow();
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
});

function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    title: 'About Image Optimize',
    width: 300,
    height: 300,
    resizable: false,
    icon: `${__dirname}/assets/icon.png`
  });

  aboutWindow.loadFile('./src/about.html');
}

const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: 'About',
              click: createAboutWindow
            }
          ]
        }
      ]
    : []),
  {
    role: 'fileMenu'
  },
  ...(!isMac
    ? [
        {
          label: 'Help',
          submenu: [
            {
              label: 'About',
              click: createAboutWindow
            }
          ]
        }
      ]
    : []),
  ...(isDev
    ? [
        {
          label: 'Developer',
          submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { type: 'separator' },
            { role: 'toggledevtools' }
          ]
        }
      ]
    : [])
];

//  Handle Resize

ipcMain.on('image:minimize', (e, options) => {
  shrinkImage(options);
});

async function shrinkImage({ imgPaths, quality, path }) {
  try {
    const pngQuality = quality / 100;
    const files = await imagemin(
      imgPaths.map(img => slash(img)),
      {
        destination: path,
        plugins: [
          imageminMozjpeg({ quality }),
          imageminPngquant({
            quality: [pngQuality, pngQuality]
          })
        ]
      }
    );
    console.log(files);
    shell.openPath(path);
  } catch (error) {
    console.log(error);
  }
}
// -----------

// Handle Reset
ipcMain.on('app:reset', (e, options) => {});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// Stop error
app.allowRendererProcessReuse = true;
