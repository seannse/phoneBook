import { RotatingLines } from 'react-loader-spinner';

function Loader() {
  return (
    <div
      style={{
        display: 'flex',
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        justifyContent: 'center',
        backgroundColor: '#476d8036',
      }}
    >
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
}

export default Loader;
