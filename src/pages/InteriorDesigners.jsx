import React from 'react'
import Layout from './layout'
import heroDesktopBanner from "../assets/images/interiorBanner.jpg"
import heroMobileBanner from "../assets/images/interiorMobileBanner.jpg"
import startToFinishBanner from "../assets/images/start-to-finish.jpg"
import halfOverlayBanner from "../assets/images/half-overlay-banner.jpg"
import authorImg from "../assets/images/authorImg.jpg"
import { Link } from 'react-router-dom'
import OurClientSlider from '../components/OurClientSlider'
import HomeTestimonial from '../components/HomeTestimonial';
import IveyExperience from '../components/IveyExperience'
import OurPortfolio from '../components/OurPortfolio'
import OurProcess from '../components/OurProcess'

const InteriorDesigners = () => {
    return (
        <Layout>
            <div className='interior-designer image-banner hero-banner full-screen position-relative color-light d-flex align-end d-ps-100'>
                <picture className="cover bottom-overlay position-absolute top-0 start-0">
                    <source media="(max-width:768px)" srcSet={heroMobileBanner} />
                    <img className="cover" src={heroDesktopBanner} alt="" />
                </picture>
                <div className='container'>
                    <div className='banner-content grid-blocks d-grid large-small gap-40 d-gap-100'>
                        <div className='grid-block'>
                            <div className='summary-block'>
                                <h6 className='mb-20 font-medium'>IVEY FOR DESIGNERS</h6>
                                <h1 className='font-thin mb-20'>the design build firm of choice for Miami’s interior designers</h1>
                                <p>We specialize in bringing interior designers’ visions to life with an attention to detail and adherence to timelines and a level of quality that matches the level of your design. </p>
                            </div>
                        </div>
                        <div className='grid-block d-flex flex-column justify-end pb-20'>
                            <div className='buttons-block d-flex flex-column gap-20 align-start justify-end'>
                                <Link to='/' className='button bottom-border light-border pb-5 pe-10'>View our portfolio</Link>
                                <Link to='/' className='button bottom-border light-border pb-5 pe-10'>Contact our team</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='counter-block bg-black py-60 d-py-100'>
                <div className='container'>
                    <div className='about-detail-right-sec d-ps-100'>
                        <div className='featured-list d-flex'>
                            <div className='featured-list-item d-flex flex-column'>
                                <span className='font-38 text-white'>150+</span>
                                <span className='featured-text font-11 text-white text-uppercase'>BUILD PROJECTS</span>
                            </div>
                            <div className='featured-list-item d-flex flex-column'>
                                <span className='font-38 text-white'>100+</span>
                                <span className='featured-text font-11 text-white text-uppercase'>DESIGN PROJECTS</span>
                            </div>
                            <div className='featured-list-item d-flex flex-column'>
                                <span className='font-38 text-white'>13+</span>
                                <span className='featured-text font-11 text-white text-uppercase'>years experience</span>
                            </div>
                            <div className='featured-list-item d-flex flex-column'>
                                <span className='font-38 text-white'>15+</span>
                                <span className='featured-text font-11 text-white text-uppercase'>CITIES SERVICED</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <OurClientSlider />
            <div className='start-to-finish image-banner hero-banner large-screen position-relative color-light d-flex align-end pb-60'>
                <picture className="cover bottom-overlay position-absolute top-0 start-0">
                    <source media="(max-width:768px)" srcSet={startToFinishBanner} />
                    <img className="cover" src={startToFinishBanner} alt="" />
                </picture>
                <div className='container'>
                    <div className='banner-content grid-blocks d-grid'>
                        <div className='grid-block'>
                            <div className='summary-block'>
                                <h6 className='mb-20 font-medium'>from start to finish</h6>
                                <h2 className='font-thin mb-0'>a turnkey result of your vision brought to life</h2>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <OurProcess />
            <IveyExperience />
            <div className="half-overlay-banner color-light position-relative">
                <picture className="w-100 bottom-overlay position-absolute w-100 h-100">
                    <source media="(max-width:768px)" srcSet={halfOverlayBanner} />
                    <img className="cover" src={halfOverlayBanner} alt="" />
                </picture>
                <div className='contant-box d-flex position-absolute w-100 h-100 top-0 start-0'>
                    <div className="left-block d-flex flex-column justify-center">
                        <div className="summary mb-30 d-mb-50">
                            <h2>“They are extremely hard working, don't take short cuts, do the job properly the first time, follow through until the job is completely finished and get it done promptly.”</h2>
                        </div>
                        <div className='author-block d-flex no-wrap align-center gap-20'>
                            <img className='cover' src={authorImg} alt=''/>
                            <div className='author-detail'>
                                <h3>Brittany Farina</h3>
                                <div className='h6 font-medium'>PRINCIPAL, HOUSE OF ONE MIAMI</div>
                            </div>
                        </div>
                    </div>
                    <div className="right-block h-100 d-flex align-end py-60 d-px-120 py-60">
                        <Link className='button bottom-border light-border pb-5 pe-10'>VIEW PROJECT </Link>
                    </div>
                </div>

            </div>

            <HomeTestimonial />
            <OurPortfolio />
        </Layout>
    )
}

export default InteriorDesigners