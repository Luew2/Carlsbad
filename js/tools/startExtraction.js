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
        let elementTree = snapshot.elementTree; // Get the elementTree


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
        // This removes any CSS rules targeting :after or :before pseudo-elements
        cssString = cssString.replace(/#[^{]*:(after|before)\s*\{[^}]*\}\s*/gi, '');

        // **Remove comments following each closing brace `}` in CSS**
        // This handles both correctly formed comments (/* ... */) and malformed comments (*#...*/)
        // Replace "}/\* comment */" and "}*#comment*/" with "}"
        cssString = cssString.replace(/}\s*\/\*[^*]*\*\//g, '}');
        cssString = cssString.replace(/}\s*\*#[^*]*\*\//g, '}');

        // **Remove any remaining standalone comments (optional)**
        // If you want to ensure no comments remain, you can uncomment the following line:
        // cssString = cssString.replace(/\/\*[\s\S]*?\*\//g, '');

        // Return processed data
        return {
            html: html,
            css: cssString,
            elementTree: elementTree,
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