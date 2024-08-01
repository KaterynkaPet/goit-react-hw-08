import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contactsSlice.js';
import { addContact } from '../../redux/contactsOps.js';
import css from './ContactForm.module.css'

const ContactForm = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);
   
    const [formattedNumber, setFormattedNumber] = useState('');

    const initialValues = {
        name: '',
        number: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Required')
            .min(3, 'Name must be at least 3 characters')
            .max(50, 'Name must be less than 50 characters'),
        number: Yup.string()
            .required('Required')
            .min(3, 'Name must be at least 3 characters')
            .max(50, 'Name must be less than 50 characters'),
    });
    
    const formatPhoneNumber = (value) => {
        const phoneNumber = value.replace(/[^\d]/g, '');
        const match = phoneNumber.match(/^(\d{0,3})(\d{0,2})(\d{0,2})$/);
        if (match) {
        return match.slice(1).filter(Boolean).join('-');
        }
        return '';
    };
    
    const handleChange = (event, setFieldValue) => {
        const { value } = event.target;
        const formatted = formatPhoneNumber(value);
        setFormattedNumber(formatted);
        setFieldValue('number', formatted);
    };

    const handleSubmit = (values, { resetForm }) => {
        const isDuplicate = contacts.some(contact =>
        contact.name === values.name && contact.number === values.number
        );
        if (isDuplicate) {
            alert('This contact already exists.');
        } else {
            dispatch(addContact(values));
            resetForm();
            setFormattedNumber(''); 
        }
  };
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >  
            {({ setFieldValue }) => (
                <Form className={css.form}>
                    <div className={css.formGroup} >
                        <label htmlFor='name'>Name</label>
                        <Field className={css.input} type='text' name='name' id='name' />
                        <ErrorMessage className={css.error} name='name' component='div' />
                    </div>
            
                    <div className={css.formGroup}>
                        <label htmlFor='number'>Number</label>
                        <Field
                            className={css.input}
                            type='text'
                            name='number'
                            value={formattedNumber}
                            onChange={(event) => handleChange(event, setFieldValue)}
                        />
                        <ErrorMessage className={css.error} name='number' component='div' />
                    </div>
            
                    <button className={css.btn} type='submit'>
                        Add contact
                    </button>
                </Form>
            )}          
        </Formik>
        
    );
};
export default ContactForm;