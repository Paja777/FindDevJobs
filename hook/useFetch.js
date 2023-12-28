import { useState, useEffect } from "react";
import axios from "axios";
// import { RAPID_API_KEY } from "@env";

// const rapidApiKey = RAPID_API_KEY;

export default function useFetch(endpoint, query) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
    headers: {
      "X-RapidAPI-Key": 'a58c769d0cmsh0132917213024a4p17800ajsnd9e96ebcf045',
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  dummyData =[
    {  job_id: 1, employer_name: 'Lion8', job_title: 'Frontend-developer', job_country: 'USA'},
    {  job_id: 2, employer_name: 'Inovatec', job_title: 'Backend-developer', job_country: 'Austria'},
    {  job_id: 3, employer_name: 'Comtrade', job_title: 'Frontend-developer', job_country: 'Germany'},
  ];

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
}
