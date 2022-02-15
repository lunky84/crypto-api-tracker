import React from 'react'
import './Coin.css'

const Coin = ({name, image, symbol, price, volume, priceChange, marketcap, toggleActiveStyles}) => {
  return (
    <tr className="coin-row">
        <td className={toggleActiveStyles("name")}><img src={image} alt="Crypto" /></td>
        <td className={toggleActiveStyles("name")}>{name}</td>
        <td className={toggleActiveStyles("name")}><span className="symbol">{symbol}</span></td>
        <td className={toggleActiveStyles("current_price")}>${price.toLocaleString()}</td>
        <td className={toggleActiveStyles("total_volume")}>${volume.toLocaleString()}</td>
        {priceChange < 0 ? (
            <td className={toggleActiveStyles("price_change_percentage_24h")}><span className="red">{priceChange.toFixed(2)}%</span></td>
        ) : (
            <td className={toggleActiveStyles("price_change_percentage_24h")}><span className="green">{priceChange.toFixed(2)}%</span></td>
        )}
        <td className={toggleActiveStyles("market_cap")}>${marketcap.toLocaleString()}</td>       
    </tr>
  )
}

export default Coin