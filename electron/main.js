const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, '../public/icon.png'), // You can add an icon later
    title: 'Prompt Engineering Simple App',
    show: false, // Don't show until ready
  });

  // Load the app
  if (isDev) {
    // In development, try to find the correct port
    const findPort = async () => {
      const net = require('net');
      
      for (let port = 3000; port <= 3010; port++) {
        try {
          await new Promise((resolve, reject) => {
            const socket = net.createConnection(port, 'localhost');
            socket.on('connect', () => {
              socket.destroy();
              resolve(port);
            });
            socket.on('error', reject);
            setTimeout(() => reject(new Error('timeout')), 100);
          });
          return port;
        } catch (error) {
          continue;
        }
      }
      return 3000; // fallback
    };

    findPort().then(port => {
      mainWindow.loadURL(`http://localhost:${port}`);
      console.log(`Loading app from http://localhost:${port}`);
    }).catch(() => {
      mainWindow.loadURL('http://localhost:3000');
    });
    
    // Open DevTools in development
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built files
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
});
