import { useState } from "react";
import ImageModal from "./image/ImageModal";
import Input from "./input";
import Select from "./select/select";

type Product = {
  name: string | undefined;
  price: string | undefined;
  image: string | undefined;
  description: string | undefined;
  quantity: number | null;
  size: string | undefined;
  color: string | undefined;
  category: string | undefined;
};

export const NewProduct = () => {
  const [pruductData, setProductData] = useState();
  const [category, setCategory] = useState<string>("");
  return (
    <div className="newProduct">
      <div className="newProduct__content">
        <div className="newProduct__content__inputs">
          <Input name="name" label="Nazwa" />
          <Input name="price" label="Cena" />
          <Input name="description" label="Opis" />
          <Input name="quantity" label="Ilość produktu" />
          <Input name="size" label="Rozmiar" />
          <Input name="color" label="Kolor" />
        </div>
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
          <ImageModal />
        </div>
      </div>
    </div>
  );
};
