import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllContacts } from '../../redux/contacts/selectors';
import { addContact } from '../../redux/contacts/operations';
import css from './ContactForm.module.css';

const phoneSchema = '[0-9]{3}-[0-9]{2}-[0-9]{2}';
const contactsSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Too short!')
    .max(30, 'Too long. Max 30 symbols')
    .required('This field is required'),
  number: Yup.string()
    .matches(phoneSchema, 'Phone number is not valid')
    .required('This field is required'),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectAllContacts);

  const [formattedNumber, setFormattedNumber] = useState('');

  const initialValues = {
    name: '',
    number: '',
  };

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
      validationSchema={contactsSchema}
    >
      {({ setFieldValue }) => (
        <Form className={css.wrapper}>
          <div className={css.field}>
            <label className={css.label} htmlFor='name'>
              Name
            </label>
            <Field
              className={css.input}
              type='text'
              name='name'
              id='name'
              placeholder='Your name'
            />
            <ErrorMessage className={css.error} name='name' component='div' />
          </div>

          <div className={css.field}>
            <label className={css.label} htmlFor='number'>
              Number
            </label>
            <Field
              className={css.input}
              type='text'
              name='number'
              id='number'
              placeholder='xxx-xx-xx'
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