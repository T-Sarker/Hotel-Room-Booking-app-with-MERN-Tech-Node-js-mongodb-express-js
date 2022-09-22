import React from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { FaStreetView, FaBaby, FaHome, FaCalendarAlt } from "react-icons/fa";
import useFetch from '../hooks/fetchAPI';
import HomeSearchBar from '../components/Home/HomeSearchBar';
import HomeCountByType from '../components/Home/HomeCountByType';
import HomePropertyByPrice from '../components/Home/HomePropertyByPrice';



const Home = () => {


  //data from fetch hook
  const { data, city, loading, error } = useFetch("/hotel/countbycity");


  return (
    <>
      <div className="heroBanner">
        <div className="container py-5">
          <h2 className='pt-2'>A lifetime of discounts? It's Genius.</h2>
          <p className="casualtext pt-3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur fugit blanditiis
          </p>
          <button className='btn btn-lg btn-dark text-white'>More Details</button>
        </div>
      </div>

      {/* searchbar */}

      <HomeSearchBar />

      {/* city wise cout property */}
      <div className="cityWiseCount my-5 container">
        <div className="row">
          {loading
            ? ('Loading please wait') : (<>

              <div className="col-sm-12 col-md-4 shadow-sm my-3">
                <div className="cityItem position-relative">
                  <img className='rounded  w-100' alt='ggg' src="https://wallup.net/wp-content/uploads/2017/11/22/366189-city-street-Manhattan-New_York_City-748x509.jpg" />
                  <div className="countDetails">
                    <h4 className='my-2 bg-white text-dark fw-400 text-uppercase'>{city[0]}</h4>
                    <h5 className='my-2'>{data[0]} properties</h5>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 col-md-4 shadow-sm my-3">
                <div className="cityItem position-relative">
                  <img className='rounded  w-100' alt='ggg' src="https://wallup.net/wp-content/uploads/2017/11/22/366189-city-street-Manhattan-New_York_City-748x509.jpg" />
                  <div className="countDetails">
                    <h4 className='my-2 bg-white text-dark fw-400 text-uppercase'>{city[1]}</h4>
                    <h5 className='my-2'>{data[1]} properties</h5>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 col-md-4 shadow-sm my-3">
                <div className="cityItem position-relative">
                  <img className='rounded  w-100' alt='ggg' src="https://wallup.net/wp-content/uploads/2017/11/22/366189-city-street-Manhattan-New_York_City-748x509.jpg" />
                  <div className="countDetails">
                    <h4 className='my-2 bg-white text-dark fw-400 text-uppercase'>{city[2]}</h4>
                    <h5 className='my-2'>{data[2]} properties</h5>
                  </div>
                </div>
              </div>

            </>)
          }
        </div>
      </div>

      {/* browse rooms by property type */}
      <HomeCountByType />


      {/* browse rooms by popularity type */}
      <HomePropertyByPrice />

      {/* subscribe newsletter */}

      <div className="newsletterArea p-5">
        <div className="container ">
          <div className="w-30 text-center">
            <h3 className='text-white'>Don't Waste Time! Subscribe Our Newsletter</h3>
            <form className='w-75 mx-auto py-3'>
              <div className="input-group pb-3 ">
                <input type="text" className="form-control" placeholder="Enter Your Email" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button className="btn btn-dark" type="button" id="button-addon2">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>



    </>
  )
}

export default Home