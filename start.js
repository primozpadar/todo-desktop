const { app, BrowserWindow, screen } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

// try {
//   require("electron-reload");
// } catch (e) {}

const createWindow = () => {
  const displays = screen.getAllDisplays();
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0;
  });

  if (externalDisplay) {
    const customWidth = 500;
    const mainWindow = new BrowserWindow({
      x: externalDisplay.bounds.x + externalDisplay.bounds.width - customWidth,
      y: externalDisplay.bounds.y,
      width: customWidth,
      height: externalDisplay.bounds.height,
      transparent: true,
      frame: false,
    });

    // mainWindow.webContents.openDevTools();
    mainWindow.removeMenu();

    mainWindow.loadURL(
      isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
    );
  }
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
