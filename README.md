# Power BI Advanced Theme Creator

A comprehensive and intuitive web-based tool for creating, customizing, and managing Power BI themes with real-time visual previews. Designed and created by **Adam Porter**.

## Overview

The Power BI Advanced Theme Creator is a professional-grade theme development application that empowers users to design custom Power BI report themes with precision and ease. Whether you're a Power BI developer creating corporate branding or experimenting with custom color schemes, this tool provides all the necessary controls for comprehensive theme customization.

## Features

### 🎨 Color Management
- **Data Colors**: Customize up to 8 primary data colors for chart visualization
- **Preset Palettes**: Choose from 6 pre-designed color palettes:
  - Default
  - Professional
  - Vibrant
  - Corporate
  - Nature
  - Sunset
- **Color Harmony Generator**: Automatically generate harmonious color schemes based on a seed color using various harmony rules (Complementary, Analogous, Triadic, etc.)

### 🌈 Background & Foreground Customization
- Page background color with transparency controls
- Visual background with adjustable transparency
- Primary and secondary text colors
- Hyperlink color configuration
- Status indicator colors (Good, Neutral, Bad)
- Table accent colors

### ✍️ Typography Control
- Font family selection (primary and secondary)
- Title, header, and callout font size and color customization
- Card category and callout typography control
- Slicer text styling options

### 🎭 Visual Styling
- Visual border configuration with custom colors and radius
- Drop shadow effects with position control
- Grid and table styling (colors, weights, padding)
- Alternate row colors for improved readability
- Table header customization

### 🎯 Advanced Theme Options
- Multiple theme types: Standard, Dark, High Contrast
- Glass mode effect toggle
- Gradient titles option
- Slicer customization (colors, fonts, hover effects)
- Card styling options
- Comprehensive visual component styling

### 📦 Import/Export Capabilities
- **Export JSON**: Download your theme as a standard Power BI theme JSON file
- **Import Theme**: Load existing themes from JSON files
- **Theme Library**: Save and manage multiple themes locally
- **Popular Themes**: Browse and load pre-configured popular themes

### 🔧 Workflow Tools
- **Undo/Redo**: Full-featured undo/redo stack (up to 50 levels)
- **Randomize**: Quickly generate random theme combinations for inspiration
- **Share**: Share theme configuration with others
- **Mobile Preview**: Toggle between desktop and mobile preview modes

### 👁️ Real-Time Preview
- Live visual preview of your theme as you make changes
- Multiple preview tabs:
  - Visual components showcase
  - JSON code preview
  - Sample report layouts
  - Charts and graphs
  - Tables
  - Typography samples
- Vision simulator for accessibility testing

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling Architecture**: CSS Custom Properties (CSS Variables), responsive design
- **Data Persistence**: Local Storage API for theme library management
- **Font Support**: Google Fonts (Inter, JetBrains Mono)
- **Icons**: Custom SVG icons for UI elements

## Usage

1. **Start with Presets**: Choose a preset color palette as your starting point or begin with the default theme
2. **Customize Colors**: Use the color pickers to adjust:
   - Data colors for charts
   - Background and text colors
   - Accent colors for interactive elements
3. **Fine-tune Typography**: Set font families and sizes for different text elements
4. **Style Components**: Configure visual elements like borders, shadows, and table styling
5. **Preview Changes**: Monitor your theme in real-time across different preview tabs
6. **Save/Export**: 
   - Save to your local theme library
   - Export as JSON for use in Power BI
   - Export and share with colleagues
7. **Iterate**: Use Undo/Redo to refine your design

## Getting Started

Simply open `index.html` in a modern web browser to launch the application. No installation or server required.

## File Structure

- `index.html` - Main application interface and layout
- `app.js` - Core application logic, state management, and event handlers
- `styles.css` - Complete styling system with dark theme design
- `README.md` - This documentation file

## Features in Detail

### Theme State Management
The application maintains a comprehensive theme state object containing:
- 8 data colors for chart visualization
- Background colors with transparency options
- Text and accent colors
- Typography configuration
- Visual styling properties
- Component-specific styling (tables, cards, slicers)

### Local Storage Integration
- Automatically saves your work to browser local storage
- Maintains a library of custom themes
- Preserves undo/redo history (up to 50 operations)
- Persistent across browser sessions

### Accessibility Features
- Vision simulator for color blindness testing
- Keyboard shortcuts (Ctrl+Z for undo, Ctrl+Y for redo)
- ARIA-compliant interface elements
- High contrast theme support

## Browser Compatibility

Works on all modern browsers supporting:
- ES6 JavaScript
- CSS Grid and Flexbox
- CSS Custom Properties
- Local Storage API
- SVG rendering

## Version

**Version 1.0** - Premium Redesign

## Creator

**Adam Porter**

---

*Power BI is a trademark of Microsoft Corporation. This tool is designed to help create custom themes for Power BI desktop and online applications.*
