import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProduct } from "../../common/redux/actions/product";
import { Image, IProduct } from "../../common/types/types";
import { Headline } from "../Home/elements/Headline";


const SingleProduct = () => {
  const dispatch = useDispatch<any>();
  const imageRef = useRef<HTMLImageElement>(null)
  const [searchParams] = useSearchParams();
  const product = useSelector((state: any) => state.products.product);
  const productId = searchParams.get("id");
  const [activeImage, setActiveImage] = useState<number>(0);
  useEffect(() => {
    if (product._id !== productId) {
      dispatch(fetchProduct({ productId: productId }));
    }
  }, []);

  const productImages = product?.itemImages?.sort((a: Image, b: IProduct) =>
    a._id === b.primaryImage ? -1 : 1
  );
  return (
    <>
      <div className="singleProduct">
        <Headline text={product.itemName} />
        <div className="singleProduct__content">
          {product._id === productId ? (
            <>
              <div className="gallery">
                <div style={{width:`${imageRef?.current?.offsetWidth}`}} className="image">
                  {productImages?.map((image: Image, idx: number) => (
                    <div key={idx} className="image__content">
                      <img
                        ref={imageRef}
                        style={
                          activeImage === idx
                            ? { visibility: "visible", display: "block" }
                            : { visibility: "hidden", display: "none" }
                        }
                        src={image.imageUrl}
                        alt=""
                      />
                    </div>
                  ))}
                  
                </div>
              </div>
                  <div className="singleProduct__content__tools">
                    <div className="tools">
                      {productImages?.map((image: Image, idx: number) => (
                        <div
                          key={idx}
                          className={
                            activeImage === idx
                              ? "thumbnail active"
                              : "thumbnail"
                          }
                        >
                          <img
                            onClick={() => setActiveImage(idx)}
                            src={image.thumbnail}
                            alt=""
                          />
                        </div>
                      ))}
                    </div>
                  </div>
              <div className="productInfo">
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
