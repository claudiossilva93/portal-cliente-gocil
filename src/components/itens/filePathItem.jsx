import React from "react";
import PropTypes from "prop-types";
import {
  faFolder,
  faFile,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { Item } from "../";

const FilePathItem = props => {
  const { item } = props;

  if (item.tipo === "0")
    return (
      <Item
        key={item.key}
        descricao={item.descricao}
        url={`/path/${item.pai}`}
        color="#c8a851"
        icon={faArrowLeft}
        onclick={() => {}}
      />
    );

  if (item.tipo === "1")
    return (
      <Item
        key={item.key}
        descricao={item.descricao}
        url={`/path/${item.id}`}
        color="#c8a851"
        icon={faFolder}
        onclick={() => {}}
      />
    );

  if (item.tipo === "2")
    return (
      <Item
        key={item.key}
        descricao={item.descricao}
        url="#"
        color="#c8a851"
        icon={faFile}
        onclick={() => window.open(item.url_download, "_blank")}
      />
    );
};

FilePathItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default FilePathItem;
