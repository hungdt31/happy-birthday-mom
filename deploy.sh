#!/bin/bash

# Deploy script for Birthday Website
# Đinh Thị Minh Hoa Birthday Website Deployment

echo "🎉 Deploying Birthday Website for Đinh Thị Minh Hoa 🎉"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if node is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
print_status "Installing dependencies..."
npm install

# Test the website locally
print_status "Testing website locally..."
echo "Starting development server..."
echo "Access the website at: http://localhost:8080"
echo "Press Ctrl+C to stop the server and continue with deployment"

# Ask user which deployment method they want
echo ""
echo "Choose deployment method:"
echo "1) Deploy to Netlify (Recommended)"
echo "2) Deploy to Vercel"
echo "3) Deploy to GitHub Pages"
echo "4) Run local server only"
echo "5) Exit"

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        print_status "Preparing for Netlify deployment..."
        echo "🌐 Netlify Deployment Instructions:"
        echo "1. Go to https://app.netlify.com/drop"
        echo "2. Drag and drop the current folder"
        echo "3. Or use Netlify CLI: npm install -g netlify-cli && netlify deploy"
        echo ""
        echo "📁 Files ready for deployment:"
        echo "- index.html"
        echo "- styles.css"
        echo "- script.js"
        echo "- netlify.toml"
        ;;
    2)
        print_status "Preparing for Vercel deployment..."
        echo "⚡ Vercel Deployment Instructions:"
        echo "1. Go to https://vercel.com/new"
        echo "2. Drag and drop the current folder"
        echo "3. Or use Vercel CLI: npm install -g vercel && vercel"
        ;;
    3)
        print_status "Preparing for GitHub Pages deployment..."
        echo "🐙 GitHub Pages Deployment Instructions:"
        echo "1. Create a new repository on GitHub"
        echo "2. Push this code to the repository"
        echo "3. Go to repository Settings > Pages"
        echo "4. Select 'Deploy from a branch' and choose 'main'"
        ;;
    4)
        print_status "Starting local development server..."
        npm run dev
        ;;
    5)
        print_status "Deployment cancelled."
        exit 0
        ;;
    *)
        print_error "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

print_status "Deployment preparation complete!"
print_status "Happy Birthday to Đinh Thị Minh Hoa! 🎂"