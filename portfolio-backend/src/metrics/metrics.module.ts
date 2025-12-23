import { Module } from '@nestjs/common';
import {
  makeCounterProvider,
  makeHistogramProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';
import { MetricsController } from './metrics.controller';

const emailSentCounter = makeCounterProvider({
  name: 'emails_sent_total',
  help: 'Total Emails Sent Successfully',
  labelNames: ['status'],
});

const httpRequestCounter = makeCounterProvider({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

const httpDurationHistogram = makeHistogramProvider({
  name: 'http_request_duration_seconds',
  help: 'Request duration in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5], // Bucket Boundaries
});

// Frontend metrics
const pageViewCounter = makeCounterProvider({
  name: 'frontend_page_views_total',
  help: 'Total page views',
  labelNames: ['page'],
});

const frontendErrorCounter = makeCounterProvider({
  name: 'frontend_errors_total',
  help: 'Total frontend errors',
  labelNames: ['type', 'page'],
});

const webVitalsHistogram = makeHistogramProvider({
  name: 'frontend_web_vitals_seconds',
  help: 'Web Vitals metrics',
  labelNames: ['metric'],
  buckets: [0.1, 0.25, 0.5, 1, 2.5, 4, 5, 10],
});

@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  controllers: [MetricsController],
  providers: [
    emailSentCounter,
    httpDurationHistogram,
    httpRequestCounter,
    pageViewCounter,
    frontendErrorCounter,
    webVitalsHistogram,
  ],
  exports: [
    emailSentCounter,
    httpDurationHistogram,
    httpRequestCounter,
    pageViewCounter,
    frontendErrorCounter,
    webVitalsHistogram,
  ],
})
export class MetricsModule {}
