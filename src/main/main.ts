import { app, BrowserWindow, ipcMain, screen } from "electron";

import installExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
  REACT_PERF,
} from "electron-devtools-installer";

import { format as formatUrl, UrlObject } from "url";
import * as path from "path";

import { IpcChannelInterface } from "./IPC/IpcChannelInterface";
import { SystemInfoChannel } from "./IPC/SystemInfoChannel";

const isDev: boolean = process.env.NODE_ENV !== "production";
class Main {
  private mainWindow: BrowserWindow | null = null;

  public init(ipcChannels: IpcChannelInterface[]) {
    app.on("ready", this.createWindow);
    app.on("window-all-closed", this.onWindowAllClosed);
    app.on("activate", this.onActivate);

    this.registerIpcChannels(ipcChannels);
  }

  private onWindowAllClosed() {
    if (process.platform !== "darwin") {
      app.quit();
    }
  }

  private onActivate() {
    if (!this.mainWindow) {
      this.createWindow();
    }
  }

  private createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    this.mainWindow = new BrowserWindow({
      height,
      width,
      title: `Danny application`,
      webPreferences: {
        nodeIntegration: true,
        defaultFontSize: 10,
      },
    });
    this.mainWindow.loadFile("index.html");
    if (isDev) {
      console.log("MAIN", isDev);
      this.mainWindow.loadURL(
        `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
      );

      installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS, REACT_PERF])
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log("An error occurred: ", err));
      this.mainWindow.webContents.openDevTools();
    } else {
      const urlIndex: UrlObject = {
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true,
      };
      this.mainWindow.loadURL(formatUrl(urlIndex));
    }
  }

  private registerIpcChannels(ipcChannels: IpcChannelInterface[]) {
    ipcChannels.forEach((channel) =>
      ipcMain.on(channel.getName(), (event, request) =>
        channel.handle(event, request)
      )
    );
  }
}

new Main().init([new SystemInfoChannel()]);
