import BrowserWindow from 'sketch-module-web-view';
import sketch from 'sketch';
import resize from './actions/resize';

// main function
const main = () => {
  const document = sketch.getSelectedDocument();
  const selection = document.selectedLayers;

  // return error message if selection is empty
  if (selection.isEmpty) {
    sketch.UI.message('No layer(s) selected!');
    return;
  }

  // define the webview, its options, and its content
  const options = {
    identifier: 'sketch.resize',
    width: 480,
    height: 316,
    center: true,
    show: false,
    backgroundColor: '#181818',
    titleBarStyle: 'hiddenInset',
    alwaysOnTop: true,
    resizable: false,
    fullscreenable: false,
    maximizable: false,
    minimizable: false,
  };

  let webview = new BrowserWindow(options);
  const webcontent = webview.webContents;

  // when loaded, show the webview
  webview.once('ready-to-show', () => webview.show());

  // cancel the overall process
  webcontent.on('cancel', () => close(webview));

  // process input, and trigger resize
  webcontent.on('submit', dimensions => {
    resize(selection, dimensions);
    close(webview);
  });

  // show the webview
  webview.loadURL(require('../resources/webview/webview.html'));
};

// close the window
const close = webview => {
  webview.close();
  webview = null;
};

export default main;
