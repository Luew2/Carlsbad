// Required dependencies
const htmlparser2 = require('htmlparser2');
const css = require('css');
const domSerializer = require('dom-serializer').default;
const Color = require('color');

// Main component creation function
async function createFigmaComponentFromData(componentData, position = { x: 0, y: 0 }) {
  const { html, css: cssText, name } = componentData;
  const cssStyles = parseCSS(cssText);
  const dom = htmlparser2.parseDocument(html);

  const frame = figma.createFrame();
  frame.name = name || 'Component';

  frame.x = position.x;
  frame.y = position.y;

  // Set the layout mode and sizing modes for auto-layout
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  frame.clipsContent = false; // Prevent content from being clipped

  console.log(`Creating component: ${frame.name}`);


  if (dom.children && dom.children.length > 0) {
    for (const childNode of dom.children) {
      await processDomNode(childNode, frame, cssStyles);
    }
  }

  figma.currentPage.appendChild(frame);
  console.log(`Appended frame: ${frame.name} to current page.`);
  return frame;
}


// CSS parsing
function parseCSS(cssText) {
  const parsedCSS = css.parse(cssText);
  const styles = {};

  for (const rule of parsedCSS.stylesheet.rules) {
    if (rule.type === 'rule') {
      for (const selector of rule.selectors) {
        const declarations = {};
        for (const declaration of rule.declarations) {
          if (declaration.type === 'declaration') {
            declarations[declaration.property] = declaration.value;
          }
        }
        if (styles[selector]) {
          styles[selector] = { ...styles[selector], ...declarations };
        } else {
          styles[selector] = declarations;
        }
      }
    }
  }

  return styles;
}


// HTML to Figma node mapping
function createFigmaNodeForHTML(tagName) {
  console.log(`Handling HTML element: ${tagName}`);
  let figmaNode;

  const blockElements = ['div', 'nav', 'ul', 'li', 'section', 'header', 'footer', 'article', 'aside', 'a', 'button'];
  const inlineElements = ['span', 'strong', 'em', 'b', 'i'];

  if (blockElements.includes(tagName)) {
    figmaNode = figma.createFrame();
    figmaNode.layoutMode = 'VERTICAL';
    figmaNode.primaryAxisSizingMode = 'AUTO';
    figmaNode.counterAxisSizingMode = 'AUTO';
  } else if (inlineElements.includes(tagName)) {
    figmaNode = figma.createFrame();
    figmaNode.layoutMode = 'HORIZONTAL';
    figmaNode.primaryAxisSizingMode = 'AUTO';
    figmaNode.counterAxisSizingMode = 'AUTO';
  } else if (tagName === 'img') {
    figmaNode = figma.createRectangle();
    figmaNode.name = 'Image';
  } else if (tagName === 'svg') {
    figmaNode = null;
  } else {
    figmaNode = figma.createFrame();
     // Default to auto-layout for other elements
     figmaNode.layoutMode = 'VERTICAL';
     figmaNode.primaryAxisSizingMode = 'AUTO';
     figmaNode.counterAxisSizingMode = 'AUTO';
  }

  if (figmaNode) {
    figmaNode.name = tagName;
    figmaNode.clipsContent = false; // Prevent clipping
    console.log(`Created Figma node: ${figmaNode.name}`);
  }

  return figmaNode;
}

