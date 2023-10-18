import React from 'react';
import { styled, Card, CardHeader, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import { MoreVert, Favorite } from '@mui/icons-material';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#E3DFFD',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const EnterActivity = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export default function ActivityCard({ activity }) {
    const formatTimestamp = (timestamp) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            //   second: 'numeric',
            hour12: false,
        }).format(new Date(timestamp));
    };

    return (
    <div>
        <Item>
            <CardHeader
                title={activity.ActivityGroup.Activity.title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {`${formatTimestamp(activity.ActivityGroup.Activity.startDate)} ~ ${formatTimestamp(activity.ActivityGroup.Activity.endDate)}`}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Favorite />
                </IconButton>
                <EnterActivity>
                    <button className='enter-activity-button'>進入活動</button>
                </EnterActivity>
            </CardActions>
        </Item>
    </div>
  );
}