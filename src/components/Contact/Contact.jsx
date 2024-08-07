import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import css from './Contact.module.css';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <div className={css.form} key={contact.id}>
      <ul className={css.user}>
        <li className={css.userList}>
          <img src='/user.svg' alt='svg icon' /> {contact.name}
        </li>
        <li className={css.userList}>
          <img src='/phone.svg' alt='svg icon' /> {contact.number}
        </li>
      </ul>
      <button className={css.btn} onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Contact;