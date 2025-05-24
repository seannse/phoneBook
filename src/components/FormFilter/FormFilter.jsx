import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { CiSearch } from 'react-icons/ci';

import { selectFilter } from '../../redux/selectors';
import { setFilter } from '../../redux/filter/slice';

import css from './Filter.module.css';

const FormFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = event => {
    dispatch(setFilter(event.target.value));
  };
  return (
    <motion.label
      className={css.label}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <CiSearch className={css.searchIcon} />
      <input
        className={css.input}
        type="text"
        name="filter"
        value={filter}
        onChange={handleChange}
        required
        placeholder="Search"
      />
    </motion.label>
  );
};

export default FormFilter;
