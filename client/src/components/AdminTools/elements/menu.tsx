import { NewProduct } from './newProduct' 
import { MenageCategories } from './categories'
type MenuProps = {
    isMenuOpened: boolean
    menuName: string
}

const Menu = (props: MenuProps) => {
    
    return(
        <div className={props.isMenuOpened ? "panel__menu height" : "panel__menu"}>
            <div className={props.isMenuOpened ? "panel__menu__content opened" : "panel__menu__content"}>
                {props.menuName === 'newProduct' ? (
                    <>
                        <NewProduct/>
                    </>
                ) : (
                    null
                )}
                {props.menuName === 'categories' ? (
                    <>
                        <MenageCategories/>
                    </>
                ) : (
                    null
                )}
            </div>
        </div>
    )
}

export default Menu