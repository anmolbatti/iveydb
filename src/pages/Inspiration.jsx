import React from 'react'
import Layout from './layout'
import InspirationBanner from '../components/InspirationBanner'
import InspoDetail from '../components/InspoDetail'
import InspoDetail2 from '../components/InspoDetail2'

export default function Inspiration() {
  return (
    <>
    <Layout page={"inspiration"}>
        <div className='inspo-desc bg-white d-flex justify-content-center align-items-center' data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
            <h6 className='font-11 text-uppercase font-medium'>INSPIRATION</h6>
            <h2>what’s on our mind and moodboards from the design and build world</h2>
        </div>
        <InspoDetail />
        <InspirationBanner />
        <div className='inspo-detail-botm bg-white'>
            <InspoDetail2 />
        </div>

    </Layout>
      
    </>
  )
}
