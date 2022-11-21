import { Headline } from "../Home/elements/Headline"

const Gallery = (isEngContent:boolean) => {
    return(
        <>
            {/* <Headline PLtext="GALERIA" ENGtext="GALLERY" isEngContent={isEngContent}/> */}
            <div className="gallery">
                    <div className="gallery__item"></div>
                    <div className="gallery__item"></div>  
                    <div className="gallery__item"></div>
                    <div className="gallery__item"></div>
                    <div className="gallery__item"></div>
                    <div className="gallery__item"></div>
                    <div className="gallery__item"></div>
            </div>
        </>
    )
}
export default Gallery