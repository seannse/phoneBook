import { BsSun, BsMoon } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../redux/global/slice';
import { selectTheme } from '../../redux/selectors';
import css from './ThemeSwitcher.module.css';

function ThemeSwitcher() {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const switchTheme = () => {
    console.log(theme);
    theme === 'light'
      ? dispatch(setTheme('dark'))
      : dispatch(setTheme('light'));
  };

  return (
    <div className={css.theme}>
      <button type="button" onClick={switchTheme}>
        {theme === 'light' ? <BsSun size={30} /> : <BsMoon size={30} />}
      </button>
    </div>
  );
}

export default ThemeSwitcher;
