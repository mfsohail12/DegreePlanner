import { ImSpinner2 } from "react-icons/im";

interface SpinnerProps {
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return <ImSpinner2 className={`animate-spin ${className}`} />;
};

export default Spinner;
