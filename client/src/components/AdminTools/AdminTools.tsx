import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Headline from './elements/headline';
import Menu from './elements/menu/menu';

const AdminTools = () => {

    const message = useSelector((state: any) => state.messages);

    const [isCategoryMenuOpened, setCategoryMenuOpened] = useState<boolean>(false);
    
    const [isNewProductOpened, setNewProductOpened] = useState<boolean>(false);
    
    const [isManageProductsOpened, setManageProductsOpened] = useState<boolean>(false);

    function setMessageStyles(){
        if (message.id === "ERROR") {
            return "#e76c6c"
        }else if (message.id === "SUCCESS") {
            return "#67c867"
        }
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
                <Headline text='Panel administracyjny' isMenuOpened={null} openMenu={null} />
                <hr />
                <Headline text='Zarządzaj kategoriami' isMenuOpened={isCategoryMenuOpened} openMenu={setCategoryMenuOpened}/>
                <Menu isMenuOpened={isCategoryMenuOpened} menuName='categories'/>
                <Headline text='Dodaj produkt' isMenuOpened={isNewProductOpened} openMenu={setNewProductOpened}/>
                <Menu isMenuOpened={isNewProductOpened} menuName='newProduct'/>
                <Headline text='Zarządzaj produktami' isMenuOpened={isManageProductsOpened} openMenu={setManageProductsOpened}/>
                <Menu isMenuOpened={isManageProductsOpened} menuName='menageProducts'/>
            </div>
            
        </div>
    )
}

export default AdminTools