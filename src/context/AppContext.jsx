import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AppContext = createContext({});


const useAppContextProvider = () => {
  const [graphData, setGraphData] = useState({ yearResults: [], citizenshipResults: [] });
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

  const fetchData = async () => {
    setIsDataLoading(true);
    try {
      const fiscalData = await getFiscalData();
      const citizenshipData = await getCitizenshipResults();

      if (fiscalData && citizenshipData) {
        const yearResults = fiscalData.yearResults.map((yearItem) => ({
          fiscal_year: yearItem.fiscal_year,
          granted: yearItem.granted,
          yearData: yearItem.yearData.map((office) => ({
            office: office.office,
            granted: office.granted,
          })),
        }));

        const citizenshipResults = citizenshipData.map((item) => ({
          citizenship: item.citizenship,
          granted: item.granted,
        }));

        setGraphData({ yearResults, citizenshipResults });
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
    setGraphData({ yearResults: [], citizenshipResults: [] });
  };

  const updateQuery = async () => {
    await fetchData();
  };

  const getYears = () => graphData?.yearResults?.map(({ fiscal_year }) => Number(fiscal_year)) ?? [];

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
