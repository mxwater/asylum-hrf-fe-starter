import { ScatterPlot } from '../../common/ScatterPlotMap.jsx';
import { HeatMap } from '../../common/HeatMap.jsx';
import { ChoroplethMap } from '../../common/ChoroplethMap.jsx';

export const mapTypes = {
  ScatterPlot: 'SCATTER-PLOT',
  HeatMap: 'HEAT-MAP',
  ChoroplethMap: 'CHOROPLETH-MAP',
};

export const getMapView = (mapView, graphData) => {
  switch (mapView) {
    case mapTypes.ScatterPlot: {
      return <ScatterPlot data={graphData.yearResults} />;
    }
    case mapTypes.HeatMap: {
      return <HeatMap data={graphData.citizenshipResults} />;
    }
    case mapTypes.ChoroplethMap: {
      return <ChoroplethMap data={graphData.citizenshipResults} />;
    }
    default: {
      throw new Error(`Unhandled map type: mapView: ${mapView}`);
    }
  }
};
