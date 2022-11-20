import { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import Input from "../input";
import Select from "../select/select";
import { getCategories } from '../../../../common/redux/actions/categories'
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../../common/redux/actions/product";
import Resizer from "react-image-file-resizer";
import { storage } from '../../../../common/firebase/firebase'
import { ref, uploadBytes } from "firebase/storage"

type Product = {
  itemName: string | undefined;
  itemPrice: number | null;
  itemDescription: string | undefined;
  itemQuantity: number | null;
  itemSize: string | undefined;
  itemColor: string | undefined;
};

type imageObject = {
  thumbnail: any
  realPicture: string
}

export const NewProduct = () => {
  const dispatch: any = useDispatch()
  const [itemImages, setImageItems] = useState<imageObject[]>([]);
  const [imageNames, setImageNames] = useState<any[]>([]);
  const [category, setCategory] = useState<string>('');
  const { categories } = useSelector((state: any) => state.categories);
  const [
    { itemName, itemPrice, itemDescription, itemQuantity, itemSize, itemColor },
    setProductData,
  ] = useState<Product>({
    itemName: "",
    itemPrice: 0,
    itemDescription: "",
    itemQuantity: 0,
    itemSize: "",
    itemColor: "",
  });
  
  function createProduct() {
    const req = {
      category,
      itemName,
      itemPrice,
      itemDescription,
      itemQuantity,
      itemSize,
      itemColor,
      itemImages,
    }
    dispatch(addProduct(req));
    dispatch(getCategories())
  }

  const resizeImageForFirebase = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1000,
        1000,
        "png",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const resizeImageForMongo = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        400,
        400,
        "png",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

    const addImageToUserInput = async (e: any) => {
    try{
    if (!e.target.files[0]) return
      const fireBaseImage: any = await resizeImageForFirebase(e.target.files[0])
      const mongoImage: any = await resizeImageForMongo(e.target.files[0])
      //in pseudo randomness we trust 🙏
      const pseudoRandomName = Math.floor(Math.random()*9999*100).toString()
      const imageRef = ref(storage, `images/image-${pseudoRandomName}`)
      uploadBytes(imageRef, fireBaseImage).then(() => 
        console.log("STOP LOADING")
      )
      const itemToPush = {
        thumbnail:mongoImage,
        realPicture: `image-${pseudoRandomName}`
      }
    setImageItems(itemImages => [...itemImages, itemToPush]);
    setImageNames(imageNames => [...imageNames, {name: `image-${pseudoRandomName}`}]);
  } catch (err) {
    console.log(err);
  }
};

  const handleTextInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setProductData({
      itemName, itemPrice, itemDescription, itemQuantity, itemSize, itemColor,
      [e.target.name]: e.target.value,
    });
  };

  const categoryOptions = categories?.data?.map((itemName: any, i: number) => ({itemName: itemName.categoryName, itemId: `${i+1}`}))
  
  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <div className="newProduct">
      <div className="newProduct__content">
        <div className="newProduct__content__info">
          <Select
            options={categoryOptions}
            onSelect={setCategory}
          />
          <input
          type="file"
          multiple={false}
          onChange={(e: any) => addImageToUserInput(e)}
        />
          <div>
          {imageNames?.length > 0 && (<h3>Wybrane zdjęcia:</h3>)}
          <ol>
            {imageNames.map((item:any, idx: number) => (
              <li key={idx}>
              {item.name && item.name.length > 32
                  ? item.name.substring(0, 33) + "..."
                  : item.name}
              </li>
            ))}
          </ol>
          </div>
        </div>
        <div className="newProduct__content__inputs">
          <Input change={handleTextInput} name="itemName" label="Nazwa" />
          <Input change={handleTextInput} name="itemPrice" label="Cena" />
          <Input change={handleTextInput} name="itemDescription" label="Opis" />
          <Input change={handleTextInput} name="itemQuantity" label="Ilość produktu" />
          <Input change={handleTextInput} name="itemSize" label="Rozmiar" />
          <Input change={handleTextInput} name="itemColor" label="Kolor" />
          <div className="newProduct__content__inputs__input">
            <div className="buttonAdd" onClick={createProduct}>Dodaj produkt</div>
          </div>
        </div>
      </div>
    </div>
  );
};
