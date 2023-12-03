import { Suspense } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Gallery.css';
const gal = [
    {img : '/images/gallery-01.jpg',animationDuration : 2.7},
    {img : '/images/gallery-02.jpg',animationDuration : 4},
    {img : '/images/gallery-03.jpg',animationDuration : 2.5},
    {img : '/images/gallery-04.jpg',animationDuration : 3.1},
    {img : '/images/gallery-05.jpg',animationDuration : 4.2},
    {img : '/images/gallery-06.jpg',animationDuration : 3},
    {img : '/images/gallery-07.jpg',animationDuration : 2},
    {img : '/images/gallery-03.jpg',animationDuration : 3.5},
    {img : '/images/gallery-01.jpg',animationDuration : 1.7},
]

const GalleryImage = ({ img, animationDuration }) => (
    <LazyLoadImage
      alt="Gallery"
      src={img}
      className="w-100 d-block galleryImg"
      style={{ borderRadius: '20px', animationDuration: `${animationDuration}s` }}
    />
  );
  
  const Gallery = () => {
    return (
      <div className='container py-5'>
        <h4 className='py-2 px-1 bg d-inline-block fontf rounded-pill overflow-hidden'>Gallery</h4>
        <h1 className='py-3'>Visit our customers tour Gallery</h1>
        <div className='py-5'>
          <ResponsiveMasonry className='' columnsCountBreakPoints={{ 450: 1, 768: 2, 992: 3 }}>
            <Masonry gutter='1.3rem'>
              {gal.map((val, ind) => (
                <Suspense key={ind} fallback={<img style={{maxHeight : '100px'}} className='h-100' src='/images/Loading.svg'/>}>
                  <GalleryImage img={val.img} animationDuration={val.animationDuration} />
                </Suspense>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    );
  }
  
  export default Gallery;