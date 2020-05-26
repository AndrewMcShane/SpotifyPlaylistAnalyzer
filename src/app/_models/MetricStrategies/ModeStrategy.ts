import { IMetricStrategy } from './IMetricStrategy';

export class ModeStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string {
    return 'The Majority of Your Songs Are';
  }
  ConvertToValue(metric: number): string {
    return metric > 0.5 ? 'Major key' : 'Minor key';
  }

}
