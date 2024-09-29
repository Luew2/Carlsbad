// js/tools/startExtraction.js
(function () {
    // Instantiate dependencies
    var cssStringifier = new CSSStringifier(),
        shorthandPropertyFilter = new ShorthandPropertyFilter(),
        webkitPropertiesFilter = new WebkitPropertiesFilter(),
        defaultValueFilter = new DefaultValueFilter(),
        sameRulesCombiner = new SameRulesCombiner();
  
    // Function to process the snapshot
    function processSnapshot(snapshot) {
        let styles = snapshot.css;
        let html = snapshot.html;

        // Include ancestor styles if needed
        if (snapshot.ancestorCss && snapshot.ancestorCss.length) {
            styles = snapshot.ancestorCss.concat(styles);
        }

        // Include leading and trailing ancestor HTML if present
        if (snapshot.leadingAncestorHtml || snapshot.trailingAncestorHtml) {
            html = (snapshot.leadingAncestorHtml || '') + html + (snapshot.trailingAncestorHtml || '');
        }

        // Apply filters
        styles = defaultValueFilter.process(styles);
        styles = shorthandPropertyFilter.process(styles);
        styles = webkitPropertiesFilter.process(styles);
        styles = sameRulesCombiner.process(styles);

        // Convert styles to CSS string
        let cssString = cssStringifier.process(styles);

        // **Remove `:snappysnippet_prefix:` from HTML and CSS**
        // Replace in HTML
        html = html.replace(/:snappysnippet_prefix:/g, '');

        // Replace in CSS
        cssString = cssString.replace(/:snappysnippet_prefix:/g, '');

        // **Remove styles for `:after` and `:before` pseudo-elements using regex**
        cssString = cssString.replace(/#[^{]*:(after|before)\s*\{[^}]*\}\s*/g, '');

        // **Remove comments following each closing brace `}` in CSS**
        // This regex targets any `}` followed by optional whitespace and a comment `/* ... */`
        cssString = cssString.replace(/}\s*\/\*[^*]*\*\//g, '}');

        // Return processed data
        return {
            html: html,
            css: cssString,
        };
    }

    // Function to start the extraction
    function startSnappySnippetExtraction() {
      const elementPath = window.selectedElementPath;
  
      if (!elementPath) {
        console.error('SnappySnippet: No element selected.');
        return;
      }
  
      const root = document.querySelector(elementPath);
  
      if (!root) {
        console.error('SnappySnippet: Selected element not found.');
        return;
      }
  
      // Extract the snapshot
    const snapshotJSON = Snapshooter(root);
    const snapshot = JSON.parse(snapshotJSON); // Parse the JSON string

    console.log('Parsed snapshot:', snapshot);

      // Process the snapshot
      const processedData = processSnapshot(snapshot);
  
      // Send the data back to the content script
      window.postMessage(
        {
          source: 'snappySnippet',
          data: processedData,
        },
        '*'
      );
    }
  
    // Listen for the SET_SELECTED_ELEMENT message
    window.addEventListener('message', function (event) {
      if (event.source !== window) return;
  
      if (event.data && event.data.type === 'SET_SELECTED_ELEMENT') {
        window.selectedElementPath = event.data.selector;
        startSnappySnippetExtraction();
      }
    });
  })();