import SearchBar from '../SearchBar/SearchBar'
import './HeroSection.css'


const heroImgs = [
    {
        type : 'img',
        img : '/images/hero-img01_batcheditor_fotor.webp'
    },
    {
        type : 'video',
        img : '/images/hero-video.mp4'
    },
    {
        type : 'img',
        img : '/images/hero-img02_batcheditor_fotor.webp'
    },
]


const HeroSection = () => {
  return (
    <section className='container-xl py-5 my-5 gap-3 align-items-center homeSection'>

        <article className='w-100 py-3' >
        <h4 className='py-2 px-1 bg d-inline-block fontf rounded-pill overflow-hidden'>Know Before You Go <img src="/images/world_batcheditor_fotor.webp" alt="world" style={{maxWidth : '50px'}}/></h4>
        <h1>Traveling Opens the door to Create <span className='mainTextColor'>Memories</span></h1>
        <p className='py-3 home-text' >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde sunt neque optio enim eaque aliquid officia ex pariatur deserunt blanditiis ad id asperiores illum suscipit atque similique, quo dicta placeat?</p>
        <br />
        <br />
        <SearchBar />
        </article>

        <aside className='w-100 d-flex gap-3 position-relative '>
            {
                heroImgs.map((value,index)=>(
                    <div key={index} className='imagesCont'>
                    {value.type == 'video' ?
                <video className='rounded-3 img position-relative' autoPlay={true} loop={true}>
                <source src={value.img} type="video/mp4"/>
              </video>
              
                :
                <img src={value.img} alt='heropic' className='rounded-3 img position-relative' style={{top : (index+2)*10+'px'}}/>    
                }
                </div>
                ))
            }
        </aside>

    </section>
  )
}

export default HeroSection