import React from 'react'
import Layout from './layout'
import InstagramSlider from '../components/InstagramSlider'
import ContactBanner from '../components/ContactBanner'

export default function Contact() {
  return (
    <>
    <Layout page={"contact"}>
        <ContactBanner />
        <div className='contact-instagram-sec'>
            <InstagramSlider/>
        </div>

    </Layout>
      
    </>
  )
}
