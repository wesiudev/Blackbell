export interface IProduct {
    itemName: string | undefined;
    itemPrice: number | null;
    itemDescription: string | undefined;
    itemQuantity: number | null;
    itemSize: string | undefined;
    itemColor: string | undefined;
    itemImages: Image[] | any[]
    itemCategoryName: string
    subCategory: string
    primaryImage: string
    _id: string 
  };

  export type Image = {
    realPicture: string,
    thumbnail: string
    _id: string
  }
  export interface ISubCategory {
    subCategoryName: string
    relatedCategoryName: string
    _id: string
  }
  export interface ICategory {
    categoryName: string 
    _id: string 
    subCategories: ISubCategory[]
  }

  export type MenuProps = {
    categories: ICategory[]
    products: IProduct[]
    subCategories: ISubCategory[]
  }