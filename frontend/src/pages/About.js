import React from 'react';
import AboutBackgroundImage from "../assets/about-background-image.png";
// import { BsFillPlayCircleFill } from "react-icons/bs";

export default function About() {
  return (
    <div className="about-section-container">
        <div className="about-section-image-container">
          <img src={AboutBackgroundImage} alt="" />
        </div>
        <div className="about-section-text-container">
            <p className="primary-subheading">關於我們</p>
            <h1 className="primary-heading">
                「探究學習」一直是現代科學教育的重點
            </h1>
            <p className="primary-text">
                如何設計幫助學生形成想法、聚焦想法的合作科學探究教學活動，以及如何在教學中引導學生像科學家一樣思考與動手做，都將會是108課綱的實施成功與否的重要關鍵！
            </p>
            <div className="about-buttons-container">
              {/* <button className="secondary-button">Learn More</button>
              <button className="watch-video-button">
                <BsFillPlayCircleFill /> Watch Video
              </button> */}
            </div>
        </div>
    </div>
  )
}