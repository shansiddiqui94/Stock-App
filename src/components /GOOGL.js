import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_GOOGL_URL}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const GOOGL = () => {
  const [GooglTicker, setGooglTicker] = useState("");
  const [GooglCompany, setGooglCompany] = useState("");
  const [GooglPercent, setGooglPercent] = useState("");
  const [GooglClose, setGooglClose] = useState("");

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get(`${BASE_URL}${API_KEY}`);
      setGooglTicker(data.symbol);
      setGooglCompany(data.companyName);
      setGooglPercent(data.changePercent);
      setGooglClose(data.close);
    };
    search();
  }, []);

  const colorChange = GooglPercent < 0 ? "red" : "green";

  return (
    <div className="stock-company">
      <div className="box">
        <h2>{GooglTicker}</h2>
        <p>{GooglClose}</p>
      </div>
      <div className="low">
        <p>{GooglCompany}</p>
        <p className={`${colorChange}`}>{GooglPercent}%</p>
      </div>
    </div>
  );
};

export default GOOGL;
