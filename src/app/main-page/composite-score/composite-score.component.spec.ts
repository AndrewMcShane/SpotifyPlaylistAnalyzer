import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositeScoreComponent } from './composite-score.component';
import { Category } from '../../_models/category';
import { RawMetrics } from 'src/app/_models/RawMetrics';

describe('CompositeScoreComponent', () => {
  let component: CompositeScoreComponent;
  let fixture: ComponentFixture<CompositeScoreComponent>;
  let rawMetrics: Array<RawMetrics>;

  beforeAll(() => {
    rawMetrics = new Array<RawMetrics>();

    for (let i = 0; i < 10; i++)
    {
      const tmpMetrics = new RawMetrics();
      tmpMetrics.acousticness = 1;
      tmpMetrics.danceability = 2;
      tmpMetrics.duration_ms = 366000;
      tmpMetrics.energy = 4;
      tmpMetrics.instrumentalness = 5;
      tmpMetrics.liveness = 6;
      tmpMetrics.mode = 7;
      tmpMetrics.speechiness = 8;
      tmpMetrics.tempo = 9;
      tmpMetrics.time_signature = 10;
      tmpMetrics.valence = 11;
      rawMetrics.push(tmpMetrics);
    }
  });


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompositeScoreComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositeScoreComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create composite score component', () => {
    expect(component).toBeTruthy();
  });


  // unit test for calculating average
  it('should calculate the average acousticness (good data input)', () => {
    // Arrange
    const metric = 'acousticness';

    // Act
    component.CalculateCompositeScore(rawMetrics, metric);

    // Assert
    expect(component.average).toBe(1);
  });

  it('should calculate the average acousticness (bad data input)', () => {
    // Arrange
    const metric = 'key';

    // Act
    component.CalculateCompositeScore(rawMetrics, metric);

    // Assert
    expect(component.average).toBe(0);
  });

  it('should calculate the average acousticness (null data input)', () => {
    // Arrange
    const metric = '0';

    // Act
    component.CalculateCompositeScore(rawMetrics, metric);

    // Assert
    expect(component.average).toBe(0);
  });

  it('should calculate the average danceability (good data input)', () => {
    // Arrange
    const metric = 'danceability';

    // Act
    component.CalculateCompositeScore(rawMetrics, metric);

    // Assert
    expect(component.average).toBe(2);
  });

  // unite tests for converting metrics to value
  it('should change the title to acousticness (good input)', () => {
  // Arrange
  const metric = 'acousticness';

  // Act
  component.CalculateCompositeScore(rawMetrics, metric);

  // Assert
  expect(component.compositeScoreTitle).toBe('Acousticness Rating');
  });

  it('should change the title to acousticness (bad input)', () => {
    // Arrange
    const metric = 'key';

    // Act
    component.CalculateCompositeScore(rawMetrics, metric);

    // Assert
    expect(component.compositeScoreTitle).toBe(undefined);
    });

  it('should change the title to acousticness (null input)', () => {
    // Arrange
    const metric = '0';

   // Act
    component.CalculateCompositeScore(rawMetrics, metric);

   // Assert
    expect(component.compositeScoreTitle).toBe(undefined);
   });

  // unit tests for valuable data output
  it('should output value data for acousticness (good input)', () => {
    // Arrange
    const metric = 'acousticness';

    // Act
    component.CalculateCompositeScore(rawMetrics, metric);

    // Assert
    expect(component.compositeScore).toBe('10/10');
    });

  it('should output value data for acousticness (bad input)', () => {
    // Arrange
    const metric = 'key';

    // Act
    component.CalculateCompositeScore(rawMetrics, metric);

    // Assert
    expect(component.compositeScore).toBe(undefined);
    });

  it('should output value data for acousticness (null input)', () => {
    // Arrange
    const metric = '0';

    // Act
    component.CalculateCompositeScore(rawMetrics, metric);

    // Assert
    expect(component.compositeScore).toBe(undefined);
    });

  it('should output value data for duration (good input)', () => {
      // Arrange
      const metric = 'duration_ms';

      // Act
      component.CalculateCompositeScore(rawMetrics, metric);

      // Assert
      expect(component.compositeScore).toBe('6:06');
      // expect(component.average).toBe(366000)
      });
});
