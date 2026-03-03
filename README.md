# Breezy Sites Base

A Next.js template repository for creating customized sites for Breezy customers.

> 🎯 **This is a GitHub template repository** - Use the "Use this template" button to create new sites based on this foundation.

## Features

- ⚡ Next.js 15 with App Router
- 🎨 Tailwind CSS for styling
- 📘 TypeScript for type safety
- 🔧 ESLint for code quality
- 🚀 GitHub Actions CI/CD pipeline

## Getting Started

### Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3007](http://localhost:3007) to see your application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Development Tools

The development environment includes several integrated tools:

- **VS Code Server** (`/vscode`) - Full-featured VS Code editor in your browser
- **Interactive Shell** (`/breezy_shell`) - Terminal interface for running commands
- **Command API** (`/api/exec`) - REST API for executing shell commands

#### VS Code Server Features

The integrated VS Code Server provides:

- Full VS Code editor experience in your browser
- Syntax highlighting and IntelliSense for TypeScript/JavaScript
- Integrated terminal (Ctrl+` or Ctrl+Shift+`)
- File explorer and Git integration
- Extension marketplace access
- Real-time file synchronization with your local filesystem

Access VS Code Server at `http://localhost:[port]/vscode` when running the Docker container.

## Docker Development

### Local Development

For local development with Docker:

```bash
# Run the development environment (builds and starts container)
./scripts/dev-local.sh [port]

# Default port is 3007, or specify your own:
./scripts/dev-local.sh 3007
```

This script:
- Builds a consolidated Docker image with all dependencies
- Mounts your source code for live reloading
- Preserves node_modules and .next cache for performance
- Provides hot reloading for fast development
- Includes VS Code Server for in-browser development

### Production Deployment

Build and push to ECR:

```bash
# Build and push to ECR (requires AWS credentials)
./scripts/build-and-push.sh [region] [account-id] [tag]

# Example:
./scripts/build-and-push.sh us-east-1 123456789012 v1.0.0
```

## GitHub Actions

This template includes the following GitHub Actions workflows:

1. **Build and Push Application** (`.github/workflows/build-main-app.yml`)
   - Builds and pushes Docker image to ECR on main branch pushes
   - Runs tests on pull requests

2. **Lint** (`.github/workflows/lint.yml`)
   - Runs on all branches
   - Checks code quality with ESLint

3. **Type Check** (`.github/workflows/type-check.yml`)
   - Runs on all branches
   - Validates TypeScript types

## Using as a Template

### Quick Start

1. **Create from template**: Click the green "Use this template" button on GitHub
2. **Name your repository**: e.g., `customer-abc-site` or `breezy-site-xyz`
3. **Clone your new repository**: 
   ```bash
   git clone https://github.com/breezy-sites/your-new-site.git
   cd your-new-site
   ```
4. **Update project details**:
   - Change `name` in `package.json`
   - Update this README with site-specific information
5. **Install and run**:
   ```bash
   npm install
   npm run dev
   ```

### Via GitHub CLI

```bash
gh repo create breezy-sites/customer-abc-site --template breezy-sites/breezy_sites_base --private
```

## Project Structure

```
breezy_sites_base/
├── app/              # Next.js App Router pages and components
├── public/           # Static assets
├── .github/          # GitHub Actions workflows
├── next.config.ts    # Next.js configuration
├── package.json      # Project dependencies
├── tsconfig.json     # TypeScript configuration
└── tailwind.config.ts # Tailwind CSS configuration
```

## License

This is a private template for Breezy internal use.