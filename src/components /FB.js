import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_FB_URL}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const FB = () => {
  const [FbTicker, setFbTicker] = useState("");

  const [FbComp, setFbComp] = useState("");

  const [FbPercent, setFbPercent] = useState("");

  const [FbClose, setFbClose] = useState("");

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get(`${BASE_URL}${API_KEY}`);
      // now we set the secondParam the function
      setFbTicker(data.symbol);
      setFbComp(data.companyName);
      setFbPercent(data.changePercent);
      setFbClose(data.close);
    };
    search();
  }, []);
  const colorShift = FbPercent < 0 ? "red" : "green";

  return (
    <div className="stock-company">
      <div className="box">
        <h2>{FbTicker}</h2>
        <p>{FbClose}</p>
      </div>
      <div className="low">
        <p>{FbComp}</p>
        <p className={`${colorShift}`}>{FbPercent}%</p>
      </div>
    </div>
  );
};
export default FB;
