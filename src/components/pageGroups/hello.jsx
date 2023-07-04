import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Hello = () => {
  const [helloData, setHelloData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/hello');
        setHelloData(response.data);
      } catch (error) {
        console.error('Error fetching hello data:', error);
      }
    };

    fetchData();
  }, []);

  return <div>{helloData}</div>;
};

export default Hello;
