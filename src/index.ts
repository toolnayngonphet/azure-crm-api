import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import * as appInsights from 'applicationinsights';
import { CustomerController } from './controllers/customerController';
import { swaggerDocument } from './swagger';

// Load environment variables
dotenv.config();

// 1. Initialize Azure Application Insights (if connection string is set)
const appInsightsConnectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;
if (appInsightsConnectionString) {
  try {
    appInsights.setup(appInsightsConnectionString)
      .setAutoCollectRequests(true)
      .setAutoCollectPerformance(true, true)
      .setAutoCollectExceptions(true)
      .setAutoCollectDependencies(true)
      .setAutoCollectConsole(true)
      .setUseDiskRetryCaching(true)
      .setSendLiveMetrics(true)
      .start();
    console.log('✅ Azure Application Insights initialized successfully.');
  } catch (err) {
    console.warn('⚠️ Could not initialize Application Insights:', err);
  }
} else {
  console.log('ℹ️ Application Insights connection string not found. Telemetry disabled for local dev.');
}

const app = express();
const port = process.env.PORT || 8080;

// 2. Middlewares
app.use(cors());
app.use(express.json());

// Request logging for monitoring & telemetry
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// 3. Swagger UI & Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root route redirects to Swagger UI or gives welcome info
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Azure CRM Customer Management API',
    status: 'Running',
    docs: '/api-docs',
    endpoints: {
      health: '/api/health',
      customers: '/api/customers',
    },
    deployedOn: 'Azure App Service',
    timestamp: new Date().toISOString(),
  });
});

// 4. Health check endpoint (for Azure App Service Health Probe / Autoscale monitor)
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'UP',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
  });
});

// 5. CRM Customer CRUD Routes
app.get('/api/customers', CustomerController.getAll);
app.get('/api/customers/:id', CustomerController.getById);
app.post('/api/customers', CustomerController.create);
app.put('/api/customers/:id', CustomerController.update);
app.delete('/api/customers/:id', CustomerController.delete);

// 6. Start server
app.listen(port, () => {
  console.log(`===================================================`);
  console.log(`🚀 Azure CRM API Server running on port ${port}`);
  console.log(`📖 API Documentation (Swagger): http://localhost:${port}/api-docs`);
  console.log(`💓 Health check: http://localhost:${port}/api/health`);
  console.log(`👥 Customer API: http://localhost:${port}/api/customers`);
  console.log(`===================================================`);
});

export default app;
