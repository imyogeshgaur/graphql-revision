import { Link } from "react-router-dom";
import { CustomLinkInterface } from "../interface/CustomLinkInterface";

const CustomLink = (props: CustomLinkInterface) => {
  return (
    <p style={props.linkTextStyle}>
      {props.linkText}
      <Link to={props.navigateTo} style={props.linkStyle}>
        {props.linkName}
      </Link>
    </p>
  );
};

export default CustomLink;
