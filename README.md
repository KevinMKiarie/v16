# Nexuscale Frontendd

A professional React application for the Nexuscale autonomous sales autopilot platform.

## Project Structuree

This project follows React best practices with a well-organized folder structure:

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx
│   ├── ScrollReveal.jsx
│   ├── Typewriter.jsx
│   ├── PersonalizedSpan.jsx
│   ├── AuroraBackground.jsx
│   ├── SpotlightCard.jsx
│   ├── Navigation.jsx
│   ├── Footer.jsx
│   ├── CountdownBanner.jsx
│   ├── StickyActionBar.jsx
│   ├── SocialShareWidget.jsx
│   └── ExitIntentModal.jsx
├── pages/               # Page components
│   ├── LandingPage.jsx
│   ├── PricingPage.jsx
│   ├── FeaturePage.jsx
│   └── UseCasePage.jsx
├── hooks/               # Custom React hooks
│   ├── useCountUp.js
│   └── useMousePosition.js
├── data/                # Data constants and configurations
│   ├── features.js
│   ├── useCases.js
│   ├── menuItems.js
│   ├── reviews.js
│   └── pricing.js
├── utils/               # Utility functions and styles
│   └── styles.js
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
└── index.css            # Global styles with Tailwind
```

## Setup

### Prerequisites

- Node.js 18.18.0 (managed via asdf)
- npm

### Installation

1. Install Node.js version using asdf:
   ```bash
   asdf install nodejs 18.18.0
   asdf local nodejs 18.18.0
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Technologies

- **React 19.2.0** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## Features

- Modern, responsive design
- Smooth animations and transitions
- Interactive components
- SEO-friendly structure
- Performance optimized

## Development Notes

The application is currently in a hybrid state:
- Core structure, hooks, data, and utilities have been extracted into organized modules
- Page components and some complex components still reference `temp-code.jsx` for functionality
- This allows the app to run while gradually refactoring components

## Next Steps

1. Continue extracting components from `temp-code.jsx` into individual component files
2. Implement proper routing (consider React Router)
3. Add state management if needed
4. Optimize bundle size
5. Add unit tests

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
