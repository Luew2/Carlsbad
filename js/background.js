/*
 Allows to read, change and override settings kept in localStorage

 FIXME Can be replaced with chrome.storage.local as soon as http://crbug.com/178618 will be resolved
 FIXME Can be replaced with localStorage on the panel page as soon as http://crbug.com/319328 will be resolved
 */
chrome.runtime.onMessage.addListener(function (message, sender, callback) {
	"use strict";

	if (message.name === 'getSettings') {
		callback(localStorage);
	} else if (message.name === 'setSettings') {
		localStorage = message.data;
	} else if (message.name === 'changeSetting') {
		localStorage[message.item] = message.value;
	}
});

// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'captureScreenshot') {
      console.log('Capturing screenshot in background.js:', request.rect);
  
      const { x, y, width, height } = request.rect;
  
      chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
        fetch(dataUrl)
          .then((res) => res.blob())
          .then((blob) => createImageBitmap(blob))
          .then((imageBitmap) => {
            const canvas = new OffscreenCanvas(width, height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(imageBitmap, x, y, width, height, 0, 0, width, height);
  
            canvas.convertToBlob().then((blob) => {
              const reader = new FileReader();
              reader.onload = () => {
                const croppedDataUrl = reader.result;
                console.log('Cropped screenshot data URL:', croppedDataUrl);
                sendResponse({ screenshot: croppedDataUrl });
              };
              reader.readAsDataURL(blob);
            });
          })
          .catch((error) => {
            console.error('Error creating ImageBitmap:', error);
            sendResponse(null);
          });
      });
  
      // Return true to indicate that the response will be sent asynchronously
      return true;
    }
  });