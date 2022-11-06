import logo from '../../common/images/logobbw.png'
import logoWhite from '../../common/images/logobbwWhite.png'
import facebookIcon from '../../common/images/facebook.png'
import instagramIcon from '../../common/images/instagram.png'
import youtubeIcon from '../../common/images/youtube.png'
import facebookWhiteIcon from '../../common/images/facebookWhite.png'
import instagramWhiteIcon from '../../common/images/instagramWhite.png'
import youtubeWhiteIcon from '../../common/images/youtubeWhite.png'
import {useState} from 'react'
import useWindowDimensions from '../../common/hooks/useWindowDimensions'
const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const { width } = useWindowDimensions();

    function handleNavVisibility() {
        let className = "hidden";
        if (width<=1023 && isMenuOpen) {
            className = "nav";
        }else if (width<=1023 && !isMenuOpen) {
            className = "nav hidden";
        }else if (width>=1024 && !isMenuOpen) {
            className = "nav";
        }
        return className;
    }

    return(
        <header>
            <div className="content">
                <div className="logo">
                    <img src={isMenuOpen ? logoWhite : logo} alt="" /><span style={isMenuOpen ? {color:'white'} : {color:'black'}}>BlackBell</span>
                </div>
                { width < 1023 ? <div className="open" onClick={() => setMenuOpen(!isMenuOpen)}><span></span><span></span><span></span></div> : null }
                <div className={handleNavVisibility()}>
                    <div className="nav__items">
                        <div className="nav__items__item">
                            GALERIA
                        </div>
                        <div className="nav__items__item">
                            SKLEP
                        </div>
                        <div className="nav__items__item">
                            KONTAKT
                        </div>
                    </div>
                    <div className="nav__socials">
                        <div className="nav__socials__items">
                            <div className="nav__socials__items__item"><img src={isMenuOpen && width<=1023 ? facebookWhiteIcon : facebookIcon} alt="" /> </div>
                            <div className="nav__socials__items__item"><img src={isMenuOpen && width<=1023 ? instagramWhiteIcon : instagramIcon} alt="" /> </div>
                            <div className="nav__socials__items__item"><img src={isMenuOpen && width<=1023 ? youtubeWhiteIcon : youtubeIcon} alt="" /> </div>
                        </div>
                        <div className="nav__socials__language">ENGLISH</div>
                    </div>
                    {isMenuOpen ? <div className='nav__close' onClick={() => setMenuOpen(!isMenuOpen)}><span onClick={() => setMenuOpen(!isMenuOpen)} ></span></div> : null}
                </div>
            </div>
        </header>
    )
}

export default Header