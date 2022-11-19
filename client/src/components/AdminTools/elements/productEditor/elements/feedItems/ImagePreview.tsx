import { useState } from "react";

type PreviewProps = {
  deleteHandler: Function;
  quitInput: Function;
  currentImage: string;
};

const ImagePreview = (props: PreviewProps) => {
  const [deleteInsurance, setDeleteInsurance] = useState(false);

  return (
    <div className="imagePreview">
      <div className="imagePreview__content">
        <div className="image">
          <img src={props.currentImage} alt="" />
        </div>
        <div className="buttons">
          {!deleteInsurance ? (
            <button
              onClick={() => setDeleteInsurance(true)}
              style={{ backgroundColor: "#f37b7b", border: "none" }}
              className="btnCancel"
            >
              Usuń zdjęcie
            </button>
          ) : (
            <button
              onClick={() => props.deleteHandler()}
              style={{ backgroundColor: "#f37b7b", border: "none" }}
              className="btnCancel"
            >
              Usunąć?
            </button>
          )}
          <button onClick={() => props.quitInput()} className="btnCancel">
            Wyjście
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
