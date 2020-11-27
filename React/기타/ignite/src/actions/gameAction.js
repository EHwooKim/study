import axios from 'axios'
import { popularGamesURL, newGamesURL, upcomingGamesURL } from '../api'

export const loadGames = () => async (dispatch) => {
  const popularData = await axios.get(popularGamesURL())
  const newGameData = await axios.get(newGamesURL())
  const upcomingData = await axios.get(upcomingGamesURL())

  dispatch({
    type: 'FETCH_GAMES',
    payload: {
      popular: popularData.data.results,
      upcoming: upcomingData.data.results,
      newGmes: newGameData.data.results
    }
  })
}

