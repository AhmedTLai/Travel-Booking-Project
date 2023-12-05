import { useContext, useEffect, useState } from 'react';
import DirectionCards from './DirectionCards';
import './Directions.css';
import { Link } from 'react-router-dom';
import api from '../../assets/data/api_Url_Config';
import { AuthContext } from '../../Context/AuthContext';

const Directions = (inf) => {
  const {page} = inf
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 6;
  const [cards, setCards] = useState([]);
  const [data, setData] = useState([]); // Define the data state
  const pages = [];
  const [loading , setLoading] = useState(false)

  const {currentUser} = useContext(AuthContext)
  useEffect(() => {
    const abort = new AbortController()
    const getData = async ()=>{
      setLoading(true)
     await api
        .get('/tour/get-tour',{withCredentials : false ,signal : abort.signal})
        .then((res) => setCards(res.data))
        .catch((err) => console.error(err));
        setLoading(false)
    }
      
    getData()

        return()=>{
          abort.abort
        }
  },[]);

  for (let i = 1; i <= Math.ceil(cards.length / postPerPage); i++) {
    pages.push(i);
  }

  useEffect(() => {
    const lastPageIndex = currentPage * postPerPage;
    const firstPageIndex = lastPageIndex - postPerPage;
    setData(cards.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, postPerPage, cards]);

  return (
    <section className='container py-5 ' style={{ minHeight: '500px' }}>
      <h3 className='fontf bg d-inline-block rounded-pill my-3'>Explore</h3>
      <h2 className=''>Our featured tours</h2>
      <br />
      <br />
      <div className='d-flex flex-wrap gap-3 position-relative'>
        {cards.length > 0 ? (
          data.map((val, ind) => <DirectionCards key={ind} val={val} />)
        ) : (
          <h3 className='text-center w-100'>{loading ? <img style={{maxHeight : '70px'}} className='h-100' src='/images/Loading.svg'/> : "No data yet"}</h3>
        )}
        <br />
        {page === 'tour' ? (
          <div className='d-flex gap-2 align-items-center justify-content-center w-100 pages'>
            {pages.map((v, i) => (
              <button
                key={i}
                className={`btn   ${v === currentPage ? 'active' : ''}`}
                onClick={() => {
                  setCurrentPage(v);
                }}
              >
                {v}
              </button>
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
      {currentUser?.admin ? (
        <div className='position-relative py-3 w-100 d-flex justify-content-center'>
          <Link to='/add-tour' className='btn bg text-white'>
            Add tour
          </Link>
        </div>
      ):''}
    </section>
  );
};

export default Directions;