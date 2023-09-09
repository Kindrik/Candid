import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { useSelector } from "react-redux";

export default function StarsCard() {

    const starsRedux = useSelector((state) => state.AppSlice.data);

  return (
    <Grid container spacing={2}>
    {starsRedux.map((stars) => {

      return (
        <Grid key={stars.name} xs={12} sm={12} md={6} lg={4} sx={{padding:'20px'}}>
        <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="h5">{stars.name}</Typography>
                <a href={stars.homepage} target='_blank'><Typography variant="subtitle1">{stars.name}</Typography></a>
                <Typography variant="subtitle2">{stars.stargazers_count}</Typography>
                </CardContent>
            </Box>
        </Card>
    </Grid>
      )

    })}
    </Grid>

  )
}
