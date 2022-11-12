import { useState } from "react";
import FileBase from "react-file-base64";
import Input from "./input";
import Select from "./select/select";

type Product = {
  name: string | undefined;
  price: string | undefined;
  description: string | undefined;
  quantity: number | null;
  size: string | undefined;
  color: string | undefined;
};

export const NewProduct = () => {
  const images: string[] = [];
  const [imageNames, setImageNames] = useState<any[]>([]);
  const [category, setCategory] = useState<string>('');

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

  return (
    <div className="newProduct">
      <div className="newProduct__content">
        <div className="newProduct__content__info">
          <Select
            options={[
              { itemId: 0, itemName: "Obraz" },
              { itemId: 1, itemName: "Druk" },
              { itemId: 0, itemName: "Obraz" },
              { itemId: 1, itemName: "Druk" },
              { itemId: 0, itemName: "Obraz" },
              { itemId: 1, itemName: "Druk" },
              { itemId: 0, itemName: "Obraz" },
              { itemId: 1, itemName: "Druk" },
            ]}
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
          <Input change={handleTextInput} name="name" label="Nazwa" />
          <Input change={handleTextInput} name="price" label="Cena" />
          <Input change={handleTextInput} name="description" label="Opis" />
          <Input change={handleTextInput} name="quantity" label="Ilość produktu" />
          <Input change={handleTextInput} name="size" label="Rozmiar" />
          <Input change={handleTextInput} name="color" label="Kolor" />
        </div>
      </div>
    </div>
  );
};