// Main DOM processing function
async function processDomNode(domNode, parentFigmaNode, cssStyles, parentStyles = {}, depth = 0) {
  if (!domNode) return;

  const indent = '  '.repeat(depth);
  console.log(`${indent}Processing DOM node at depth ${depth}:`, domNode);
  console.log(`${indent}DOM node type:`, domNode.type);

  let figmaNode;
  let nodeStyles = {};

  if (domNode.type === 'tag') {
    const tagName = domNode.name ? domNode.name.toLowerCase() : '';
    console.log(`${indent}Tag name: ${tagName}`);

    if (tagName === 'svg') {
      figmaNode = await handleSVGElement(domNode, cssStyles);
    } else if (tagName === 'img') {
      figmaNode = await handleImageNode(domNode);
    } else {
      figmaNode = createFigmaNodeForHTML(tagName);
    }

    nodeStyles = getNodeStyles(domNode, cssStyles);
    console.log(`${indent}Node styles:`, nodeStyles);

    if (figmaNode) {
      const combinedStyles = { ...parentStyles, ...nodeStyles };

      if (figmaNode.type === 'TEXT') {
        await setTextNodeContent(figmaNode, domNode, combinedStyles);
        await applyTextStyles(figmaNode, combinedStyles);
      } else {
        await applyStylesToFigmaNode(figmaNode, combinedStyles);
        applyAutoLayoutStyles(figmaNode, combinedStyles);

        if (figmaNode.type === 'FRAME') {
          if (domNode.children && domNode.children.length > 0) {
            console.log(`${indent}Processing ${domNode.children.length} children of Frame node at depth ${depth}`);
            for (const childNode of domNode.children) {
              await processDomNode(childNode, figmaNode, cssStyles, nodeStyles, depth + 1);
            }
          }
        }
      }
    }
  } else if (domNode.type === 'text') {
    const textContent = domNode.data.trim();
    console.log(`${indent}Text content: "${textContent}"`);
    if (textContent) {
      figmaNode = figma.createText();
      console.log(`${indent}Created Text node for text content`);
      const combinedStyles = { ...parentStyles };
      await setTextNodeContent(figmaNode, domNode, combinedStyles);
      await applyTextStyles(figmaNode, combinedStyles);
    }
  }

  if (figmaNode) {
    parentFigmaNode.appendChild(figmaNode);
    console.log(`${indent}Appended node: ${figmaNode.name} to parent: ${parentFigmaNode.name}`);
  }
}


// Style parsing and application functions
function parsePadding(padding) {
  const parts = padding.split(' ').map(parseNumericValue);
  switch (parts.length) {
    case 1: return { top: parts[0], bottom: parts[0], left: parts[0], right: parts[0] };
    case 2: return { top: parts[0], bottom: parts[0], left: parts[1], right: parts[1] };
    case 3: return { top: parts[0], bottom: parts[2], left: parts[1], right: parts[1] };
    case 4: return { top: parts[0], bottom: parts[2], left: parts[3], right: parts[1] };
    default: return { top: 0, bottom: 0, left: 0, right: 0 };
  }
}

function parseMargin(margin) {
  return parsePadding(margin); // Margin parsing is identical to padding
}


function parseTransform(transform) {
  const matrixMatch = transform.match(/matrix\(([^)]+)\)/);
  if (matrixMatch) {
    const values = matrixMatch[1].split(',').map(parseFloat);
    if (values.length >= 6) {
      return [
        [values[0], values[2], values[4]], // Note the positions of the indices
        [values[1], values[3], values[5]],
      ];
    }
  }
  return [
    [1, 0, 0],
    [0, 1, 0],
  ];
}


function parseNumericValue(value) {
  if (!value) return undefined;
  const numericValue = parseFloat(value);
  const unit = value.replace(numericValue, '').trim();
  switch (unit) {
    case 'px':
    case '':
      return numericValue;
    case 'em':
      return numericValue * 16;
    case '%':
      return numericValue / 100;
    default:
      return numericValue;
  }
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
  return text.trim();
}

async function handleSVGElement(domNode, cssStyles) {
  try {
    console.log(`Handling SVG element: ${domNode.name}`);
    const svgString = domSerializer(domNode, { xmlMode: true });
    console.log(`Serialized SVG string: ${svgString}`);
    const svgNode = figma.createNodeFromSvg(svgString);
    console.log(`Created SVG node: ${svgNode.name}`);

    // Get the fill color from the styles
    const nodeStyles = getNodeStyles(domNode, cssStyles);
    if (nodeStyles && nodeStyles['fill']) {
      const fillColor = cssColorToFigmaRGB(nodeStyles['fill']);
      applyFillToVectorNodes(svgNode, fillColor);
    }

    return svgNode;
  } catch (error) {
    console.error('Error creating SVG node:', error);
    return null;
  }
}

