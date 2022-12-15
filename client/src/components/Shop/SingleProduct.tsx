import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { fetchProduct } from "../../common/redux/actions/product";
import { Image, IProduct } from "../../common/types/types";
import GallerySlider from "./GallerySlider";

const SingleProduct = () => {
  const dispatch = useDispatch<any>();
  const [searchParams] = useSearchParams();
  const product = useSelector((state: any) => state.products.product);
  const productId = searchParams.get("id");
  useEffect(() => {
    if (product?._id !== productId) {
      dispatch(fetchProduct({ productId: productId }));
    }
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isOriginal, setOriginal] = useState(true);

  const productImages = product?.itemImages?.sort((a: Image, b: IProduct) =>
    a._id === b.primaryImage ? -1 : 1
  );
  return (
    <>
      <div className="singleProduct">
        <div className="singleProduct__content">
          {product?._id === productId ? (
            <>
              <div className="thumbnails">
                {productImages.map((image: Image, idx: number) => (
                  <div
                    onClick={() => setActiveIndex(idx)}
                    key={idx}
                    className="thumbnail"
                    style={idx === 0 ? { marginTop: "0px" } : {}}
                  >
                    <img
                      className={activeIndex === idx ? "active" : ""}
                      src={image.imageUrl}
                      alt=""
                    />
                  </div>
                ))}
              </div>
              <GallerySlider
                images={productImages}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
              <div className="productInfo">
                <div className="productInfo__content">
                  <div className="productInfo__content-menu">
                    <div
                      style={{
                        backgroundColor: isOriginal ? "#b6b6b699" : "#62626299",
                      }}
                      onClick={() => setOriginal(true)}
                      className="item"
                    >
                      Oryginał
                    </div>
                    <div
                      onClick={() => setOriginal(false)}
                      className="item"
                      style={{
                        backgroundColor: !isOriginal
                          ? "#b6b6b699"
                          : "#62626299",
                      }}
                    >
                      Druk
                    </div>
                    <div
                      style={{ width: "100%" }}
                      className="productInfo__content-menu"
                    >
                      <div
                        style={{
                          opacity: isOriginal ? "1" : "0",
                        }}
                        className="productInfo__content-marginElement"
                      />
                      <div
                        style={{
                          opacity: !isOriginal ? "1" : "0",
                        }}
                        className="productInfo__content-marginElement"
                      />
                    </div>
                    <div className="productInfo__content-underMenu">
                      <h2> {product?.itemName} </h2>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
