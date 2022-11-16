export interface IProduct {
    itemName: string | undefined;
    itemPrice: number | null;
    itemDescription: string | undefined;
    itemQuantity: number | null;
    itemSize: string | undefined;
    itemColor: string | undefined;
    itemImages: Image
  };

  type Image = {
    imageSrc: string,
  }
  export interface ICategory {
    categoryName: string
    categoryItems: IProduct[]
  }