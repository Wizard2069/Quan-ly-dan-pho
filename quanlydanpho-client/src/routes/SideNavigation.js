import React from 'react';
import {
    MDBSideNavLink,
    MDBSideNavCat,
    MDBSideNavNav,
    MDBSideNav, MDBIcon
} from 'mdbreact';

import {getRoles} from '../utils/utils';

const SideNavigation = (props) => {
    const roles = getRoles();
    
    const rSNL = (to, text, icon = null, className = null) => {
        return (
            <MDBSideNavLink to={to} onClick={props.onLinkClick}>
                {icon} <span className={className}>{text}</span>
            </MDBSideNavLink>
        );
    }
    
    return (
        <div className='white-skin'>
            <MDBSideNav
                logo='https://mdbootstrap.com/img/Marketing/general/logo/medium/mdb-react.png'
                bg='https://mdbootstrap.com/img/Photos/Others/sidenav4.jpg'
                mask='strong'
                fixed
                breakWidth={props.breakWidth}
                triggerOpening={props.triggerOpening}
                style={{ transition: 'padding-left .3s' }}
            >
                <MDBSideNavNav>
                    <li>
                        {rSNL('/account', ' Tài khoản', <MDBIcon icon='user'/>, 'ml-2')}
                    </li>
                    <>
                    {roles.includes('admin', 0) ?
                        <MDBSideNavCat
                            name='Quản lý người dùng'
                            id='users'
                            icon='tachometer-alt'
                        >
                            {rSNL('/users/list', 'Thống kê người dùng')}
                        </MDBSideNavCat> : null
                    }
                    </>
                    <MDBSideNavCat
                        name='Quản lý nhân khẩu'
                        id='people'
                        icon='tachometer-alt'
                    >
                        {roles.includes('manager', 0) ?
                            rSNL('/people/list', 'Thống kê nhân khẩu')
                            : null
                        }
                        {roles.includes('manager', 0) ?
                            rSNL('/people/add', 'Thêm nhân khẩu')
                            : null
                        }
                    </MDBSideNavCat>
                </MDBSideNavNav>
            </MDBSideNav>
        </div>
    );
};

export default SideNavigation;
