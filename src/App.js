import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

const App = () => {

  const [stars, setStars] = useState([]);

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
				setStars(false)
			}
			setStars(res.items);
		}
		getStars();
	}, []);
  
  return (
    <main>
      {console.log('test response:', stars)}
      <Grid container spacing={2}>
      {stars.map((stars) => {

        return (
          <Grid xs={12} sm={12} md={6} lg={4} sx={{padding:'20px'}}>
          <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">{stars.name}</Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">{stars.url}</Typography>
                <Typography variant="subtitle2" color="text.secondary" component="div">{stars.stargazers_count}</Typography>
              </CardContent>
            </Box>
          </Card>
          </Grid>
        )

      })}
      </Grid>
    </main>
  );
}

export default App;
