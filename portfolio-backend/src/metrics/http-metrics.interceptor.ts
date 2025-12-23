import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from 'prom-client';

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
  constructor(
    @InjectMetric('http_requests_total')
    private requestCounter: Counter<string>,
    @InjectMetric('http_request_duration_seconds')
    private requestDuration: Histogram<string>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        // On success
        next: () => {
          const duration = (Date.now() - startTime) / 1000;
          const labels = {
            method: req.method,
            route: req.route?.path || req.url,
            status: res.statusCode.toString(),
          };

          this.requestCounter.inc(labels); // Increment counter
          this.requestDuration.observe(labels, duration); // Record duration
        },
        // On error
        error: (err) => {
          // const duration = (Date.now() - startTime) / 1000;
          this.requestCounter.inc({
            method: req.method,
            route: req.route?.path || req.url,
            status: (err.status || 500).toString(),
          });
        },
      }),
    );
  }
}
