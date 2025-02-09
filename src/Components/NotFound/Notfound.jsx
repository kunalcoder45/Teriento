import './Notfound.css'
import { Link } from "react-router-dom";


const NotFound = () => {
  return (
    <div>
      <section className="page_404">
        <div className="four_zero_four_bg">
        </div>
        <p>Oops you are Lost</p>
        <div className="contant_box_404">
          <Link to="/" className="link_404">Go to Home</Link>
        </div>
      </section>
    </div>
  )
}

export default NotFound