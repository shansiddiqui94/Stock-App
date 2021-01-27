import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_SNAP_URL}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const SNAP = () => {
  const [SnapTicker, setSnapTicker] = useState("");
  const [SnapComp, setSnapComp] = useState("");
  const [SnapPercent, setSnapPercent] = useState("");
  const [SnapClose, setClose] = useState("");

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get(`${BASE_URL}${API_KEY}`);
      setSnapTicker(data.symbol);
      setSnapComp(data.companyName);
      setSnapPercent(data.changePercent);
      setClose(data.close);
    };
    search();
  }, []);

  const colorShift = SnapPercent < 0 ? "red" : "green";

  return (
    <div className="stock-company">
      <div className="box">
        <h2>{SnapTicker}</h2>
        <p>{SnapClose}</p>
      </div>
      <div className="low">
        <p>{SnapComp}</p>
        <p className={`${colorShift}`}>{SnapPercent}%</p>
      </div>
    </div>
  );
};

export default SNAP;
