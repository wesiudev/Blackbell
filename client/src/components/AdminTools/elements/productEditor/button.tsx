import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../../../../common/redux/api";

type ButtonProps = {
  attribute: string;
};

const Button = (props: ButtonProps) => {
  const dispatch = useDispatch<any>();
  const [isButtonOpened, setButtonOpened] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string | number>();
  function isEditing() {
    setButtonOpened(true);
  }
  const handleProductEditation: React.FormEventHandler<HTMLFormElement> = (
    e
  ) => {
    e.preventDefault();
    const req = {
      userInput: userInput,
      attributeToChange: props.attribute,
    };
    dispatch(editProduct(req));
  };

  return (
    <form onSubmit={(e) => handleProductEditation(e)}>
      {isButtonOpened ? (
        <div>
          <input
            style={{ height: "20px" }}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            autoFocus
            onBlur={() =>
              setTimeout(() => {
                setButtonOpened(false);
              }, 500)
            }
            type="text"
          />
          <button onClick={() => console.log("ok")}>Zapisz</button>
        </div>
      ) : (
        <button onClick={isEditing}>Dodaj informacje</button>
      )}
    </form>
  );
};

export default Button;
