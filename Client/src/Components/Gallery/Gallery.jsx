import './Gallery.css'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
const gal = [
    {img : '/images/gallery-01_batcheditor_fotor.webp',animationDuration : 2.7},
    {img : '/images/gallery-03_batcheditor_fotor.webp',animationDuration : 4},
    {img : '/images/gallery-04_batcheditor_fotor.webp',animationDuration : 2.5},
    {img : '/images/gallery-02_batcheditor_fotor.webp',animationDuration : 3.1},
    {img : '/images/gallery-05_batcheditor_fotor.webp',animationDuration : 4.2},
    {img : '/images/gallery-06_batcheditor_fotor.webp',animationDuration : 3},
    {img : '/images/gallery-07_batcheditor_fotor.webp',animationDuration : 2},
    {img : '/images/gallery-03_batcheditor_fotor.webp',animationDuration : 3.5},
    {img : '/images/gallery-01_batcheditor_fotor.webp',animationDuration : 1.7},
]

const Gallery = () => {

    return (
    
    <div className='container py-5'>
        <h4 className='py-2 px-1 bg d-inline-block fontf rounded-pill overflow-hidden'>Gallery</h4>
        <h1 className='py-3'>Visit our customers tour Gallery</h1>
        <div className='py-5'>
        <ResponsiveMasonry className='' columnsCountBreakPoints={{450 : 1 ,768 : 2,992 : 3}} >
        <Masonry gutter='1.3rem'>
            {gal.map((val,ind)=>(
                <img key={ind} src={val.img} className='w-100 d-block galleryImg' style={{borderRadius : '20px',animationDuration : val.animationDuration+'s'}} alt="Gallery" />
        ))} 
        </Masonry>
        </ResponsiveMasonry>
        </div>
    </div>
  )
}

export default Gallery