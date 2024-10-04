// src/ui.js

alert('ui.js is loaded');
console.log('ui.js is loaded');

document.getElementById('import-button').onclick = () => {
    console.log('Import button clicked');

    const fileInput = document.getElementById('file-input');
    if (fileInput.files.length === 0) {
      alert('Please select a design system JSON file.');
      return;
    }
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const designData = JSON.parse(event.target.result);
        parent.postMessage({ pluginMessage: { type: 'import-design', designData } }, '*');
        console.log('Design data sent to plugin:', designData); // Add logging
      } catch (error) {
        alert('Failed to parse the JSON file. Please check the file format.');
        console.error('JSON parsing error:', error);
      }
    };
    reader.readAsText(file);
  };
  