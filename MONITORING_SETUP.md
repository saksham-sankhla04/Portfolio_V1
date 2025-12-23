# Portfolio Backend - Monitoring & Email Setup Documentation

## Overview

This document covers the implementation of:
1. **Resend Email Service** - Modern email API for contact form notifications
2. **Prometheus Metrics** - Application monitoring and metrics collection
3. **Grafana Dashboard** - Visualization and monitoring dashboard

---

## 1. Resend Email Implementation

### What was done
Replaced nodemailer/Gmail SMTP with Resend API for sending contact form email notifications.

### Files Modified
- `portfolio-backend/src/mail/mail.service.ts`

### Environment Variables Required
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx        # Your Resend API key
RESEND_FROM_EMAIL=you@yourdomain.com   # Verified sender email in Resend
NOTIFICATION_EMAIL=your@email.com      # Where to receive notifications
```

### How it works
1. User submits contact form
2. Data is saved to MongoDB
3. Email notification is sent via Resend API
4. Metrics are incremented for tracking

---

## 2. Prometheus Metrics Implementation

### Dependencies Installed
```bash
npm install @willsoto/nestjs-prometheus prom-client
```

### Files Created
- `portfolio-backend/src/metrics/metrics.module.ts` - Prometheus module configuration

### Files Modified
- `portfolio-backend/src/mail/mail.module.ts` - Added MetricsModule import
- `portfolio-backend/src/mail/mail.service.ts` - Added metric tracking
- `portfolio-backend/src/app.module.ts` - Registered MetricsModule

### Metrics Module Structure
```typescript
// metrics.module.ts
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
  labelNames: ['method', 'route'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
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
```

### Using Metrics in Services
```typescript
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@Injectable()
export class MailService {
  constructor(
    @InjectMetric('emails_sent_total')
    private emailCounter: Counter<string>,
  ) {}

  async sendMail() {
    try {
      // ... send email
      this.emailCounter.inc({ status: 'success' });
    } catch (error) {
      this.emailCounter.inc({ status: 'failure' });
    }
  }
}
```

### Metrics Endpoint
Access raw metrics at: `http://localhost:3000/metrics`

### Available Metrics
| Metric | Type | Description |
|--------|------|-------------|
| `emails_sent_total` | Counter | Total emails sent (success/failure) |
| `http_requests_total` | Counter | Total HTTP requests by method, route, status |
| `http_request_duration_seconds` | Histogram | Request duration distribution |
| `process_resident_memory_bytes` | Gauge | Memory usage (default) |
| `process_cpu_seconds_total` | Counter | CPU usage (default) |
| `nodejs_heap_size_total_bytes` | Gauge | Node.js heap size (default) |

---

## 3. Docker Monitoring Stack

### Files Created

#### `docker-compose.yml` (project root)
```yaml
version: "3.8"
services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
    extra_hosts:
      - "host.docker.internal:host-gateway"

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    depends_on:
      - prometheus
```

#### `monitoring/prometheus/prometheus.yml`
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'portfolio-backend'
    static_configs:
      - targets: ['YOUR_IP_ADDRESS:3000']
```

**Note:** Replace `YOUR_IP_ADDRESS` with your machine's IPv4 address (find with `ipconfig`).

---

## 4. Running the Stack

### Start Everything

1. **Start NestJS Backend**
```bash
cd portfolio-backend
npm run start:dev
```

2. **Start Docker Monitoring Stack**
```bash
cd portfolio-2
docker-compose up -d
```

3. **Verify containers are running**
```bash
docker-compose ps
```

### Access URLs
| Service | URL | Credentials |
|---------|-----|-------------|
| NestJS API | http://localhost:3000 | - |
| Metrics Endpoint | http://localhost:3000/metrics | - |
| Prometheus | http://localhost:9090 | - |
| Grafana | http://localhost:3001 | admin / admin |

---

## 5. Grafana Setup

### Add Prometheus Data Source
1. Open http://localhost:3001
2. Login: `admin` / `admin`
3. Go to **Connections → Data Sources → Add data source**
4. Select **Prometheus**
5. URL: `http://prometheus:9090` (use container name, NOT localhost)
6. Click **Save & Test**

### Create Dashboard
1. Click **+ → Dashboard → Add visualization**
2. Select **Prometheus** data source
3. Enter PromQL queries (see below)
4. Click **Apply** and **Save dashboard**

### Useful PromQL Queries
```promql
# Total requests
http_requests_total

# Request rate (requests per second)
rate(http_requests_total[1m])

# Emails sent
emails_sent_total

# Memory usage
process_resident_memory_bytes

# CPU usage rate
rate(process_cpu_seconds_total[1m])

# P95 response time (if using histogram)
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
```

---

## 6. Troubleshooting

### Prometheus target shows DOWN
1. Check if NestJS is running: `http://localhost:3000/metrics`
2. Use your machine's IP instead of `host.docker.internal`
3. Find IP with `ipconfig` command
4. Update `prometheus.yml` with correct IP:port

### Grafana can't connect to Prometheus
- Use `http://prometheus:9090` (container name)
- NOT `http://localhost:9090`

### Metrics not showing in Grafana
1. Verify Prometheus target is UP at http://localhost:9090/targets
2. Generate traffic by making requests to your API
3. Wait 15 seconds for Prometheus to scrape

### Docker commands
```bash
# View logs
docker-compose logs -f prometheus
docker-compose logs -f grafana

# Restart services
docker-compose restart prometheus

# Stop everything
docker-compose down

# Fresh start (removes volumes)
docker-compose down -v
docker-compose up -d
```

---

## 7. Project Structure

```
portfolio-2/
├── docker-compose.yml
├── monitoring/
│   └── prometheus/
│       └── prometheus.yml
├── portfolio-backend/
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   ├── mail/
│   │   │   ├── mail.module.ts
│   │   │   ├── mail.service.ts
│   │   │   └── ...
│   │   └── metrics/
│   │       └── metrics.module.ts
│   └── package.json
└── MONITORING_SETUP.md (this file)
```

---

## 8. Key Learnings

### NestJS Dependency Injection with Prometheus
- Use `makeCounterProvider()` to create metric providers
- Store providers in constants to export them properly
- Import `MetricsModule` in any module that needs metrics
- Use `@InjectMetric('metric_name')` to inject metrics into services

### Docker Networking
- Containers communicate via service names (e.g., `prometheus`, `grafana`)
- Use `host.docker.internal` or actual IP to reach host machine from containers
- `localhost` inside a container refers to the container itself

### YAML Formatting
- YAML is strict about indentation
- Use consistent 2-space indentation
- Root-level keys should have no indentation

---

*Documentation created: December 23, 2025*
