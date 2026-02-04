# StaticWebAppPEApiRedirectTest

This repository contains a React application and an ASP.NET 9 API for testing Azure Static Web App API redirection with Private Endpoints.

## Project Structure

- `/react-app` - React application built with Vite
- `/api` - ASP.NET 9 Web API

## Purpose

This setup is designed to debug and test Azure Static Web App scenarios where:
- The React frontend is deployed to Azure Static Web Apps
- The ASP.NET API is deployed to Azure App Service with Private Endpoints
- API calls use relative paths (`/api/*`) for Azure Static Web App API redirection

## Local Development

### Prerequisites

- Node.js 20+ and npm
- .NET 9 SDK

### Running the API

```bash
cd api
dotnet run
```

The API will run on:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`

### Running the React App

```bash
cd react-app
npm install
npm run dev
```

The React app will run on `http://localhost:3000` with API proxy configured.

## API Endpoints

- `GET /api/test` - Simple test endpoint that returns a message and timestamp
- `GET /api/weatherforecast` - Returns sample weather forecast data

## Testing Locally

1. Start the API in one terminal: `cd api && dotnet run`
2. Start the React app in another terminal: `cd react-app && npm run dev`
3. Open `http://localhost:3000` in your browser
4. Click the buttons to test API connectivity

The React app uses relative `/api` paths which are proxied to the API during local development (via Vite proxy configuration). This mimics the Azure Static Web App behavior where `/api` requests are redirected to the configured backend API.

## Azure Deployment Notes

### Static Web App (React)
- Deploy the `/react-app` directory
- Build command: `npm run build`
- Output directory: `dist`

### App Service (API)
- Deploy the `/api` directory
- Configure Private Endpoint for secure access
- In Static Web App, configure API backend to point to the App Service with PE
