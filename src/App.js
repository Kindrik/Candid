import React, { useState, useEffect } from 'react'
import GitHubCard from './components/GithubCard'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const getRepos = async () => {
	try {
		const res = await fetch('https://api.github.com/search/repositories?q=stars:%3E30000&per_page=100')
		const data = await res.json()
		return data
	} catch (e) {
		return false
	}
}

const GitHubStars = () => {
	const [ repos, setRepos ] = useState([])

	const yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)).toISOString()
	useEffect(() => {
		async function get() {
			const res = await getRepos()
			if (res === false) {
				setRepos(false)
			}
			setRepos(res.items)
		}
		get()
	}, [])
	if (repos === false || repos.message) {
		return <Typography>Uh-Oh, GitHub API seems to be down...</Typography>
	} 
	if (repos && repos.length === 0) {
		return <Typography sx={{textAlign:'center',marginTop:'20px'}}>Getting Repos...</Typography>
	}
	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
      			<AppBar position="static">
        			<Toolbar>
          				<IconButton
            			size="large"
            			edge="end"
            			color="inherit"
            			aria-label="menu"
            			sx={{ mr: 2 }}
          			>
            			<MenuIcon />
          				</IconButton>
          				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Top 100 Starred Repos On Github</Typography>
        			</Toolbar>
      			</AppBar>
    		</Box>
			<Grid container spacing={2} sx={{margin:'20px'}}>
				{ repos.map(repo => (
						<Grid xs={12} md={6} lg={4}>
						<GitHubCard key={repo.name} repo={repo} yesterday={yesterday} />
						</Grid>
				))}
			</Grid>
		</>
	)
}

export default GitHubStars