import Layout from "./Layout.jsx";

// Import components with proper capitalization
import Home from "./home.jsx";
import Courses from "./courses.jsx";
import About from "./about.jsx";
import Testimonials from "./testimonials.jsx";
import Contact from "./contact.jsx";
import TheMethod from "./themethod.jsx";
import Resources from "./resources.jsx";
import PrivacyPolicy from "./privacypolicy.jsx";
import CancellationPolicy from "./cancellationpolicy.jsx";
import Faqs from "./faqs.jsx";
import Corporate from "./corporate.jsx";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    home: Home,
    courses: Courses,
    about: About,
    testimonials: Testimonials,
    contact: Contact,
    themethod: TheMethod,
    resources: Resources,
    privacypolicy: PrivacyPolicy,
    cancellationpolicy: CancellationPolicy,
    faqs: Faqs,
    corporate: Corporate,
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/about" element={<About />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/themethod" element={<TheMethod />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/cancellationpolicy" element={<CancellationPolicy />} />
                <Route path="/faqs" element={<Faqs />} />
                <Route path="/corporate" element={<Corporate />} />
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}