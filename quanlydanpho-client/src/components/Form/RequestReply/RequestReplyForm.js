import React, {useEffect, useState} from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBRow
} from 'mdbreact';
import {useHistory} from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
import {EditorState, convertToRaw} from 'draft-js';
import {useFormik} from 'formik';
import * as yup from 'yup';

import Input from '../../../components/Input/Input';
import WysiwygEditor from '../../../components/WysiwygEditor/WysiwygEditor';
import {toVnISOString} from '../../../utils/utils';

const RequestReplyForm = (props) => {
    const history = useHistory();
    
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    
    const validationSchema = yup.object({
        subject: yup.string()
            .required('subject is required')
    });
    
    const formik = useFormik({
        initialValues: {
            subject: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const dto = {
                ...values,
                content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
                date: toVnISOString(new Date())
            };
            props.handleSubmit(dto);
        }
    });
    
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };
    
    useEffect(() => {
        if (props.responseData.id) {
            history.push(props.path);
        }
    }, [props.responseData]);
    
    return (
        <section>
            <MDBCard narrow className='mb-5'>
                <MDBCardImage
                    className='view view-cascade gradient-card-header blue-gradient'
                    cascade
                    tag='div'
                >
                    <h2 className='h2-responsive mb-2'>{props.title}</h2>
                </MDBCardImage>
                <MDBCardBody cascade>
                    <form
                        className='needs-validation'
                        onSubmit={formik.handleSubmit}
                        noValidate
                        style={{backgroundPosition: 'none'}}
                    >
                        <MDBRow>
                            <Input
                                md='12'
                                label='Tiêu đề'
                                handleChange={formik.handleChange}
                                name='subject'
                                className={formik.touched.subject ? (formik.errors.subject ? 'is-invalid' : 'is-valid') : null}
                                value={formik.values.subject}
                            />
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <p style={{color: '#757575'}}>Nội dung</p>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <WysiwygEditor
                                    editorState={editorState}
                                    onEditorStateChange={onEditorStateChange}
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className='mt-3'>
                            <MDBCol md='5' className='offset-md-7 text-right'>
                                <MDBBtn color='primary' type='submit'>
                                    Gửi
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </section>
    );
};

export default RequestReplyForm;
