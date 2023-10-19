import React, { useEffect, useState } from 'react';
import config from '../config.json';
import axios from 'axios';
import ForumPage_Navbar from '../components/ForumPage_Navbar';

export default function Forum() {
  const [activityData, setActivityData] = useState(null);

  useEffect(() => {
    const getActivityData = async () => {
      try {
        const response = await axios.get(`${config[6].enterActivity}/${localStorage.getItem('activityId')}`);
        setActivityData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getActivityData();
  }, []);

  return (
    <div className="home-container">
      <ForumPage_Navbar />
      {activityData && (    // ensure that activityData is not null or undefined before trying to access its properties.
        <>
          <h2>{activityData.title}</h2>
          {/* Render other properties of activityData */}
        </>
      )}
    </div>
  );
}