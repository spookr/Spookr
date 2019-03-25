import React from 'react'
import './Footer.scss'

const Footer = (props) => {
  return (
    <footer>
      <div className="FooterContainer">
        <div className="FooterCompany">
          <ul>
            <li id="Header">Product</li>
            <li>Download</li>
            <li>Branding</li>
            <li>Nitro</li>
          </ul>
        </div>
        <div className="FooterResources">
          <ul>
            <li id="Header">Resources</li>
            <li>Paranormal Findings</li>
            <li>Ghost Etiquette</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div className="FooterConnect">
          <ul>
            <li id="Header">Company</li>
            <li>About</li>
            <li>Blog</li>
            <li>Jobs</li>
          </ul>
        </div>
        <div className="FooterDeveloper">
          <ul>
            <li id="Header">Connect</li>
            <li>Contact Us</li>
            <li>Testimonies</li>
            <li>Meet The Developers</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
