
import { ICategory, IProduct, MenuProps } from "../../../../common/types/types";

const MenageProducts = ({categories, subCategories, products}: MenuProps) => {

  const array = categories?.map((category: ICategory) => ({
    category: category.categoryName,
    products: products?.filter(
      (product: IProduct) => product.itemCategoryName === category.categoryName
    ),
  }));

  return (
    <div className="products">
      {array?.map((item: any) => (
        <div className="products__row">
          <h2>Wszystkie produkty z kategorii {item.category}</h2>
          <div className="products__row__items">
            {item?.products?.map((product: IProduct) => (
              <div className="products__row__items__item">
                {product.itemName}
                {product?.itemImages?.map((image: any) => (
                  <img
                    style={{ maxWidth: "250px" }}
                    src={image.imageSrc}
                    alt="no img"
                  />
                ))}
              </div>
            ))}
          </div>
          <h3>Podkategorie</h3>
        </div>
      ))}
    </div>
  );
};

export default MenageProducts;
