// popup.js
document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      (tabs) => {
        const currentTab = tabs[0];
        const currentUrl = new URL(currentTab.url || '');
        const hostname = currentUrl.hostname;
  
        chrome.storage.local.get(['designSystem', 'url'], (data) => {
          if (data.designSystem && data.url === hostname) {
            const { colors, fonts, buttons, logoUrl } = data.designSystem;
            const colorsList = document.getElementById('colors');
            const fontsList = document.getElementById('fonts');
            const logoContainer = document.getElementById('logo');
            const buttonsContainer = document.getElementById('buttons');
  
            // Clear any existing content
            colorsList.innerHTML = '';
            fontsList.innerHTML = '';
            logoContainer.innerHTML = '';
            buttonsContainer.innerHTML = '';
  
            // Display logo
            if (logoUrl) {
              const img = document.createElement('img');
              img.src = logoUrl;
              img.alt = 'Logo';
              img.width = 32;
              img.height = 32;
              logoContainer.appendChild(img);
            }
  
            // Display colors
            colors.forEach((item) => {
              const { color } = item;
              const li = document.createElement('li');
              li.innerHTML = `
                <div class="color-sample" style="background:${color};"></div>
                <span class="color-code" data-color="${color}">${color}</span>
              `;
              colorsList.appendChild(li);
            });
  
            // Display fonts
            fonts.forEach((item) => {
              const { font } = item;
              const fontFamilies = font.split(',').map(f => f.trim().replace(/^['"]|['"]$/g, ''));
              fontFamilies.forEach((fontFamily) => {
                const li = document.createElement('li');
                li.innerHTML = `
                  <span class="font-sample" style="font-family:${fontFamily};">${fontFamily}</span>
                  <button class="copy-btn" data-font="${fontFamily}">Copy</button>
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
              button.style.cssText = styles;
              button.textContent = `Button ${index + 1}`;
  
              const copyCssBtn = document.createElement('button');
              copyCssBtn.className = 'copy-css-btn';
              copyCssBtn.textContent = 'Copy CSS';
              copyCssBtn.dataset.css = styles;
  
              buttonWrapper.appendChild(button);
              buttonWrapper.appendChild(copyCssBtn);
              buttonsContainer.appendChild(buttonWrapper);
            });
  
            // Add copy-to-clipboard functionality
            document.querySelectorAll('.color-code').forEach((elem) => {
              elem.addEventListener('click', () => {
                copyToClipboard(elem.dataset.color);
              });
            });
  
            document.querySelectorAll('.copy-btn').forEach((btn) => {
              btn.addEventListener('click', () => {
                copyToClipboard(btn.dataset.font);
              });
            });
  
            document.querySelectorAll('.copy-css-btn').forEach((btn) => {
              btn.addEventListener('click', () => {
                // Format CSS for better readability
                const formattedCss = btn.dataset.css.replace(/;\s*/g, ';\n');
                copyToClipboard(formattedCss);
              });
            });
          } else {
            // Data not available yet
            const content = document.getElementById('content');
            content.innerHTML =
              '<p>No data available. Please refresh the page and try again.</p>';
          }
        });
      }
    );
  });
  
  // Copy to clipboard function
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }