/* *
 *
 *  (c) 2010-2020 Sebastian Bochan, Rafal Sebestjanski
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import type DumbbellPointOptions from './DumbbellPointOptions';

import DumbbellSeries from './DumbbellSeries.js';
import BaseSeries from '../../Core/Series/Series.js';
const {
    seriesTypes: {
        arearange: {
            prototype: areaRangeProto
        }
    }
} = BaseSeries;

import H from '../../Core/Globals.js';
const { noop } = H;
import U from '../../Core/Utilities.js';
const {
    extend,
    pick
} = U;

/* *
 *
 *  Class
 *
 * */

class DumbbellPoint extends areaRangeProto.pointClass {

    /* *
     *
     *  Properties
     *
     * */

    public series: DumbbellSeries = void 0 as any;
    public options: DumbbellPointOptions = void 0 as any;
    public connector: Highcharts.SVGElement = void 0 as any;
    public pointWidth: number = void 0 as any;
    public pointSetState: typeof areaRangeProto.pointClass.prototype.setState = noop;

    /* *
     *
     *  Functions
     *
     * */

    /**
     * Set the point's state extended by have influence on the connector
     * (between low and high value).
     *
     * @private
     * @param {Highcharts.Point} this The point to inspect.
     *
     * @return {void}
     */
    setState(): void {
        var point = this,
            series = point.series,
            chart = series.chart,
            seriesLowColor = series.options.lowColor,
            seriesMarker = series.options.marker,
            pointOptions = point.options,
            pointLowColor = pointOptions.lowColor,
            zoneColor = point.zone && point.zone.color,
            lowerGraphicColor = pick(
                pointLowColor,
                seriesLowColor,
                pointOptions.color,
                zoneColor,
                point.color,
                series.color
            ),
            verb = 'attr',
            upperGraphicColor,
            origProps;

        this.pointSetState.apply(this, arguments);

        if (!point.state) {
            verb = 'animate';
            if (point.lowerGraphic && !chart.styledMode) {
                point.lowerGraphic.attr({
                    fill: lowerGraphicColor
                });
                if (point.upperGraphic) {
                    origProps = {
                        y: point.y,
                        zone: point.zone
                    };
                    point.y = point.high;
                    point.zone = point.zone ? point.getZone() : void 0;
                    upperGraphicColor = pick(
                        point.marker ? point.marker.fillColor : void 0,
                        seriesMarker ? seriesMarker.fillColor : void 0,
                        pointOptions.color,
                        point.zone ? point.zone.color : void 0,
                        point.color
                    );
                    point.upperGraphic.attr({
                        fill: upperGraphicColor
                    });
                    extend(point, origProps);
                }
            }
        }

        point.connector[verb](series.getConnectorAttribs(point));
    }
}


/* *
 *
 *  Prototype Properties
 *
 * */

const { isValid, destroyElements } = areaRangeProto.pointClass.prototype;
interface DumbbellPoint extends Highcharts.AreaRangePoint {
    destroyElements: typeof destroyElements;
    isValid: typeof isValid;
}

extend(DumbbellPoint.prototype, {
    // seriesTypes doesn't inherit from arearange point proto so put below
    // methods rigidly.
    destroyElements,
    isValid
});

/* *
 *
 *  Default export
 *
 * */

export default DumbbellPoint;
