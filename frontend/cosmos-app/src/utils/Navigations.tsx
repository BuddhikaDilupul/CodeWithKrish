import { Link } from "react-router-dom";

//Navigation Props interface
interface NavigationsProps {
    url: string;
    nav: string;
  }

  //Navigation component
const Navigations :React.FC<NavigationsProps> = ({ url, nav }) => {
  return (
    <>
      <Link to={url}> {nav}</Link>
    </>
  );
};

export default Navigations;
