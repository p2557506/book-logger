import React from 'react'
import "./footer.scss"
//Contacts
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Footer = () => {
  return (
    <nav>
        
        <div className="part1">
            <ul className="discoverOptions">
                <li>About</li>
                <li>Help</li>
                <li>Terms of Service</li>
            </ul>
            <p>© BookLogger 2025</p>
        </div>  
        <div className="part2">
            <ul className="contactOptions">
                <li><a href="https://github.com/p2557506" target='_blank'><GitHubIcon style={{fontSize:35}}/></a></li>
                
                <li><a href="https://www.linkedin.com/in/isaaczerououl/" target='_blank'><LinkedInIcon style={{fontSize:35}}/></a></li>
            </ul>
        </div>  
    </nav>
  )
}

export default Footer