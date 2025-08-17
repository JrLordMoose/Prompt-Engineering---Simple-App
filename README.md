# Simple Prompt Generator

A modern web application that helps users create better AI prompts through guided questions and expert templates. Built with React, TypeScript, and Context Engineering principles.

## 🖥️ Desktop Application

This app can be run as a desktop application using Electron!

### Quick Start (Windows)

1. **Double-click** `run-desktop-app.bat` to start the desktop app
2. Or right-click `run-desktop-app.ps1` and select "Run with PowerShell"

### Quick Start (All Platforms)

1. Open terminal/command prompt in the project directory
2. Run: `npm run electron:dev`
3. The desktop app will open automatically!

### What Happens

When you run the desktop app:
- ✅ Starts the development server
- ✅ Opens the Electron desktop window
- ✅ Automatically opens in your default browser
- ✅ Hot-reloads changes in real-time

### Available Commands

- `npm run electron:dev` - Start desktop app in development mode
- `npm run electron:build` - Build desktop app for distribution
- `npm run electron:dist` - Create distributable packages

### Building for Distribution

To create a standalone desktop application:

```bash
npm run electron:dist
```

This will create installable packages in the `release` folder:
- Windows: `.exe` installer
- macOS: `.dmg` file
- Linux: `.AppImage` file

## 🚀 Features

- **Guided Question Flow**: Step-by-step questions to gather context and requirements
- **Domain-Specific Templates**: Specialized prompts for different content types
- **Real-time Validation**: Input validation with helpful error messages
- **Progress Tracking**: Visual progress indicators throughout the process
- **Copy to Clipboard**: Easy prompt export functionality
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Context Engineering**: Built using advanced semantic field theory and context persistence

## 🎯 Supported Prompt Types

- **Social Media Posts**: LinkedIn, Twitter, Instagram, Facebook, TikTok, YouTube
- **Headlines & Titles**: Blog posts, email subjects, landing pages, videos
- **Professional Emails**: Business proposals, follow-ups, meeting requests, networking

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Testing**: Vitest + React Testing Library
- **Architecture**: Context Engineering methodology

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd simple-prompt-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

Run tests with UI:
```bash
npm run test:ui
```

## 🏗️ Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── forms/           # Form-specific components
│   ├── layout/          # Layout components
│   ├── domain/          # Domain-specific components
│   └── prompt/          # Prompt-related components
├── data/                # Static data and configurations
│   └── domains/         # Domain configurations
├── lib/                 # Core business logic
├── stores/              # Zustand state stores
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── styles/              # Global styles
└── test/                # Test setup and utilities
```

## 🎨 Context Engineering Architecture

This application is built using Context Engineering principles:

### Semantic Field Integration
- **Domain Modeling**: Each prompt type is modeled as a semantic field with specific questions and templates
- **Context Persistence**: User answers are maintained across navigation and sessions
- **Progressive Disclosure**: Questions are revealed progressively based on user context

### Component Architecture
- **Semantic Consistency**: Components maintain semantic relationships with domain concepts
- **Context Validation**: Built-in validation ensures semantic field integrity
- **Scalable Design**: Modular architecture supports easy domain expansion

### State Management
- **Context Preservation**: Zustand store maintains semantic context across user interactions
- **Field Relationships**: State structure reflects semantic field relationships
- **Persistence**: Local storage maintains context across browser sessions

## 🔧 Configuration

### Adding New Domains

1. Create a new domain configuration file in `src/data/domains/`
2. Define questions, templates, and examples
3. Add the domain to the registry in `src/lib/domainLoader.ts`

Example domain structure:
```json
{
  "id": "new-domain",
  "name": "New Domain",
  "description": "Description of the domain",
  "icon": "icon-name",
  "color": "blue",
  "questions": [...],
  "templates": [...],
  "examples": [...]
}
```

### Customizing Templates

Templates use variable substitution with `{variable}` syntax. Variables are mapped from user answers and processed through the prompt generator.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Deploy automatically on push to main branch

### Other Platforms
The application builds to static files that can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- AWS S3
- Cloudflare Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Context Engineering](https://contextengineering.com) methodology
- Inspired by the need for better AI prompt creation tools
- Thanks to the React and TypeScript communities

## 📞 Support

For questions, issues, or contributions:
- Open an issue on GitHub
- Contact the development team
- Check the documentation for common solutions

---

**Built with ❤️ using Context Engineering principles**
