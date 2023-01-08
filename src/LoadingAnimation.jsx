import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function LoadingAnimation() {
  return (

    <>
    <div className='loader' >
      <Box sx={{ display: 'flex' }}>
      <CircularProgress color="secondary" />
    </Box>
    </div>

    </>
  )
}

export default LoadingAnimation
