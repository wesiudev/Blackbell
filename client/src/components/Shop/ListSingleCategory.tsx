import React from "react";
import { IProduct } from "../../common/types/types";

interface ISingleCategory {
  getOffsetLeft: any
  shopData: any[];
  currentCategory: string;
}

const ListSingleCategory = (props: ISingleCategory) => {
  const { shopData, currentCategory, getOffsetLeft } = props;

  return (
    <>
      {shopData?.map((category: any, idx: number) => (
        <div key={idx} className="category">
          <>
            {category.categoryName === currentCategory && (
              <>
                <div ref={getOffsetLeft} className="category__title">
                  <h1>{category.categoryName}</h1>
                </div>
                <div className="category__items">
                  {category?.products?.map((item: IProduct, idx: number) => (
                    <div key={idx} className="category__items__item">
                      {item.itemImages.map((image: any) => (
                        <>
                          {image._id === item.primaryImage ? (
                            <img src={image.thumbnail} alt="" />
                          ) : null}
                        </>
                      ))}
                      <div className="underImage">
                        <div className="topSide">
                          <span>{item.itemName}</span>
                          <span>{item.itemPrice}zł</span>
                        </div>
                        <div className="desc">{item.itemDescription}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        </div>
      ))}
    </>
  );
};

export default ListSingleCategory;
