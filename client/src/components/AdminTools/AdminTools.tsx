import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import Headline from './elements/headline';
import Menu from './elements/menu';

const AdminTools = () => {

    const [isNewProductOpened, setNewProductOpened] = useState<boolean>(false);

    return(
        <div className="admin_panel">
            <div className="panel">
                <Headline text='Panel administracyjny' isMenuOpened={null} openMenu={null} />
                <hr />
                <Headline text='Dodaj produkt' isMenuOpened={isNewProductOpened} openMenu={setNewProductOpened}/>
                <Menu isMenuOpened={isNewProductOpened} menuName='newProduct'/>
                
            </div>
        </div>
    )
}

export default AdminTools