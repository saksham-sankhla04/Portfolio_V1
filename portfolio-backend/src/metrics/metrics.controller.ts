import { Controller, Post, Body } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from 'prom-client';

interface FrontendMetricDto {
  type: 'pageview' | 'error' | 'webvital';
  page: string;
  value?: number;
  metric?: string;
  message?: string;
}

@Controller('metrics')
export class MetricsController {
  constructor(
    @InjectMetric('frontend_page_views_total')
    private pageViews: Counter<string>,
    @InjectMetric('frontend_errors_total')
    private errors: Counter<string>,
    @InjectMetric('frontend_web_vitals_seconds')
    private webVitals: Histogram<string>,
  ) {}

  @Post('frontend')
  trackFrontend(@Body() data: FrontendMetricDto) {
    const { type, page, value, metric } = data;

    if (type === 'pageview') {
      this.pageViews.inc({ page });
    } else if (type === 'error') {
      this.errors.inc({ type: 'error', page });
    } else if (type === 'webvital' && metric && value !== undefined) {
      this.webVitals.observe({ metric }, value);
    }

    return { success: true };
  }
}
