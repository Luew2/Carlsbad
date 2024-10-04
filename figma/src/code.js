// src/code.js
const htmlparser2 = require('htmlparser2');
const css = require('css');
const domSerializer = require('dom-serializer');
const Color = require('color');
const { Element, Text, Comment } = require('domhandler');

async function createFigmaComponentFromData(componentData) {
  const { html, css: cssText, name } = componentData;

  // Parse CSS
  const cssStyles = parseCSS(cssText);

  // Parse HTML
  const dom = htmlparser2.parseDocument(html);

  // Create a Figma frame to hold the component
  const frame = figma.createFrame();
  frame.name = name || 'Component';

  console.log(`Creating component: ${frame.name}`); // Debugging

  // Iterate through child nodes of the DOM root and process each
  if (dom.children && dom.children.length > 0) {
    for (const childNode of dom.children) {
      await processDomNode(childNode, frame, cssStyles);
    }
  }

  figma.currentPage.appendChild(frame);
  console.log(`Appended frame: ${frame.name} to current page.`); // Debugging
}

function parseCSS(cssText) {
  const parsedCSS = css.parse(cssText);
  const styles = {};

  for (const rule of parsedCSS.stylesheet.rules) {
    if (rule.type === 'rule') {
      for (const selector of rule.selectors) {
        const declarations = {};
        for (const declaration of rule.declarations) {
          declarations[declaration.property] = declaration.value;
        }
        styles[selector] = declarations;
      }
    }
  }

  return styles;
}

// figma/src/code.js

async function processDomNode(domNode, parentFigmaNode, cssStyles, parentStyles = {}, depth = 0) {
  if (!domNode) return;

  const indent = '  '.repeat(depth); // Indentation for debug statements

  try {
    console.log(`${indent}Processing DOM node at depth ${depth}:`, domNode); // Debugging
    console.log(`${indent}DOM node type:`, domNode.type); // Debugging

    let figmaNode;
    let nodeStyles = {};

    if (domNode.type === 'tag') {
      const tagName = domNode.name ? domNode.name.toLowerCase() : '';
      console.log(`${indent}Tag name: ${tagName}`); // Debugging

      // Determine whether to skip this node
      let skip = false;

      // Determine the Figma node to create based on the tag name
      if (tagName === 'svg') {
        console.log(`${indent}Handling SVG element`); // Debugging
        // Handle SVG
        const svgString = domSerializer(domNode, { xmlMode: true });
        figmaNode = figma.createNodeFromSvg(svgString);
        console.log(`${indent}Created SVG node: ${figmaNode.name}`); // Debugging
      } else if (tagName === 'img') {
        console.log(`${indent}Handling IMG element`); // Debugging
        // Handle images
        figmaNode = await handleImageNode(domNode);
        console.log(`${indent}Created Image node: ${figmaNode.name}`); // Debugging
      } else if (['p', 'span', 'h1', 'h2'].includes(tagName)) {
        console.log(`${indent}Handling text element: ${tagName}`); // Debugging
        // Handle text elements
        figmaNode = figma.createText();
        console.log(`${indent}Created Text node: ${figmaNode.name}`); // Debugging
      } else {
        console.log(`${indent}Skipping unrecognized element: ${tagName}`); // Debugging
        skip = true;
        // Do not create a figmaNode for unrecognized elements
      }

      // Get node styles
      nodeStyles = getNodeStyles(domNode, cssStyles);
      console.log(`${indent}Node styles:`, nodeStyles); // Debugging

      if (!skip && figmaNode) {
        // Combine styles
        const combinedStyles = { ...parentStyles, ...nodeStyles };

        // Apply styles to the Figma node
        applyStylesToFigmaNode(figmaNode, nodeStyles, parentStyles);
        console.log(`${indent}Applied styles to node: ${figmaNode.name}`); // Debugging

        // Handle text content if it's a Text node
        if (figmaNode.type === 'TEXT') {
          // Extract font information
          const fontFamily = combinedStyles['font-family'] || 'Roboto';
          const fontStyle = combinedStyles['font-style'] || 'Regular';
          const fontName = { family: fontFamily, style: fontStyle };

          console.log(`${indent}Loading font: ${fontName.family} ${fontName.style}`); // Debugging
          await figma.loadFontAsync(fontName);

          // Set fontName
          figmaNode.fontName = fontName;
          console.log(`${indent}Set font family:`, figmaNode.fontName); // Debugging

          // Set text characters
          figmaNode.characters = getTextContent(domNode);
          console.log(`${indent}Set text characters: "${figmaNode.characters}"`); // Debugging
        }
      }

    } else if (domNode.type === 'text') {
      // Handle text nodes
      const textContent = domNode.data.trim();
      console.log(`${indent}Text content: "${textContent}"`); // Debugging
      if (textContent) {
        figmaNode = figma.createText();
        console.log(`${indent}Created Text node for text content`); // Debugging

        // Combine styles
        const combinedStyles = { ...parentStyles };

        // Extract font information
        const fontFamily = combinedStyles['font-family'] || 'Roboto';
        const fontStyle = combinedStyles['font-style'] || 'Regular';
        const fontName = { family: fontFamily, style: fontStyle };

        console.log(`${indent}Loading font: ${fontName.family} ${fontName.style}`); // Debugging
        await figma.loadFontAsync(fontName);

        // Set fontName
        figmaNode.fontName = fontName;
        console.log(`${indent}Set font family:`, figmaNode.fontName); // Debugging

        // Apply styles
        applyStylesToFigmaNode(figmaNode, {}, parentStyles);
        console.log(`${indent}Applied parent styles to text node`); // Debugging

        // Set text characters
        figmaNode.characters = textContent;
        console.log(`${indent}Set text characters: "${figmaNode.characters}"`); // Debugging
      }
    }

    // Decide which parent to use for processing children
    let currentParentFigmaNode = parentFigmaNode;

    // Append the Figma node to the parent and set current parent
    if (figmaNode) {
      parentFigmaNode.appendChild(figmaNode);
      console.log(`${indent}Appended node: ${figmaNode.name} to parent: ${parentFigmaNode.name}`); // Debugging
      currentParentFigmaNode = figmaNode;
    } else {
      console.log(`${indent}No Figma node created for DOM node type: ${domNode.type}`); // Debugging
      // Use parentFigmaNode as current parent
    }

    // Process children
    if (domNode.children && domNode.children.length > 0) {
      console.log(`${indent}Processing ${domNode.children.length} children of node at depth ${depth}`); // Debugging
      for (const childNode of domNode.children) {
        console.log(`${indent}Processing child node at depth ${depth + 1}`); // Debugging
        await processDomNode(childNode, currentParentFigmaNode, cssStyles, nodeStyles, depth + 1);
      }
    } else {
      console.log(`${indent}No children to process for node at depth ${depth}`); // Debugging
    }

  } catch (error) {
    console.error(`${indent}Error processing node at depth ${depth}: ${domNode.name || domNode.type}`, error);
  }
}





