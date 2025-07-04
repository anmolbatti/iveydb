import React from 'react'
import { Link } from 'react-router-dom';
import '../Footer/Footer.css';

export default function Footer() {
  return (
    <>
    <div className="footer d-flex justify-content-between w-100">
    <div className="footer-section">
      <h4 className='text-white text-uppercase'>Get in Touch</h4>
      <ul>
        <li><Link className='text-white font-18 font-thin' to="/contact">contact us</Link></li>
        <li><Link className='text-white font-18 font-thin' to="/instagram">instagram</Link></li>
      </ul>
    </div>
    <div className="footer-section">
      <h4 className='text-white text-uppercase'>About Ivey</h4>
      <ul>
        <li><Link className='text-white font-18 font-thin' to="/projects">projects</Link></li>
        <li><Link className='text-white font-18 font-thin' to="/about">about ivey</Link></li>
        <li><Link className='text-white font-18 font-thin' to="/inspiration">inspo</Link></li>
        {/* <li><Link className='text-white font-18 font-thin' to="/blog">blog</Link></li>         */}
      </ul>
    </div>
    <div className="footer-section">
      <h4 className='text-white text-uppercase'>Services</h4>
      <ul>
        <li><Link className='text-white font-18 font-thin' to="/about#about-services">our services</Link></li>        
        <li><Link className='text-white font-18 font-thin' to="/vendors">for vendors</Link></li>
      </ul>
    </div>
    <div className="footer-section text-white">
      <h3>Stay in touch, get inspired</h3>
      <p>We post about our experience and what’s new in the industry every so often. Sign up for our newsletter to keep up. </p>
      <form className="newsletter-signup">
        <input type="email" placeholder="email"/>
        <button type="submit" className='sign-up-btn'>Sign up</button>
      </form>

      <div className="build-by" bis_skin_checked="1">
        <a href="https://themilkbar.co/" target="_blank">
          <span class="small-text">bulit by</span>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARwAAABACAYAAADIz8jYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAxIDc5LjE0ZWNiNDJmMmMsIDIwMjMvMDEvMTMtMTI6MjU6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyNC4yIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBQTUwMTk4MUYzNzQxMUVGQTdGNUE3RDYxQjkyQkZBRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBQTUwMTk4MkYzNzQxMUVGQTdGNUE3RDYxQjkyQkZBRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkFBNTAxOTdGRjM3NDExRUZBN0Y1QTdENjFCOTJCRkFEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkFBNTAxOTgwRjM3NDExRUZBN0Y1QTdENjFCOTJCRkFEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+BVddPAAACc5JREFUeNrs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" />
        </a>
      </div>
    </div>
  </div>
      
    </>
  )
}
