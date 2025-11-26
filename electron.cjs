const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 430,
    height: 780,
    minWidth: 430,
    minHeight: 720,
    resizable: false,
    maximizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("http://localhost:5173");
}

ipcMain.handle("upt:set-window-mode", (_event, mode) => {
  if (!mainWindow || mainWindow.isDestroyed()) return;

  if (mode === "authenticated") {
    mainWindow.setResizable(true);
    mainWindow.setMaximizable(true);
    mainWindow.maximize();
    return;
  }

  mainWindow.unmaximize();
  mainWindow.setResizable(false);
  mainWindow.setMaximizable(false);
  mainWindow.setSize(430, 780, false);
  mainWindow.center();
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
