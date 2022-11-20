import { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { IProduct } from "../../../../../../common/types/types";
import Resizer from "react-image-file-resizer";

type PreviewProps = {
  uploadHandler: Function;
  quitInput: Function;
  currentImage: string;
  setCurrentImage: Function;
  setCurrentInputValue: Function;
};
const ImageUpload = (props: PreviewProps) => {
  const resizeFile = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1000,
        1000,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
    
  const setValues = async (e: any) => {
    try {
      const file = e.target.files[0];
      const image: any = await resizeFile(file);
      props.setCurrentInputValue(image);
      props.setCurrentImage(image);
    } catch (err) {
      console.log(err);
    }
  };
  // props.setCurrentInputValue(base64.base64);
  // props.setCurrentImage(base64.base64);
  // console.log(base64.size);
  return (
    <div className="imagePreview">
      <div className="imagePreview__content">
        <div className="image">
          {props.currentImage ? (
            <img src={props.currentImage} alt="" />
          ) : (
            "Dodaj zdjęcie"
          )}
        </div>
        <input
          type="file"
          multiple={false}
          onChange={(e: any) => setValues(e)}
        />
        <div className="buttons">
          <button
            onClick={
              props.currentImage
                ? () => props.uploadHandler()
                : () => console.log("")
            }
            className="btnSave"
          >
            Dodaj
          </button>
          <button onClick={() => props.quitInput()} className="btnCancel">
            Wyjście
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
