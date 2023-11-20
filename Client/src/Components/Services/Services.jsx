import './Services.css'

const services = [
    {
        icon : <i className="fa-solid fa-cloud-sun"></i>,
        title : 'Calculate Wether',
    },
    {
        icon : <i className="fa-solid fa-compass"></i>,
        title : 'Best tour guide',
    },
    {
        icon : <i className="fa-solid fa-gear"></i>,
        title : 'Customisation',
    },
]

const Services = () => {
  return (
    <section className='container py-5 '>
        <h3 className='fontf text-danger'>What we Serve </h3>
        <container className='align-items-center gap-5 services'>
            <h1 className='flex1 my-1 mb-4'>WE Offer our best services</h1>
            <div className='d-flex align-items-center gap-3 flex2 flex-wrap w-100'>
            {services.map((value,index)=>(
                <div key={index} className='flex1  cardbox'>
                    <h2 className='rounded-circle overflow-hidden d-inline-flex align-items-center justify-content-center bg text-white Servicon' style={{minWidth : '50px' , minHeight : '50px'}}>{value.icon}</h2>
                    <h3 className='d-block fw-bold'>{value.title}</h3>
                    <p className='home-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur commodi .</p>
                </div>
            ))}
            </div>
        </container>
    </section>
  )
}

export default Services