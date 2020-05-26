import { IMetricStrategy } from './IMetricStrategy';

export class DanceabilityStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string {
    return 'Danceability Rating';
  }
  ConvertToValue(metric: number): string {
    metric = parseFloat((metric * 10).toFixed(1));
    return `${metric}/10`;
  }

}
