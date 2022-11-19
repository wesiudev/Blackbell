import React from "react";
import { IProduct } from "../../../../../common/types/types";
import pen from "../../../../../common/images/pen.png";
interface IFeedItem {
  data: any;
  setAttribute: Function;
  label: string;
  name: string;
  headline: string;
}

const FeedItem = (props: IFeedItem) => {
  return (
    <div className="feed__item">
      <div className="headline">
        <h3>{props.headline}</h3>
        <button
          name={props.name}
          id={props.label}
          onClick={(e) => props.setAttribute(e)}
        >
          {" "}
          (edytuj)
        </button>
      </div>
      <div>
        {!props.data ? (
          "Brak informacji."
        ) : (
          <div>
            {" "}
            {props.data} {props.name === "itemPrice" ? "PLN" : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedItem;
