import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import '../App.css';

import SideNavigation from './SideNavigation';
import TopNavigation from './TopNavigation';
import Footer from '../components/Layout/UI/Footer/Footer';
import SideNavRoutes from './SideNavRoutes';

const RoutesWithNavigation = () => {
    const location = useLocation();
    
    const [windowWidth, setWindowWidth] = useState(0);
    const [currentPage, setCurrentPage] = useState('');
    const [sideNavToggled, setSideNavToggled] = useState(false);
    const breakWidth = 1400;
    
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    
    const toggleSideNav = () => {
        if (windowWidth < breakWidth) {
            setSideNavToggled(!sideNavToggled);
        }
    };
    
    const assessLocation = location => {
        let locationString;
        
        switch (location) {
            case '/account':
                locationString = 'Tài khoản';
                break;
            case '/admin/users':
                locationString = 'Quản lý người dùng';
                break;
            case '/manager/people':
                locationString = 'Quản lý nhân khẩu';
                break;
            default:
        }
        
        setCurrentPage(locationString);
    };
    
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        assessLocation(location.pathname);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [location]);
    
    const dynamicLeftPadding = {
        paddingLeft:
            windowWidth > breakWidth ? '240px' : '0'
    };
    
    return (
        <div className='app'>
            <div className='white-skin'>
                <SideNavigation
                    breakWidth={breakWidth}
                    style={{ transition: 'all .3s' }}
                    triggerOpening={sideNavToggled}
                    onLinkClick={toggleSideNav}
                />
            </div>
            <div className='flexible-content white-skin'>
                <TopNavigation
                    toggle={windowWidth < breakWidth}
                    onSideNavToggleClick={toggleSideNav}
                    routeName={currentPage}
                    className='white-skin'
                />
                <main style={{ ...dynamicLeftPadding, margin: '8rem 6% 6rem' }}>
                    <SideNavRoutes onChange={assessLocation}/>
                </main>
                <Footer
                    style={{ ...dynamicLeftPadding, position: 'fixed', width: '100%' }}
                    className='d-lg-block'
                />
            </div>
        </div>
    );
};

export default RoutesWithNavigation;
