import React from 'react';
import {MDBRow} from 'mdbreact';

import Input from '../../Input/Input';
import {fieldsToVietnamese} from '../../../utils/fieldUtils';
import {toVnDateFormat} from '../../../utils/utils';

const EditIDCardForm = (props) => {
    let colInputs = [];
    for (const key in props.idCardData) {
        if (props.idCardData.hasOwnProperty(key)) {
            if (key === 'idCardNumber' || key === 'issuedPlace' || key === 'issuedDay') {
                if (key === 'issuedDay') {
                    colInputs.push(
                        <Input
                            disabled={true}
                            key={key}
                            name={key}
                            label={fieldsToVietnamese(key)}
                            value={toVnDateFormat(props.idCardData[key])}
                        />
                    );
                } else {
                    colInputs.push(
                        <Input
                            disabled={true}
                            key={key}
                            name={key}
                            label={fieldsToVietnamese(key)}
                            value={props.idCardData[key]}
                        />
                    );
                }
            }
        }
    }
    
    return (
        <form style={{backgroundPosition: 'none'}}>
            <MDBRow>
                {colInputs}
            </MDBRow>
        </form>
    );
};

export default EditIDCardForm;
