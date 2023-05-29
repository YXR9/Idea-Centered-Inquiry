import config from '../config.json';
import axios from "axios";
import React, {useState, useEffect, useRef} from 'react';
import IndexPage_Navbar from '../components/IndexPage_Navbar';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function Index() {
    
    return (
      <div className="home-container">
            <IndexPage_Navbar/>
            index
      </div>
    )
}
