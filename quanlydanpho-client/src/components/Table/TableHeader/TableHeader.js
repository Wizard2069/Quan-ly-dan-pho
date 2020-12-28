import React from 'react';
import {MDBTableHead} from 'mdbreact';

const TableHeader = (props) => {
    const header = props.fields.map((field, index) => {
        return (
            <th key={index} className='th-lg'>
                {field}
            </th>
        );
    });
    
    return (
        <MDBTableHead>
            <tr>
                {props.checkbox ?
                    <th>
                    
                    </th> : null
                }
                {header}
            </tr>
        </MDBTableHead>
    );
};

export default TableHeader;
