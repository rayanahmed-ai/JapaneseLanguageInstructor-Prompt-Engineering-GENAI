@echo off
echo 🚀 Setting up Japanese Typing Tutor...

:: Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

:: Display Node.js version
for /f "delims=" %%" %%i in ('node --version') do echo %%i

:: Check if npm is installed
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm from https://www.npmjs.com/
    pause
    exit /b 1
)

:: Display npm version
for /f "delims=" %%" %%i in ('npm --version') do echo %%i

:: Create .env.example if it doesn't exist
if not exist .env.example (
    echo # API Configuration > .env.example
    echo NEXT_PUBLIC_API_URL=http://localhost:3000/api >> .env.example
    echo NEXT_PUBLIC_APP_NAME=Japanese Typing Tutor >> .env.example
    echo. >> .env.example
    echo # NextAuth Configuration >> .env.example
    echo NEXTAUTH_URL=http://localhost:3001 >> .env.example
    echo NEXTAUTH_SECRET=your-secret-key-here-change-in-production >> .env.example
    echo. >> .env.example
    echo # Development >> .env.example
    echo NODE_ENV=development >> .env.example
    echo ✅ Created .env.example file
)

:: Create .gitignore if it doesn't exist
if not exist .gitignore (
    echo # Dependencies > .gitignore
    echo node_modules/ >> .gitignore
    echo npm-debug.log* >> .gitignore
    echo yarn-debug.log* >> .gitignore
    echo yarn-error.log* >> .gitignore
    echo. >> .gitignore
    echo # Environment variables >> .gitignore
    echo .env.local >> .gitignore
    echo .env >> .gitignore
    echo. >> .gitignore
    echo # Build outputs >> .gitignore
    echo .next/ >> .gitignore
    echo out/ >> .gitignore
    echo dist/ >> .gitignore
    echo. >> .gitignore
    echo # IDE >> .gitignore
    echo .vscode/ >> .gitignore
    echo .idea/ >> .gitignore
    echo *.swp >> .gitignore
    echo *.swo >> .gitignore
    echo. >> .gitignore
    echo # OS >> .gitignore
    echo .DS_Store >> .gitignore
    echo Thumbs.db >> .gitignore
    echo. >> .gitignore
    echo # Logs >> .gitignore
    echo *.log >> .gitignore
    echo. >> .gitignore
    echo # Runtime >> .gitignore
    echo .pnp >> .gitignore
    echo .pnp.js >> .gitignore
    echo. >> .gitignore
    echo # Coverage >> .gitignore
    echo coverage/ >> .gitignore
    echo .nyc_output >> .gitignore
    echo. >> .gitignore
    echo # Temporary >> .gitignore
    echo *.tmp >> .gitignore
    echo .temp/ >> .gitignore
    echo ✅ Created .gitignore file
)

echo.
echo 🎯 Setup complete! Next steps:
echo.
echo 1. Install dependencies:
echo    npm install
echo.
echo 2. Set up environment:
echo    copy .env.example .env.local
echo    # Edit .env.local with your configuration
echo.
echo 3. Start development:
echo    npm run dev
echo.
echo 4. Open browser:
echo    http://localhost:3001
echo.
echo 📚 For detailed setup instructions, see README.md
echo.
pause
