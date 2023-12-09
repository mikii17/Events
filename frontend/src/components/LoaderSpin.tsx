import Lottie from 'lottie-react';
import loader from '../animation/loader.json';


const LoaderSpin = () => {
  return (
      <Lottie animationData={loader} loop={true} size={50}/>
  )
}

export default LoaderSpin