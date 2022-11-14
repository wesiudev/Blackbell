import { useState, useEffect } from "react";
import { addCategory, getCategories, removeCategory } from "../../../common/redux/actions/categories";
import { useDispatch, useSelector } from "react-redux";

export const MenageCategories = () => {
    const dispatch = useDispatch<any>();
    const { categories } = useSelector((state: any) => state.categories);
    const [categoryList, setCategoryList] = useState<any[]>(categories.data);
    const [userInput, setUserInput] = useState<string>('');
    const [currentlyEditingCategory, setCurrentlyEditingCategory] = useState<string>('');
    const [deleteCategoryIncurance, setDeleteCategoryIncurance] = useState<boolean>(false);
    const categoryAddRequestHandler:  React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(
            addCategory(
            {
                category: userInput,
                actionType: "ADD"
            }
        ))
    }
    const categoryRemoveRequestHandler:  React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(
            removeCategory(
            {
                category: currentlyEditingCategory,
                actionType: "REMOVE"
            }
        ))
        setCurrentlyEditingCategory('')
        setDeleteCategoryIncurance(false)
    }
    
    function cancelDeletation() {
        setCurrentlyEditingCategory('')
        setDeleteCategoryIncurance(false)
    }

    useEffect(() => {
          setCategoryList(categories.data)
      }, [categories])
      console.log(categoryList)
    return(
        <div className="categories">
            <div className="categories__content">
            {currentlyEditingCategory !== '' ? 
                (
                    <div className="categories__content__menu">
                        <div className="categories__content__menu__window">
                        {deleteCategoryIncurance === false ? (
                            `Usunąć kategorię:${" "}${currentlyEditingCategory}?`
                        ) : (
                            `Usuwając kategorię wraz z produktami które się w niej znajdują.`
                        )}
                        {deleteCategoryIncurance === false ? (
                            <div className="categories__content__menu__window__buttons">
                                <button onClick={() => setDeleteCategoryIncurance(true)} className="delete">Usuń</button>
                                <button onClick={() => setCurrentlyEditingCategory('')} className="cancel">Anuluj</button>
                            </div>
                        ) : 
                            (<div className="categories__content__menu__window__buttons">
                            <button onClick={categoryRemoveRequestHandler} className="delete">Usuń</button>
                            <button onClick={cancelDeletation} className="cancel">Anuluj</button>
                        </div>)
                        } 
                        </div>
                    </div>
                    ) : (
                        null
                    ) 
                }
                    
                <div className="categories__content__new">
                    <label htmlFor="newCategory">Dodaj kategorię</label>
                    <div className="categories__content__new__row">
                        <input type="text" name="newCategory" onChange={(e) => setUserInput(e.target.value)}/>
                        <button onClick={categoryAddRequestHandler}>Dodaj</button>
                    </div>
                </div>
                <div className="categories__content__list">
                    {categories && categoryList?.map((category: any, idx: number) => (
                        <div className="categories__content__list__item" key={idx} onClick={() => setCurrentlyEditingCategory(category.categoryName)}>{category.categoryName === '' ? '?' : category.categoryName}</div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}


