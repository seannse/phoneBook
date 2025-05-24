import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/selectors';
import { Navigate } from 'react-router-dom';

function WithLogOutRedirect(Component, navigateTo) {
  return function WrappedComponent(props) {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return !isLoggedIn ? (
      <Component {...props} />
    ) : (
      <Navigate to={navigateTo} />
    );
  };
}
export default WithLogOutRedirect;
