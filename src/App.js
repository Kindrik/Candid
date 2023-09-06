import React, { useState, useEffect } from 'react';

const App = () => {

  const [stars, setStars] = useState([]);

  const getRepos = async () => {
    try {
      const res = await fetch('https://api.github.com/search/repositories?q=stars:%3E30000&per_page=100')
      const data = await res.json()
      return data
    } catch (e) {
      return false
    }
  }

  useEffect(() => {
		async function getStars() {
			const res = await getRepos()
			if (res === false) {
				setStars(false)
			}
			setStars(res.items);
		}
		getStars();
	}, []);
  
  return (
    <main>
      {console.log('test response:', stars)}
    </main>
  );
}

export default App;
