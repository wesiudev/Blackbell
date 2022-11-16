import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../common/redux/actions/categories";
import { ICategory, IProduct } from "../../../common/types/types";


const MenageProducts = () => {
    const dispatch: any = useDispatch()

    const { categories } = useSelector((state: any) => state.categories);
    useEffect(() => {
        dispatch(getCategories())
      }, [])
    return(
        <div className="products">
            <div className="products__content">
                {categories?.data?.map((category: ICategory, idx: number) => (
                    <div key={idx} className="category">
                        <div className="category__title">
                            <h1>{category.categoryName}</h1>
                            <hr />
                        </div>
                        <div className="category__items">
                            <div className="category__items__content">
                                <h3>Przedmioty:</h3>
                                {category?.categoryItems.map((item:IProduct, idx:number) => (
                                    <div key={idx} className="category__items__content__item">
                                        {item.itemName}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MenageProducts