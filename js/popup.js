// popup.js
const { jsPDF } = window.jspdf;

let colors = [];
let fonts = [];
let buttons = [];

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => {
      console.log('Copied to clipboard');
    },
    (err) => {
      console.error('Could not copy text: ', err);
      alert('Failed to copy to clipboard.');
    }
  );
}

function exportDesignTokens(colors, fonts, buttons) {
  const designTokens = {
    color: {},
    font: {},
    button: {},
  };
  
  // Process colors
  colors.forEach((item, index) => {
    const tokenName = `color${index + 1}`;
    designTokens.color[tokenName] = {
      value: item.color,
      type: 'color',
    };
  });

  // Process fonts
  fonts.forEach((item, index) => {
    const tokenName = `font${index + 1}`;
    designTokens.font[tokenName] = {
      value: item.font,
      type: 'fontFamily',
    };
  });

  // Process buttons
  buttons.forEach((item, index) => {
    const tokenName = `button${index + 1}`;
    designTokens.button[tokenName] = {
      value: item.styles,
      type: 'style',
    };
  });

  // Convert to JSON and download
  const jsonContent = JSON.stringify(designTokens, null, 2);
  downloadJSONFile(jsonContent, 'design-tokens.json');
}

function downloadJSONFile(content, filename = 'design-tokens.json') {
  const blob = new Blob([content], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

// Function to generate CSS content
function generateCSSFileContent(designSystem) {
  const { colors, fonts, buttons } = designSystem;

  const colorsCSS = generateColorVariables(colors);
  const fontsCSS = generateFontFaces(fonts);
  const buttonsCSS = generateButtonClasses(buttons);

  return `${colorsCSS}\n${fontsCSS}\n${buttonsCSS}`;
}

function generateColorVariables(colors) {
  let cssVariables = ':root {\n';
  colors.forEach((item, index) => {
    cssVariables += `  --color-${index + 1}: ${item.color};\n`;
  });
  cssVariables += '}\n';
  return cssVariables;
}

function generateFontFaces(fonts) {
  let fontFaces = '';
  fonts.forEach((item) => {
    fontFaces += `
@font-face {
  font-family: '${item.font}';
  src: local('${item.font}'), url('path/to/${item.font}.woff2') format('woff2');
}
`;
  });
  return fontFaces;
}

function generateButtonClasses(buttons) {
  let buttonClasses = '';
  buttons.forEach((item, index) => {
    const className = `.button-${index + 1}`;
    const styles = item.styles;
    const cssProperties = Object.entries(styles)
      .map(([prop, value]) => `  ${prop}: ${value};`)
      .join('\n');
    buttonClasses += `
${className} {
${cssProperties}
}
`;
  });
  return buttonClasses;
}

function downloadCSSFile(content, filename = 'design-system.css') {
  const blob = new Blob([content], { type: 'text/css' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  // Append to the DOM and trigger click
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

// Function to calculate the required canvas height
function calculateCanvasHeight(colors, fonts, buttons) {
  colors = colors || [];
  fonts = fonts || [];
  buttons = buttons || [];

  const colorRows = Math.ceil(colors.length / 10);
  const colorSectionHeight = colorRows * 80 + 20; // Each color row is 80px tall

  const fontSectionHeight = fonts.length * 30 + 40; // Each font sample is 30px tall, plus padding

  const buttonSectionHeight = buttons.length * 60 + 40; // Each button is 60px tall, plus spacing

  const totalHeight = colorSectionHeight + fontSectionHeight + buttonSectionHeight + 50; // Additional padding

  return totalHeight;
}

// Function to draw the design preview on canvas
function drawDesignPreview(ctx, canvas, colors, fonts, buttons, callback) {
  colors = colors || [];
  fonts = fonts || [];
  buttons = buttons || [];

  const totalHeight = calculateCanvasHeight(colors, fonts, buttons);
  canvas.width = 800;
  canvas.height = totalHeight;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw colors
  drawColorSwatches(ctx, colors);

  // Calculate starting Y position for fonts
  const fontsStartY = Math.ceil(colors.length / 10) * 80 + 20;
  drawFontSamples(ctx, fonts, fontsStartY);

  // Calculate starting Y position for buttons
  const buttonsStartY = fontsStartY + fonts.length * 30 + 20;
  drawButtonPreviews(ctx, buttons, buttonsStartY);

  // Call the callback function after drawing is complete
  if (typeof callback === 'function') {
    callback();
  }
}

function drawColorSwatches(ctx, colors) {
  const swatchSize = 50;
  let index = 0;

  colors.forEach((item) => {
    const color = item.color;
    const x = (index % 10) * (swatchSize + 10) + 10;
    const y = Math.floor(index / 10) * (swatchSize + 20) + 10;

    // Draw the color square
    ctx.fillStyle = color;
    ctx.fillRect(x, y, swatchSize, swatchSize);

    // Add color code text
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.fillText(color, x, y + swatchSize + 15);

    index++;
  });
}

function drawFontSamples(ctx, fonts, startY) {
  let yPosition = startY;
  ctx.fillStyle = '#000';

  fonts.forEach((item) => {
    const font = item.font;
    ctx.font = `20px ${font}, Arial`;
    ctx.fillText(`Sample text in ${font}`, 10, yPosition);
    yPosition += 30;
  });
}

function drawButtonPreviews(ctx, buttons, startY) {
  let yPosition = startY;
  let index = 1;

  buttons.forEach((item) => {
    const styles = item.styles;

    // Set default values
    const backgroundColor = styles['background-color'] || '#FFFFFF';
    const color = styles['color'] || '#000000';
    const borderRadius = parseInt(styles['border-radius']) || 0;

    const x = 10;
    const y = yPosition;
    const width = 200;
    const height = 40;

    // Draw button rectangle
    ctx.fillStyle = backgroundColor;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + borderRadius, y);
    ctx.lineTo(x + width - borderRadius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
    ctx.lineTo(x + width, y + height - borderRadius);
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - borderRadius,
      y + height
    );
    ctx.lineTo(x + borderRadius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
    ctx.lineTo(x, y + borderRadius);
    ctx.quadraticCurveTo(x, y, x + borderRadius, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw button text
    ctx.fillStyle = color;
    ctx.font = '16px Arial';
    ctx.fillText(`Button ${index}`, x + 20, y + 25);

    yPosition += height + 20;
    index++;
  });
}

// Function to generate and export the image
function generateAndExportImage(colors, fonts, buttons) {
  // Create an off-screen canvas
  const canvas = document.createElement('canvas');
  // Set the canvas size based on content
  const ctx = canvas.getContext('2d');

  // Draw the design preview on the canvas
  drawDesignPreview(ctx, canvas, colors, fonts, buttons, () => {
    // After drawing is complete, export the canvas as an image
    const image = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = image;
    link.download = 'design-preview.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

function exportComponents() {
  // Fetch components from storage
  chrome.storage.local.get(['componentsByHost', 'url'], (data) => {
    const hostname = data.url;
    const components = (data.componentsByHost && data.componentsByHost[hostname]) || [];

    if (components.length === 0) {
      alert('No components available to export.');
      return;
    }
  
      // Prepare the components data
      const exportedComponents = components.map((component, index) => {
        return {
          name: component.name || `Component ${index + 1}`,
          html: component.html,
          css: component.css,
          // screenshot: component.screenshot, // Optional: Include if needed
        };
      });
  
      // Create the design data object
      const designData = {
        components: exportedComponents,
      };
  
      // Convert to JSON and download
      const jsonContent = JSON.stringify(designData, null, 2);
      downloadJSONFile(jsonContent, 'design-system-with-components.json');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const colorsContainer = document.getElementById('colors');
    const fontsContainer = document.getElementById('fonts');
    const buttonsContainer = document.getElementById('buttons');
    const logoImg = document.getElementById('logo');


    // Variables to store selected components
    let selectedComponents = [];

    // Fetch the current tab to match the URL
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const currentUrl = new URL(currentTab.url || '');
      const hostname = currentUrl.hostname;

      // Retrieve data from storage
      chrome.storage.local.get(['designSystem', 'url', 'componentsByHost'], (data) => {
        if (data.designSystem && data.url === hostname) {
          const { colors, fonts, buttons, logoUrl } = data.designSystem;
          const colorsList = document.getElementById('colors');
          const fontsList = document.getElementById('fonts');
          const logoContainer = document.getElementById('logo');
          const buttonsContainer = document.getElementById('buttons');
          const componentsContainer = document.getElementById('components');

          // Retrieve components for the current hostname
          const components = (data.componentsByHost && data.componentsByHost[hostname]) || [];
          console.log('Components for current hostname:', components);
          console.log('Data:', data);
          // Clear any existing content
          colorsList.innerHTML = '';
          fontsList.innerHTML = '';
          logoContainer.innerHTML = '';
          buttonsContainer.innerHTML = '';
          componentsContainer.innerHTML = '';

          // Display logo
          if (logoUrl) {
            const img = document.createElement('img');
            img.src = logoUrl;
            img.alt = 'Logo';
            img.width = 32;
            img.height = 32;
            logoContainer.appendChild(img);
          }

          // Display colors inline
          colors.forEach((item) => {
            const { color } = item;
            const li = document.createElement('li');
            li.innerHTML = `
              <div class="color-sample" style="background:${color};"></div>
              <span class="color-code" data-color="${color}">${color}</span>
            `;
            colorsList.appendChild(li);
          });

          // Display fonts inline
          fonts.forEach((item) => {
            const { font } = item;
            const fontFamilies = font.split(',').map(f => f.trim().replace(/^['"]|['"]$/g, ''));
            fontFamilies.forEach((fontFamily) => {
              const li = document.createElement('li');
              li.innerHTML = `
                <span class="font-sample" data-font="${fontFamily}" style="font-family:${fontFamily}; cursor: pointer;">${fontFamily}</span>
              `;
              fontsList.appendChild(li);
            });
          });

          // Display buttons
          buttons.forEach((item, index) => {
            const { styles } = item;
            const buttonWrapper = document.createElement('div');
            buttonWrapper.className = 'button-wrapper';

            const button = document.createElement('button');
            button.className = 'extracted-button';
            button.dataset.css = JSON.stringify(styles, null, 2);

            // Apply styles to button
            for (const [prop, value] of Object.entries(styles)) {
              button.style.setProperty(prop, value);
            }
            button.textContent = `Button ${index + 1}`;

            buttonWrapper.appendChild(button);
            buttonsContainer.appendChild(buttonWrapper);
          });

          // Event listeners for the menu
          const menuButton = document.getElementById('menu-button');
          const menuContent = document.getElementById('menu-content');

          menuButton.addEventListener('click', () => {
            menuContent.classList.toggle('hidden');
          });

          // Event listener for Export as Image option
          document.getElementById('export-image-option').addEventListener('click', () => {
            generateAndExportImage(colors, fonts, buttons);
            menuContent.classList.add('hidden');
          });

          // Event listener for Export as PDF option
          document.getElementById('export-pdf-option').addEventListener('click', () => {
            generateAndExportPDF(colors, fonts, buttons);
            menuContent.classList.add('hidden');
          });

          // Event listener for Export Components option
          document.getElementById('export-components-option').addEventListener('click', () => {
            exportComponents();
            menuContent.classList.add('hidden');
          });

          // design tokens event listener
          document.getElementById('export-design-tokens-option').addEventListener('click', () => {
            exportDesignTokens(colors, fonts, buttons);
            menuContent.classList.add('hidden');
          });


          // Display components (Replace this entire section)
          components.forEach((component, index) => {
            const componentWrapper = document.createElement('div');
            componentWrapper.className = 'component-wrapper';

            // Create the checkbox in the top-right corner of each component
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'component-checkbox';
            checkbox.dataset.index = index; // Store the index for identification
            checkbox.addEventListener('change', (e) => {
              const idx = parseInt(e.target.dataset.index);
              if (e.target.checked) {
                selectedComponents.push(idx);
              } else {
                selectedComponents = selectedComponents.filter((i) => i !== idx);
              }
              // Enable or disable the delete button based on selection
              toggleDeleteButton();
            });
            componentWrapper.appendChild(checkbox);

            // Component preview image
            const componentPreview = document.createElement('img');
            componentPreview.className = 'component-preview';
            componentPreview.src = component.screenshot;
            componentWrapper.appendChild(componentPreview);

            // Append the component wrapper to the container
            componentsContainer.appendChild(componentWrapper);

            // Click event to copy component HTML and CSS
            componentPreview.addEventListener('click', () => {
              const combinedContent = `<!-- Component HTML -->\n${component.html}\n\n/* Component CSS */\n${component.css}`;
              copyToClipboard(combinedContent);
              alert('Component HTML and CSS copied to clipboard.');
            });
          });

          // Function to toggle the delete button
          function toggleDeleteButton() {
            const deleteButton = document.getElementById('delete-components-button');
            if (selectedComponents.length > 0) {
              deleteButton.disabled = false;
            } else {
              deleteButton.disabled = true;
            }
          }

          // Event listener for the delete button in the header
          document.getElementById('delete-components-button').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete the selected components?')) {
              removeSelectedComponents(selectedComponents, hostname);
              // Refresh the components display
              window.location.reload(); // Simple way to refresh the UI
            }
          });

          // Function to remove selected components
          function removeSelectedComponents(indices, hostname) {
            chrome.storage.local.get({ componentsByHost: {} }, (data) => {
              const componentsByHost = data.componentsByHost;
              if (componentsByHost[hostname]) {
                // Remove components with indices in 'indices' array
                componentsByHost[hostname] = componentsByHost[hostname].filter(
                  (component, idx) => !indices.includes(idx)
                );
                chrome.storage.local.set({ componentsByHost }, () => {
                  console.log(`Components at indices ${indices} removed for hostname ${hostname}`);
                });
              }
            });
          }

          // Function to generate and export PDF (requires jsPDF library)
          function generateAndExportPDF(colors, fonts, buttons) {
            // Include jsPDF library in your extension's manifest and directory
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            drawDesignPreview(ctx, canvas, colors, fonts, buttons, () => {
              const imageData = canvas.toDataURL('image/jpeg', 1.0);

              const pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
              pdf.addImage(imageData, 'JPEG', 0, 0, canvas.width, canvas.height);
              pdf.save('design-preview.pdf');
            });
          }

          // Copy for colors
          document.querySelectorAll('.color-code').forEach((elem) => {
            elem.addEventListener('click', () => {
              const color = elem.dataset.color;
              copyToClipboard(color);
            });
          });

          // Copy for fonts
          document.querySelectorAll('.font-sample').forEach((elem) => {
            elem.addEventListener('click', () => {
              const font = elem.dataset.font;
              copyToClipboard(font);
            });
          });

          // Copy for buttons
          document.querySelectorAll('.extracted-button').forEach((elem) => {
            elem.addEventListener('click', () => {
              const css = elem.dataset.css;
              copyToClipboard(css);
            });
          });

          document.getElementById('select-component-button').addEventListener('click', () => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              chrome.tabs.sendMessage(tabs[0].id, { action: 'enableSelectionMode' }, () => {
                // Close the popup after sending the message
                window.close();
              });
            });
          });

        } else {
          // Data not available yet
          const content = document.getElementById('content');
          content.innerHTML =
            '<p>No data available. Please refresh the page and try again.</p>';
        }
      });
    });
  });