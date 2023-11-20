import './Testimonials.css';
import Slider from "react-slick";
import { useState, useEffect } from 'react';

const peopleSays = [
  {
    name: 'John Dea',
    ProfileImg: '/images/ava-1.jpg',
  },
  {
    name: 'Lia Franklin',
    ProfileImg: '/images/ava-2.jpg',
  },
  {
    name: 'Daniel Wilson',
    ProfileImg: '/images/ava-3.jpg',
  },
  {
    name: 'John Dea',
    ProfileImg: '/images/ava-1.jpg',
  },
  {
    name: 'Lia Franklin',
    ProfileImg: '/images/ava-2.jpg',
  },
  {
    name: 'Daniel Wilson',
    ProfileImg: '/images/ava-3.jpg',
  },
];

const Testimonials = () => {
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 991) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(3);
      }
    };

    // Set initial state
    handleResize();

    // Listen to window resize events
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
  };

  return (
    <div className='container py-5'>
      <h4 className='py-2 px-1 bg d-inline-block fontf rounded-pill overflow-hidden'>Testimonials</h4>
      <h1 className='py-3'>What our fans say about us</h1>
      <Slider className='slider' {...settings}>
        {peopleSays.map((val, ind) => (
          <div className='peopleCard cardbox' key={ind}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum perferendis sequi quos, officia reprehenderit cumque, quidem doloremque provident voluptatem quo soluta eos placeat. Temporibus ex voluptas impedit est aliquid enim rem ipsum! Laborum eum autem animi mollitia, non commodi facere voluptatem quaerat obcaecati asperiores.
            </p>
            <div className='d-flex gap-3 align-items-center justify-content-between'>
              <img src={val.ProfileImg} alt="profilePic" className='rounded-3 flex1' />
              <div className='flex1 d-flex flex-column justify-content-center'>
                <p>{val.name}</p>
                <p className='home-text'>Customer</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;