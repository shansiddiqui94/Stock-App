import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_TSLA_URL}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const TSLA = () => {
  const [TslaTicker, setTslaTicker] = useState("");
  const [TslaCompany, setTslaCompany] = useState("");
  const [TslaPercent, setTslaPercent] = useState("");
  const [TslaClose, setTslaClose] = useState("");

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get(`${BASE_URL}${API_KEY}`);
      setTslaTicker(data.symbol);
      setTslaCompany(data.companyName);
      setTslaPercent(data.changePercent);
      setTslaClose(data.close);
    };
    search();
  }, []);

  const colorChange = TslaPercent < 0 ? "red" : "green";

  return (
    <div className="stock-company">
      <div className="box">
        <h2>{TslaTicker}</h2>
        <p>{TslaClose}</p>
      </div>
      <div className="low">
        <p>{TslaCompany}</p>
        <p className={`${colorChange}`}>{TslaPercent}%</p>
      </div>
    </div>
  );
};

export default TSLA;
