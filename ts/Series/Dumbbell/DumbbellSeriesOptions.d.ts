/* *
 *
 *  (c) 2010-2020 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Imports
 *
 * */

import type DumbbellSeries from './DumbbellSeries';
import type ColorString from '../../Core/Color/ColorString';
import type ColorType from '../../Core/Color/ColorType';
import type { SeriesStatesOptions } from '../../Core/Series/SeriesOptions';

/* *
 *
 *  Declarations
 *
 * */

interface DumbbellSeriesOptions extends Highcharts.AreaRangeSeriesOptions {
    states?: SeriesStatesOptions<DumbbellSeries>;
    connectorColor?: ColorString;
    connectorWidth?: number;
    groupPadding?: number;
    pointPadding?: number;
    lowColor?: ColorType;
}

/* *
 *
 *  Default export
 *
 * */

export default DumbbellSeriesOptions;
