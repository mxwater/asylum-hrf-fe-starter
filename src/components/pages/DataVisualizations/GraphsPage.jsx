import { useState } from 'react';
import { getMapView, mapTypes } from './getMapView.jsx';
import { GraphButtons } from '../../common/GraphButtons.jsx';
import { Loading } from '../../common/Loading.jsx';
import { getGraphsHeader } from './getGraphsHeader.js';
import { useAppContext } from '../../../context/AppContext.jsx';
import { useAppContext } from '../../../context/AppContext.jsx'

export const GraphsPage = () => {
  const [mapView, setMapView] = useState(mapTypes.ScatterPlot);
  const { graphData, isDataLoading } = useAppContext();

  return (
    <div className='secondary-c'>
      <div className='plot-main flex w-[70%] gap-10 mx-auto justify-end'>
        <div className='plot-main flex-c'>
          <h1 className='py-5'>{getGraphsHeader(mapView)}</h1>
          <section className='maps'>
            {isDataLoading ? <Loading/> : getMapView(mapView, graphData)}
            </section>
        </div>
        <GraphButtons mapView={mapView} setMapView={setMapView} />
      </div>
      <Loading />
    </div>
  );
};
