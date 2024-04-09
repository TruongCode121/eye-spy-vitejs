import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
const Cards = ({data}) => {
      return (
            <Card sx={{ maxWidth: '100%' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  // height=""
                  image="https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {data.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Username: {data.username} <br />
                  Fullname: {data.fullname} <br />
                  Department: {data.department} <br />
                  Position: {data.position} <br />
                  {data.createdate}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
};

export default Cards;