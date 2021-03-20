import React from 'react'
import { useLocation } from "react-router-dom";
import './footer.css'
import logo from '../../images/Logo Med-Blog.svg'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'

const Footer = () => {
    let location = useLocation();

    if (!(location.pathname === '/questions')) {

        return (
            <footer className="mainfooter" role="contentinfo">
                <div className="footer-middle">
                    <div className="container">

                        <div className="row">

                            <div className="col-md-3 mb-2">
                                <h4 className="mb-3 mb-md-2">Contact</h4>
                                <div className="logo mb-3 mb-md-3">
                                    <a href="/"><img src={logo} alt="logo" /></a>
                                </div>

                                <ul className="social-network social-circle">
                                    <li><a href="#/" className="icoFacebook" title="Facebook">
                                        <i className="fa fa-facebook"></i>
                                    </a></li>
                                    <li><a href="#/" className="icoLinkedin" title="Linkedin">
                                        <i className="fa fa-linkedin"></i>
                                    </a></li>
                                    <li><a href="#/" className="icoInstagram" title="Instagram">
                                        <i className="fa fa-instagram"></i>
                                    </a></li>
                                </ul>
                            </div>

                            <div className="col-md-3 col-sm-6">
                                <div className="footer-pad">
                                    <h4>About</h4>
                                    <ul className="list-unstyled ml-2">
                                        <li><a href="/ourself">Ourself</a></li>
                                        <li><a href="/news">News and Updates</a></li>
                                        <li><a href="/faqs">FAQs</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-3 col-sm-6">
                                <div className="footer-pad">
                                    <h4>Sitemap</h4>
                                    <ul className="list-unstyled ml-2">
                                        <li><a href="/disclaimer">Disclaimer</a></li>
                                        <li><a href="/privacy">Privacy Policy</a></li>
                                        <li><a href="/webmaster">Webmaster</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-3 col-sm-6">
                                <div className="footer-pad">
                                    <h4>Services</h4>
                                    <ul className="list-unstyled ml-2">
                                        <li><a href="/">Blog</a></li>
                                        <li><a href="/quiz">Quiz</a></li>
                                        <li><a href="/tips">Tips</a></li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-md-12 copy">
                                <p className="text-center">&copy; Copyright 2021 - Med Blog.  All rights reserved.</p>
                            </div>
                        </div>


                    </div>
                </div>
            </footer>
        )
    }
    else return null;
}

export default Footer