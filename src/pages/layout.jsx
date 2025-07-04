import Navbar from "../components/Header/navbar";
import Footer from "../components/Footer/Footer";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Layout = ({children, page}) => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        if (hash) {
            const element = document.getElementById(hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }

        }
    }, [pathname, hash]);

    return (
        <>
            <Navbar page={page} />
            {children}
            <Footer />
        </>
    )
}

export default Layout;