import { Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { getActivities } from '../services/api';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);
  return (
    <Grid container spacing={2}>
      {activities.map((activity) => (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Card sx={{cursor: 'pointer'}}
            onClick= {() => navigate(`/activities/${activity.id}`)}>
                <CardContent>
                  <Typography variant='h6'>{activity.type}</Typography>
                  <Typography>Duration: {activity.duration}</Typography>
                  <Typography>Calories: {activity.caloriesBurnt}</Typography>
                </CardContent>
            </Card>
        </Grid>
      ))}
  </Grid>
  )
}

export default ActivityList

// <Grid item key={activity.id} xs={12} sm={6} md={4}>
                //     <Box sx={{border:'1px solid grey',padding:2,cursor:'pointer'}}
                //     onClick={()=>navigate(`/activities/${activity.id}`)}>
                //         <h3>{activity.type}</h3>
                //         <p>Duration: {activity.duration} minutes</p>
                //         <p>Calories Burnt: {activity.caloriesBurnt}</p>
                //     </Box>
                // </Grid>