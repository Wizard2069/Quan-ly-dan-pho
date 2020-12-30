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
                    {roles.includes('admin', 0) ?
                        <MDBSideNavCat
                            name='Quản lý người dùng'
                            id='users'
                            icon='tachometer-alt'
                        >
                            {rSNL('/users/list', 'Thống kê người dùng')}
                            {rSNL('/users/add', 'Thêm người dùng')}
                        </MDBSideNavCat> : <li/>
                    }
                    {roles.includes('manager', 0) ?
                        <MDBSideNavCat
                            name='Quản lý nhân khẩu'
                            id='people'
                            icon='tachometer-alt'
                        >
                            {rSNL('/people/list', 'Thống kê nhân khẩu')}
                            {rSNL('/people/add', 'Thêm nhân khẩu')}
                        </MDBSideNavCat> : <li/>
                    }
                    {roles.includes('manager', 0) ?
                        <MDBSideNavCat
                            name='Quản lý tạm vắng'
                            id='tempAbsents'
                            icon='tachometer-alt'
                        >
                            {rSNL('/tempAbsents/list', 'Thống kê tạm vắng')}
                            {rSNL('/tempAbsents/add', 'Thêm tạm vắng')}
                        </MDBSideNavCat> : <li/>
                    }
                    {roles.includes('manager', 0) ?
                        <MDBSideNavCat
                            name='Quản lý tạm trú'
                            id='stays'
                            icon='tachometer-alt'
                        >
                            {rSNL('/stays/list', 'Thống kê tạm trú')}
                            {rSNL('/stays/add', 'Thêm tạm trú')}
                        </MDBSideNavCat> : <li/>
                    }
                    {roles.includes('manager', 0) ?
                        <MDBSideNavCat
                            name='Quản lý khai tử'
                            id='deaths'
                            icon='tachometer-alt'
                        >
                            {rSNL('/deaths/list', 'Thống kê khai tử')}
                            {rSNL('/deaths/add', 'Thêm khai tử')}
                        </MDBSideNavCat> : <li/>
                    }
                    {roles.includes('manager', 0) ?
                        <MDBSideNavCat
                            name='Quản lý hộ khẩu'
                            id='households'
                            icon='tachometer-alt'
                        >
                            {rSNL('/households/list', 'Thống kê hộ khẩu')}
                            {rSNL('/households/add', 'Thêm hộ khẩu')}
                        </MDBSideNavCat> : <li/>
                    }
                    <MDBSideNavCat
                        name='Kiến nghị'
                        id='petitions'
                        icon='tachometer-alt'
                    >
                        {rSNL('/petitions/list', 'Xem kiến nghị')}
                        {roles.includes('user', 0) ?
                            rSNL('/petitions/add', 'Tạo kiến nghị') : null
                        }
                    </MDBSideNavCat>
                    <MDBSideNavCat
                        name='Phản hồi'
                        id='replies'
                        icon='tachometer-alt'
                    >
                        {rSNL('/replies/list', 'Xem phản hồi')}
                    </MDBSideNavCat>
                </MDBSideNavNav>
            </MDBSideNav>
        </div>
    );
};

export default SideNavigation;
