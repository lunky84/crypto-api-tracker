import React, {useState, useEffect} from 'react'
import './App.css';
import axios from 'axios';
import Coin from './Coin';

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState("ASC");

  const [selectedColumn, setSelectedColumn] = useState(null);

  const sorting = (col) => {

    setSelectedColumn(col);

    if (order === "ASC") {
      const sorted = [...filteredCoins].sort((a, b) =>
        a[col].substring ? (a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1) : (a[col] > b[col] ? 1 : -1)
      )
      setCoins(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...filteredCoins].sort((a, b) =>
        a[col].substring ? (a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1) : (a[col] < b[col] ? 1 : -1)
      )
      setCoins(sorted);
      setOrder("ASC");
    }
  }


  const toggleActiveStyles = (columnName) => {
    if (columnName === selectedColumn) {
      return columnName + " active";
    } else {
      return columnName;
    }
  }


  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data)
    }).catch(error => console.log(error))
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange} />
        </form>
      </div>
      
      <table className="coin-table">
        <thead>
          <tr>
            <th className={toggleActiveStyles("name")} colSpan="3" onClick={()=>sorting("name")}>Coin</th>
            <th className={toggleActiveStyles("current_price")} onClick={()=>sorting("current_price")}>Price</th>
            <th className={toggleActiveStyles("total_volume")} onClick={()=>sorting("total_volume")}>Volume</th>
            <th className={toggleActiveStyles("price_change_percentage_24h")} onClick={()=>sorting("price_change_percentage_24h")}>%</th>
            <th className={toggleActiveStyles("market_cap")} onClick={()=>sorting("market_cap")}>Mkt Cap</th> 
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map(coin => {
            return (
              <Coin 
              key={coin.id} 
              name={coin.name} 
              image={coin.image} 
              symbol={coin.symbol}
              volume={coin.total_volume}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              marketcap={coin.market_cap}
              toggleActiveStyles={toggleActiveStyles}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
