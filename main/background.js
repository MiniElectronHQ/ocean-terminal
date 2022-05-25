import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

import Store from "electron-store";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

const store = new Store();

store.set("messages", [
  {
    name: "tab 1",
  },
  {
    name: "tab 2",
  },
  {
    name: "tab 3",
  },
]);

ipcMain.on("get-message", (event, id) => {
  const messages = store.get("messages") || [];
  event.returnValue = messages[id];
});

ipcMain.on("get-messages", (event, arg) => {
  event.returnValue = store.get("messages") || [];
});

ipcMain.on("add-message", (event, arg) => {
  const messages = store.get("messages") || [];
  messages.push({
    name: arg,
  });
  store.set("messages", messages);
});

ipcMain.on("edit-message", (event, arg) => {
  console.log(arg);
  const messages = store.get("messages") || [];
  messages[arg.id].name = arg.messageName;
  store.set("messages", messages);
});
