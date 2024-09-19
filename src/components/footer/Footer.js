import React from 'react'
import './Footer.css'
import logo from './asset/motorgp-logo.png'
import fbicon from './asset/facebook.png'
import igicon from './asset/instagram.png'
import xicon from './asset/twitter.png'
import tticon from './asset/tiktok.png'
import yticon from './asset/youtube.png'
import scicon from './asset/snapchat.png'
const Footer = () => {
    return (
        <>
            <div class="container-fluid container-banner">
                <div>
                    <img alt="Misano MotoGP™ Official Test" src="https://esport.motogp.com/uploads/abd526905fabd87f952df026f216b637.jpg" class="w-100 banner"></img>
                </div>
            </div>
            <div class="pb-4 pt-4 ">
                <div class="container-fluid overflow-hidden">
                    <div class="row">
                        <div class="col">
                            <div class="container-fluid border border-dark">
                                <div class="footer-sponsors__container">
                                    <div class="footer-sponsors__title">Official Sponsors</div>
                                    <div class="d-flex justify-content-center sponcor-list">
                                        <a href="https://www.qatarairways.com/es-es/homepage.html" class="footer-sponsors__sponsor" title="QATAR" target="_blank" rel="noopener">
                                            <img class="sponcor-logo" src="https://resources.motogp.pulselive.com/photo-resources/2024/05/09/74b76695-1cf4-4776-8a3a-e5e28a32b484/sponsor-qatar.png?width=100" alt="sponsor-qatar"></img>
                                        </a>
                                        <a href="https://www.tissotwatches.com" class="footer-sponsors__sponsor" title="TISSOT" target="_blank" rel="noopener">
                                            <img class="sponcor-logo" src="https://resources.motogp.pulselive.com/photo-resources/2024/09/12/179ab216-720b-4b7c-bc32-c7579a8b1cc2/Tissot_Main_Sponsor.png?width=100" alt="Tissot_Main_Sponsor"></img>
                                        </a>
                                        <a href="https://www.michelinmotorsport.com/en/motorsport/" class="footer-sponsors__sponsor" title="MICHELIN">
                                            <img class="sponcor-logo" src="https://resources.motogp.pulselive.com/photo-resources/2023/03/27/6499fb7c-58c7-4e12-b107-98156ed85931/MICHELIN_logo.png?width=100" alt="MICHELIN_logo"></img>
                                        </a>
                                        <a href="https://www.bmw-m.com/en/fastlane/motogp.html" class="footer-sponsors__sponsor" title="BMW M" target="_blank" rel="noopener">
                                            <img class="sponcor-logo" src="https://resources.motogp.pulselive.com/photo-resources/2023/10/25/f0612155-0f76-452f-9db8-348c37fdd01b/BMW-M_logo.png?width=100" alt="BMW-M_logo"></img>
                                        </a>
                                        <a href="https://estrellagalicia00.es/moto/moto-moto-gp/" class="footer-sponsors__sponsor" title="ESTRELLA GALICIA" target="_blank" rel="noopener">
                                            <img class="sponcor-logo" src="https://resources.motogp.pulselive.com/photo-resources/2023/04/17/8a22cccc-b9e4-4b80-8a78-da85a042adf2/EstrellaGalicia_Logo.png?width=100" alt="EstrellaGalicia_Logo"></img>
                                        </a>
                                        <a href="https://www.dhl.com/global-en/home/about-us/partnerships.html" class="footer-sponsors__sponsor" title="DHL">
                                            <img class="sponcor-logo" src="https://resources.motogp.pulselive.com/photo-resources/2023/03/27/ef2af200-beec-45b5-bfac-0e9b453ad4ed/DHL_logo.png?width=100" alt="DHL_logo"></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pb-4 pb-md-5">
                <div class="container-fluid overflow-hidden">
                    <div class="row">
                        <div class="col">
                            <div class="container-fluid border border-dark">
                                <div class="row gy-4 gy-lg-0 p-3 p-md-4 p-xxl-5 align-items-md-center">
                                    <div class="col-xs-12 col-sm-6 col-lg-4 order-0 order-lg-0">
                                        <div class="footer-logo-wrapper text-center text-sm-start">
                                            <a href="#!">
                                                <img src={logo} alt="Logo" style={{ width: '100px', height: '65px', marginRight: '5px' }} ></img>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-lg-4 order-2 order-lg-1">
                                        <div class="colophon-wrapper">
                                            <div class="footer-copyright-wrapper text-center">
                                                &copy; 2024. All Rights Reserved.
                                            </div>
                                            <div class="credits text-dark mt-2 fs-8">
                                                All trademarks are the property of their respective owners
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-lg-4 order-1 order-lg-2">
                                        <div class="social-media-wrapper">
                                            <ul class="list-unstyled m-0 p-0 d-flex justify-content-center justify-content-sm-end">
                                                <li class="me-3">
                                                    <a href="https://www.facebook.com/MotoGP" target="_blank" rel="noopener" class="link-dark link-opacity-75-hover">
                                                        <img src={fbicon} alt="Logo" style={{ width: '30px', height: '30px' }} ></img>
                                                    </a>
                                                </li>
                                                <li class="me-3">
                                                    <a href="https://x.com/MotoGP" target="_blank" rel="noopener" class="link-dark link-opacity-75-hover">
                                                        <img src={xicon} alt="Logo" style={{ width: '30px', height: '30px' }} ></img>
                                                    </a>
                                                </li>
                                                <li class="me-3">
                                                    <a href="https://www.youtube.com/user/MotoGP" target="_blank" rel="noopener" class="link-dark link-opacity-75-hover">

                                                        <img src={yticon} alt="Logo" style={{ width: '30px', height: '30px' }} ></img>
                                                    </a>
                                                </li>
                                                <li class="me-3">
                                                    <a href="https://www.tiktok.com/@motogp" target="_blank" rel="noopener" class="link-dark link-opacity-75-hover">
                                                        <img src={tticon} alt="Logo" style={{ width: '30px', height: '30px' }} ></img>
                                                    </a>
                                                </li>
                                                <li class="me-3">
                                                    <a href="https://www.instagram.com/motogp" target="_blank" rel="noopener" class="link-dark link-opacity-75-hover">
                                                        <img src={igicon} alt="Logo" style={{ width: '30px', height: '30px' }} ></img>
                                                    </a>
                                                </li>
                                                <li class="">
                                                    <a href="https://www.snapchat.com/add/motogp" target="_blank" rel="noopener" class="link-dark link-opacity-75-hover">
                                                        <img src={scicon} alt="Logo" style={{ width: '30px', height: '30px' }} ></img>
                                                    </a>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Footer;