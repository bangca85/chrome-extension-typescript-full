# Chrome Extension TypeScript

Welcome full example of chrome extension

- Typescript
- React
- Visual Studio Code

In my example, there will be some features such as:

1. **Popup Search**: This feature allows users to search and display content using the https://dummyjson.com API.
2. **Page Options with Chrome Storage**: Users can configure page options, and these settings will be stored using Chrome Storage for easy access and retrieval.
3. **Background Service**: Upon installation of the plugin, a background service is initiated to perform specific tasks.
4. **Content Script**: This script enables users to select text and display it similar to how the Google Translate plugin works.

## Prerequisites

- [nodejs](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
- [npm](https://www.npmjs.com/)

## Includes the following

- Typescript
- Webpack
- React

## Project Structure

- `public` - This folder will contain all static files.
  - `index.html` - The HTML file for popup UI.
  - `options.html` - an options page for extension.
  - `icons/` - A directory for extension's icons and images.
  - `manifest.json` - Chrome extension manifest file (v3)
- `/src` - This folder will contain all source code.
  - `popup.tsx` - TypeScript file for popup's logic.
  - `content.tsx` - TypeScript file for content script.
  - `background.ts` - TypeScript file for background tasks.
  - `options.tsx` - TypeScript file for option page
  - `component/` - This folder will contain layout
- `package.json` - Defines project's npm dependencies and scripts.
- `tsconfig.json` - Configuration for the TypeScript compiler.
- `webpack.config.js` - Configuration for Webpack.

## Setup

```
npm install
```

- Build

```
npm run watch
```

## Load extension to chrome

1. Open chrome and enter

```
chrome://extensions
```

2. Choose `Load umpacked` and choose folder `dist`
