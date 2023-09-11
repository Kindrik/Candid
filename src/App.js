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
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';


const getRepos = async () => {
	try {
		const res = await fetch('https://api.github.com/search/repositories?q=stars:%3E30000&per_page=100')
		const data = await res.json()
		return data
	} catch (e) {
		return false
	}
}

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const GitHubStars = () => {
	const [ repos, setRepos ] = useState([])
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
  
	const handleOpenNavMenu = (event) => {
	  setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
	  setAnchorElUser(event.currentTarget);
	};
  
	const handleCloseNavMenu = () => {
	  setAnchorElNav(null);
	};
  
	const handleCloseUserMenu = () => {
	  setAnchorElUser(null);
	};

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
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
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