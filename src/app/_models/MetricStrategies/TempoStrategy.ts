import { IMetricStrategy } from './IMetricStrategy';

export class TempoStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string {
    return 'Average Song Tempo';
  }
  ConvertToValue(metric: number): string {
    return `${metric.toFixed(0)} bpm`;
  }

}
