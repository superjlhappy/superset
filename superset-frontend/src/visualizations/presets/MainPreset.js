/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { isFeatureEnabled, FeatureFlag, Preset } from '@superset-ui/core';
import CalendarChartPlugin from '@superset-ui/legacy-plugin-chart-calendar';
import ChordChartPlugin from '@superset-ui/legacy-plugin-chart-chord';
import CountryMapChartPlugin from '@superset-ui/legacy-plugin-chart-country-map';
import EventFlowChartPlugin from '@superset-ui/legacy-plugin-chart-event-flow';
import HeatmapChartPlugin from '@superset-ui/legacy-plugin-chart-heatmap';
import HistogramChartPlugin from '@superset-ui/legacy-plugin-chart-histogram';
import HorizonChartPlugin from '@superset-ui/legacy-plugin-chart-horizon';
import MapBoxChartPlugin from '@superset-ui/legacy-plugin-chart-map-box';
import PairedTTestChartPlugin from '@superset-ui/legacy-plugin-chart-paired-t-test';
import ParallelCoordinatesChartPlugin from '@superset-ui/legacy-plugin-chart-parallel-coordinates';
import PartitionChartPlugin from '@superset-ui/legacy-plugin-chart-partition';
import RoseChartPlugin from '@superset-ui/legacy-plugin-chart-rose';
import SankeyChartPlugin from '@superset-ui/legacy-plugin-chart-sankey';
import TableChartPlugin from '@superset-ui/plugin-chart-table';
import { WordCloudChartPlugin } from '@superset-ui/plugin-chart-word-cloud';
import { WordCloudPercentChartPlugin } from '@superset-ui/plugin-chart-word-cloud-percent';
import WorldMapChartPlugin from '@superset-ui/legacy-plugin-chart-world-map';
import {
  AreaChartPlugin,
  BarChartPlugin,
  BubbleChartPlugin,
  BulletChartPlugin,
  CompareChartPlugin,
  DistBarChartPlugin,
  LineChartPlugin,
  TimePivotChartPlugin,
} from '@superset-ui/legacy-preset-chart-nvd3';
import { DeckGLChartPreset } from '@superset-ui/legacy-preset-chart-deckgl';
import {
  BigNumberChartPlugin,
  BigNumberTotalChartPlugin,
  EchartsPieChartPlugin,
  EchartsBoxPlotChartPlugin,
  EchartsAreaChartPlugin,
  EchartsTimeseriesChartPlugin,
  EchartsTimeseriesBarChartPlugin,
  EchartsTimeseriesLineChartPlugin,
  EchartsTimeseriesScatterChartPlugin,
  EchartsTimeseriesSmoothLineChartPlugin,
  EchartsTimeseriesStepChartPlugin,
  EchartsGraphChartPlugin,
  EchartsGaugeChartPlugin,
  EchartsHistogramChartPlugin,
  EchartsRadarChartPlugin,
  EchartsFunnelChartPlugin,
  EchartsSankeyChartPlugin,
  EchartsTreemapChartPlugin,
  EchartsMixedTimeseriesChartPlugin,
  EchartsTreeChartPlugin,
  EchartsSunburstChartPlugin,
  EchartsBubbleChartPlugin,
  EchartsWaterfallChartPlugin,
  BigNumberPeriodOverPeriodChartPlugin,
  EchartsHeatmapChartPlugin,
} from '@superset-ui/plugin-chart-echarts';
import {
  SelectFilterPlugin,
  RangeFilterPlugin,
  TimeFilterPlugin,
  TimeColumnFilterPlugin,
  TimeGrainFilterPlugin,
} from 'src/filters/components';
import { PivotTableChartPlugin as PivotTableChartPluginV2 } from '@superset-ui/plugin-chart-pivot-table';
import { HandlebarsChartPlugin } from '@superset-ui/plugin-chart-handlebars';
import { FilterPlugins } from 'src/constants';
import TimeTableChartPlugin from '../TimeTable';