function getNodeStyles(domNode, cssStyles) {
  const styles = {};
  const selectors = getSelectorsForNode(domNode);

  console.log(`Fetching styles for node: ${domNode.name}, Selectors:`, selectors); // Debugging

  for (const selector of selectors) {
    if (cssStyles[selector]) {
      Object.assign(styles, cssStyles[selector]);
      console.log(`Applied styles from selector: ${selector}`, cssStyles[selector]); // Debugging
    }
  }

  return styles;
}

function getSelectorsForNode(domNode) {
  const selectors = [];
  const tagName = domNode.name ? domNode.name.toLowerCase() : '';
  const id = domNode.attribs && domNode.attribs.id;
  const classList = domNode.attribs && domNode.attribs.class ? domNode.attribs.class.split(' ') : [];

  // Element selector
  if (tagName) selectors.push(tagName);

  // ID selector
  if (id) {
    selectors.push(`#${id}`);
    if (tagName) selectors.push(`${tagName}#${id}`);
  }

  // Class selectors
  for (const className of classList) {
    selectors.push(`.${className}`);
    if (tagName) selectors.push(`${tagName}.${className}`);
  }

  return selectors;
}


function parseNumericValue(value) {
  const numericValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
  return isNaN(numericValue) ? undefined : numericValue;
}

