import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AppContext = createContext({});

/**
 * TODO: Ticket 2:
 * - Use axios to fetch the data
 * - Store the data
 * - Populate the graphs with the stored data
 */
const useAppContextProvider = () => {
  const [graphData, setGraphData] = useState(testData);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useLocalStorage({ graphData, setGraphData });

  const getFiscalData = async () => {
    try {
      const response = await axios.get('https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary', { timeout: 10000 });
      return response.data;
    } catch (error) {
      console.error('Error fetching fiscal data:', error);
      return null;
    }
  };
  
  

  const getCitizenshipResults = async () => {
    try {
      const response = await axios.get('https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary');
      return response.data;  
    } catch (error) {
      console.error('Error fetching citizenship data:', error);
      return [];
    }
  };

  const updateQuery = async () => {
    setIsDataLoading(true);
  };

  const fetchData = async () => {
    setIsDataLoading(true);
    try {
      const fiscalData = await getFiscalData();
      const citizenshipData = await getCitizenshipResults();
  
      if (fiscalData && citizenshipData) {
        // Transform fiscalData to match the expected structure for ScatterPlot and HeatMap
        const yearResults = fiscalData.yearResults.map(yearItem => ({
          fiscal_year: yearItem.fiscal_year,       // Expected by ScatterPlot for x-axis
          granted: yearItem.granted,               // Expected by ScatterPlot for y-axis
          yearData: yearItem.yearData.map(office => ({
            office: office.office,                 // Expected by HeatMap as x-axis
            granted: office.granted,               // Expected by HeatMap as z-axis
          })),
        }));
  
        // Transform citizenshipData to match the structure expected by ChoroplethMap
        const citizenshipResults = citizenshipData.map(item => ({
          citizenship: item.citizenship,           // Expected by ChoroplethMap for locations
          granted: item.granted,                   // Expected by ChoroplethMap for z-axis
        }));
  
        // Combine transformed data
        const combinedData = {
          yearResults,            // For ScatterPlot and HeatMap
          citizenshipResults,      // For ChoroplethMap
        };
  
        // Update graphData in state
        setGraphData(combinedData);
      }
    } catch (error) {
      console.error('Failed to fetch and transform data:', error);
    } finally {
      setIsDataLoading(false);
    }
  };
  
  
  
  
  
  useEffect(() => {
    fetchData();
  }, []); 

  const clearQuery = () => {
    setGraphData({});
  };

  const getYears = () => graphData?.yearResults?.map(({ fiscal_year }) => Number(fiscal_year)) ?? [];

  useEffect(() => {
    fetchData(); 
  }, []); 

  return {
    graphData,
    setGraphData,
    isDataLoading,
    updateQuery,
    clearQuery,
    getYears,
  };
};

export function useAppContext() {
  return useContext(AppContext);
}

export function ProvideAppContext({ children }) {
  const contextValue = useAppContextProvider();

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}