# NPM Popular Version

A modern, interactive web application to visualize and analyze the popularity of different versions of npm packages. Built with React, TypeScript, Vite, and Shadcn UI.

## Features

- **📦 Package Search**: Instantly search for any package available on the npm registry.
- **📊 Version Popularity**: View detailed download statistics for each version of a package.
- **📈 Visual Analytics**: Interactive Pie Chart visualization showing the distribution of downloads across versions.
- **🔍 Semver Filtering**: Filter versions using standard semantic versioning ranges (e.g., `^1.0.0`, `>=2.0.0`, `1.x`).
- **🔗 Deep Linking**: Shareable URLs that preserve your search query and filter state.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd npm-popular-version
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Build

Build the application for production:

```bash
npm run build
```

## Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Utilities**: [Semver](https://github.com/npm/node-semver), [Lodash](https://lodash.com/)