function applyStylesToFigmaNode(node, styles, parentStyles = {}) {
  const combinedStyles = { ...parentStyles, ...styles };
  
  console.log(`Applying styles to node: ${node.name}`, combinedStyles); // Debugging

  // Handle background and background-color
  if (combinedStyles['background']) {
    const { color, opacity } = extractColorFromBackground(combinedStyles['background']);
    if (color) {
      node.fills = [{
        type: 'SOLID',
        color
      }];
      node.opacity = opacity;
      console.log(`Set fills and opacity via 'background':`, color, opacity); // Debugging
    }
  } else if (combinedStyles['background-color']) {
    const color = cssColorToFigmaRGB(combinedStyles['background-color']);
    node.fills = [{
      type: 'SOLID',
      color
    }];
    node.opacity = 1; // Default opacity
    console.log(`Set fills via 'background-color':`, color); // Debugging
  } else {
    // If no background is specified, remove existing fills to prevent white boxes
    node.fills = [];
    console.log(`No background defined. Removed fills from node: ${node.name}`); // Debugging
  }

  // Handle text properties
  if (node.type === 'TEXT') {
    // Remove setting node.fontName here
    if (combinedStyles['font-size']) {
      node.fontSize = parseInt(combinedStyles['font-size'], 10);
      console.log(`Set font size:`, node.fontSize); // Debugging
    }
    if (combinedStyles['color']) {
      const color = cssColorToFigmaRGB(combinedStyles['color']);
      node.fills = [{
        type: 'SOLID',
        color
      }];
      node.opacity = 1; // Default opacity for text color
      console.log(`Set text fills:`, color); // Debugging
    }
  }
    
  // Map logical properties to physical ones
  if (combinedStyles['block-size'] && !combinedStyles['height']) {
    combinedStyles['height'] = combinedStyles['block-size'];
  }
  if (combinedStyles['inline-size'] && !combinedStyles['width']) {
    combinedStyles['width'] = combinedStyles['inline-size'];
  }

  // Now handle width and height as before
  if (combinedStyles['width']) {
    const width = parseNumericValue(combinedStyles['width']);
    if (!isNaN(width)) {
      node.resize(width, node.height);
      console.log(`Resized width to:`, width); // Debugging
    }
  }

  if (combinedStyles['height']) {
    const height = parseNumericValue(combinedStyles['height']);
    if (!isNaN(height)) {
      node.resize(node.width, height);
      console.log(`Resized height to:`, height); // Debugging
    }
  }


  // Handle position (Note: Figma uses absolute positioning)
  if (combinedStyles['left'] && combinedStyles['top']) {
    node.x = parseInt(combinedStyles['left'], 10);
    node.y = parseInt(combinedStyles['top'], 10);
    console.log(`Set position to: x=${node.x}, y=${node.y}`); // Debugging
  }

  // Handle border radius
  if (combinedStyles['border-radius']) {
    if (node.type === 'RECTANGLE' || node.type === 'FRAME') {
      node.cornerRadius = parseInt(combinedStyles['border-radius'], 10);
      console.log(`Set border radius to:`, node.cornerRadius); // Debugging
    }
  }
}

