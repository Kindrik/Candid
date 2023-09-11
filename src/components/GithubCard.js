import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const getCommit = async (owner, repo, yesterday) => {
	try {
		const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?since=${yesterday}`)
		const data = await res.json()
		return data
	} catch (e) {
		return false
	}
}

export default props => {
	const { repo, yesterday } = props
	const [ commit, setCommit ] = useState([])
	const [ clicked, setClicked ] = useState(false)

	const clickCard = async (owner, name, yesterday) => {
		const commitData = await getCommit(owner, name, yesterday)
		setCommit(commitData)
		setClicked(true)
	}

	return (
		<Card sx={{padding:'20px'}} cursor={clicked ? 'initial' : 'pointer'} onClick={() => (clicked ? null : clickCard(repo.owner.login, repo.name, yesterday))}>
				<Typography variant='h5'>{repo.name}</Typography>
				<Typography>{repo.stargazers_count} Stars</Typography>
				<Typography>{repo.html_url}</Typography>
			{commit && commit.length > 0 && (
				<>
					<hr/>
					<Card>
						{commit.map(commitData2 => {
							return (
								<Card sx={{padding:'20px',margin:'10px'}} key={commitData2.commit.author.date} m="3px" p="3px">
									<Typography>{commitData2.commit.author.name}</Typography>
									<Typography>{commitData2.commit.author.date}</Typography>
									<Typography>{commitData2.commit.message}</Typography>
								</Card>
							)
						})}
					</Card>
				</>
			)}
			{clicked && commit.length === 0 && (
				<Typography>No Commits within the last 24 hours</Typography>
			)}
			{clicked && (commit.message || commit === false) && (
				<Typography>Uh-Oh, GitHub API seems to be down...</Typography>
			)}
		</Card>
	)
}