export default class MainPreset extends Preset {
  constructor() {
    const experimentalPlugins = isFeatureEnabled(
      FeatureFlag.ChartPluginsExperimental,
    )
      ? [
          new BigNumberPeriodOverPeriodChartPlugin().configure({
            key: VizType.BigNumberPeriodOverPeriod,
          }),
        ]
      : [];

    super({
      name: 'Legacy charts',
      presets: [new DeckGLChartPreset()],
      plugins: [
        new AreaChartPlugin().configure({ key: VizType.LegacyArea }),
        new BarChartPlugin().configure({ key: VizType.LegacyBar }),
        new BigNumberChartPlugin().configure({ key: VizType.BigNumber }),
        new BigNumberTotalChartPlugin().configure({
          key: VizType.BigNumberTotal,
        }),
        new EchartsBoxPlotChartPlugin().configure({ key: VizType.BoxPlot }),
        new BubbleChartPlugin().configure({ key: VizType.LegacyBubble }),
        new BulletChartPlugin().configure({ key: VizType.Bullet }),
        new CalendarChartPlugin().configure({ key: VizType.Calendar }),
        new ChordChartPlugin().configure({ key: VizType.Chord }),
        new CompareChartPlugin().configure({ key: VizType.Compare }),
        new CountryMapChartPlugin().configure({ key: VizType.CountryMap }),
        new DistBarChartPlugin().configure({ key: VizType.DistBar }),
        new EventFlowChartPlugin().configure({ key: VizType.EventFlow }),
        new EchartsFunnelChartPlugin().configure({ key: VizType.Funnel }),
        new EchartsSankeyChartPlugin().configure({ key: VizType.Sankey }),
        new EchartsTreemapChartPlugin().configure({ key: VizType.Treemap }),
        new EchartsGaugeChartPlugin().configure({ key: VizType.Gauge }),
        new EchartsGraphChartPlugin().configure({ key: VizType.Graph }),
        new EchartsRadarChartPlugin().configure({ key: VizType.Radar }),
        new EchartsMixedTimeseriesChartPlugin().configure({
          key: VizType.MixedTimeseries,
        }),
        new HeatmapChartPlugin().configure({ key: 'heatmap' }),
        new HistogramChartPlugin().configure({ key: 'histogram' }),
        new HorizonChartPlugin().configure({ key: 'horizon' }),
        new LineChartPlugin().configure({ key: 'line' }),
        new MapBoxChartPlugin().configure({ key: 'mapbox' }),
        new PairedTTestChartPlugin().configure({ key: 'paired_ttest' }),
        new ParallelCoordinatesChartPlugin().configure({ key: 'para' }),
        new PartitionChartPlugin().configure({ key: 'partition' }),
        new EchartsPieChartPlugin().configure({ key: 'pie' }),
        new PivotTableChartPluginV2().configure({ key: 'pivot_table_v2' }),
        new RoseChartPlugin().configure({ key: 'rose' }),
        new SankeyChartPlugin().configure({ key: 'sankey' }),
        new TableChartPlugin().configure({ key: 'table' }),
        new TimePivotChartPlugin().configure({ key: 'time_pivot' }),
        new TimeTableChartPlugin().configure({ key: 'time_table' }),
        new WordCloudChartPlugin().configure({ key: 'word_cloud' }),
		new WordCloudPercentChartPlugin().configure({ key: 'word_cloud_percent' }),
        new WorldMapChartPlugin().configure({ key: 'world_map' }),
        new EchartsAreaChartPlugin().configure({
          key: VizType.Area,
        }),
        new EchartsTimeseriesChartPlugin().configure({
          key: VizType.Timeseries,
        }),
        new EchartsTimeseriesBarChartPlugin().configure({
          key: VizType.Bar,
        }),
        new EchartsTimeseriesLineChartPlugin().configure({
          key: VizType.Line,
        }),
        new EchartsTimeseriesSmoothLineChartPlugin().configure({
          key: VizType.SmoothLine,
        }),
        new EchartsTimeseriesScatterChartPlugin().configure({
          key: VizType.Scatter,
        }),
        new EchartsTimeseriesStepChartPlugin().configure({
          key: VizType.Step,
        }),
        new EchartsWaterfallChartPlugin().configure({
          key: VizType.Waterfall,
        }),
        new EchartsHeatmapChartPlugin().configure({ key: VizType.Heatmap }),
        new EchartsHistogramChartPlugin().configure({ key: VizType.Histogram }),
        new SelectFilterPlugin().configure({ key: FilterPlugins.Select }),
        new RangeFilterPlugin().configure({ key: FilterPlugins.Range }),
        new TimeFilterPlugin().configure({ key: FilterPlugins.Time }),
        new TimeColumnFilterPlugin().configure({
          key: FilterPlugins.TimeColumn,
        }),
        new TimeGrainFilterPlugin().configure({
          key: FilterPlugins.TimeGrain,
        }),
        new EchartsTreeChartPlugin().configure({ key: 'tree_chart' }),
        new EchartsSunburstChartPlugin().configure({ key: 'sunburst_v2' }),
        new HandlebarsChartPlugin().configure({ key: 'handlebars' }),
        new EchartsBubbleChartPlugin().configure({ key: 'bubble_v2' }),
        ...experimentalPlugins,
      ],
    });
  }
}
