import { useSelector } from 'react-redux';
import { selectIsAuthChecked, selectIsLoggedIn } from '../../redux/selectors';
import { Navigate } from 'react-router-dom';

function WithAuthRedirect(Component, navigateTo) {
  return function WrappedComponent(props) {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isAuthChecked = useSelector(selectIsAuthChecked);

    if (!isAuthChecked) {
      // You can return a loader here if you want
      return null;
    }
    return isLoggedIn ? <Component {...props} /> : <Navigate to={navigateTo} />;
  };
}
export default WithAuthRedirect;
