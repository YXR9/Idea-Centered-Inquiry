import React, { useEffect, useState } from 'react';
import config from '../config.json';
import axios from "axios";

export default function Forum() {
    const [activityData, setActivityData] = useState('');
    useEffect(() => {
        const fetchData = await axios
            .get(`${config[6].enterActivity}/${localStorage.getItem('activityId')}`, {
                headers: {
                  authorization: 'Bearer JWT Token',
                },
            })
            .then((response) => {
                setActivityData(fetchData.data)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("server responded");
                } else if (error.request) {
                    console.log("network error");
                } else {
                    console.log(error);
                }
            });
    })
    return (
        <div className="home-container">
        {/* <IndexPage_Navbar /> */}
        <h2>Forum</h2>
    </div>
  )
}