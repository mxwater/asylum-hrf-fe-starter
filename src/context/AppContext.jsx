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
      const response = await axios.get('https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary');
      return response.data;
    } catch (error) {
      console.error("Error fetching fiscal data:", error);
      return null;
    }
  };

  const getCitizenshipResults = async () => {
    try {
      const response = await axios.get('https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary');
      return response.data;
    } catch (error) {
      console.error("Error fetching citizenship data:", error);
      return null;
    }
  };

  const updateQuery = async () => {
    setIsDataLoading(true);
  };

  const fetchData = async () => {
    try {
      setIsDataLoading(true); 
      const fiscalData = await getFiscalData();
      const citizenshipData = await getCitizenshipResults();

      if (fiscalData && citizenshipData) {
        setGraphData({
          yearResults: fiscalData,
          citizenshipResults: citizenshipData,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsDataLoading(false); 
    }
  };

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
