import { Image } from "../../../../../../common/types/types";

interface IFeedItem {
  data: any;
  setActionType: Function;
  label: string;
  name: string;
  headline: string;
  openImagePreview: Function;
}

const ImagesItem = (props: IFeedItem) => {
  return (
    <div className="feedItem">
      <div className="feedItem__headline">
        <h3>{props.headline}</h3>
        <button
          name={props.name}
          id={props.label}
          onClick={(e) => props.setActionType(e)}
        >
          {" "}
          (dodaj)
        </button>
      </div>
      <div>
        {!props?.data?.length ? (
          "Brak zdjęć produktu."
        ) : (
          <div className="imagesMap">
            {props?.data?.map((image: Image) => (
              <div
                onClick={() =>
                  props.openImagePreview(image.imageSrc, image.imageIndex)
                }
                className="imagesMap__item"
              >
                <img src={image.imageSrc} alt="" />
              </div>
            ))}{" "}
            {props.name === "itemPrice" ? "PLN" : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagesItem;
