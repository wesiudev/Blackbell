import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from '../../../../common/redux/actions/product';
import { IProduct } from '../../../../common/types/types';
import Button from './button';

type EditorProps = {
    item: IProduct
}

const ProductEditor = (props: EditorProps) => {
    
    return(
        <div className="editor">
            <div className="editor__content">
                <div className="feed">
                    <h1>Edytuj przedmiot</h1>
                    <hr />
                    <h3>Nazwa:</h3> {props.item.itemName || <Button attribute="itemName"  />}
                    <h3>Cena:</h3> {props.item.itemPrice || <Button attribute="itemPrice"  />}
                    <h3>Ilość:</h3> {props.item.itemQuantity || <Button attribute="itemQuantity"  />}
                    <h3>Rozmiar:</h3> {props.item.itemSize || <Button attribute="itemSize"  />}
                    <h3>Kolor:</h3> {props.item.itemColor || <Button attribute="itemColor"  />}
                    <h3>Podkategoria:</h3> {props.item.subCategory || <Button attribute="subCategory"  />}
                    <h3>Opis:</h3> {props.item.itemDescription || <Button attribute="itemDescription"  />} 
                    <h3>Zdjęcia produktu:</h3> {props.item.itemName || <Button attribute="itemName"  />}

                </div>
        </div>
        </div>
    )
}

export default ProductEditor