// @flow
import IPC from './IPC'
import {BrowserWindow} from 'electron'
import open from './open'
import path from 'path'

const startFile = 'desktop.html'

export function createWindow(): BrowserWindow {
	let mainWindow = new BrowserWindow({
		width: 1280,
		height: 800,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: false,
			nodeIntegrationInWorker: false,
			// TODO: not a real os sandbox yet.
			// https://github.com/electron-userland/electron-builder/issues/2562
			// https://electronjs.org/docs/api/sandbox-option
			sandbox: true,
			contextIsolation: true,
			webSecurity: true
			//preload: './preload.js'
		}
	})

	IPC.init(mainWindow)

	mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
		const url = webContents.getURL()
		if (!url.startsWith('https://mail.tutanota.com') || !(permission === 'notifications')) {
			return callback(false)
		}
		return callback(true)
	})

	// we never open any new windows except for links in mails etc.
	// so open them in the browser, not in electron
	mainWindow.webContents.on('new-window', (e, url) => {
		open(url);
		e.preventDefault();
	});

	// should never be called, but if somehow a webview gets created
	// we kill it
	mainWindow.webContents.on('will-attach-webview', (e: Event, webPreferences, params) => {
		e.preventDefault()
	})

	<< <
	<
	<
	<< HEAD:app-desktop/src/MainWindow.js
=======
	// user clicked 'x' button
mainWindow.on('close', () => {
		IPC.send('close')
	})

<<<<<<< HEAD:app-desktop/src/desktop/MainWindow.js
	// user clicked 'x' button
	mainWindow.on('close', () => {
		IPC.send('close')
	})

=======
>>>>>>> 70f13169... Babel, Flow, Bridge:app-desktop/src/desktop/MainWindow.js
>>>>>>> b41d321e... merged master into electron-client:app-desktop/src/desktop/MainWindow.js
	// handle navigation events. needed since webSecurity = true will
	// prevent us from opening any local files directly
	mainWindow.webContents.on('did-start-navigation', (e, url) => {
		//desktop.html after logout
		if (url.endsWith('/login?noAutoLogin=true')) {
			mainWindow.loadFile(startFile)
		}
		e.preventDefault()
	})
	mainWindow.loadFile(startFile)
	return mainWindow
}