import React from 'react'
import Logo from "../assets/idea centered inquiry_logo.png";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          <img src={Logo} alt="" />
        </div>
        <div className="footer-icons">
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <span>Help</span>
        </div>
        <div className="footer-section-columns">
          <span>905-952-122</span>
          <span>xryang18@gmail.com</span>
        </div>
      </div>
    </div>
  )
}