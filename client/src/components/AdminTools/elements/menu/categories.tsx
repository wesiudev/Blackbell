import { useState, useEffect } from "react";
import {
  addCategory,
  getCategories,
  removeCategory,
} from "../../../../common/redux/actions/categories";
import gear from "../../../../common/images/gearBlack.png";
import { useDispatch, useSelector } from "react-redux";
import {
  ICategory,
  Image,
  IProduct,
  ISubCategory,
} from "../../../../common/types/types";

type CategoryMenu = {
  categories: ICategory[];
  subCategories: ISubCategory[];
  products: IProduct[];
  editProduct: (arg: IProduct) => void;
};

export const MenageCategories = ({
  categories,
  subCategories,
  products,
  editProduct,
}: CategoryMenu) => {
  const dispatch = useDispatch<any>();
  const [userInput, setUserInput] = useState<string>("");
  const [currentlyEditingCategory, setCurrentlyEditingCategory] =
    useState<string>("");
  const [deleteCategoryIncurance, setDeleteCategoryIncurance] =
    useState<boolean>(false);
  const categoryAddRequestHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    dispatch(
      addCategory({
        category: userInput,
        actionType: "ADD",
      })
    );
  };
  const categoryRemoveRequestHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    dispatch(
      removeCategory({
        category: currentlyEditingCategory,
        actionType: "REMOVE",
      })
    );
    setCurrentlyEditingCategory("");
    setDeleteCategoryIncurance(false);
  };

  function cancelDeletation() {
    setCurrentlyEditingCategory("");
    setDeleteCategoryIncurance(false);
  }

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const array = categories?.map((category: ICategory) => ({
    category: category.categoryName,
    products: products?.filter(
      (product: IProduct) => product.itemCategoryName === category.categoryName
    ),
  }));

  return (
    <div className="categories">
      <div className="categories__content">
        {currentlyEditingCategory !== "" ? (
          <div className="categories__content__menu">
            <div className="categories__content__menu__window">
              {deleteCategoryIncurance === false
                ? `Usun???? kategori??:${" "}${currentlyEditingCategory}?`
                : `Usuwaj??c kategori?? wraz z produktami kt??re si?? w niej znajduj??.`}
              {deleteCategoryIncurance === false ? (
                <div className="categories__content__menu__window__buttons">
                  <button
                    onClick={() => setDeleteCategoryIncurance(true)}
                    className="delete"
                  >
                    Usu??
                  </button>
                  <button
                    onClick={() => setCurrentlyEditingCategory("")}
                    className="cancel"
                  >
                    Anuluj
                  </button>
                </div>
              ) : (
                <div className="categories__content__menu__window__buttons">
                  <button
                    onClick={categoryRemoveRequestHandler}
                    className="delete"
                  >
                    Usu??
                  </button>
                  <button onClick={cancelDeletation} className="cancel">
                    Anuluj
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : null}

        <div className="categories__content__new">
          <label htmlFor="newCategory">Dodaj kategori??</label>
          <div className="categories__content__new__row">
            <input
              type="text"
              name="newCategory"
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button onClick={categoryAddRequestHandler}>Dodaj</button>
          </div>
        </div>
        {array?.map((item: any, idx: number) => (
          <div className="categories__content__list">
            <div className="categories__content__list__item">
              <h1>{item.category}</h1>
              <div className="categories__content__list__item__products">
                {item?.products?.map((product: IProduct, idx: number) => (
                  <div onClick={() => editProduct(product)} className="categories__content__list__item__products__product">
                    {product.itemImages.map((image: Image) => (
                      <div className="image">
                        {image._id === product.primaryImage ? (
                          <div>
                          <img src={image.thumbnail} alt="" />
                          
                          </div>
                        ) : null}
                      </div>
                    ))}
                    <span>{product.itemName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
