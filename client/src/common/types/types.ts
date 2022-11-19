export interface IProduct {
    itemName: string | undefined;
    itemPrice: number | null;
    itemDescription: string | undefined;
    itemQuantity: number | null;
    itemSize: string | undefined;
    itemColor: string | undefined;
    itemImages: Image[] | any
    itemCategoryName: string
    subCategory: string
    _id: string
  };

  export type Image = {
    imageSrc: string,
    imageName: string,
    imageIndex: string
  }
  export interface ISubCategory {
    subCategoryName: string
    relatedCategoryName: string
  }
  export interface ICategory {
    categoryName: string
    subCategories: ISubCategory[]
  }

  export type MenuProps = {
    categories: ICategory[]
    products: IProduct[]
    subCategories: ISubCategory[]
  }