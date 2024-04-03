import { useState, useEffect } from "react";
import Flims from "./Flims";

function Main() {
  const [APIData, setAPIData] = useState([]);
  const baseURL = `https://65e0228bd3db23f762485c66.mockapi.io/players`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseURL);
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        const data = await response.json();
        setAPIData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [baseURL]);

  return <Flims flims={APIData} />;
}

export default Main;
