'use client'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { Avatar, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { userSliceActions } from '@/lib/UserSlice';
import { useDispatch } from 'react-redux';

export default function InfoSection() {

    const theme = useTheme();
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const [userInfo,setUserInfo] = useState('')
    const [memberDate,setMemberDate] = useState('');
    const [memberSinceMonth,setMemberSinceMonth] = useState('')
    const [isFetched,setIsFetched] = useState(false);
    const dispatch = useDispatch()

    const Months = [
        'January','February','March','April','May','June','July','August','September','October','November','December'
    ]
 

    async function getInfo (){

        

        const Response = await fetch('https://linked-posts.routemisr.com/users/profile-data',{
            method:'GET',
            headers:{
                token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjcwYTE1Nzg4MDNmNzZiZjAwN2E5Njc4IiwiaWF0IjoxNzI4NzE0MTQ2fQ.zwFjFIzOlvXLbzNeswtOjh07gbmjBCA5_rrWcNVJEaE",

            }
        })

        const Info = await Response.json()
        setUserInfo(Info.user);
        setIsFetched(true)
        const memberSince = new Date(Info?.user.createdAt).getFullYear();
        const MonthMember = new Date(Info?.user.createdAt).getMonth();
        setMemberSinceMonth(Months[MonthMember])
        setMemberDate(memberSince)
        dispatch(userSliceActions.getPhoto(Info?.user?.photo))

    } 


    useEffect(()=>{
        getInfo();
    },[])

    return <>

    
                    <Box sx={{display:'flex' , justifyContent:'center' , marginBottom:'10px'}}>  
                        {!isFetched ? <Skeleton variant="circular" width={80} height={80} /> : <Avatar alt="User name" src={userInfo?.photo} sx={{ width: 80, height: 80 }} />}
                    

                    </Box>

                

                <Box sx={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'start'
                    }}>
                        <Typography>
                            {userInfo?.name  ? userInfo?.name : <Skeleton sx={{marginTop:'5px'}} variant="rectangular" width={180} height={20} />}
                        </Typography>
                        <Typography>
                        { !isFetched ? <Skeleton sx={{marginTop:'5px'}} variant="rectangular" width={90} height={20} />  : userInfo?.gender ? userInfo.gender[0].toUpperCase() + userInfo.gender.slice(1) : ''}
                        </Typography>
                        <Typography  >
                            { !isFetched ?  <Skeleton variant="rectangular" sx={{marginTop:'5px'}} width={180} height={20} /> :   memberSinceMonth+' ' + memberDate }
                        </Typography>
                    </Box>

    
    </>
}
