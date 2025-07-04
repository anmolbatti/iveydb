import React from 'react';
import Layout from './layout';
import BlogBlock from '../components/BlogBlock';

export default function Blog() {
  return (
    <>
    <Layout page={"blog"}>
        <div className='inspo-desc blog-desc bg-white d-flex justify-content-center align-items-center'>
            <h6 className='font-11 text-uppercase font-medium'>JOURNAL</h6>
            <h2>from our expert team</h2>
        </div>
        <BlogBlock />

    </Layout>

      
    </>
  )
}
