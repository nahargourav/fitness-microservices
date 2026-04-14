import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { addActivity } from '../services/api';

const ActivityForm = ({onActivityAdded}) => {

  const [activity,setActivity]=useState({
    type:"RUNNING",duration:'',caloriesBurnt:'',additionalMetrics:{}
  });

  const handleSubmit= async(e)=>{
    e.preventDefault();
    try {
      await addActivity(activity);
      onActivityAdded();
      setActivity({type:"RUNNING",duration:'',caloriesBurnt:'',additionalMetrics:{}});
    } catch (error) {
      console.error("Error adding activity:",error);
    }
  }

  return (
    <Box component="form" sx={{ mb: 2 }} onSubmit={handleSubmit}>
      <FormControl fullWidth sx={{mb:2}}>
        <InputLabel>Activity Type</InputLabel>
        <Select
        label="Activity Type"
          value={activity.type}
          onChange={(event)=>{setActivity({...activity,type:event.target.value})}}
        >
          <MenuItem value="RUNNING">Running</MenuItem>
          <MenuItem value="WALKING">Walking</MenuItem>
          <MenuItem value="CYCLING">Cycling</MenuItem>
        </Select>
      </FormControl>
      <TextField fullWidth 
      label="Duration(minutes)" 
      type='number'
      sx={{mb:2}}
      value={activity.duration} 
      onChange={(event)=>{setActivity({...activity,duration:event.target.value})}} />
      <TextField fullWidth 
      label="Calories Burned" 
      type='number'
      sx={{mb:2}}
      value={activity.caloriesBurnt} 
      onChange={(event)=>{setActivity({...activity,caloriesBurnt:event.target.value})}} />
      <Button type="submit" variant="contained" >Add Activity</Button>
    </Box>
  )
}

export default ActivityForm
