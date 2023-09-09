import React, { useEffect } from 'react';
import StarsCard from './components/StarsCard';
import { useDispatch } from "react-redux";
import { starsData } from "./Slices/AppSlice";

const App = () => {

  const dispatch = useDispatch();

  // const twentyFourHours = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)).toISOString();

  const getRepos = async () => {
    try {
      const res = await fetch('https://api.github.com/search/repositories?q=stars:%3E30000&per_page=100')
      const data = await res.json();
      return data
    } catch (e) {
      return false
    }
  };

  useEffect(() => {
		async function getStars() {
			const res = await getRepos()
			if (res === false) {
				dispatch(starsData(''));
			}
      dispatch(starsData(res.items));
		}
		getStars();
	}, []);
  
  return (

    <main>
      <StarsCard />
    </main>
  );
}

export default App;
