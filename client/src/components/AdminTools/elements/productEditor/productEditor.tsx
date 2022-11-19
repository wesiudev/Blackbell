import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  fetchProduct,
} from "../../../../common/redux/actions/product";
import { addSubCategory } from "../../../../common/redux/actions/subCategories";
import { getCategories } from "../../../../common/redux/actions/categories";
import { deleteProduct } from "../../../../common/redux/actions/product";

import {
  ICategory,
  IProduct,
  ISubCategory,
} from "../../../../common/types/types";
import FeedItem from "./elements/feedItem";
import ItemLoader from "./elements/itemLoader/itemLoader";

type EditorProps = {
  item: IProduct;
  closeEditor: Function;
};

const ProductEditor = (props: EditorProps) => {
  const dispatch = useDispatch<any>();
  const { subCategories } = useSelector((state: any) => state.subCategories);
  const fetchingProduct = useSelector((state: any) => state.products.fetchingSingleProduct);
  const [currentInputValue, setCurrentInputValue] = useState<string>("");
  const [inputLabel, setInputLabel] = useState<string>("");
  const [attributeToChange, setAttributeToChange] = useState<string>("");
  const [isInputVisible, setInputVisibility] = useState<boolean>(false);
  const [subCategoryToAdd, setSubCategoryToAdd] = useState<string>("");
  const [itemSizes, setItemSizes] = useState<string>();
  const [deleteInsurance, setDeleteInsurance] = useState<boolean>(false);
  console.log(fetchingProduct)
  function handleProductEditation() {
    const req = {
      productId: props?.item?._id,
      userInput: currentInputValue,
      actionType: attributeToChange,
    };
    dispatch(editProduct(req));
    dispatch(fetchProduct({ productId: props?.item?._id }));
    setInputVisibility(false);
    setCurrentInputValue("")
  }

  function setAttribute(e: any) {
    setAttributeToChange(e.target.name);
    setInputLabel(e.target.id)
    setInputVisibility(true);
  }

  function quitInput() {
    setAttributeToChange("");
    setCurrentInputValue("");
    setInputVisibility(false);
  }

  function createSubcategory() {
    const req = {
      subCategory: subCategoryToAdd,
      category: props?.item?.itemCategoryName,
      actionType: "ADD",
    };
    dispatch(addSubCategory(req));
  }
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  function removeItemFromItemStorage(){
    dispatch(deleteProduct({productId: props.item._id}))
    props.closeEditor()
  }

  function handleSubcategorySelection(item: string) {
    setCurrentInputValue(item)
    setAttributeToChange("subCategory")
  }

  const array = subCategories?.data?.filter(
    (subCategory: ISubCategory) =>
      subCategory?.relatedCategoryName === props?.item?.itemCategoryName
  );

  return (
    <div className="editor">
      <div className="editor__content">
        {fetchingProduct ? <ItemLoader/> : null }
        <div
          onClick={() => props.closeEditor()}
          className="closeEditor btnCancel"
        >
          Wyjście
        </div>
        {isInputVisible ? (
          <div className="inputMenu">
            <div className="inputMenu__content">
              {attributeToChange === "itemImages" ||
              attributeToChange === "itemColor" ||
              attributeToChange === "subCategory" ? (
                <div className="list">
                  {attributeToChange === "subCategory" && (
                    <div className="list__subCategory">
                      Podkategorie
                      <hr />
                      {array?.length ? (
                        <div className="list__subCategory__items">
                          {array?.map((item: ISubCategory, idx: number) => (
                            <div
                              style={
                                currentInputValue === item.subCategoryName
                                  ? { backgroundColor: "#cfcfcf" }
                                  : {}
                              }
                              key={idx}
                              className="list__subCategory__items__item"
                              onClick={() => handleSubcategorySelection(item.subCategoryName)}
                            >
                              {item.subCategoryName}{" "}
                              {props?.item?.subCategory ===
                              item.subCategoryName ? (
                                <div style={{ color: "green", opacity: ".75" }}>
                                  {"(aktywna)"}
                                </div>
                              ) : (
                                <div style={{ color: "grey", opacity: ".75" }}>
                                  {"(nieaktywna)"}
                                </div>
                              )}
                            </div>
                          ))}
                          <hr />
                        </div>
                      ) : (
                        <div className="noData">
                          <h2>Brak podkategorii.</h2>
                        </div>
                      )}
                      <div className="inputRow">
                        <input
                          autoFocus
                          onChange={(e) => setSubCategoryToAdd(e.target.value)}
                          type="text"
                          placeholder="Nazwa podkategorii"
                          value={subCategoryToAdd}
                        />
                        <button
                          onClick={() => createSubcategory()}
                          className="btnSave"
                        >
                          Dodaj
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{width:'100%'}}>
                <h3 style={{textAlign:'left', marginTop:'0px'}}>{inputLabel}</h3>
                <input
                  autoFocus
                  onChange={(e) => setCurrentInputValue(e.target.value)}
                  type="text"
                  value={currentInputValue}
                />
                </div>
              )}

              <div className="buttons">
                <button
                  onClick={() => handleProductEditation()}
                  className="btnSave"
                >
                  Zapisz
                </button>
                <button onClick={() => quitInput()} className="btnCancel">
                  Anuluj
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="feed">
        <h1>Edytuj produkt</h1>
            <hr />
                  <FeedItem data={props.item.itemName} setAttribute={setAttribute} label="Zmień nazwę" name="itemName" headline="Nazwa" />
                  <FeedItem data={props.item.itemPrice} setAttribute={setAttribute} label="Zmień cenę" name="itemPrice" headline="Cena" />
                  <FeedItem data={props.item.itemQuantity} setAttribute={setAttribute} label="Nowa ilość" name="itemQuantity" headline="Ilość" />
                  <FeedItem data={props.item.itemSize} setAttribute={setAttribute} label="Dodaj rozmiary" name="itemSize" headline="Rozmiary" />
                  <FeedItem data={props.item.itemColor} setAttribute={setAttribute} label="Dodaj kolory" name="itemColor" headline="Kolory" />
                  <FeedItem data={props.item.subCategory} setAttribute={setAttribute} label="" name="subCategory" headline="Podkategoria" />
                  <FeedItem data={props.item.itemDescription} setAttribute={setAttribute} label="Zmień opis" name="itemDescription" headline="Opis" />
                  {/* <FeedItem data={props.item.itemImages} setAttribute={setAttribute} label="" name="itemImages" headline="Zdjęcia" /> */}
                  <div style={{marginTop:'55px'}}>
                  {!deleteInsurance ? 
                  <button onClick={() => setDeleteInsurance(true)} style={{backgroundColor:"#f37b7b", border:"none"}} className="btnCancel">Usuń produkt</button>
                  :
                  <div>
                  <button onClick={removeItemFromItemStorage} style={{backgroundColor:"#f37b7b", border:"none"}} className="btnCancel">Usunąć?</button>
                  <button onClick={() => setDeleteInsurance(false)} style={{backgroundColor:"#93c565", border:"none"}} className="btnCancel">Nie usuwaj</button>
                  </div>
                }
                </div>
                  
        </div>
      </div>
    </div>
  );
};

export default ProductEditor;
