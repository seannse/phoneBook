import { ThreeDots } from 'react-loader-spinner';

function Spinner() {
  return (
    <ThreeDots
      visible={true}
      height="24"
      width="50"
      color="#ffffff"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}

export default Spinner;
