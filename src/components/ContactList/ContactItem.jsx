import { Link, useLocation } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { Modal } from '../../components';
import { getRandomColor } from '../../services/getRandomColor';
import css from './Contacts.module.css';

const ContactItem = ({ id, name, number, idx, onBtnClick }) => {
  const location = useLocation();

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
        <button
          className={css.btn_delete}
          type="button"
          onClick={() => {
            onBtnClick(id, name);
          }}
        >
          <AiOutlineDelete className={css.icon} />
        </button>
      </div>
    </motion.li>
  );
};

export default ContactItem;
