import React from 'react'
import './Footer.scss'

const Footer = (props) => {
  return (
    <footer>
      <div className="FooterContainer">
        <div className="FooterCompany">
          <ul>
            <li id="Header">Company</li>
            <li>About</li>
            <li>Blog</li>
            <li>Jobs</li>
          </ul>
        </div>
        <div className="FooterResources">
          <ul>
            <li id="Header">Resources</li>
            <li>Afterlife</li>
            <li>Feedback</li>
            <li>Careers </li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div className="FooterConnect">
          <ul>
            <li id="Header">Connect</li>
            <li>Contact Us</li>
            <li>Press Information</li>
            <li>Afterlife Education</li>
          </ul>
        </div>
        <div className="FooterDeveloper">
          <ul>
            <li id="Header">More</li>
            <li>Meet The Developers</li>
            <li>Testimonies</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
