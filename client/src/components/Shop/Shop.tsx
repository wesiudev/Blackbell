import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../common/redux/actions/categories";
import { fetchProducts } from "../../common/redux/actions/product";
import { getSubCategories } from "../../common/redux/actions/subCategories";
import {
  ICategory,
  Image,
  IProduct,
  ISubCategory,
} from "../../common/types/types";
import ListAll from "./ListAll";
import ListSingleCategory from "./ListSingleCategory";
import Nav from "./Nav";

const Shop = () => {
  //data display / modification
  const dispatch: any = useDispatch();

  const [currentCategory, setCurrentCategory] = useState<string>("listAll");
  const { categories } = useSelector((state: any) => state.categories);
  const { subCategories } = useSelector((state: any) => state.subCategories);
  const { products } = useSelector((state: any) => state.products);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
    dispatch(fetchProducts());
  }, []);

  const shopData = {
    content: categories?.data?.map((category: ICategory) => ({
      categoryName: category.categoryName,
      categoryId: category._id,
      products: products?.data?.filter(
        (product: IProduct) =>
          product.itemCategoryName === category.categoryName
      ),
      subCategories: category.subCategories.map(
        (subCategory: ISubCategory) => ({
          subCategoryName: subCategory.subCategoryName,
          subCategoryId: subCategory._id,
          products: products?.data?.filter(
            (product: IProduct) =>
              product.subCategory === subCategory.subCategoryName
          ),
        })
      ),
    })),
  };
  const navMenuContent = shopData?.content?.map((array: any) => ({
    category: array?.categoryName,
    categoryLength: array?.products?.length,
    subCategories: array?.subCategories?.map((item: any) => ({
      subCategoryItems: item,
      subCategoryLength: item?.products?.length,
    })),
  }));

  const arrayOfImages = products?.data?.map((product: IProduct) => ({
    productId: product._id,
    image: product?.itemImages.filter(
      (image: Image) => image._id === product.primaryImage
    ),
  }));

  //design
  const feedOffsetLeft = useRef<HTMLDivElement>(null)
  
  const [navOffsetRight, setNavOffsetRight] = useState<any>();

  window.addEventListener("resize", (event) => {
    setNavOffsetRight(feedOffsetLeft.current?.offsetLeft!)
  });
  
    useEffect(() => {
      setNavOffsetRight(feedOffsetLeft.current?.offsetLeft!) 
    }, [])
  return (
    <div className="shop">
      
      <div ref={feedOffsetLeft} className="shop__feed">
        {currentCategory === "listAll" ? (
          <ListAll products={products?.data} />
        ) : (
          <div>

          <ListSingleCategory
          shopData={shopData?.content}
          currentCategory={currentCategory}
          />
          </div>
        )}
      </div>
      <Nav
        navOffsetRight={navOffsetRight ? navOffsetRight : null}
        navMenuContent={navMenuContent}
        itemCount={products?.data?.length}
        setCurrentCategory={setCurrentCategory}
        currentCategory={currentCategory}
      />
    </div>
  );
};

export default Shop;
