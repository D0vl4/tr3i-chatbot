# AI Helper Chatbot

A React-based chatbot interface implementation based on the Figma design.

## Features

- Clean, modern chat interface
- User and AI message bubbles
- Input field with send functionality
- Action buttons (copy, regenerate, feedback, voice control)
- Responsive design matching the Figma specifications

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This will start the development server, typically at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
ChatBOT/
├── src/
│   ├── components/
│   │   ├── Chatbot.tsx      # Main chatbot component
│   │   ├── InputField.tsx   # Message input component
│   │   └── Messages.tsx     # Message display component
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

## Design Specifications

- **Primary Color**: #2668C5
- **Text Color**: #243143
- **Background**: #FBFDFF
- **Font**: Inter
- **Chatbot Width**: 601px
- **Chatbot Height**: 1080px

## Components

### Chatbot
Main container component that manages the chat state and renders the header, messages, and input field.

### InputField
Handles user input with a send button. Supports light and dark color themes.

### Messages
Displays individual messages with support for user and AI messages, including action buttons for AI messages.

