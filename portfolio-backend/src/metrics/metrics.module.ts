import { Module } from '@nestjs/common';
import {
  makeCounterProvider,
  makeHistogramProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';

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

@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  providers: [emailSentCounter, httpDurationHistogram, httpRequestCounter],
  exports: [emailSentCounter, httpDurationHistogram, httpRequestCounter],
})
export class MetricsModule {}
