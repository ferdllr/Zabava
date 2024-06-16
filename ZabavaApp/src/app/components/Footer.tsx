import * as React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
    return (
        <footer>
            <div className='footer-child'>
                <div className="footer-tittles">
                    <h4>Siga a Zabava</h4>
                    <div className="footer-icons-socialmedia">
                        <InstagramIcon />
                        <FacebookIcon />
                        <LinkedInIcon />
                        <TwitterIcon />
                    </div>
                </div>

                <div className="footer-tittles">
                        <h4>Endereço</h4>
                        <div>                        
                            <p>9999 Somewhere Avenue, Executive Offices</p>                        
                        </div>
                        <div>
                            <p>Houston, XX 33333</p>
                        </div>
                </div>          

                <div className="footer-tittles">
                    <h4>Contato</h4>
                    <div className="footer-icons">
                        <p>contatozabava@zabava.com</p>
                    </div>
                </div>
            </div>                              
        </footer>
    );
};

export default Footer;