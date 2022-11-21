import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  fetchProduct,
  fetchProducts,
} from "../../../../common/redux/actions/product";
import { addSubCategory } from "../../../../common/redux/actions/subCategories";
import { getCategories } from "../../../../common/redux/actions/categories";
import { deleteProduct } from "../../../../common/redux/actions/product";
import { Image, IProduct, ISubCategory } from "../../../../common/types/types";
import ItemLoader from "./elements/itemLoader/itemLoader";
import RegularItem from "./elements/display/RegularItem";
import ImagesItem from "./elements/display/ImagesList";
import EditSubCategories from "./elements/edit/EditSubCategories";
import ActionButtons from "./elements/ActionButtons";
import ImagePreview from "./elements/edit/ImagePreview";
import ImageUpload from "./elements/edit/ImageUpload";

type EditorProps = {
  item: IProduct;
  closeEditor: Function;
  setChangesWereCommitted: Function
  changesWereCommitted: boolean
};

const ProductEditor = (props: EditorProps) => {
  const dispatch = useDispatch<any>();
  const { subCategories } = useSelector((state: any) => state.subCategories);
  const fetchingProduct = useSelector(
    (state: any) => state.products.fetchingSingleProduct
  );
  const [currentInputValue, setCurrentInputValue] = useState<string>("");
  const [inputLabel, setInputLabel] = useState<string>("");
  const [attributeToChange, setAttributeToChange] = useState<string>("");
  const [isInputVisible, setInputVisibility] = useState<boolean>(false);
  const [subCategoryToAdd, setSubCategoryToAdd] = useState<string>("");
  const [itemSizes, setItemSizes] = useState<string>();
  const [deleteInsurance, setDeleteInsurance] = useState<boolean>(false);
  const [isDefaultAttributeMenu, setDefaultAttributeMenu] =
    useState<boolean>(false);
  const [isImagePreviewOpened, setImagePreviewOpened] =
    useState<boolean>(false);
  const [currentImagePreview, setCurrentImagePreview] = useState<string>("");
  const [realImageSource, setRealImageSource] = useState<string>("");
  const [isImageUploadOpened, setImageUploadOpened] = useState<boolean>(false);

  function handleProductEditation() {
    const req = {
      productId: props?.item?._id,
      userInput: currentInputValue,
      actionType: attributeToChange,
      thumbnail: currentInputValue,
      realImage: realImageSource,
    };
    dispatch(editProduct(req));
    setInputVisibility(false);
    setCurrentInputValue("");
    setCurrentImagePreview("")
    setImagePreviewOpened(false)
    setImageUploadOpened(false)
    props.changesWereCommitted && dispatch(fetchProduct({productId: props.item._id}))
    props.setChangesWereCommitted(true)
    }
  
  function setActionType(e: any) {
    setAttributeToChange(e.target.name);
    setInputLabel(e.target.id);
    setInputVisibility(true);
    checkAttributeToChange(e.target.name);
    setImageUploadOpened(true);
    setCurrentImagePreview("");
  }

  function quitInput() {
    setAttributeToChange("");
    setCurrentInputValue("");
    setInputVisibility(false);
    setDefaultAttributeMenu(false);
    setImageUploadOpened(false);
    setCurrentImagePreview("");
    props.changesWereCommitted && dispatch(fetchProduct({productId: props.item._id}))
  }

  function createSubcategory() {
    const req = {
      subCategory: subCategoryToAdd,
      category: props?.item?.itemCategoryName,
      actionType: "ADD",
    };
    dispatch(addSubCategory(req));
    props.setChangesWereCommitted(true)
  }
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  function removeItemFromItemStorage() {
    dispatch(deleteProduct({ productId: props.item._id }));
    props.setChangesWereCommitted(true)
    props.closeEditor();
  }

  function handleSubcategorySelection(item: string) {
    setCurrentInputValue(item);
    setAttributeToChange("subCategory");
  }

  function checkAttributeToChange(attributeToChange: string) {
    if (
      attributeToChange === "itemName" ||
      attributeToChange === "itemQuantity" ||
      attributeToChange === "itemDescription" ||
      attributeToChange === "itemPrice"
    ) {
      setDefaultAttributeMenu(true);
    } else {
      setDefaultAttributeMenu(false);
    }
  }

  function openImagePreviewModal(src: string, imageIndex: string) {
    setImagePreviewOpened(true);
    setAttributeToChange("deleteImage");
    setCurrentImagePreview(src);
    setCurrentInputValue(imageIndex);
  }

  return (
    <div className="editor">
      <div className="editor__content">
        {isImageUploadOpened && attributeToChange === "itemImages" ? (
          <div className="inputMenu">
            <div className="inputMenu__content">
              <ImageUpload
                uploadHandler={handleProductEditation}
                quitInput={quitInput}
                currentImage={currentImagePreview}
                setCurrentImage={setCurrentImagePreview}
                setCurrentInputValue={setCurrentInputValue}
                setRealImageSource={setRealImageSource}
              />
            </div>
          </div>
        ) : null}
        {isImagePreviewOpened && attributeToChange === "deleteImage" ? (
          <div className="inputMenu">
            <div className="inputMenu__content">
              <ImagePreview
                deleteHandler={handleProductEditation}
                quitInput={quitInput}
                currentImage={currentImagePreview}
              />
            </div>
          </div>
        ) : null}
        {fetchingProduct ? <ItemLoader loaderStyle="fixed" /> : null}
        {isInputVisible && isDefaultAttributeMenu ? (
          <div className="inputMenu">
            <div className="inputMenu__content">
              <div style={{ width: "100%" }}>
                <h3 style={{ textAlign: "left", marginTop: "0px" }}>
                  {inputLabel}
                </h3>
                <input
                  autoFocus
                  onChange={(e) => setCurrentInputValue(e.target.value)}
                  type="text"
                  value={currentInputValue}
                />
                <ActionButtons
                  handleProductEditation={handleProductEditation}
                  quitInput={quitInput}
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            {isInputVisible && attributeToChange === "subCategory" && (
              <div className="inputMenu">
                <div className="inputMenu__content">
                  <EditSubCategories
                    subCategoryToAdd={subCategoryToAdd}
                    subCategories={subCategories}
                    setSubCategoryToAdd={setSubCategoryToAdd}
                    handleSubcategorySelection={handleSubcategorySelection}
                    attributeToChange={attributeToChange}
                    currentInputValue={currentInputValue}
                    createSubcategory={createSubcategory}
                    item={props?.item}
                  />
                  <ActionButtons
                    handleProductEditation={handleProductEditation}
                    quitInput={quitInput}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        <div className="feed">
          <div className="feed__topSide">
            <h1>Edytuj produkt</h1>
            <div
              onClick={() => props.closeEditor()}
              className="closeEditor btnCancel"
            >
              Wyjście
            </div>
          </div>
          <hr />
          <RegularItem
            data={props.item.itemName}
            setActionType={setActionType}
            label="Zmień nazwę"
            name="itemName"
            headline="Nazwa"
          />
          <RegularItem
            data={props.item.itemPrice}
            setActionType={setActionType}
            label="Zmień cenę"
            name="itemPrice"
            headline="Cena"
          />
          <RegularItem
            data={props.item.itemQuantity}
            setActionType={setActionType}
            label="Nowa ilość"
            name="itemQuantity"
            headline="Ilość"
          />
          <RegularItem
            data={props.item.itemSize}
            setActionType={setActionType}
            label="Dodaj rozmiary"
            name="itemSize"
            headline="Rozmiary"
          />
          <RegularItem
            data={props.item.itemColor}
            setActionType={setActionType}
            label="Dodaj kolory"
            name="itemColor"
            headline="Kolory"
          />
          <RegularItem
            data={props.item.subCategory}
            setActionType={setActionType}
            label=""
            name="subCategory"
            headline="Podkategoria"
          />
          <RegularItem
            data={props.item.itemDescription}
            setActionType={setActionType}
            label="Zmień opis"
            name="itemDescription"
            headline="Opis"
          />
          <ImagesItem
            data={props.item.itemImages}
            setActionType={setActionType}
            label="Dodaj zdjęcie"
            name="itemImages"
            headline="Zdjęcia"
            openImagePreview={openImagePreviewModal}
            setImageUploadOpened={setImageUploadOpened}
          />
          <div style={{ marginTop: "55px" }}>
            {!deleteInsurance ? (
              <button
                onClick={() => setDeleteInsurance(true)}
                style={{ backgroundColor: "#f37b7b", border: "none" }}
                className="btnCancel"
              >
                Usuń produkt
              </button>
            ) : (
              <div>
                <button
                  onClick={removeItemFromItemStorage}
                  style={{ backgroundColor: "#f37b7b", border: "none" }}
                  className="btnCancel"
                >
                  Usunąć?
                </button>
                <button
                  onClick={() => setDeleteInsurance(false)}
                  style={{ backgroundColor: "#93c565", border: "none" }}
                  className="btnCancel"
                >
                  Nie usuwaj
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditor;