function applyFillToVectorNodes(node, fillColor) {
  if ('fills' in node && node.type === 'VECTOR') {
    node.fills = [{ type: 'SOLID', color: fillColor }];
    console.log(`Set fill color of vector node ${node.name} to`, fillColor);
  }

  if ('children' in node && node.children.length > 0) {
    for (const child of node.children) {
      applyFillToVectorNodes(child, fillColor);
    }
  }
}

async function setTextNodeContent(textNode, domNode, styles) {
  let fontFamily = parseFontFamily(styles['font-family']);
  let fontStyleCSS = styles['font-style'] || '';
  let fontWeight = styles['font-weight'] || '400'; // Default to 400 (Regular)

  // Map font-weight and font-style to Figma font style
  let figmaFontStyle = mapFontWeightToFigmaStyle(fontStyleCSS, fontWeight);

  let fontName = { family: fontFamily, style: figmaFontStyle };

  console.log(`Attempting to load font: ${fontName.family} ${fontName.style}`);
  try {
    await figma.loadFontAsync(fontName);
    textNode.fontName = fontName;
    console.log(`Set font: ${fontName.family} ${fontName.style}`);
  } catch (error) {
    console.error(`Failed to load font: ${fontName.family} ${fontName.style}`, error);

    // Fallback to default font
    fontName = { family: 'Arial', style: 'Regular' };
    await figma.loadFontAsync(fontName);
    textNode.fontName = fontName;
    console.log(`Fallback to default font: ${fontName.family} ${fontName.style}`);
  }

  const textContent = getTextContent(domNode);
  textNode.characters = textContent || ' '; // Ensure there's at least a space character
  console.log(`Set text content: "${textNode.characters}"`);
}

