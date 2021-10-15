import {useState, useEffect } from 'react'
import Coin from './Coin'
import axios from 'axios'
import './App.css'
function App() {

    const [coins, setCoins] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
       axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
       .then(res =>{
           setCoins(res.data)
       })
    })

    const handleSearch = e => {
        setSearch(e.target.value)
    }

    const filteredCoins = coins.filter(coin => 
        coin.name.toLowerCase().includes(search.toLowerCase())
        )

  return (
      <div className="coin-app">
          <div className='coin-search'>
                <div className="title">
                    <img  alt="" src="images.png" width="50" />
                    <h3>Coinpal</h3>
                </div>
              <form>
                  <input type="text" placeholder='search' className='coin-input' onChange={handleSearch}/>
              </form>
          </div>
          {filteredCoins.map(coin => {
              return(
                  <Coin 
                  key={coin.id} 
                  name={coin.name} 
                  image={coin.image}
                  symbol={coin.symbol}
                  marketcap = {coin.market_cap}
                  price = {coin.current_price}
                  priceChange = {coin.price_change_percentage_24h}
                  volume ={coin.total_volume}
                  />);
          })}

      </div>
  );
}

export default App;
