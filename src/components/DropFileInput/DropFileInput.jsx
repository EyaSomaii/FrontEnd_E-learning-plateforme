import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import "../DropFileInput/drop-file-input.css";
import { ImageConfig } from "../DropFileInput/config/ImageConfig.js";
import { useParams } from "react-router-dom";
import axios from "axios";
const DropFileInput = ({ fileName, ajouterdepot, list, onFileDrop }) => {
  const wrapperRef = useRef(null);

  const { userId } = useParams();

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <img
            src="data:image/png;base64,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"
            alt=""
          />
          <p>Ajouter votre depot de travail </p>
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>

      {list.length > 0 ? (
        <div className="drop-file-preview">
          <button onClick={ajouterdepot}>Confirmer votre Depot </button>

          <div className="drop-file-preview__item">
            <img
              src={
                ImageConfig[fileName.type.split("/")[1]] ||
                ImageConfig["default"]
              }
              alt=""
            />
            <div className="drop-file-preview__item__info">
              <p>{fileName.name}</p>
              <p>{fileName.size}B</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
