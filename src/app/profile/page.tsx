import React from 'react'
import InfoSection from '../_Components/InfoSection';
import { Box, Grid, Typography } from '@mui/material';

export default async function Profile() {
    
        const personalInfo = await fetch('https://linked-posts.routemisr.com/users/profile-data',{
            method:'GET',
            next:{
                revalidate:60*60
            },
            headers:{
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZmYmNmMmE4MDNmNzZiZjAwNWQwOWVmIiwiaWF0IjoxNzI4MzI5ODUzfQ.1aCHpJMVdW_M7nySJaLFzXJQYkfKUDPeAR_m1bhwxCg",
            }
        })
        const info = await personalInfo.json();
        console.log(info)

        const userPosts = await fetch('https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts?limit=2',{
            method:'GET',
            next:{
                revalidate:60*60
            },
            headers:{
                token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjcwYTE1Nzg4MDNmNzZiZjAwN2E5Njc4IiwiaWF0IjoxNzI4NzE0MTQ2fQ.zwFjFIzOlvXLbzNeswtOjh07gbmjBCA5_rrWcNVJEaE"
            }
        })

        const posts = await userPosts.json()
        console.log(posts)
    
    
    return <>

<Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'row' }}>
  <Grid container spacing={2}>
    <Grid
      item
      xs={12}
      md={4}
      lg={4}
      sx={{
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center'
      }}
    >
      <InfoSection />
    </Grid>
    <Grid item xs={12} md={8} lg={8} >
      <Typography>
        FETCH DATA HERE
      </Typography>
    </Grid>
  </Grid>
</Box>



    
    </>
}
