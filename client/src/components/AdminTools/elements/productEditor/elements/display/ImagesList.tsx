import { Image } from "../../../../../../common/types/types";

interface IFeedItem {
  data: any;
  setActionType: Function;
  label: string;
  name: string;
  headline: string;
  openImagePreview: Function;
  setImageUploadOpened: Function;
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
          <div className="map">
            {props?.data?.map((image: Image) => (
              <div
                onClick={() =>
                  props.openImagePreview(image.thumbnail, image._id)
                }
                className="map__item"
              >
                <img src={image.thumbnail} alt="" />
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
