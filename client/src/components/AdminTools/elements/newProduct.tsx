import { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import Input from "./input";
import Select from "./select/select";
import { getCategories } from '../../../common/redux/actions/categories'
import { useDispatch, useSelector } from "react-redux";


type Product = {
  name: string | undefined;
  price: string | undefined;
  description: string | undefined;
  quantity: number | null;
  size: string | undefined;
  color: string | undefined;
};

export const NewProduct = () => {
  const dispatch: any = useDispatch()
  const images: string[] = [];
  const [imageNames, setImageNames] = useState<any[]>([]);
  const [category, setCategory] = useState<string>('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile") as string));
  const { categories } = useSelector((state: any) => state.categories);
  const [
    { name, price, description, quantity, size, color },
    setProductData,
  ] = useState<Product>({
    name: "",
    price: "",
    description: "",
    quantity: 0,
    size: "",
    color: "",
  });

  function addImageToUserInput(base64: any) {
    images.push(base64.base64);
    setImageNames(imageNames => [...imageNames, {name: base64.name}]);
    console.log(imageNames)
  }

  const handleTextInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setProductData({
      name,
      price,
      description,
      quantity,
      size,
      color,
      [e.target.name]: e.target.value,
    });
  };

  const categoryOptions = categories?.data?.map((itemName: any, i: number) => ({itemName: itemName.categoryName, itemId: `${i+1}`}))
  
  useEffect(() => {
    dispatch(getCategories())
  }, [getCategories])
  
  return (
    <div className="newProduct">
      <div className="newProduct__content">
        <div className="newProduct__content__info">
          <Select
            options={categoryOptions}
            onSelect={setCategory}
          />
          <FileBase
            type="file"
            multiple={false}
            onDone={(base64: any) => addImageToUserInput(base64)}
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
          <div>
          <Input change={handleTextInput} name="name" label="Nazwa" />
          <Input change={handleTextInput} name="price" label="Cena" />
          <Input change={handleTextInput} name="description" label="Opis" />
          </div>
          <div>
          <Input change={handleTextInput} name="quantity" label="Ilość produktu" />
          <Input change={handleTextInput} name="size" label="Rozmiar" />
          <Input change={handleTextInput} name="color" label="Kolor" />
          </div>
        </div>
      </div>
    </div>
  );
};