function parseFontFamily(fontFamilyString) {
  if (!fontFamilyString) return 'Arial';

  // Split the fontFamilyString by commas to handle multiple fonts
  const fontFamilies = fontFamilyString.split(',');

  for (let family of fontFamilies) {
    // Remove any quotes and trim whitespace
    family = family.replace(/['"]/g, '').trim();

    // Return the first non-empty font family
    if (family) return family;
  }

  // Fallback to 'Arial' if no valid fonts are found
  return 'Arial';
}

function mapFontWeightToFigmaStyle(fontStyle, fontWeight) {
  const isItalic = fontStyle.toLowerCase().includes('italic');
  let style = 'Regular'; // Default style

  switch (fontWeight.toString()) {
    case '100':
    case '200':
      style = 'Thin';
      break;
    case '300':
      style = 'Light';
      break;
    case '400':
    case 'normal':
      style = 'Regular';
      break;
    case '500':
      style = 'Medium';
      break;
    case '600':
      style = 'Semi Bold';
      break;
    case '700':
    case 'bold':
      style = 'Bold';
      break;
    case '800':
      style = 'Extra Bold';
      break;
    case '900':
      style = 'Black';
      break;
    default:
      style = 'Regular';
      break;
  }

  if (isItalic) style += ' Italic';
  return style;
}

const loadedFonts = new Set();

async function loadFont(fontName) {
  const fontKey = `${fontName.family}_${fontName.style}`;
  if (loadedFonts.has(fontKey)) {
    // Font is already loaded
    return;
  }

  try {
    await figma.loadFontAsync(fontName);
    loadedFonts.add(fontKey);
    console.log(`Loaded font: ${fontKey}`);
  } catch (error) {
    console.error(`Failed to load font: ${fontKey}`, error);
    throw error;
  }
}

function applyAutoLayoutStyles(node, styles) {
  if (node.type !== 'FRAME') return;

  if (styles['display'] === 'flex') {
    // Determine layout mode based on flex-direction
    if (styles['flex-direction']) {
      node.layoutMode = styles['flex-direction'] === 'column' ? 'VERTICAL' : 'HORIZONTAL';
    }

    // Set primary axis alignment based on justify-content
    if (styles['justify-content']) {
      node.primaryAxisAlignItems = mapJustifyContent(styles['justify-content']);
    }

    // Set counter axis alignment based on align-items
    if (styles['align-items']) {
      node.counterAxisAlignItems = mapAlignItems(styles['align-items']);
    }

    // Set spacing based on gap
    if (styles['gap']) {
      node.itemSpacing = parseNumericValue(styles['gap']) || 0;
      console.log(`Set item spacing to: ${node.itemSpacing}`);
    }

    console.log(`Applied auto-layout styles to node: ${node.name}`);
  } else {
    node.layoutMode = 'NONE';
    console.log(`Disabled auto-layout for node: ${node.name}`);
  }
}


function mapJustifyContent(value) {
  const map = {
    'flex-start': 'MIN',
    'flex-end': 'MAX',
    'center': 'CENTER',
    'space-between': 'SPACE_BETWEEN',
    'space-around': 'SPACE_AROUND',
    'space-evenly': 'SPACE_EVENLY'
  };
  return map[value] || 'MIN';
}

function mapAlignItems(value) {
  const map = {
    'flex-start': 'MIN',
    'flex-end': 'MAX',
    'center': 'CENTER',
    'baseline': 'BASELINE'
  };
  return map[value] || 'MIN';
}

function getNodeStyles(domNode, cssStyles) {
  console.log(`Fetching styles for node: ${domNode.name}`);
  console.log(`CSS Styles:`, cssStyles);
  const styles = {};
  const selectors = getSelectorsForNode(domNode);
  console.log(`Fetching styles for node: ${domNode.name}, Selectors:`, selectors);

  const sortedSelectors = selectors.sort((a, b) => getSpecificity(a) - getSpecificity(b));

  for (const selector of sortedSelectors) {
    if (cssStyles[selector]) {
      Object.assign(styles, cssStyles[selector]);
      console.log(`Applied styles from selector: ${selector}`, cssStyles[selector]);
    }
  }

  return styles;
}

function getSpecificity(selector) {
  let a = 0, b = 0, c = 0;
  const parts = selector.split(/(?=[#\.])/);
  for (const part of parts) {
    if (part.startsWith('#')) a += 1;
    else if (part.startsWith('.')) b += 1;
    else c += 1;
  }
  return (a * 100) + (b * 10) + c;
}

function getSelectorsForNode(domNode) {
  const selectors = [];
  const tagName = domNode.name ? domNode.name.toLowerCase() : '';
  const id = domNode.attribs && domNode.attribs.id;
  const classList = domNode.attribs && domNode.attribs.class ? domNode.attribs.class.split(' ') : [];

  if (tagName) selectors.push(tagName);
  if (id) {
    selectors.push(`#${id}`);
    if (tagName) selectors.push(`${tagName}#${id}`);
  }
  for (const className of classList) {
    selectors.push(`.${className}`);
    if (tagName) selectors.push(`${tagName}.${className}`);
  }

  return selectors;
}

async function applyStylesToFigmaNode(node, styles) {
  console.log(`Applying styles to node: ${node.name}`, styles);

  try {
    // Common styles for all node types
    applyOpacityStyles(node, styles);
    applyTransformStyles(node, styles);

    if (node.type === 'FRAME' || node.type === 'GROUP' || node.type === 'COMPONENT') {
      // Apply container-specific styles
      applyBackgroundStyles(node, styles);
      applyLayoutStyles(node, styles);
      applyGeometryStyles(node, styles);
      applyAutoLayoutStyles(node, styles);
      applyBorderStyles(node, styles);
    } else if (node.type === 'TEXT') {
      await applyTextStyles(node, styles);
    } else if (node.type === 'VECTOR') {
      applyVectorStyles(node, styles);
    } else {
      // Apply general styles for other node types
      applyBackgroundStyles(node, styles);
      applyGeometryStyles(node, styles);
      applyBorderStyles(node, styles);
    }
  } catch (error) {
    console.error(`Error applying styles to node: ${node.name}`, error);
  }
}

function applyVectorStyles(node, styles) {
  if (styles['fill']) {
    const fillColor = extractColor(styles['fill']);
    if (fillColor) {
      node.fills = [{ type: 'SOLID', color: fillColor }];
      console.log(`Set fill of vector node ${node.name} to`, fillColor);
    }
  }

  if (styles['stroke']) {
    const strokeColor = extractColor(styles['stroke']);
    if (strokeColor) {
      node.strokes = [{ type: 'SOLID', color: strokeColor }];
      node.strokeWeight = parseNumericValue(styles['stroke-width']) || 1;
      console.log(`Set stroke of vector node ${node.name} to`, strokeColor);
    }
  }
}

function applyBackgroundStyles(node, styles) {
  if (styles['background']) {
    const { color, opacity } = extractColorFromBackground(styles['background']);
    if (color) {
      node.fills = [{ type: 'SOLID', color, opacity }];
      console.log(`Set fills and opacity via 'background':`, color, opacity);
    }
  } else if (styles['background-color']) {
    const color = cssColorToFigmaRGB(styles['background-color']);
    node.fills = [{ type: 'SOLID', color }];
    console.log(`Set fills via 'background-color':`, color);
  } else {
    node.fills = [];
    console.log(`No background defined. Removed fills from node: ${node.name}`);
  }
}


function applyGeometryStyles(node, styles) {
  if (styles['border-radius']) {
    node.cornerRadius = parseNumericValue(styles['border-radius']) || 0;
    console.log(`Set border radius to:`, node.cornerRadius);
  }

  // Avoid setting fixed width and height when using auto-layout
  if (styles['width']) {
    const width = parseNumericValue(styles['width']);
    if (!isNaN(width)) {
      if (node.layoutMode === 'NONE') {
        node.resize(width, node.height);
        console.log(`Set width: ${width}`);
      } else {
        // In auto-layout, set sizing mode to FIXED if width is specified
        node.primaryAxisSizingMode = 'FIXED';
        node.resize(width, node.height);
        console.log(`Set width and primaryAxisSizingMode to FIXED: ${width}`);
      }
    }
  }

  if (styles['height']) {
    const height = parseNumericValue(styles['height']);
    if (!isNaN(height)) {
      if (node.layoutMode === 'NONE') {
        node.resize(node.width, height);
        console.log(`Set height: ${height}`);
      } else {
        // In auto-layout, set sizing mode to FIXED if height is specified
        node.counterAxisSizingMode = 'FIXED';
        node.resize(node.width, height);
        console.log(`Set height and counterAxisSizingMode to FIXED: ${height}`);
      }
    }
  }
}


function applyLayoutStyles(node, styles) {
  applyPaddingStyles(node, styles);
  // applyMarginStyles(node, styles);
  if (styles['position'] === 'absolute') {
    // In Figma, this corresponds to setting the node to absolute positioning
    if ('layoutPositioning' in node) {
      node.layoutPositioning = 'ABSOLUTE';
    }
    console.log(`Set node ${node.name} to absolute positioning.`);
  } else {
    // Ensure the node is set to normal positioning
    if ('layoutPositioning' in node) {
      node.layoutPositioning = 'AUTO'; // or 'NORMAL'
    }
  }

  if (styles['display'] === 'flex') {
    const flexDirection = styles['flex-direction'] || 'row';
    node.layoutMode = flexDirection === 'column' ? 'VERTICAL' : 'HORIZONTAL';
    node.primaryAxisSizingMode = 'AUTO';
    node.counterAxisSizingMode = 'AUTO';
    console.log(`Set node to auto-layout with layoutMode: ${node.layoutMode}`);
  } else if (styles['display']) {
    node.layoutMode = 'NONE';
    console.log(`Disabled auto-layout for node: ${node.name}`);
  }
}

function applyPaddingStyles(node, styles) {
  if (node.type !== 'FRAME') {
    console.warn(`Cannot apply padding to node type: ${node.type}`);
    return;
  }

  if (styles['padding']) {
    const padding = parsePadding(styles['padding']);
    node.paddingTop = padding.top;
    node.paddingBottom = padding.bottom;
    node.paddingLeft = padding.left;
    node.paddingRight = padding.right;
    console.log(`Set padding:`, padding);
  } else {
    // Directly handle individual padding properties without using paddingProps and paddingMap
    const individualPaddings = ['padding-top', 'padding-bottom', 'padding-left', 'padding-right'];
    individualPaddings.forEach(prop => {
      const figmaProp = prop.replace('padding-', 'padding');
      const side = figmaProp.charAt(figmaProp.length - 1).toUpperCase() + figmaProp.slice(0, -1);
      const value = parseNumericValue(styles[prop]);
      if (!isNaN(value)) {
        node[`padding${side}`] = value;
        console.log(`Set padding${side} to ${value}`);
      }
    });

    console.log(`Set individual padding:`, individualPaddings.map(prop => `${prop}=${styles[prop]}`).join(', '));
  }
}

function applyMarginStyles(node, styles) {
  if (node.type !== 'FRAME') {
    console.warn(`Cannot apply margin to node type: ${node.type}`);
    return;
  }

  if (styles['margin']) {
    const margin = parseMargin(styles['margin']);
    node.x += margin.left;
    node.y += margin.top;
    console.log(`Set margin:`, margin);
  } else {
    const marginProps = ['margin-top', 'margin-bottom', 'margin-left', 'margin-right'];
    marginProps.forEach(prop => {
      const value = parseNumericValue(styles[prop]);
      if (!isNaN(value)) {
        if (prop.includes('left') || prop.includes('right')) node.x += value;
        if (prop.includes('top') || prop.includes('bottom')) node.y += value;
        console.log(`Set ${prop} to ${value}`);
      }
    });
    console.log(`Set individual margin:`, marginProps.map(prop => `${prop}=${styles[prop]}`).join(', '));
  }
}

async function applyTextStyles(node, styles) {
  // Set font size
  if (styles['font-size']) {
    node.fontSize = parseNumericValue(styles['font-size']) || 12;
    console.log(`Set font size to: ${node.fontSize}`);
  }

  // Parse font family
  let fontFamily = parseFontFamily(styles['font-family']);
  // Map font-weight and font-style to Figma font style
  let fontStyleCSS = styles['font-style'] || ''; // e.g., 'italic'
  let fontWeight = styles['font-weight'] || '400'; // e.g., 'bold' or '700'
  let figmaFontStyle = mapFontWeightToFigmaStyle(fontStyleCSS, fontWeight);
  let fontName = { family: fontFamily, style: figmaFontStyle };

  console.log(`Attempting to load font: ${fontName.family} ${fontName.style}`);
  try {
    await loadFont(fontName);
    node.fontName = fontName;
    console.log(`Set font to: ${fontName.family} ${fontName.style}`);
  } catch (error) {
    console.error(`Failed to load font: ${fontName.family} ${fontName.style}`, error);
    // Fallback to default font
    const fallbackFont = { family: 'Arial', style: 'Regular' };
    await loadFont(fallbackFont);
    node.fontName = fallbackFont;
    console.log(`Fallback to default font: ${fallbackFont.family} ${fallbackFont.style}`);
  }

  // Set text color
  if (styles['color']) {
    const color = cssColorToFigmaRGB(styles['color']);
    node.fills = [{ type: 'SOLID', color }];
    console.log(`Set text color to:`, color);
  }

  // Set text alignment
  if (styles['text-align']) {
    const alignmentMap = { 'left': 'LEFT', 'center': 'CENTER', 'right': 'RIGHT', 'justify': 'JUSTIFIED' };
    node.textAlignHorizontal = alignmentMap[styles['text-align']] || 'LEFT';
    console.log(`Set text alignment to: ${node.textAlignHorizontal}`);
  }

  // Set line height
  if (styles['line-height']) {
    const lineHeightValue = parseNumericValue(styles['line-height']);
    if (!isNaN(lineHeightValue)) {
      node.lineHeight = { unit: 'PIXELS', value: lineHeightValue };
      console.log(`Set line height to: ${node.lineHeight.value}`);
    } else {
      node.lineHeight = { unit: 'PIXELS', value: node.fontSize * 1.2 };
      console.log(`Set default line height to: ${node.lineHeight.value}`);
    }
  }
}


function applyBorderStyles(node, styles) {
  if (styles['border'] || styles['border-color'] || styles['border-width']) {
    let borderColor = styles['border-color'] || 'rgba(255,255,255,1)';
    let borderWidth = styles['border-width'] ? parseNumericValue(styles['border-width']) : 1;

    if (styles['border']) {
      // Improved parsing of border shorthand using regex
      // This regex captures border-width, border-style, and border-color
      const borderRegex = /^(\d+px)?\s*(\S+)?\s*(rgba?\([^)]+\)|#[0-9A-Fa-f]{3,6})?$/i;
      const borderMatch = styles['border'].match(borderRegex);
      if (borderMatch) {
        if (borderMatch[1]) {
          borderWidth = parseNumericValue(borderMatch[1]);
        }
        if (borderMatch[3]) {
          borderColor = borderMatch[3];
        }
      }
    }

    // Now set the stroke
    try {
      const color = cssColorToFigmaRGB(borderColor);
      node.strokes = [{ type: 'SOLID', color }];
      node.strokeWeight = borderWidth;
      console.log(`Set stroke: color=${borderColor}, strokeWeight=${borderWidth}`);
    } catch (error) {
      console.error(`Error setting stroke: color=${borderColor}, strokeWeight=${borderWidth}`, error);
    }
  }
}

function applyTransformStyles(node, styles) {
  const transformableNodeTypes = ['VECTOR', 'FRAME', 'GROUP', 'INSTANCE', 'COMPONENT', 'RECTANGLE', 'ELLIPSE', 'POLYGON', 'STAR', 'LINE', 'TEXT'];

  if (styles['transform'] && transformableNodeTypes.includes(node.type)) {
    try {
      node.relativeTransform = parseTransform(styles['transform']);
      console.log(`Set transform for node: ${node.name}`);
    } catch (error) {
      console.error(`Error setting transform for node: ${node.name}`, error);
    }
  }
}

function applyOpacityStyles(node, styles) {
  if (styles['opacity']) {
    const opacityValue = parseFloat(styles['opacity']);
    if (opacityValue >= 0 && opacityValue <= 1) {
      node.opacity = opacityValue;
    } else {
      console.warn(`Invalid opacity value: ${opacityValue}. Must be between 0 and 1.`);
    }
  }
}

// Color Utilities
function extractColorFromBackground(background) {
  if (!background || typeof background !== 'string') {
    return { color: null, opacity: 1 };
  }

  // Enhanced regex to capture complete rgba(), rgb(), and hex colors
  const colorRegex = /(rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*\d*\.?\d+)?\))|(#([0-9A-Fa-f]{3,6}))/i;
  const match = background.match(colorRegex);

  if (!match) {
    // If no color part is found, return default
    return { color: null, opacity: 1 };
  }

  const colorString = match[0];

  // Handle rgba(), rgb(), and hex colors
  const rgbaMatch = colorString.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\)/);
  if (rgbaMatch) {
    const r = parseFloat(rgbaMatch[1]) / 255;
    const g = parseFloat(rgbaMatch[2]) / 255;
    const b = parseFloat(rgbaMatch[3]) / 255;
    const a = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1;
    return { color: { r, g, b }, opacity: a };
  }

  const hexMatch = colorString.match(/#([0-9A-Fa-f]{3,6})/);
  if (hexMatch) {
    return { color: hexToFigmaRGB(hexMatch[0]), opacity: 1 };
  }

  // If color format is unrecognized, return default
  return { color: null, opacity: 1 };
}


function cssColorToFigmaRGB(cssColor) {
  try {
    const color = Color(cssColor);
    return {
      r: color.red() / 255,
      g: color.green() / 255,
      b: color.blue() / 255,
    };
  } catch (error) {
    console.error(`Failed to parse CSS color: ${cssColor}`, error);
    return { r: 1, g: 1, b: 1 }; // Default to white
  }
}

function hexToFigmaRGB(hex) {
  hex = hex.replace('#', '');
  const bigint = parseInt(hex, 16);
  return {
    r: ((bigint >> 16) & 255) / 255,
    g: ((bigint >> 8) & 255) / 255,
    b: (bigint & 255) / 255
  };
}

// Image Handling
async function handleImageNode(domNode) {
  try {
    const imgUrl = domNode.attribs.src;
    if (!imgUrl) return null;

    const response = await fetch(imgUrl);
    if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);

    const arrayBuffer = await response.arrayBuffer();
    const image = figma.createRectangle();
    const imageHash = figma.createImage(new Uint8Array(arrayBuffer)).hash;
    image.fills = [{ type: 'IMAGE', scaleMode: 'FILL', imageHash: imageHash }];
    image.name = 'Image';

    const width = parseNumericValue(domNode.attribs.width) || 100;
    const height = parseNumericValue(domNode.attribs.height) || 100;
    image.resize(width, height);
    console.log(`Created Image node with size: ${width}x${height}`);

    return image;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}

// Design System Import
async function importDesignSystem(designData) {
  console.log('Importing design data:', designData);

  try {
    if (designData.colors) {
      console.log('Importing colors...');
      await importColors(designData.colors);
    }

    if (designData.fonts) {
      console.log('Importing fonts...');
      await importFonts(designData.fonts);
    }

    if (designData.buttons) {
      console.log('Importing buttons...');
      await importButtons(designData.buttons);
    }

    if (designData.components) {
      console.log('Importing components...');
    
      // Initialize the position tracking variable
      let currentYPosition = 0;
      const componentSpacing = 100; // Space between components, adjust as needed
    
      for (const componentData of designData.components) {
        // Create the component and retrieve the frame to access its dimensions
        const frame = await createFigmaComponentFromData(componentData, { x: 0, y: currentYPosition });
    
        // Update the currentXPosition for the next component
        currentYPosition += frame.height + componentSpacing;
      }
    }

    if (designData.logoUrl) {
      console.log('Importing logo...');
      await importLogo(designData.logoUrl);
    }
  } catch (error) {
    console.error('Error during importDesignSystem:', error);
    throw error;
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

async function importFonts(fonts) {
  const loadedFonts = new Set();
  for (const fontToken of fonts) {
    const fontFamily = fontToken.value;
    const fontStyle = fontToken.style || 'Regular';
    
    const fontKey = `${fontFamily}-${fontStyle}`;
    if (!loadedFonts.has(fontKey)) {
      try {
        await figma.loadFontAsync({ family: fontFamily, style: fontStyle });
        loadedFonts.add(fontKey);
        console.log(`Loaded font: ${fontFamily} ${fontStyle}`);
      } catch (error) {
        console.error(`Failed to load font: ${fontFamily} ${fontStyle}`, error);
      }
    } else {
      console.log(`Font already loaded: ${fontFamily} ${fontStyle}`);
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

  const rect = figma.createRectangle();
  component.appendChild(rect);

  if (value['background-color']) {
    rect.fills = [{ type: 'SOLID', color: cssColorToFigmaRGB(value['background-color']) }];
    rect.opacity = 1;
    console.log(`Set button background color:`, cssColorToFigmaRGB(value['background-color']));
  }

  if (value['border-radius']) {
    rect.cornerRadius = parseInt(value['border-radius']);
    console.log(`Set button border radius:`, rect.cornerRadius);
  }

  const text = figma.createText();
  const fontFamily = value['font-family'] || 'Arial';
  const fontStyle = value['font-style'] || 'Regular';
  
  await figma.loadFontAsync({ family: fontFamily, style: fontStyle });
  
  text.characters = name || 'Button';
  await applyStylesToFigmaNode(text, value);
  component.appendChild(text);

  text.x = rect.x + rect.width / 2 - text.width / 2;
  text.y = rect.y + rect.height / 2 - text.height / 2;  

  component.resize(rect.width, rect.height);
}

// Plugin UI Setup
figma.showUI(__html__, { width: 320, height: 200 });

figma.ui.onmessage = async (msg) => {
  console.log('Message received from UI:', msg);
  if (msg.type === 'import-design') {
    const designData = msg.designData;
    console.log('Starting import of design data:', designData);
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
