import {Link} from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='py-5 my-5 px-3 text-center'>
        <br />
        <br />
        <h1 className='text-danger'>404</h1>
        <h3>Page Not Found</h3>
        <br />
        <br />
        <Link to='/' className='mainTextColor border-bottom pb-2'>Go Home ?</Link>
        <br />
        <br />
    </div>
  )
}

export default PageNotFound