## Introduction

This React application, bootstrapped with Create React App, provides a user interface for generating resumes from LinkedIn profiles by consuming our API. The app leverages Axios to communicate with a .NET 6 backend and uses React Bootstrap for styling and responsive layout. Users can enter their LinkedIn profile URL on the Home page, edit the scraped data on the Profile Form page, and download a PDF resume via FileSaver.js.

## Table of Contents

- Prerequisites
- Installation
- Configuration
- Available Scripts
- Usage
- Built With

## Prerequisites

Before getting started, ensure you have the following installed on your machine:

- Node.js v18 or higher and npm, required to run React applications locally.
- Git for version control (optional but recommended).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/linkedin-resume-client.git
   cd linkedin-resume-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the project root with the following content and restart the development server after any changes:

```dotenv
REACT_APP_API_BASE_URL=https://localhost:7110
```

All custom environment variables must be prefixed with `REACT_APP_` for Create React App to load them.

## Available Scripts

- `npm start`: Runs the app in development mode and opens the application in the browser.
- `npm run build`: Bundles the app into static files for production in the `build` folder.
- `npm test`: Launches the test runner in interactive watch mode.
- `npm run eject`: Removes the single build dependency from the project (use with caution).

## Usage

1. Start the development server:
   ```bash
   npm start
   ```
2. On the Home page, enter your LinkedIn profile URL and click Search.
3. On the Profile Form page, edit any fields as needed and click Submit Profile to download your PDF resume.

## Built With

- React: A JavaScript library for building user interfaces.
- React Router v6: Declarative routing for React apps.
- Axios: Promise-based HTTP client for browser and Node.js.
- Bootstrap: CSS framework for responsive design.
- React Bootstrap: React components built on Bootstrap.
- FileSaver.js: Client-side file saving library.
