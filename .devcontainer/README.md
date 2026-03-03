# Browser-Based VS Code Development

This Next.js application includes a **full VS Code editor** accessible directly in your browser - no local installation required!

## Quick Start

1. **Run the Docker container**:
   ```bash
   docker run -p 3000:3000 -p 8080:8080 your-app-image
   ```

2. **Access VS Code in your browser**:
   - **Direct access**: `http://localhost:8080`
   - **Through Next.js app**: `http://localhost:3000/code`

## What You Get

### Full VS Code Experience
- **Complete IDE** - File explorer, editor, terminal, git integration
- **Extensions Pre-installed**:
  - Tailwind CSS IntelliSense
  - ESLint & Prettier
  - TypeScript support
  - Auto Rename Tag
  - Path Intellisense
  - Material Icon Theme
- **No Installation Required** - Works in any modern browser
- **Multi-user Support** - Multiple developers can access simultaneously

### Development Features
- **Hot Reload** - Next.js changes reflect immediately
- **Integrated Terminal** - Full bash terminal inside VS Code
- **Git Integration** - Commit, push, pull directly from the browser
- **File Management** - Full file system access within the container

## Interactive Development Features

### Browser-Based VS Code
Access a full VS Code editor in your browser at:
- **Direct access**: `http://localhost:8080` (when running the container)
- **Through Next.js**: `http://localhost:3000/code` (proxied through the app)

This gives you:
- Full VS Code interface in the browser
- All extensions pre-installed (ESLint, Prettier, Tailwind, etc.)
- File explorer, terminal, git integration
- No need to install VS Code locally

### Interactive Shell
The container also includes an interactive shell accessible at `/breezy_shell` that allows you to run commands directly in the container environment.

## Customization

You can customize the development environment by modifying:
- `.devcontainer/devcontainer.json` - Container configuration
- `.vscode/settings.json` - VS Code workspace settings
- `.vscode/extensions.json` - Recommended extensions

## Troubleshooting

### Container won't start
- Make sure Docker Desktop is running
- Try rebuilding: `Remote-Containers: Rebuild Container`

### Port 3000 already in use
- Stop other applications using port 3000
- Or modify the port in `devcontainer.json`

### Extensions not installing
- Check your internet connection
- Try rebuilding the container
- Manually install extensions if needed
