import { Headline } from "./elements/Headline"
import { Parallax }from "./elements/Parallax"
import { AboutMe, AboutArt, AboutRequest, AboutMeEng, AboutArtEng, AboutRequestEng } from "./elements/About"
import {motion} from 'framer-motion'
import heroImg from '../../common/images/heroImg.png'
import img0 from '../../common/images/img0.png'
import artist from '../../common/images/eliza.png'
import img1 from '../../common/images/6.png'
import img2 from '../../common/images/8.png'
import Button from "./elements/Button"
import Gallery from "../Gallery/Gallery"
import Footer from "../Footer/Footer"
const Home = (isFirstLoad:boolean, isEngContent: boolean) => {

    const opacity = () => {
        if (isFirstLoad) {
            return 0
        }else{
            return 1
        }
    } 

    const animateContent = {
        hidden:{
            opacity: opacity(),
        },
        visible: {
            opacity:1,
            transition: {
            delay:2.8,
            duration: .3,
            ease: "easeInOut"
          }
        }
      }

    return(
        <>
        <motion.div variants={animateContent} initial="hidden" animate="visible" className="wrapper">
            <Headline text={isEngContent ? 'ART' : 'SZTUKA'} />
            <Parallax image={heroImg} height={50} width={80} speed={15} correctWidth={false} borders={true}/>
            <Headline text={isEngContent ? 'ABOUT ME' : 'O MNIE'}/>
            <div className="wrapper__about">
                <Parallax image={artist} height={80} width={55} speed={15} correctWidth={true} borders={false}/>
                {isEngContent ? <AboutMeEng/> : <AboutMe/>}
            </div>
            <Headline text={isEngContent ? 'INSPIRATION' : 'INSPIRACJA'}/>
            <div className="wrapper__about columnReverse">
                {isEngContent ? <AboutArtEng/> : <AboutArt/>}
                <Parallax image={img0} height={80} width={55} speed={15} correctWidth={true} borders={false}/>
            </div>
            <Headline text={isEngContent ? 'ART ON REQUEST' : 'PRACE NA ZAMÓWIENIE'}/>
            <div className="wrapper__request">
                <img src={img1} alt="" />
                <img src={img2} alt="" />
            </div>
            {isEngContent ? <AboutRequestEng/> : <AboutRequest/> }
            
            <Button text={isEngContent? "CONTACT" : "KONTAKT"}/>
        </motion.div>
        </>
    )
}

export default Home