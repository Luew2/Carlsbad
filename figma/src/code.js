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

  // Process DOM nodes
  await processDomNode(dom, frame, cssStyles);

  figma.currentPage.appendChild(frame);
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

async function processDomNode(domNode, parentFigmaNode, cssStyles, parentStyles = {}) {
  if (!domNode) return;

  if (domNode.type === 'tag') {
    const tagName = domNode.name.toLowerCase();

    let figmaNode;

    if (tagName === 'svg') {
      // Serialize the SVG node
      const svgString = domSerializer(domNode, { xmlMode: true });
      figmaNode = figma.createNodeFromSvg(svgString);
    } else if (tagName === 'img') {
      // Handle images (could be extended)
      figmaNode = await handleImageNode(domNode);

    } else if (tagName === 'p' || tagName === 'span' || tagName === 'h1' || tagName === 'h2') {
      figmaNode = figma.createText();
      await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
      figmaNode.characters = getTextContent(domNode);
    } else {
      // Default to a frame for other elements
      figmaNode = figma.createFrame();
    }

    // Apply styles
    const nodeStyles = getNodeStyles(domNode, cssStyles);
    applyStylesToFigmaNode(figmaNode, nodeStyles, parentStyles);

    // Append to parent
    parentFigmaNode.appendChild(figmaNode);

    // Process children
    if (domNode.children && domNode.children.length > 0) {
      for (const childNode of domNode.children) {
        await processDomNode(childNode, figmaNode, cssStyles, nodeStyles);
      }
    }
  } else if (domNode.type === 'text') {
    // Handle text nodes
    const textContent = domNode.data.trim();
    if (textContent) {
      const textNode = figma.createText();
      await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
      textNode.characters = textContent;
      applyStylesToFigmaNode(textNode, parentStyles);
      parentFigmaNode.appendChild(textNode);
    }
  }
}
function getNodeStyles(domNode, cssStyles) {
  const styles = {};
  const selectors = getSelectorsForNode(domNode);

  for (const selector of selectors) {
    if (cssStyles[selector]) {
      Object.assign(styles, cssStyles[selector]);
    }
  }

  return styles;
}

function getSelectorsForNode(domNode) {
  const selectors = [];
  const tagName = domNode.name.toLowerCase();
  const id = domNode.attribs.id;
  const classList = domNode.attribs.class ? domNode.attribs.class.split(' ') : [];

  // Element selector
  selectors.push(tagName);

  // ID selector
  if (id) {
    selectors.push(`#${id}`);
    selectors.push(`${tagName}#${id}`);
  }

  // Class selectors
  for (const className of classList) {
    selectors.push(`.${className}`);
    selectors.push(`${tagName}.${className}`);
  }

  return selectors;
}

function parseNumericValue(value) {
  return parseFloat(value.replace(/[^0-9.-]/g, ''));
}

function applyStylesToFigmaNode(node, styles, parentStyles = {}) {
  const combinedStyles = { ...parentStyles, ...styles };

  // Handle fills
  if (combinedStyles['background-color']) {
    const color = cssColorToFigmaRGB(combinedStyles['background-color']);
    node.fills = [{ type: 'SOLID', color }];
  }

  // Handle text properties
  if (node.type === 'TEXT') {
    if (combinedStyles['color']) {
      const color = cssColorToFigmaRGB(combinedStyles['color']);
      node.fills = [{ type: 'SOLID', color }];
    }
    if (combinedStyles['font-size']) {
      node.fontSize = parseInt(combinedStyles['font-size'], 10);
    }
    if (combinedStyles['font-family']) {
      node.fontName = { family: combinedStyles['font-family'], style: 'Regular' };
    }
  }
  
  if (combinedStyles['width']) {
    const width = parseNumericValue(combinedStyles['width']);
    node.resize(width, node.height);
  }
  
  if (combinedStyles['height']) {
    node.resize(node.width, parseInt(combinedStyles['height'], 10));
  }

  // Handle position (Note: Figma uses absolute positioning)
  if (combinedStyles['left'] && combinedStyles['top']) {
    node.x = parseInt(combinedStyles['left'], 10);
    node.y = parseInt(combinedStyles['top'], 10);
  }

  // Handle border radius
  if (combinedStyles['border-radius']) {
    if (node.type === 'RECTANGLE' || node.type === 'FRAME') {
      node.cornerRadius = parseInt(combinedStyles['border-radius'], 10);
    }
  }
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



// src/code.js
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
  for (const fontToken of fonts) {
    const fontFamily = fontToken.value;
    // Load the font with a default style
    await figma.loadFontAsync({ family: fontFamily, style: 'Regular' });
    const textStyle = figma.createTextStyle();
    textStyle.name = fontToken.name || fontFamily;
    textStyle.fontName = { family: fontFamily, style: 'Regular' };
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
  }

  if (value['border-radius']) {
    rect.cornerRadius = parseInt(value['border-radius']);
  }

  // Create text label
  const text = figma.createText();
  await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
  text.characters = name || 'Button';
  component.appendChild(text);

  // Position text over the rectangle
  text.x = rect.x + rect.width / 2 - text.width / 2;
  text.y = rect.y + rect.height / 2 - text.height / 2;  

  // Adjust component size
  component.resize(rect.width, rect.height);
}

