// popup.js

// Function definitions can be outside the DOMContentLoaded event
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => {
      alert('Copied to clipboard');
    },
    (err) => {
      console.error('Could not copy text: ', err);
    }
  );
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

// Begin the main script after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  const colorsContainer = document.getElementById('colors');
  const fontsContainer = document.getElementById('fonts');
  const buttonsContainer = document.getElementById('buttons');
  const logoImg = document.getElementById('logo');

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

          chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'screenshotCaptured') {
              const { screenshot, name } = request;
          
              const componentWrapper = document.createElement('div');
              componentWrapper.className = 'component-wrapper';
          
              const componentName = document.createElement('h3');
              componentName.textContent = name;
          
              const componentPreview = document.createElement('img');
              componentPreview.className = 'component-preview';
              componentPreview.src = screenshot;
          
              console.log('Received screenshot in popup.js:', screenshot);
          
              componentWrapper.appendChild(componentName);
              componentWrapper.appendChild(componentPreview);
              componentsContainer.appendChild(componentWrapper);
            }
          });
          

          // Display components
          components.forEach((component, index) => {
            const componentWrapper = document.createElement('div');
            componentWrapper.className = 'component-wrapper';

            const componentPreview = document.createElement('img');
            componentPreview.className = 'component-preview';
            componentPreview.src = component.screenshot;

            // Create the delete button
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="M9 3V4H4V6H5V21A1 1 0 0 0 6 22H18A1 1 0 0 0 19 21V6H20V4H15V3H9M7 6H17V20H7V6Z" />
            </svg>`;
            deleteButton.addEventListener('click', () => {
              // Confirm deletion (optional)
              if (confirm('Are you sure you want to delete this component?')) {
                // Remove the component from storage
                removeComponent(index, hostname);
                // Remove the component from the UI
                componentWrapper.remove();
              }
            });

            // Append elements
            componentWrapper.appendChild(componentPreview);
            componentWrapper.appendChild(deleteButton);
            componentsContainer.appendChild(componentWrapper);
          });

          function removeComponent(index, hostname) {
            chrome.storage.local.get({ componentsByHost: {} }, (data) => {
              const componentsByHost = data.componentsByHost;
              if (componentsByHost[hostname]) {
                componentsByHost[hostname].splice(index, 1);
                chrome.storage.local.set({ componentsByHost }, () => {
                  console.log(`Component at index ${index} removed for hostname ${hostname}`);
                });
              }
            });
          }


          function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
              // Optional: Display a success message
              alert(`Copied: ${text}`);
            }, () => {
              // Handle error
              alert('Failed to copy to clipboard.');
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

          // Copy component HTML
          document.querySelectorAll('.copy-html-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
              const html = btn.dataset.html;
              copyToClipboard(html);
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

          // Event listener for the Export CSS button
          document
            .getElementById('export-css-button')
            .addEventListener('click', () => {
              const cssContent = generateCSSFileContent({
                colors,
                fonts,
                buttons,
              });
              downloadCSSFile(cssContent);
            });

          // Event listener for the Export Image button
          document
            .getElementById('export-image-button')
            .addEventListener('click', () => {
              generateAndExportImage(colors, fonts, buttons);
            });

        // Generate design preview when data is available
        // (Only if you want to display it; since you mentioned not displaying the canvas,
        //  you might skip this step. If drawing the canvas causes errors due to missing data,
        //  ensure it's called at the right time.)

        // If you don't want to display the canvas in the popup, you can comment out this line:
        // drawDesignPreview(ctx, canvas, colors, fonts, buttons);

      } else {
        // Data not available yet
        const content = document.getElementById('content');
        content.innerHTML =
          '<p>No data available. Please refresh the page and try again.</p>';
      }
    });
  });
});