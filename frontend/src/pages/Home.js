import React from "react";
import Navbar from "../components/Navbar";
import BannerImage from "../assets/home-banner-image.png";
import { FiArrowRight } from "react-icons/fi";
import { Register } from "../components/Register";

export default function Home() {
    return (
        <div className="home-container">
            <Navbar />
            <div className="home-banner-container">
                <div className="home-text-section">
                    <h1 className="primary-heading">
                        以想法為中心，
                        <br/>
                        盡情探究
                    </h1>
                    <button className="secondary-button">
                        加入我們吧！前往
                        <Register />
                        <FiArrowRight />{" "}
                    </button>
                </div>
                <div className="home-image-section">
                    <img src={BannerImage} alt="" />
                </div>
            </div>
        </div>
    )
}