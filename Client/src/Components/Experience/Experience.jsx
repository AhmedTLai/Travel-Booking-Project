import ExpCards from './ExpCards'
import './Experience.css'

const peopleExp = [
  {
    title: 'Secsesful Trip',
    number : '12K+'
  },
  {
    title: 'Regular Clients',
    number : '2K+'
  },
  {
    title: 'Years Experience',
    number : '15'
  },
]

const Experience = () => {
  return (
    <section className='container py-5'>
    <h4 className='py-2 px-1 bg d-inline-block fontf rounded-pill overflow-hidden' >Experience</h4>
    <div className='d-flex flex-wrap justify-content-center position-relative'>
    <article className='flex1'>
    <h1 className='' style={{paddingTop : '30px',paddingBottom : '15px'}}>With Our all experience we will serve you</h1>
    <p className='home-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae unde adipisci delectus cum.</p>
    <div className='d-flex gap-5 justify-content-center my-5 flex-wrap'>
    {peopleExp.map((val,ind)=>(
      <ExpCards key={ind} val={val}/>
    ))}
    </div>
    </article>
    
    <aside className='flex1 d-flex aside'>
    <img src="/images/experience_batcheditor_fotor.webp" alt="experiencePic" className='asideImages w-100' style={{width : '600px',margin : 'auto'}}/>
    </aside>
    </div>
    </section>
  )
}

export default Experience