import { useSelector, useDispatch } from 'react-redux';
import { selectVisibleContacts } from '../../redux/contacts/slice';
import { deleteContact } from '../../redux/contacts/operations';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectVisibleContacts);

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ul className={css.contactList}>
      {filteredContacts.map(contact => (
        <li key={contact.id} className={css.contactItem}>
           <Contact key={contact.id} contact={contact} onDelete={() => handleDeleteContact(contact.id)} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;