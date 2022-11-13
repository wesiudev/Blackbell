import { useState } from "react";
import { addCategory } from "../../../common/redux/actions/owner";
import { useDispatch } from "react-redux";

export const MenageCategories = () => {
    const dispatch = useDispatch<any>();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile") as string));
    const [userInput, setUserInput] = useState<string>('');

    const categoryAddRequestHandler:  React.MouseEventHandler<HTMLButtonElement> = () => {
        const userName: string = user?.result?.userName
        dispatch(
            addCategory(
            {
                userName: userName,
                category: userInput,
                actionType: "ADD"
            }
        ))

        setTimeout(() => {
            setUser(JSON.parse(localStorage.getItem("profile") as string))
        }, 1000);
    }

    return(
        <div className="categories">
            <div className="categories__content">
                <div className="categories__content__new">
                    <label htmlFor="newCategory">Dodaj kategorię</label>
                    <div className="categories__content__new__row">
                        <input type="text" name="newCategory" onChange={(e) => setUserInput(e.target.value)}/>
                        <button onClick={categoryAddRequestHandler}>Dodaj</button>
                    </div>
                </div>
                <div className="categories__content__list">
                    {user && user?.result?.categories.map((category: string, idx: number) => (
                        <div className="categories__content__list__item" key={idx}>{category}</div>
                    ))}
                </div>
                
            </div>
        </div>
    )
}
