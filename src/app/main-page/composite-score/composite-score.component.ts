import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MetricScores } from '../../_models/metricScores';

import { RawMetrics } from '../../_models/RawMetrics';
// oof big import here:
import { IMetricStrategy } from 'src/app/_models/MetricStrategies/IMetricStrategy';
import { DanceabilityStrategy } from 'src/app/_models/MetricStrategies/DanceabilityStrategy';
import { EnergyStrategy } from 'src/app/_models/MetricStrategies/EnergyStrategy';
import { ModeStrategy } from 'src/app/_models/MetricStrategies/ModeStrategy';
import { SpeechinessStrategy } from 'src/app/_models/MetricStrategies/SpeechinessStrategy';
import { AcousticnessStrategy } from 'src/app/_models/MetricStrategies/AcousticnessStrategy';
import { InstrumentalnessStrategy } from 'src/app/_models/MetricStrategies/InstrumentalnessStrategy';
import { LivenessStrategy } from 'src/app/_models/MetricStrategies/LivenessStrategy';
import { ValenceStrategy } from 'src/app/_models/MetricStrategies/ValenceStrategy';
import { TempoStrategy } from 'src/app/_models/MetricStrategies/TempoStrategy';
import { TimeSignatureStrategy } from 'src/app/_models/MetricStrategies/TimeSignatureStrategy';
import { DurationStrategy } from 'src/app/_models/MetricStrategies/DurationStrategy';

// imports html and css files
@Component({
  selector: 'app-composite-score',
  templateUrl: './composite-score.component.html',
  styleUrls: ['./composite-score.component.css']
})

export class CompositeScoreComponent implements OnInit {
  // declared variables
  metricsDisplay: string; // metric selected in dropdown
  compositeScoreTitle: string; // Title associated with the type of metric being displayed
  compositeScore: string; // the composite score in string
  average: number;  // The raw value from the average metrics

  @Output() onOutliersRequested = new EventEmitter<boolean>();

  getOutliers() {
    this.onOutliersRequested.emit(true);
    console.log('getOutliers has been called');
  }

  constructor() { }

  ngOnInit(): void {
  }

  CalculateCompositeScore(arrayOfMetrics: Array<RawMetrics>, categorySelected: string)
  {
    // store the element selected
    this.metricsDisplay = categorySelected;
    console.log('Hey I made it to calculating composite score');
    // iterate over the array of metrics
    // pull the values of the selected metric into a new array to perform stats
    // we need an average to get started
    // add outliers here later
    let total = 0;

    for (const trackMetric of arrayOfMetrics)
    {
      switch (this.metricsDisplay)
      {
        case 'danceability':
          {
            total += trackMetric.danceability;
            break;
          }
        case 'energy':
          {
            total += trackMetric.energy;
            break;
          }
        case 'mode':
          {
            total += trackMetric.mode;
            break;
          }
        case 'speechiness':
          {
            total += trackMetric.speechiness;
            break;
          }
        case 'acousticness':
          {
            total += trackMetric.acousticness;
            break;
          }
        case 'instrumentalness':
          {
            if (trackMetric.instrumentalness > 0.2)
            {
              total += 1;
            }
            // total += trackMetric.instrumentalness;
            break;
          }
        case 'liveness':
          {
            if (trackMetric.liveness > 0.4)
            {
              total += 1;
            }
            // total += trackMetric.liveness;
            break;
          }
        case 'valence':
          {
            total += trackMetric.valence;
            break;
          }
        case 'tempo':
          {
            total += trackMetric.tempo;
            break;
          }
        case 'time_signature':
          {
            total += trackMetric.time_signature;
            break;
          }
        case 'duration_ms':
          {
            total += trackMetric.duration_ms;
            break;
          }
        default:
          {
            console.log('hello, I\'ve experienced an error somehow, or the user didn\'t select a category');
          }
      }

    }
    console.log(total);
    console.log(arrayOfMetrics.length);

    // this.compositeScore = parseFloat((total / arrayOfMetrics.length).toFixed(2)).toFixed(2);
    this.average = total / arrayOfMetrics.length;

    console.log('Average: ' + this.average);

    this.ConvertMetricToValue();
    // console.log(this.compositeScore);
    // console.log(average);
    // (<HTMLSelectElement>document.getElementById('metricSelected')).value = "0";
    // TODO: add valueable stats to user here (standard deviation, regression analysis)
    // TODO: get fix for CORS policy error
  }


  ConvertMetricToValue()
  {
    // Convert metric to a valuable piece of information to a user:
      // Tabled:
        // Loudness float between -60 and 0 convert to decibels
        // Valence normal curve mean of 0.5, speaks to positiveness of a given song

    // */

    let metricStrategy: IMetricStrategy;

    switch (this.metricsDisplay)
      {
        case 'danceability':
          {
            metricStrategy = new DanceabilityStrategy();
            break;
          }
        case 'energy':
          {
            metricStrategy = new EnergyStrategy();
            break;
          }
        case 'mode':
          {
            metricStrategy = new ModeStrategy();
            break;
          }
        case 'speechiness':
          {
            metricStrategy = new SpeechinessStrategy();
            break;
          }
        case 'acousticness':
          {
            metricStrategy = new AcousticnessStrategy();
            break;
          }
        case 'instrumentalness':
          {
            metricStrategy = new InstrumentalnessStrategy();
            break;
          }
        case 'liveness':
          {
            metricStrategy = new LivenessStrategy();
            break;
          }
        case 'valence':
          {
            metricStrategy = new ValenceStrategy();
            break;
          }
        case 'tempo':
          {
            metricStrategy = new TempoStrategy();
            break;
          }
        case 'time_signature':
          {
            metricStrategy = new TimeSignatureStrategy();
            break;
          }
        case 'duration_ms':
          {
            metricStrategy = new DurationStrategy();
            break;
          }
        default:
          {
            console.log('hello, I\'ve experienced an error somehow, or the user didn\'t select a category');
            metricStrategy = undefined;
          }
      }

    if (metricStrategy)
      {
        this.compositeScoreTitle = metricStrategy.GetDisplayTitle();
        this.compositeScore = metricStrategy.ConvertToValue(this.average);
      }
    // */
  }
}
