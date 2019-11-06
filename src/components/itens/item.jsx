import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Item = props => {
  return (
    <li key={props.id}>
      <a href={props.url} className="item" onClick={props.onclick}>
        <FontAwesomeIcon
          icon={props.icon}
          color={props.color}
          style={{ marginRight: 10 }}
        />
        {props.descricao}
      </a>
    </li>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  descricao: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  onclick: PropTypes.func.isRequired
};

export default Item;
