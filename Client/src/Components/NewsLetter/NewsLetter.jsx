import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <section className=' my-5' style={{background : '#dbeeff'}}>
        <container className='container news justify-content-between align-items-center py-3'>
        <article>
        <h2 className='py-3'>
        Subscribe now to get useful Travling information.
        </h2>
        <form className='rounded-3 bg-white d-flex gap-1 py-3 px-3'>
            <input type="email" className='form-control btn text-start' placeholder='Enter your email'/>
            <button className='btn'>Subscribe</button>
        </form>
        <br />
        <p className='home-text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde deleniti numquam fuga. Ex suscipit temporiae at ducimus consequatur!</p>
        </article>
        <aside>
            <img src="/images/male-tourist_batcheditor_fotor.webp" alt="picNewsletter" className='asideImages w-100' />
        </aside>
        </container>
    </section>
  )
}

export default NewsLetter