// Utility function to extract color from background shorthand
function extractColorFromBackground(background) {
  if (!background || typeof background !== 'string') {
    return { color: null, opacity: 1 };
  }

  // Split the background value
  const parts = background.split(/\s+/);
  let colorPart = parts.find(part => /^(rgb|#)/i.test(part));

  if (!colorPart) {
    // If no color part is found, return default
    return { color: null, opacity: 1 };
  }

  // Handle rgba(), rgb(), and hex colors
  const rgbaMatch = colorPart.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (rgbaMatch) {
    const r = parseFloat(rgbaMatch[1]) / 255;
    const g = parseFloat(rgbaMatch[2]) / 255;
    const b = parseFloat(rgbaMatch[3]) / 255;
    const a = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1;
    return { color: { r, g, b }, opacity: a };
  }

  const hexMatch = colorPart.match(/#([0-9A-Fa-f]{3,6})/);
  if (hexMatch) {
    return { color: hexToFigmaRGB(hexMatch[0]), opacity: 1 };
  }

  // Add more parsing as needed
  return { color: null, opacity: 1 };
}


function cssColorToFigmaRGB(cssColor) {
  const color = Color(cssColor);
  return {
    r: color.red() / 255,
    g: color.green() / 255,
    b: color.blue() / 255,
  };
}

function getTextContent(domNode) {
  let text = '';
  if (domNode.type === 'text') {
    text += domNode.data;
  } else if (domNode.children && domNode.children.length > 0) {
    for (const child of domNode.children) {
      text += getTextContent(child);
    }
  }
  return text;
}

async function handleImageNode(domNode) {
  try {
    const imgUrl = domNode.attribs.src;
    if (!imgUrl) return null;

    const response = await fetch(imgUrl);
    if (!response.ok) throw new Error('Network response was not ok');

    const arrayBuffer = await response.arrayBuffer();
    const image = figma.createRectangle();
    const imageHash = figma.createImage(new Uint8Array(arrayBuffer)).hash;
    image.fills = [{ type: 'IMAGE', imageHash, scaleMode: 'FILL' }];

    return image;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}



figma.showUI(__html__, { width: 320, height: 200 });

figma.ui.onmessage = async (msg) => {
  console.log('Message received from UI:', msg); // Add logging
  if (msg.type === 'import-design') {
    const designData = msg.designData;
    console.log('Starting import of design data:', designData); // Add logging
    try {
      await importDesignSystem(designData);
      figma.notify('Design system imported successfully!');
    } catch (error) {
      console.error('Error importing design system:', error);
      figma.notify('Failed to import design system. Check console for details.');
    } finally {
      figma.closePlugin();
    }
  }
};

async function importDesignSystem(designData) {
  console.log('Importing design data:', designData); // Log the design data

  try {
    // Import colors
    if (designData.colors) {
      console.log('Importing colors...');
      await importColors(designData.colors);
    }

    // Import fonts
    if (designData.fonts) {
      console.log('Importing fonts...');
      await importFonts(designData.fonts);
    }

    // Import buttons
    if (designData.buttons) {
      console.log('Importing buttons...');
      await importButtons(designData.buttons);
    }

    // Import components
    if (designData.components) {
      console.log('Importing components...');
      for (const componentData of designData.components) {
        await createFigmaComponentFromData(componentData);
      }
    }

    // Optionally import logo
    if (designData.logoUrl) {
      console.log('Importing logo...');
      await importLogo(designData.logoUrl);
    }
  } catch (error) {
    console.error('Error during importDesignSystem:', error);
    throw error; // Re-throw to be caught in the calling function
  }
}

async function importLogo(logoUrl) {
  try {
    const response = await fetch(logoUrl);
    if (!response.ok) throw new Error('Network response was not ok');

    const arrayBuffer = await response.arrayBuffer();
    const image = figma.createRectangle();
    const imageHash = figma.createImage(new Uint8Array(arrayBuffer)).hash;
    image.fills = [{ type: 'IMAGE', imageHash, scaleMode: 'FILL' }];
    image.name = 'Logo';

    figma.currentPage.appendChild(image);
  } catch (error) {
    console.error('Error importing logo:', error);
  }
}

async function importColors(colors) {
  for (const colorToken of colors) {
    const paintStyle = figma.createPaintStyle();
    paintStyle.name = colorToken.name || `Color ${colorToken.value}`;
    const color = hexToFigmaRGB(colorToken.value);
    paintStyle.paints = [{ type: 'SOLID', color }];
  }
}

function hexToFigmaRGB(hex) {
  // Remove '#' if present
  hex = hex.replace('#', '');

  // Parse the hex color
  const bigint = parseInt(hex, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;

  return { r, g, b };
}

async function importFonts(fonts) {
  const loadedFonts = new Set(); // To track loaded fonts and prevent duplicates
  for (const fontToken of fonts) {
    const fontFamily = fontToken.value;
    const fontStyle = fontToken.style || 'Regular'; // Assuming style is provided
    
    // Check if the font is already loaded
    const fontKey = `${fontFamily}-${fontStyle}`;
    if (!loadedFonts.has(fontKey)) {
      try {
        await figma.loadFontAsync({ family: fontFamily, style: fontStyle });
        loadedFonts.add(fontKey);
        console.log(`Loaded font: ${fontFamily} ${fontStyle}`); // Debugging
      } catch (error) {
        console.error(`Failed to load font: ${fontFamily} ${fontStyle}`, error);
      }
    } else {
      console.log(`Font already loaded: ${fontFamily} ${fontStyle}`); // Debugging
    }

    const textStyle = figma.createTextStyle();
    textStyle.name = fontToken.name || `${fontFamily} ${fontStyle}`;
    textStyle.fontName = { family: fontFamily, style: fontStyle };
  }
}


async function importButtons(buttons) {
  for (const buttonToken of buttons) {
    await createButtonComponent(buttonToken);
  }
}

async function createButtonComponent(buttonToken) {
  const { value, name } = buttonToken;
  const component = figma.createComponent();
  component.name = name || 'Button';

  // Create a rectangle as the button background
  const rect = figma.createRectangle();
  component.appendChild(rect);

  // Apply styles
  if (value['background-color']) {
    rect.fills = [
      { type: 'SOLID', color: cssColorToFigmaRGB(value['background-color']) },
    ];
    rect.opacity = 1; // Default opacity
    console.log(`Set button background color:`, cssColorToFigmaRGB(value['background-color'])); // Debugging
  }

  if (value['border-radius']) {
    rect.cornerRadius = parseInt(value['border-radius']);
    console.log(`Set button border radius:`, rect.cornerRadius); // Debugging
  }

  // Create text label
  const text = figma.createText();
  
  // Extract font information from button styles
  const fontFamily = value['font-family'] || 'Roboto';
  const fontStyle = value['font-style'] || 'Regular';
  
  // Load the required font
  await figma.loadFontAsync({ family: fontFamily, style: fontStyle });
  
  text.characters = name || 'Button';
  applyStylesToFigmaNode(text, value); // Assuming value contains font styles
  component.appendChild(text);

  // Position text over the rectangle
  text.x = rect.x + rect.width / 2 - text.width / 2;
  text.y = rect.y + rect.height / 2 - text.height / 2;  

  // Adjust component size
  component.resize(rect.width, rect.height);
}
