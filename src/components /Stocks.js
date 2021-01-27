import { useState, useEffect } from "react";
import axios from "axios";
import GOOGL from "./GOOGL";
import TSLA from "./TSLA";
import SNAP from "./SNAP";
import FB from "./FB";

const BASE_URL = `${process.env.REACT_APP_STOCK_URL}`;
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const Stocks = () => {
  const [stockName, setStockName] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get(`${BASE_URL}${stockName}${API_KEY}`);
      setName(data);
      console.log(data);
    };

    const timeoutID = setTimeout(() => {
      search();
    }, 500);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [stockName]);

  const displayResult = () => {
    const colorChange = name.changePercent < 0 ? "red" : "green";
    if (name) {
      return (
        <div className="stock-company">
          <div className="box">
            <h2>{name.symbol}</h2>
            <p>{name.close}</p>
          </div>
          <div className="low">
            <p>{name.companyName}</p>
            <p className={`${colorChange}`}>
              {(name.changePercent * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="shares">
      <div className="">
        <GOOGL />
        <TSLA />
        <SNAP />
        <FB />
        <div className="box2">
          <input
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
            type="Search"
            placeholder="Search..."
          />
        </div>
      </div>
      <div>{displayResult()}</div>
    </div>
  );
};

export default Stocks;
