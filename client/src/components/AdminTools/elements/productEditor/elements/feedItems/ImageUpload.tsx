import Resizer from "react-image-file-resizer";
import { storage } from '../../../../../../common/firebase/firebase'
import { ref, uploadBytes } from "firebase/storage"
import { useState } from "react";

type PreviewProps = {
  uploadHandler: Function;
  quitInput: Function;
  currentImage: string;
  setCurrentImage: Function;
  setCurrentInputValue: Function;
  setRealImageSource: Function;
};
const ImageUpload = (props: PreviewProps) => {
  const resizeImageForFirebase = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1000,
        1000,
        "png",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });
  const resizeImageForMongo = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "png",
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
      if (!e.target.files[0]) return
      const fireBaseImage: any = await resizeImageForFirebase(e.target.files[0])
      const mongoImage: any = await resizeImageForMongo(e.target.files[0])
      //in pseudo randomness we trust 🙏
      const pseudoRandom = Math.floor(Math.random()*9999*100).toString()
      const imageRef = ref(storage, `images/image-${pseudoRandom}`)
      uploadBytes(imageRef, fireBaseImage).then(() => {
         props.setCurrentInputValue(mongoImage);
         props.setCurrentImage(mongoImage);
         props.setRealImageSource(pseudoRandom);
      })
      
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
