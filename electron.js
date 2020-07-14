const { app, BrowserWindow, screen, ipcMain, shell } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const Store = require("electron-store");
const store = new Store();

//prevent multiple
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

const createWindow = () => {
  const customWidth = 500;
  let index = Number(store.get("lastDisplay")) || 0;

  const changeDisplay = (win) => {
    const displays = screen.getAllDisplays();
    const display = displays[index];
    store.set("lastDisplay", index);
    win.setBounds({
      x: display.bounds.x + display.bounds.width - customWidth,
      y: display.bounds.y,
      width: customWidth,
      height: display.bounds.height,
    });
    if (displays.length <= index + 1) index = 0;
    else index++;
  };

  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    transparent: true,
    frame: false,
    skipTaskbar: true,
    movable: false,
    resizable: false,
    title: "Todo",
  });

  //open any url in default browser
  mainWindow.webContents.on("new-window", (e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  });

  // mainWindow.webContents.openDevTools();

  changeDisplay(mainWindow);
  mainWindow.removeMenu();
  mainWindow.loadURL(
    isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
  );

  ipcMain.on("changeScreen", () => {
    changeDisplay(mainWindow);
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("closeApp", () => {
  app.exit(0);
});
