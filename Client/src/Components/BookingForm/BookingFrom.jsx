import { useEffect, useState } from 'react';
import './BookingForm.css';
import { useNavigate } from 'react-router-dom';

const BookingForm = (info) => {
  const { data } = info;
  const [persons, setPersons] = useState(0); // Initialize with 0 to avoid NaN issues
  const [hide, setHide] = useState(window.innerWidth <= 768);
  const [summary, setSummary] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate()

  const [inputs,setInputs] = useState([])
  const [err , setErr] = useState('')

const price = data?.price;
  const handlePersons = (e) => {
    const newPersons = parseInt(e.target.value, 10); // Parse the input value to an integer.

    if (newPersons >= 0 && newPersons <= 10) {
      setPersons(newPersons); // Update the persons state.
    }

    // Calculate the summary based on the updated number of persons.

  };

  const visibleFormBtn = () => {
    setHide(!hide);
  };

  useEffect(() => {
    // Calculate Summary and Total when persons change
    
    const summaryValue = persons <= data?.maxGroupSize && persons * price ;
    const totalValue = summaryValue + 10;

    setSummary(summaryValue);
    setTotal(totalValue);
  }, [persons,summary,total]);

  useEffect(() => {
    // Handle window resize to show/hide the form
    const handleResize = () => {
      setHide(window.innerWidth <= 768);
    };

    

    // Attach the resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  

  const inputHundler = (e)=>{
    setInputs(prev =>({...prev,[e.target.name] : e.target.value}))
  }


  const bookHundler = (e)=>{
    e.preventDefault()
    

    
    if(Object.keys(inputs).length >= 3){
      navigate('/thank-you')
    }else{
      setErr('please fill the inputs ...')
    }
    
  }

  return (
    <>
      <button className='formbtn btn text-white' onClick={visibleFormBtn}>
        {hide ? <h1>Book Now</h1> : <h1>X</h1>}
      </button>
      <form className={`flex1 BookingForm border py-5 px-4 ${!hide ? 'hidden' : ''}`} onSubmit={bookHundler}> 
        <div className='d-flex justify-content-between align-items-center'>
          <h2>{data?.price}$<span className='fs-5'> /per person</span></h2>
          <p>4.5 <i className='fa-solid fa-star mainTextColor'></i></p>
        </div>
        <br />
        <br />
        <h2>Information</h2>
        <br />
        <div className='border py-2 px-3'>
          <input onChange={inputHundler} type="text" name='fullname' placeholder='Fullname' className='form-control py-3 btn text-start my-2 px-2 w-100 border-bottom' />
          <input onChange={inputHundler} type="text" name='phoneNumber' placeholder='Phone' className='form-control py-3 btn text-start my-2 px-2 w-100 border-bottom' />
          <div className='d-flex my-3 gap-2'>
            <input onChange={inputHundler} type="date" name='date' className='form-control text-start btn border-bottom' />
            <input type="number" name='persons' min='0' max={data?.maxGroupSize} className='form-control btn text-start border-bottom' placeholder='Guest' onChange={handlePersons} />
          </div>
        </div>
        <br />
        <br />
        <div>
          <p className='d-flex justify-content-between w-100' style={{ wordBreak: 'break-word' }}>
            <span>{data?.price}$ x {persons} person's</span>
            <span>{!summary ? 0 : summary} $</span>
          </p>
          <br />
          <p className='d-flex justify-content-between w-100'><span>Service charge</span> <span>10 $</span></p>
          <br />
          <p className='d-flex justify-content-between w-100'><span><strong>Total</strong></span> <span>{total ? total : 10} $</span></p>
        </div>
        <br />
        <p className='w-100 text-center text-danger' style={{minHeight : '30px'}}>{err ? err : ''}</p>
        <button className='btn bg text-white rounded-pill w-100'>Book Now</button>
      </form>
    </>
  );
};

export default BookingForm;