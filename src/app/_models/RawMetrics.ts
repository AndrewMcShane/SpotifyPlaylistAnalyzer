export class RawMetrics
{
    acousticness: number;
    danceability: number;
    duration_ms: number;
    energy: number;
    id: string;
    instrumentalness: number;
    key: number;
    liveness: number;
    loudness: number;
    mode: number;
    speechiness: number;
    tempo: number;
    time_signature: number;
    valence: number;

    getMetric(metric: string): number {
      let toReturn: number = Number.NEGATIVE_INFINITY;

      switch (metric) {
        case 'acousticness':
          {
            toReturn = this.acousticness;
            break;
          }
        case 'danceability':
          {
            toReturn = this.danceability;
            break;
          }
        case 'duration_ms':
          {
            toReturn = this.duration_ms;
            break;
          }
        case 'energy':
          {
            toReturn = this.energy;
            break;
          }
        case 'instrumentalness':
          {
            toReturn = this.instrumentalness;
            break;
          }
        case 'liveness':
          {
            toReturn = this.liveness;
            break;
          }
        case 'mode':
          {
            toReturn = this.mode;
            break;
          }
        case 'speechiness':
          {
            toReturn = this.speechiness;
            break;
          }
        case 'tempo':
          {
            toReturn = this.tempo;
            break;
          }
        case 'time_signature':
          {
            toReturn = this.time_signature;
            break;
          }
        case 'valence':
          {
            toReturn = this.valence;
            break;
          }
        default:
          {
            console.log(metric + ' is not a valid category');
            break;
          }
      }
      return toReturn;
    }
}
