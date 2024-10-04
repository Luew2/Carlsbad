"use strict";

// src/ui.js

alert('ui.js is loaded');
console.log('ui.js is loaded');
document.getElementById('import-button').onclick = function () {
  console.log('Import button clicked');
  var fileInput = document.getElementById('file-input');
  if (fileInput.files.length === 0) {
    alert('Please select a design system JSON file.');
    return;
  }
  var file = fileInput.files[0];
  var reader = new FileReader();
  reader.onload = function (event) {
    try {
      var designData = JSON.parse(event.target.result);
      parent.postMessage({
        pluginMessage: {
          type: 'import-design',
          designData: designData
        }
      }, '*');
      console.log('Design data sent to plugin:', designData); // Add logging
    } catch (error) {
      alert('Failed to parse the JSON file. Please check the file format.');
      console.error('JSON parsing error:', error);
    }
  };
  reader.readAsText(file);
};