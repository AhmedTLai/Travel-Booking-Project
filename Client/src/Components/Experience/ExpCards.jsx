
const ExpCards = (info) => {
  
    const {val} = info
    return (
    <div className="d-flex flex-column align-items-center gap-3 bg-light rounded py-3">
    <div className="rounded-3 bg text-white spRadius d-flex align-items-center justify-content-center">
        <h1>{val.number}</h1>
    </div>
    <p>{val.title}</p>
    </div>
  )
}

export default ExpCards