import { IMetricStrategy } from './IMetricStrategy';

export class LivenessStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string {
    return 'Percent of Tracks Performed Live';
  }
  ConvertToValue(metric: number): string {
    metric = parseFloat((metric * 100).toFixed(0));
    return `${metric}%`;
  }

}
