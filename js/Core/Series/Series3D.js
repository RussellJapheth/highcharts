/* *
 *
 *  (c) 2010-2020 Torstein Honsi
 *
 *  Extension to the Series object in 3D charts.
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import LineSeries from '../../Series/Line/LineSeries.js';
import Math3D from '../../Extensions/Math3D.js';
var perspective = Math3D.perspective;
import U from '../Utilities.js';
var addEvent = U.addEvent, pick = U.pick;
/* eslint-disable no-invalid-this */
// Wrap the translate method to post-translate points into 3D perspective
addEvent(LineSeries, 'afterTranslate', function () {
    if (this.chart.is3d()) {
        this.translate3dPoints();
    }
});
// Translate the plotX, plotY properties and add plotZ.
LineSeries.prototype.translate3dPoints = function () {
    var series = this, seriesOptions = series.options, chart = series.chart, zAxis = pick(series.zAxis, chart.options.zAxis[0]), rawPoints = [], rawPoint, projectedPoints, projectedPoint, zValue, i, stack = seriesOptions.stacking ?
        (seriesOptions.stack || 0) :
        series.index, // #4743
    rawPointsX = [];
    series.zPadding = stack *
        (seriesOptions.depth || 0 + (seriesOptions.groupZPadding || 1));
    for (i = 0; i < series.data.length; i++) {
        rawPoint = series.data[i];
        if (zAxis && zAxis.translate) {
            zValue = zAxis.logarithmic && zAxis.val2lin ?
                zAxis.val2lin(rawPoint.z) :
                rawPoint.z; // #4562
            rawPoint.plotZ = zAxis.translate(zValue);
            rawPoint.isInside = rawPoint.isInside ?
                (zValue >= zAxis.min &&
                    zValue <= zAxis.max) :
                false;
        }
        else {
            // add value of zPadding to final z position of calculated point.
            rawPoint.plotZ = series.zPadding;
        }
        rawPoint.axisXpos = rawPoint.plotX;
        rawPoint.axisYpos = rawPoint.plotY;
        rawPoint.axisZpos = rawPoint.plotZ;
        rawPointsX.push(rawPoint.plotX);
        rawPoints.push({
            x: rawPoint.plotX,
            y: rawPoint.plotY,
            z: rawPoint.plotZ
        });
        series.rawPointsX = rawPointsX;
    }
    projectedPoints = perspective(rawPoints, chart, true);
    for (i = 0; i < series.data.length; i++) {
        rawPoint = series.data[i];
        projectedPoint = projectedPoints[i];
        rawPoint.plotX = projectedPoint.x;
        rawPoint.plotY = projectedPoint.y;
        rawPoint.plotZ = projectedPoint.z;
    }
};
