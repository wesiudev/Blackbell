import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { cleanProduct, fetchProduct, fetchProducts } from '../../common/redux/actions/product';

import { IProduct } from '../../common/types/types';
import Headline from './elements/headline';
import Menu from './elements/menu/menu';
import ProductEditor from './elements/productEditor/productEditor';

const AdminTools = () => {

    const dispatch = useDispatch<any>();
    const message = useSelector((state: any) => state.messages);
    const product = useSelector((state: any) => state.products.product);

    const [isCategoryMenuOpened, setCategoryMenuOpened] = useState<boolean>(false);
    
    const [isNewProductOpened, setNewProductOpened] = useState<boolean>(false);
    
    const [isManageProductsOpened, setManageProductsOpened] = useState<boolean>(false);
    const [isProductEditorOpened, setProductEditorOpened] = useState<boolean>(false);
    const [currentlyEditingItem, setCurrentlyEditingItem] = useState<IProduct>();

    function editProduct(product: IProduct) {
        dispatch(fetchProduct({ productId: product?._id }));
            setProductEditorOpened(true)
            setCurrentlyEditingItem(product)
    }
    console.log(product)
    function setMessageStyles(){
        if (message.id === "ERROR") {
            return "#e76c6c"
        }else if (message.id === "SUCCESS") {
            return "#67c867"
        }
    }
    function closeEditor() {
        setProductEditorOpened(false)
        dispatch(cleanProduct())
        dispatch(fetchProducts())
    }
    const messageStyles = {
        backgroundColor: setMessageStyles()
    }
    return(
        <div className="admin_panel">
            {message.text ? (
                <div className="admin_panel__alert">
                    <div style={messageStyles} className="admin_panel__alert__message">
                        {message.text}
                    </div>
                </div>
            ) : (
                null
            )}
            
            <div className="panel">
                {isProductEditorOpened ? <ProductEditor closeEditor={closeEditor} item={product}/> : null}
                <Headline text='Panel administracyjny' isMenuOpened={null} openMenu={null} />
                <div className="hr"></div>
                <Headline text='Zarządzaj produktami' isMenuOpened={isCategoryMenuOpened} openMenu={setCategoryMenuOpened}/>
                <Menu isMenuOpened={isCategoryMenuOpened} editProduct={editProduct} menuName='categories'/>
                <Headline text='Dodaj produkt' isMenuOpened={isNewProductOpened} openMenu={setNewProductOpened} />
                <Menu isMenuOpened={isNewProductOpened} menuName='newProduct' editProduct={""}/>
            </div>
            
        </div>
    )
}

export default AdminTools