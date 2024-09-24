// content_script.js
(function () {
    const designSystem = {
      colors: {},
      fonts: {},
      buttons: {},
      logoUrl: ''
    };
  
    function isValidColor(color) {
      if (
        typeof color !== 'string' ||
        color.trim().length === 0
      ) {
        return false;
      }
  
      const lowerColor = color.trim().toLowerCase();
  
      // Exclude non-informative color values
      const invalidColors = ['transparent', 'inherit', 'initial', 'unset', 'currentcolor'];
      if (invalidColors.includes(lowerColor)) {
        return false;
      }
  
      // Check if the color is a valid CSS color
      const s = new Option().style;
      s.color = color;
      return s.color !== '';
    }
  
    function isGrayscale(r, g, b) {
      return r === g && g === b;
    }
  
    function cssColorToHex(color) {
      // Create a temporary element to apply the color and get computed style
      const tempEl = document.createElement('div');
      tempEl.style.color = color;
      document.body.appendChild(tempEl);
  
      const computedColor = getComputedStyle(tempEl).color;
      document.body.removeChild(tempEl);
  
      if (!computedColor || computedColor.includes('rgba(0, 0, 0, 0)')) {
        // Invalid color or transparent
        return null;
      }
  
      // Convert rgb/rgba to hex
      const rgbaMatch = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
      if (!rgbaMatch) {
        return null;
      }
  
      let [_, r, g, b] = rgbaMatch;
      r = parseInt(r, 10);
      g = parseInt(g, 10);
      b = parseInt(b, 10);
  
      // Exclude grayscale colors
      if (isGrayscale(r, g, b)) {
        return null;
      }
  
      const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
      return hex.toUpperCase();
    }
  
    function resolveCssVariable(value, element, property) {
      const maxDepth = 10; // Prevent potential infinite loops
      let depth = 0;
    
      while (value && value.trim().startsWith('var(') && depth < maxDepth) {
        const varMatch = value.match(/var\((--[^,\s)]+)(?:,\s*([^)]+))?\)/);
        if (varMatch) {
          const varName = varMatch[1];
          const fallback = varMatch[2];
    
          // Get the value of the CSS variable
          const computedStyle = getComputedStyle(element);
          const varValue = computedStyle.getPropertyValue(varName);
    
          if (varValue && varValue.trim() !== '') {
            value = varValue.trim();
          } else if (fallback) {
            value = fallback.trim();
          } else {
            // If no value or fallback, exit the loop
            break;
          }
        } else {
          break;
        }
        depth++;
      }
    
      // If the value is still a CSS variable (couldn't resolve), try to compute it
      if (value && value.trim().startsWith('--')) {
        const computedStyle = getComputedStyle(element);
        const varValue = computedStyle.getPropertyValue(value.trim());
        if (varValue && varValue.trim() !== '') {
          value = varValue.trim();
        }
      }
    
      return value;
    }
  
    function processColor(color) {
      color = color.trim();
      color = resolveCssVariable(color);
  
      if (!isValidColor(color)) {
        return;
      }
  
      const hexColor = cssColorToHex(color);
  
      if (!hexColor) {
        return;
      }
  
      designSystem.colors[hexColor] = (designSystem.colors[hexColor] || 0) + 1;
    }
  
    function processFont(font) {
      font = font.trim();
      font = resolveCssVariable(font);
      if (!font || font.length === 0) {
        return;
      }
  
      // Exclude generic fonts and non-informative values
      const invalidFonts = ['inherit', 'initial', 'unset', 'serif', 'sans-serif', 'monospace'];
      const fontFamilies = font.split(',').map(f => f.trim().replace(/^["']|["']$/g, ''));
  
      fontFamilies.forEach(fontFamily => {
        const lowerFont = fontFamily.toLowerCase();
        if (!invalidFonts.includes(lowerFont) && lowerFont !== '') {
          designSystem.fonts[fontFamily] = (designSystem.fonts[fontFamily] || 0) + 1;
        }
      });
    }
  
    function processButtonStyles(buttonElement) {
      const computedStyles = getComputedStyle(buttonElement);
      
    // Exclude buttons that are not visible or are inline elements
    if (
      computedStyles.getPropertyValue('display') === 'none' ||
      computedStyles.getPropertyValue('visibility') === 'hidden' ||
      computedStyles.getPropertyValue('opacity') === '0' ||
      computedStyles.getPropertyValue('display') === 'inline' ||
      computedStyles.getPropertyValue('display') === 'contents'
    ) {
      return;
    }
  
    const styleProperties = [
      'background-color',
      'color',
      'border',
      'border-radius',
      'padding',
      'margin',
      'font-size',
      'font-family',
      'font-weight',
      'text-transform',
      'text-decoration',
      'box-shadow',
      'opacity',
      'width',
      'height',
      // Add any other properties that are relevant
    ];
  
      const styleObject = {};
  
      styleProperties.forEach((prop) => {
        let value = computedStyles.getPropertyValue(prop);
        if (
          value &&
          value !== 'initial' &&
          value !== 'inherit' &&
          value !== 'unset' &&
          value !== 'normal' &&
          value.trim() !== '' &&
          value !== 'none'
        ) {
          // Resolve CSS variables
          value = resolveCssVariable(value.trim(), buttonElement, prop);
          // If the value is still not valid after resolving, skip it
          if (value && value.trim() !== '' && value !== 'none') {
            styleObject[prop] = value.trim();
          }
        }
      });
  
      // Check if the button has minimal styling
      const essentialProperties = ['background-color', 'color', 'border', 'padding'];
      const hasEssentialStyles = essentialProperties.some(prop => styleObject[prop] && styleObject[prop] !== '');
  
      // Check if the button has meaningful styling
      const hasMeaningfulStyle =
        (styleObject['background-color'] && !isTransparentOrEmptyBackground(styleObject['background-color'])) ||
        (styleObject['border'] && !isZeroBorder(styleObject['border']));
  

      console.log('Processing button:', buttonElement);
      console.log('Computed styles:', styleObject);
      console.log('Has meaningful style:', hasMeaningfulStyle);
      
      if (!hasMeaningfulStyle) {
        // Skip buttons without meaningful styling
        console.log('Skipping button with styles:', styleObject);
        return;
      }

      if (!hasEssentialStyles) {
        // Skip buttons without essential styling
        console.log('Skipping button with styles:', styleObject);
        return;
      }
  
      // Convert style object to CSS text
      // const cssText = Object.entries(styleObject)
      //   .map(([prop, value]) => `${prop}: ${value};`)
      //   .join(' ');
  
      if (Object.keys(styleObject).length > 0) {
        // Store the styleObject directly instead of cssText
        const styleKey = JSON.stringify(styleObject);
        designSystem.buttons[styleKey] = (designSystem.buttons[styleKey] || 0) + 1;
        console.log('Added button with styles:', styleObject);
      }
    }
  
    // Helper function to check for transparent or empty backgrounds
    function isTransparentOrEmptyBackground(color) {
      if (!color || color === 'transparent') return true;

      const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (rgbaMatch) {
        const alpha = rgbaMatch[4];
        if (alpha !== undefined && parseFloat(alpha) === 0) {
          return true;
        }
      }

      return false;
    }
  
    // Helper function to check for zero borders
    function isZeroBorder(border) {
      if (!border || border.trim() === '') return true;
      if (border === 'none' || border === '0' || border === '0px') return true;
      return /^0(?:px|em|rem|%)?\s+none\b/.test(border);
    }

    // function hasSignificantPadding(padding) {
    //   if (!padding) return false;
    
    //   // Split padding values and check if any are greater than zero
    //   const values = padding.split(' ').map(val => parseFloat(val));
    //   return values.some(val => val > 4); // Adjust threshold as needed
    // }
  
    // Helper function to check for default text colors
    // function isDefaultTextColor(color) {
    //   const defaultColors = [
    //     'rgb(0, 0, 0)',
    //     'rgb(255, 255, 255)',
    //     'rgb(33, 39, 42)', // Add other default colors as needed
    //   ];
    //   return defaultColors.includes(color);
    // }
  
    function extractDesignSystem() {
      const allElements = document.querySelectorAll('*');
  
      allElements.forEach((el) => {
        const styles = getComputedStyle(el);
  
        // Process colors
        const colorProps = [
          'color',
          'background-color',
          'border-color',
          'border-top-color',
          'border-right-color',
          'border-bottom-color',
          'border-left-color',
          'fill',
          'stroke',
        ];
        colorProps.forEach((prop) => {
          let value = styles.getPropertyValue(prop);
          if (isValidColor(value)) {
            processColor(value);
          }
        });
  
        // Process fonts
        const font = styles.getPropertyValue('font-family');
        if (font && font.trim().length > 0) {
          processFont(font);
        }
  
        // Process buttons
        if (
          el.tagName.toLowerCase() === 'button' ||
          el.getAttribute('role') === 'button' ||
          (el.tagName.toLowerCase() === 'a' && el.getAttribute('href') && styles.getPropertyValue('cursor') === 'pointer') ||
          el.type === 'button' ||
          el.type === 'submit'
        ) {
          processButtonStyles(el);
        }
      });
  
      // Extract the website's logo URL
      const logoElement = document.querySelector('link[rel~="icon"], link[rel="shortcut icon"]');
      if (logoElement) {
        designSystem.logoUrl = logoElement.href;
      } else {
        // Try to find a logo image
        const imgElement = document.querySelector('img[alt*="logo"], img[src*="logo"]');
        if (imgElement) {
          designSystem.logoUrl = imgElement.src;
        } else {
          designSystem.logoUrl = '';
        }
      }
  
      // Sort colors, fonts, and buttons by usage count
      const sortedColors = Object.entries(designSystem.colors)
        .sort((a, b) => b[1] - a[1])
        .map((entry) => ({
          color: entry[0],
        }));
  
      const sortedFonts = Object.entries(designSystem.fonts)
        .sort((a, b) => b[1] - a[1])
        .map((entry) => ({
          font: entry[0],
        }));
  
      const sortedButtons = Object.entries(designSystem.buttons)
        .sort((a, b) => b[1] - a[1])
        .map((entry) => ({
          styles: JSON.parse(entry[0]), // Parse the JSON string back into an object
          count: entry[1],
        }));
  
      // Save the data to local storage
      const dataToStore = {
        designSystem: {
          colors: sortedColors,
          fonts: sortedFonts,
          buttons: sortedButtons,
          logoUrl: designSystem.logoUrl
        },
        url: window.location.hostname,
      };
  
      chrome.storage.local.set(dataToStore, () => {
        console.log('Design system stored:', dataToStore);
      });
    }
  
    // Run extraction when the content script is loaded
    extractDesignSystem();
  })();