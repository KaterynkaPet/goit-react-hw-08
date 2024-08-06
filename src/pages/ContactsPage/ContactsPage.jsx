import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/operations';
import { selectLoading, selectError } from '../../redux/contacts/selectors';
import ContactList from '../../components/ContactList/ContactList';
import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './ContactsPage.module.css';

const ContactsPage = () => {
  const dispatch = useDispatch();
  
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      {isLoading && <Loader />}
      <SearchBox />
      {isError && <ErrorMessage />}
      <ContactForm />
      <ContactList />
    </div>
  );
};

export default ContactsPage;