import { IMetricStrategy } from './IMetricStrategy';

export class InstrumentalnessStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string {
    return 'Percent of Tracks that are Instrumental';
  }
  ConvertToValue(metric: number): string {
    metric = parseFloat((metric * 100).toFixed(0));
    return `${metric}%`;
  }

}
