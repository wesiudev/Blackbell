import { IProduct } from "../../common/types/types";

interface ListAll {
  getOffsetLeft: any
  products: IProduct[];
}

const ListAll = (props: ListAll) => {
  const { products, getOffsetLeft } = props;

  return (
    <>
      <div ref={getOffsetLeft} className="category__title">
        <h1>Wszystkie produkty</h1>
      </div>
      <div className="category__items">
        {products?.map((item: IProduct, idx: number) => (
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
  );
};

export default ListAll;
