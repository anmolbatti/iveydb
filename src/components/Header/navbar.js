import React, { useState, useEffect } from 'react';
import "../Header/header.css";
import { Link } from 'react-router-dom';
import menuIcon from "../../assets/images/menu-icon.svg";
import closeIcon from "../../assets/images/close-icon.png";
import logourl from '../../assets/images/logo.png';
import featuredimage1 from '../../assets/images/feautred-image1.jpg';
import featuredimage2 from '../../assets/images/featuredimage2.jpg';
import featuredimage3 from '../../assets/images/featured-image3.jpg';
import blacklogo from '../../assets/images/site-logo-dark.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import config from '../../config';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(null); // Track selected tab
  const [menuItems, setMenuItems] = useState([
    { name: '', subMenus: [{ name: '', link: '' }] } // Initialize with link key
  ]);

  const [projects, setProjects] = useState([]);


  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = (event) => {
    event.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  const displayEstTime = () => {
    var date = new Date();
    var date = new Date(date.toLocaleString("en-US", {timeZone: "America/New_York"}));

    const hours = date.getHours();
    const mins = date.getMinutes();

    return `${hours === 0 ? 12 : hours%12}:${mins} ${hours > 12 ? "pm" : "am"}`;
  }


  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.classList.add('menu-open');
    } else {
      document.documentElement.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
        document.documentElement.classList.add('header-scrolled');
      } else {
        setIsScrolled(false);
        document.documentElement.classList.remove('header-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);

    if (menuItems.length > 1) {
      const pathname = location.pathname + location.hash;
      const currentIndex = menuItems.findIndex(item => item.mainLink === pathname);

      if (currentIndex === -1) {
        setSelectedTabIndex(null);
      } else {
        setSelectedTabIndex(currentIndex);
      }
    }
  }, [navigate, menuItems, location]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-projects`, {
                withCredentials: true
            });
            setProjects(response.data.slice(0, 5));
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };
    fetchProjects();
  }, []);


  const fetchMenuDetails = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/admin/get-menu-items/`, { withCredentials: true });

      if (response.data.length > 0) {
        setMenuItems(response.data[0].menuData);
        // setMenuId(response.data[0]._id);
        // setAddNew(false);
      } else {
        // setAddNew(true);
      }
    } catch (err) {
      // setError('Failed to fetch location details');
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuDetails();
  }, []);

  const toggleMenuTab = (index) => {
    setSelectedTabIndex(index);
  }

  const megamenusliderSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [      
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,          
          centerMode: false,
        },
      },
    ]
  };


  return (
    <div className={isScrolled ? 'header scrolled' : 'header'}>
      <div className="container">
        <div className="header-main d-flex justify-content-between align-items-center">
          <div className="header-left d-flex align-items-center text-white border-right">

            {props.page === "home" && (
              <div className='user-detail'>
                <span className='user-name'>miami</span>
                <span className='time-sec'>{displayEstTime()}</span>
              </div>
            )}
            {isMobile && (props.page !== "home") && (
              <div className='user-detail'>
                <span className='user-name'>miami</span>
                <span className='time-sec'>{displayEstTime()}</span>
              </div>
            )}
            {!isMobile && (props.page !== "home") && (
              <Link to="/" className="header-logo header-logo-project">
                <img src={logourl} alt="header-logo" />
              </Link>
            )}
          </div>
          {/* <Link to="/" className="header-logo">
              <img src={logourl} alt="header-logo" />
            </Link> */}
          <div className="header-right d-flex align-items-center border-right">
            <Link to="/contact" className="header-contact  text-white">contact</Link>
            <Link className="navbar-toggler text-white" to="/" onClick={toggleMenu}>
              <span className="navbar-toggler-icon">
                {isMenuOpen ? <img src={closeIcon} alt="close-icon" /> : <img src={menuIcon} alt="menu-icon" />}
              </span>
            </Link>
          </div>
          <div className={`header-navbar ${isMenuOpen ? 'show' : ''}`}>
            <Link to="/" className="header-logo-menu">
              <img src={blacklogo} alt="header-logo" />
            </Link>
            <div className='mega-menu-botm d-flex'>
              <div className='mega-menu-tabs text-black'>
                <ul className='mega-menu-tab-title'>
                  {menuItems.map((item, index) => (
                    (item.mainLink !== "" && item?.subMenus.length === 0) ? (
                      <li
                        key={index}
                        className={`font-12 text-uppercase ${selectedTabIndex !== null && selectedTabIndex === index ? 'active' : ''}`}
                        onMouseLeave={() => setSelectedTabIndex(null)}
                        onMouseEnter={() => setSelectedTabIndex(index)}
                      >
                        <Link 
                          to={item.mainLink} 
                          onClick={() => setSelectedTabIndex(index)} 
                        >
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ) : (
                      <li
                        key={index}
                        className={`font-12 text-uppercase hasSubmenu ${selectedTabIndex !== null && selectedTabIndex === index ? 'active' : ''}`}
                        onMouseLeave={() => setSelectedTabIndex(null)}
                        onMouseEnter={() => setSelectedTabIndex(index)}
                      >
                        <span 
                          onClick={() => setSelectedTabIndex(index)}
                        >
                            {item.name}
                        </span>

                        <ul class="sub-menu">

                          {selectedTabIndex !== null && selectedTabIndex === index && (item?.subMenus.map(item => (
                            <li><Link to={item.link} className='font-18 menu-link font-medium'>
                              {item.name}
                            </Link></li>
                          )))}

                        </ul>
                      </li>
                    )

                  ))}
                </ul>
              </div>
              <div className='mega-menu-tab-panel'>
                <div className='tab-panel-desc'>                   
                  <div className='tab-panel-desc-right'>
                    {/* {selectedTabIndex !== null ? tabContent[selectedTabIndex].sliderContent : tabContent[0].sliderContent} */}

                    {(projects && projects.length > 0) && (
                      <div className='mega-menu-slider'>
                        <Slider {...megamenusliderSettings}>
                        {projects.map((item, key) => (
                          <div className='home-recent-project-item'>
                            <div className='recent-featured-img'>
                              <Link to={item.slug}><img src={config.BASE_URL + item?.featuredImage} alt="featured" /></Link>
                            </div>
                            <div className='recent-project-detail d-flex'>
                              <span className='project-name font-11 font-medium text-uppercase text-black'><Link to={item.slug}>{item?.title}</Link></span>
                              <span className='project-scale font-11 text-black'>{item?.space}</span>
                            </div>
                          </div>
                        ))}
                      </Slider>
                      </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
