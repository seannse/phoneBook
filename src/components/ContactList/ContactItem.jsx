import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { Modal } from '../../components';
import { removeContact } from '../../redux/contacts/operations';
import { getRandomColor } from '../../services/getRandomColor';
import { setIsModalDeleteContactOpen } from '../../redux/global/slice';
import { selectIsModalDeleteContactOpen } from '../../redux/selectors';

import css from './Contacts.module.css';

const ContactItem = ({ id, name, number, idx }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isModalDeleteContactOpen = useSelector(selectIsModalDeleteContactOpen);

  const handleButtonDeleteClick = id => {
    dispatch(removeContact(id));
    dispatch(setIsModalDeleteContactOpen());
  };

  const onBtnClick = () => {
    console.log('click delete');
    dispatch(setIsModalDeleteContactOpen());
  };

  const [firstName, secondName] = name.split(' ');

  return (
    <motion.li
      layout
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.4 }}
    >
      <div className={css.contact_item}>
        <div
          className={css.avatar}
          style={{ backgroundColor: getRandomColor(idx) }}
        >
          {firstName[0]}
          {secondName && secondName[0]}
        </div>
        <Link
          state={{ from: location }}
          className={`${css.wrapper}`}
          to={`/contact/${id}`}
        >
          <p>{name}</p>
          <p className={css.personNumber} href={`tel:${number}`}>
            {number}
          </p>
        </Link>
        <button className={css.btn_delete} type="button" onClick={onBtnClick}>
          <AiOutlineDelete className={css.icon} />
        </button>
      </div>
      {isModalDeleteContactOpen && (
        <Modal
          title={`Are you sure you want to delete ${name}?`}
          setModalOpen={setIsModalDeleteContactOpen}
          isModalOpen={isModalDeleteContactOpen}
        >
          <button
            type="button"
            onClick={() => {
              handleButtonDeleteClick(id);
            }}
          >
            Delete
          </button>
          <button type="button" onClick={onBtnClick}>
            Cancel
          </button>
        </Modal>
      )}
    </motion.li>
  );
};

export default ContactItem;
