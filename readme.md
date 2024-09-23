# Design System Extractor Chrome Extension

## Overview

Design System Extractor is a Chrome extension that allows you to extract and save design systems from any website. It helps developers and designers quickly capture:

- Colors (excluding grayscale colors)
- Fonts
- Button Styles

The extension displays the extracted elements in an easy-to-use popup and provides functionality to copy color codes, font families, and button CSS styles to your clipboard.

## Features

- **Extract Colors**: Retrieves all unique colors used on a webpage, excluding grayscale colors. Clicking on a color code copies it to your clipboard.
- **Extract Fonts**: Lists all font families used on the page. Each font is displayed individually. Clicking on a font copies it to your clipboard.
- **Extract Button Styles**: Identifies different button styles used on the page. Displays a preview of each button and provides a "Copy CSS" button to copy the button's styles.
- **Logo Detection**: Attempts to fetch and display the website's logo in the extension popup for a better visual context.

## Installation

### 1. Download or Clone the Repository

Download or clone the repository containing the extension's source code to your local machine.

### 2. Load the Extension in Chrome

1. Open Google Chrome.
2. Navigate to `chrome://extensions/`.
3. Enable Developer mode by toggling the switch in the upper-right corner.
4. Click on `Load unpacked`.
5. Select the directory where you downloaded or cloned the extension files. This directory should contain the `manifest.json` file.

## Usage

### 1. Navigate to a Website

Go to any website from which you want to extract the design system (e.g., https://webflow.com/).

### 2. Open the Extension Popup

- Click on the Design System Extractor extension icon in the Chrome toolbar.
- If you don't see the icon, click on the puzzle piece icon (🔧) and pin the extension to the toolbar.
- The extension will display the extracted information in the popup.

### 3. Explore the Extracted Design System

- **Logo**: The website's logo (if detected) will appear at the top.
- **Colors**:
  - Displays a list of colors used on the page, excluding grayscale colors.
  - Click on any color code to copy it to your clipboard.
- **Fonts**:
  - Shows all font families used on the page, displayed individually.
  - Click on a font name to copy it to your clipboard.
- **Button Styles**:
  - Displays previews of different button styles found on the page.
  - Click on the `Copy CSS` button next to any button to copy its CSS styles.

## Screenshots

*Note: Include screenshots of your extension in action to showcase its features.*

## Development

### File Structure

- `manifest.json`: Defines the extension's metadata and permissions.
- `content_script.js`: Contains the scripts that run on webpages to extract colors, fonts, and button styles.
- `popup.html`: The HTML structure for the extension's popup window.
- `popup.js`: Handles the logic and interaction within the popup.
- `styles.css`: Styles for the popup window.

### Scripts Overview

- `content_script.js`:
  - Runs in the context of web pages.
  - Extracts colors, fonts, and button styles.
  - Stores the extracted data using `chrome.storage.local`.
- `popup.js`:
  - Runs in the extension's popup window.
  - Retrieves data from `chrome.storage.local` and displays it.
  - Handles user interactions like copying to clipboard.

### Building from Source

If you've made changes to the extension files and need to rebuild:

1. **Reload the Extension**:
   - Go to `chrome://extensions/`.
   - Press the Reload (🔄) button on the Design System Extractor extension.
2. **Refresh the Webpage**:
   - Refresh the webpage you're testing on to ensure the updated `content_script.js` runs.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -am 'Add your feature'`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a pull request.