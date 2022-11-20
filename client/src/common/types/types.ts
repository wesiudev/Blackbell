export interface IProduct {
    itemName: string | undefined;
    itemPrice: number | null;
    itemDescription: string | undefined;
    itemQuantity: number | null;
    itemSize: string | undefined;
    itemColor: string | undefined;
    itemImages: Image[] | any
    itemCategoryName: string | undefined
    subCategory: string | undefined
    _id: string | undefined
  };

  export type Image = {
    imageSrc: string,
    imageName: string,
    imageIndex: string
    _id: string
  }
  export interface ISubCategory {
    subCategoryName: string
    relatedCategoryName: string
  }
  export interface ICategory {
    categoryName: string | undefined
    subCategories: ISubCategory[]
  }

  export type MenuProps = {
    categories: ICategory[]
    products: IProduct[]
    subCategories: ISubCategory[]
  }