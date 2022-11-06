import { Gallery } from "./elements/Gallery"
import { Headline } from "./elements/Headline"
import { Parallax }from "./elements/Parallax"
import { About } from "./elements/About"
import heroImg from '../../common/images/heroImg.png'
import img0 from '../../common/images/img0.png'
import artist from '../../common/images/eliza.png'
const Home = () => {
    return(
        <div className="wrapper">
            <Headline text="SZTUKA" />
            <Parallax image={heroImg} height={50} width={100} speed={25} correctWidth={false}/>
            <Headline text="O MNIE"/>
            <div className="wrapper__about">
                <Parallax image={artist} height={80} width={70} speed={15} correctWidth={true}/>
                <About/>
            </div>
            <Gallery/>
        </div>
    )
}

export default Home