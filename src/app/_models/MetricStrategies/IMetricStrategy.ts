export interface IMetricStrategy
{
  ConvertToValue(metric: number): string;
  GetDisplayTitle(): string;
}
