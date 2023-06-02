import config from '../config.json';
import axios from "axios";
import React, {useState, useEffect, useRef} from 'react';
import IndexPage_Navbar from '../components/IndexPage_Navbar';
import { styled, Grid, Avatar, Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Select, InputLabel, MenuItem, FormControl, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#E3DFFD',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

export default function Index() {
    const [all, setAll] = useState('');

    const handleChange = (event) => {
      setAll(event.target.value);
    };

    return (
      <div className="home-container">
            <IndexPage_Navbar/>
            <h2>
                我們的探究活動
            </h2>
            <Box sx={{ maxWidth: 120 }} className='activity-status'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">狀態</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={all}
                    label="狀態"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>全部</MenuItem>
                    <MenuItem value={20}>已完成</MenuItem>
                    <MenuItem value={30}>進行中</MenuItem>
                    <MenuItem value={30}>未開始</MenuItem>
                  </Select>
                </FormControl>
            </Box>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
            >
              <Grid item xs={10}>
                <Grid container justifyContent="center" spacing={4}>
                  <Grid item xs={6}>
                      <Item>
                          <CardHeader
                            action={
                              <IconButton aria-label="settings">
                                <MoreVertIcon />
                              </IconButton>
                            }
                            title="主題："
                            subheader="活動代碼："
                          />
                          <CardContent>
                            <Typography variant="body2" color="text.secondary">
                              This impressive paella is a perfect party dish and a fun meal to cook
                              together with your guests. Add 1 cup of frozen peas along with the mussels,
                              if you like.
                            </Typography>
                          </CardContent>
                      </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>2</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>3</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>4</Item>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
      </div>
    )
}
