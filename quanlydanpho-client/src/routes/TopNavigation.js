import React from 'react';
import {useDispatch} from 'react-redux';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBIcon,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBBadge
} from 'mdbreact';

import {logout} from '../store/actions/auth';
import {Link} from 'react-router-dom';

const TopNavigation = (props) => {
    const dispatch = useDispatch();
    
    const handleToggleClick = () => {
        props.onSideNavToggleClick();
    }
    
    const handleClickLogOut = () => {
        dispatch(logout());
    };
    
    const navStyle = {
        paddingLeft: props.toggle ? '16px' : '240px',
        transition: 'padding-left .3s'
    };
    
    return (
        <MDBNavbar
            className='flexible-MDBNavbar'
            light
            expand='md'
            scrolling
            fixed='top'
            style={{zIndex: 3}}
        >
            <div
                onClick={handleToggleClick}
                key='sideNavToggle'
                style={{
                    lineHeight: '32px',
                    marginLeft: '1em',
                    verticalAlign: 'middle',
                    cursor: 'pointer'
                }}
            >
                <MDBIcon icon='bars' color='white' size='lg'/>
            </div>
            
            <MDBNavbarBrand style={navStyle}>
                <strong>{props.routeName}</strong>
            </MDBNavbarBrand>
            <MDBNavbarNav expand='sm' right style={{flexDirection: 'row'}}>
                <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                        <MDBBadge color='red' className='mr-2'>
                            3
                        </MDBBadge>
                        <MDBIcon icon='bell'/>{' '}
                        <span className='d-none d-md-inline'>Notifications</span>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu right style={{minWidth: '400px'}}>
                        <MDBDropdownItem href='#!'>
                            <MDBIcon icon='money-bill-alt' className='mr-2'/>
                            New order received
                            <span className='float-right'>
                    <MDBIcon icon='clock'/> 13 min
                  </span>
                        </MDBDropdownItem>
                        <MDBDropdownItem href='#!'>
                            <MDBIcon icon='money-bill-alt' className='mr-2'/>
                            New order received
                            <span className='float-right'>
                    <MDBIcon icon='clock'/> 33 min
                  </span>
                        </MDBDropdownItem>
                        <MDBDropdownItem href='#!'>
                            <MDBIcon icon='chart-line' className='mr-2'/>
                            Your campaign is about to end
                            <span className='float-right'>
                    <MDBIcon icon='clock'/> 53 min
                  </span>
                        </MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
                <MDBNavItem>
                    <MDBNavLink to='#'>
                        <MDBIcon icon='envelope'/>
                        <span className='d-md-inline ml-1'>Contact</span>
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink to='#'>
                        <MDBIcon icon='comments'/>
                        <span className='d-md-inline ml-1'>Support</span>
                    </MDBNavLink>
                </MDBNavItem>
                <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                        <MDBIcon icon='user'/>{' '}
                        <span className='d-md-inline'>Profile</span>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu right style={{minWidth: '200px'}}>
                        <MDBDropdownItem onClick={handleClickLogOut}>
                            <Link to='/login'>
                                Log Out
                            </Link>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                            <Link to='/account'>
                                My Account
                            </Link>
                        </MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </MDBNavbarNav>
        </MDBNavbar>
    );
};

export default TopNavigation;
