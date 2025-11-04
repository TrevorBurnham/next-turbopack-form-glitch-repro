# Turbopack Input Hydration Glitch

This repository reproduces a hydration bug where form fields are replaced during hydration in production SSR builds, causing user input to be lost.

The hydration bug only occurs in production builds, and only when Turbopack is enabled.

## How to Reproduce

1. **Build the production version:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

3. **Test the glitch:**
   - In your browser's network dev tools, check "Disable cache" and set throttling to "Slow 4G"
   - Navigate to http://localhost:3000 (Pages Router version) or http://localhost:3000/app-router-test (App Router version)
   - **Immediately** start typing in the autofocused input field as soon as the page loads (before JavaScript executes)
   - Notice that your input gets cleared when hydration completes (should take a few seconds)

## Why This Happens

The reproduction creates a hydration mismatch by:
- Server renders the form field with certain props
- Client initially renders with different props (due to `useState` or conditional logic)
- React detects the mismatch and replaces the DOM element
- Any user input in the original element is lost