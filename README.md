# 📊 Insight Spreadsheet

> A pixel-perfect React-based spreadsheet application that brings the familiar Google Sheets experience to the web with modern React architecture.

![React](https://img.shields.io/badge/React-18.0-blue?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 🎯 Project Overview

This project is a React-based spreadsheet application built as part of an intern assignment. It replicates the core functionality and visual design of Google Sheets, providing users with an intuitive and familiar spreadsheet experience right in their browser.

### ✨ What Makes This Special?

- **Pixel-Perfect Design** - Meticulously crafted to match the provided Figma design specifications
- **Google Sheets Experience** - Familiar interface that users already know and love
- **Modern React Architecture** - Built with React 18, TypeScript, and modern best practices
- **Responsive & Interactive** - Fully functional UI with real-time state management
- **Developer-Friendly** - Clean code structure with comprehensive linting and type checking

## 🚀 Key Features

### 📋 Core Spreadsheet Functionality
- **Interactive Grid System** - Seamless cell navigation and selection
- **Real-time Cell Editing** - Click to edit cells with immediate visual feedback
- **Dynamic Row/Column Management** - Add, remove, and manipulate spreadsheet structure
- **Formula Support** - Basic formula calculation capabilities
- **Data Persistence** - Maintains data state during session

### 🎨 UI/UX Features
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Intuitive Navigation** - Familiar spreadsheet controls and shortcuts
- **Clean Interface** - Minimalist design focusing on usability
- **Interactive Elements** - All buttons and tabs are functional (no dead UI)
- **Visual Feedback** - Hover states, selections, and active indicators

### ⚡ Advanced Features (Stretch Goals Implemented)
- **Keyboard Navigation** - Arrow key navigation within the grid
- **Column Resize** - Drag to resize column widths
- **Column Hide/Show** - Toggle column visibility
- **Multi-cell Selection** - Select ranges of cells like in Excel

## 🛠️ Technology Stack

| Technology | Purpose | Why We Chose It |
|------------|---------|-----------------|
| **React 18** | Frontend Framework | Latest React features with concurrent rendering |
| **TypeScript** | Type Safety | Strict mode for robust, maintainable code |
| **Tailwind CSS** | Styling | Utility-first CSS for rapid, consistent styling |
| **Vite** | Build Tool | Lightning-fast development and optimized builds |
| **React Table** | Grid Component | Powerful table library for complex data handling |
| **ESLint + Prettier** | Code Quality | Consistent code formatting and error prevention |

## 🏗️ Project Structure

```
insight-spreadsheet/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Spreadsheet/     # Main spreadsheet component
│   │   ├── Cell/            # Individual cell component
│   │   ├── Toolbar/         # Spreadsheet toolbar
│   │   └── common/          # Shared components
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Helper functions
│   └── styles/              # Global styles and Tailwind config
├── public/                  # Static assets
├── docs/                    # Project documentation
│   └── assignment.pdf       # Original assignment requirements
└── README.md               # You're reading this!
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- Modern web browser

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aryanwadhwa14/Insight-Spreadsheet.git
   cd Insight-Spreadsheet
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` and start exploring!

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier

# Testing
npm run test         # Run test suite
npm run test:watch   # Run tests in watch mode
```

## 🎯 Assignment Requirements Met

### ✅ Core Criteria
- [x] **Pixel-perfect Figma implementation** - Matches design specifications exactly
- [x] **Google Sheets experience** - Familiar interface and interactions
- [x] **React 18 + TypeScript** - Modern React with strict TypeScript
- [x] **Tailwind CSS styling** - Utility-first styling approach
- [x] **Interactive components** - No dead UI elements, all functional
- [x] **Clean code standards** - Passes ESLint and Prettier checks

### 🎁 Bonus Features Implemented
- [x] **Keyboard navigation** - Arrow key navigation within grid
- [x] **Column resizing** - Drag to resize columns
- [x] **Column hide/show** - Toggle column visibility
- [x] **Enhanced UX** - Additional polish and user experience improvements

## 🔧 Technical Decisions & Trade-offs

### Why These Technologies?

**React 18**: Chose for its concurrent features and excellent TypeScript support. The component architecture makes the spreadsheet highly maintainable.

**TypeScript Strict Mode**: Ensures type safety throughout the application, reducing runtime errors and improving developer experience.

**Tailwind CSS**: Rapid prototyping and consistent design system. Perfect for matching pixel-perfect designs quickly.

**Custom Table Component**: While react-table was suggested, I built a custom solution for better control over spreadsheet-specific behaviors.

### Performance Optimizations
- **Virtual scrolling** for large datasets
- **Memoized components** to prevent unnecessary re-renders
- **Optimized state updates** for smooth user interactions
- **Lazy loading** for better initial load times

## 🎨 Design Philosophy

The design follows Google Sheets' principles of simplicity and functionality:
- **Familiar patterns** that users already understand
- **Clean, uncluttered interface** focusing on content
- **Consistent visual hierarchy** with proper spacing and typography
- **Accessible design** with proper contrast and keyboard navigation

## 🧪 Testing & Quality Assurance

- **TypeScript strict mode** catches errors at compile time
- **ESLint configuration** enforces consistent code style
- **Prettier integration** ensures uniform code formatting
- **Component testing** for critical spreadsheet functionality
- **Cross-browser compatibility** tested on major browsers

## 📈 Future Enhancements

While this project meets all requirements, here are some ideas for future development:

- **Cloud sync** - Save spreadsheets to cloud storage
- **Collaboration** - Real-time multi-user editing
- **Advanced formulas** - More Excel/Sheets formula support
- **Data visualization** - Charts and graphs
- **Import/Export** - Excel and CSV file support
- **Templates** - Pre-built spreadsheet templates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

While this is an assignment project, feedback and suggestions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

**Aryan Wadhwa**
- GitHub: [@Aryanwadhwa14](https://github.com/Aryanwadhwa14)
- Email: aryanwadhwa911@gmail.com
- LinkedIn: [Linkedin](https://www.linkedin.com/in/aryan-wadhwa-073727252/)

---

## 📋 Assignment Details

This project was built as part of an internship assignment. 

### Assignment Goal
Create a static, front-end-only React prototype that visually matches the provided Figma design of a spreadsheet interface, focusing on pixel-perfect implementation and Google Sheets-like functionality.

---

*Built by Aryan Wadhwa !* 
