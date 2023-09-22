import { app, BrowserWindow, ipcMain, IpcMainEvent, dialog } from 'electron'
const path = require('path')
const isDev = require('electron-is-dev')
const sqlite3 = require('sqlite3')

const dbPath = path.join(__dirname, 'alarms.db')
const db = new sqlite3.Database(dbPath)

// Create the alarms table (if doesn't exist)
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS alarms (id INTEGER PRIMARY KEY, time TEXT)');
});

let win: BrowserWindow | null = null

function closeDBConnection() {
    db.close((error: Error | null) => {
    if (error) {
      console.error('Error closing the DB connection.', error.message)
    } else {
      console.log('DB connection closed.')
    }
  })
}

function getAlarmsFromDB(event: IpcMainEvent) {
  db.serialize(() => {
    db.all(
      'SELECT * FROM alarms', (error: Error, rows: []) => {
        if(!error && rows) {
          event.sender.send('alarmsData', rows)
        }
      }
    )
  })
}

function removeAlarmFromDB(id: number, event: IpcMainEvent) {
  db.serialize(() => {
    const stmt = db.prepare('DELETE FROM alarms WHERE id = ?')
    stmt.run(id)
    stmt.finalize()
  })
  // Sending updated alarms list back to the renderer
  getAlarmsFromDB(event)
}

function handleAlarmTriggering(id: number, event: IpcMainEvent) {
  dialog.showMessageBox({
    type: 'question',
    buttons: [
      'Remove this alarm', // on click => { response: 0 }
      'Keep it for tomorow' // on click => { response: 1 }
    ],
    title: 'Question',
    message: 'It is time !',
    detail: 'But time for what exactly ?',
  }).then((data: { checkboxChecked: Boolean, response: Number}) => {
    if(data.response === 0) {
      // user wants to remove the alarm when it triggers
      removeAlarmFromDB(id, event)
    } else {
      // do nothing, just close the dialog
    }
    return
  })
}

function createWindow() {

  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:3000/index.html')
  } else {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`)
  }

// Handling communication between main and renderer for database operations

ipcMain.on('getAlarms', (event) => {
  getAlarmsFromDB(event)
})

ipcMain.on('addAlarm', (event, time: string) => {
  db.serialize(() => {
    const stmt = db.prepare('INSERT INTO alarms (time) VALUES (?)')
    stmt.run(time)
    stmt.finalize()
    getAlarmsFromDB(event)
  })
})

ipcMain.on('removeAlarm', (event, id: number) => {
  removeAlarmFromDB(id, event)
})

ipcMain.once('triggerAlarm', (event, id: number) => {
  handleAlarmTriggering(id, event)
})

  win.on('closed', () => win = null)

  // Hot Reloading
  if (isDev) {
    // 'node_modules/.bin/electronPath'
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
      forceHardReset: true,
      hardResetMethod: 'exit'
    })
  }

  // open console on dev mode
  // if (isDev) {
  //   win.webContents.openDevTools()
  // }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  closeDBConnection()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
