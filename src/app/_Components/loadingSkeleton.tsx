'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';

interface MediaProps {
    loading?: boolean;
    post:Post
  }

  interface User{
    _id:string;
    name:string;
    photo:string;
  }
  interface CommentCreator{
    _id:string;
    name:string;
    photo:string;
  }

  interface Comments {
    _id:string;
    content:string;
    post:string;
    createdAt:string;
    commentCreator:CommentCreator
  }

  interface Post{
    _id:string;
    body:string;
    image:string;
    user:User;
    createdAt:string
    comments:Comments
  }



export default function LoadingSekeleton(props: MediaProps , params) {
  React.useEffect(()=>{
    console.log(props)
    console.log(params)

  },[])
  function getMonthName(date:object) {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    // getMonth() returns a number from 0 to 11 which is the array length 
    return monthNames[date.getMonth()]; 
  }
  
      const year = new Date(props?.post?.createdAt).getFullYear();
      const date = new Date(props?.post?.createdAt)
      const month = getMonthName(date)
    

  return (
    <Card   sx={{  m: 2, boxShadow:'none' , border:'1px solid (137,137,137,0.6)' , borderRadius:'10px'}}>
      <CardHeader
        avatar={
          props.loading ? (
            <Skeleton   animation="pulse" variant="circular" width={40} height={40} />
          ) : (
            <Avatar
              alt={props.post.user.name}
              src={props.post.user.photo}
            />
          )
        }
        action={
            props.loading ? null : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
            props.loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            props.post.user.name
          )
        }
        subheader={
            props.loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            month+"-"+year
          )
        }
      />
      {props.loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height="140"
          image={props.post.image}
          alt={props.post.body}
        />
      )}
      <CardContent>
        {props.loading ? (
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography variant="body2" component="p" sx={{ color: 'text.secondary' }}>
            {
                props.post.body
            }
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}


