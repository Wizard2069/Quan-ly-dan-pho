import React from 'react';
import {
    MDBSideNavLink,
    MDBSideNavCat,
    MDBSideNavNav,
    MDBSideNav
} from 'mdbreact';

import {getRoles} from '../utils/utils';

const SideNavigation = (props) => {
    const roles = getRoles();
    
    const rSNL = (to, text) => {
        return (
            <MDBSideNavLink to={to} onClick={props.onLinkClick}>
                {text}
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
                    <MDBSideNavCat
                        name='Dashboards'
                        id='dashboard-cat'
                        icon='tachometer-alt'
                    >
                        {rSNL('/account', 'Tài khoản')}
                        {roles.includes('admin', 0) ?
                            rSNL('/admin/users', 'Quản lý người dùng')
                            : null
                        }
                        {roles.includes('manager', 0) ?
                            rSNL('/manager/people', 'Quản lý nhân khẩu')
                            : null
                        }
                    </MDBSideNavCat>
                </MDBSideNavNav>
            </MDBSideNav>
        </div>
    );
};

export default SideNavigation;
