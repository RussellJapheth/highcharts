/* *
 *
 *  (c) 2010-2020 Torstein Honsi
 *
 *  Extension to the VML Renderer
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Axis from '../../Core/Axis/Axis.js';
import H from '../../Core/Globals.js';
import SVGRenderer from '../../Core/Renderer/SVG/SVGRenderer.js';
import U from '../../Core/Utilities.js';
var setOptions = U.setOptions;
import VMLAxis3D from './VMLAxis3D.js';
var VMLRenderer3D = /** @class */ (function () {
    function VMLRenderer3D() {
    }
    /* *
     *
     *  Static Properties
     *
     * */
    VMLRenderer3D.compose = function (VMLRenderer) {
        setOptions({ animate: false });
        VMLRenderer.prototype.face3d = SVGRenderer.prototype.face3d;
        VMLRenderer.prototype.polyhedron = SVGRenderer.prototype.polyhedron;
        VMLRenderer.prototype.elements3d = SVGRenderer.prototype.elements3d;
        VMLRenderer.prototype.element3d = SVGRenderer.prototype.element3d;
        VMLRenderer.prototype.cuboid = SVGRenderer.prototype.cuboid;
        VMLRenderer.prototype.cuboidPath = SVGRenderer.prototype.cuboidPath;
        VMLRenderer.prototype.toLinePath = SVGRenderer.prototype.toLinePath;
        VMLRenderer.prototype.toLineSegments = SVGRenderer.prototype.toLineSegments;
        VMLRenderer.prototype.arc3d = function (shapeArgs) {
            var result = SVGRenderer.prototype.arc3d.call(this, shapeArgs);
            result.css({ zIndex: result.zIndex });
            return result;
        };
        H.VMLRenderer.prototype.arc3dPath = SVGRenderer.prototype.arc3dPath;
        VMLAxis3D.compose(Axis);
    };
    return VMLRenderer3D;
}());
export default VMLRenderer3D;