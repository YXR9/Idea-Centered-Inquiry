import React from 'react';
import { styled, Card, CardHeader, CardActions, IconButton } from '@mui/material';
import { MoreVert, Favorite } from '@mui/icons-material';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#E3DFFD',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

export default function ActivityCard({ activity }) {
  return (
    <div>
        <Item>
            <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVert />
                  </IconButton>
                }
                title={activity.ActivityGroup.Activity.title}
            />
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Favorite />
                </IconButton>
            </CardActions>
        </Item>
    </div>
  )
}
