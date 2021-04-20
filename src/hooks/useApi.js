import React, { useState } from "react";

const useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const request = async (...args) => {
    const response = await apiFunc(...args);
    setLoading(false);
    setData(response);
    return response;
  };

  return { data, loading, request };
};

export default useApi;
