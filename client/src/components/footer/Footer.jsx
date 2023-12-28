import React from 'react'
import "./footer.scss"
//Contacts
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Footer = () => {
  return (
    <nav>
        <div className="part1">

            <h1 className="logo">BookLogger</h1>
        </div>
        <div className="part2">
            <h3>Discover Books</h3>
            <ul className="discoverOptions">
                <li>Action & Adventure</li>
                <li>Mystery</li>
                <li>Horror</li>
                <li>Graphic Novel</li>
                <li>Biography</li>
            </ul>
        </div>  
        <div className="part3">
            <h3>Contacts</h3>
            <ul className="contactOptions">
                <li><GitHubIcon/></li>
                <li><TwitterIcon/></li>
                <li><LinkedInIcon/></li>
            </ul>
        </div>  
    </nav>
  )
}

export default Footer