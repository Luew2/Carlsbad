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