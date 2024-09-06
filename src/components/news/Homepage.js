import React from "react";
import "./Homepage.css"
import motor1 from './asset/motor (1).jpg'
import motor2 from './asset/motor (2).jpg'
import motor3 from './asset/motor (3).jpg'
import motor4 from './asset/motor (4).jpg'
import motor5 from './asset/motor (5).jpg'
import motor6 from './asset/motor (6).jpg'
import motor7 from './asset/motor (7).jpg'
import motor8 from './asset/motor (8).jpg'
import motor9 from './asset/motor (9).jpg'
import motor10 from './asset/motor (10).jpg'
import flag from './asset/raceflag.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Carousel from 'react-bootstrap/Carousel';

const Homepage = () => {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    }
  };
  return (
    <>
    {/* slide ảnh */}
      <Carousel>
        <Carousel.Item>
          <div class="item active">
            <img src={motor1} class="d-block " alt="motor1"></img>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div class="item">
            <img src={motor2} class="d-block" alt="motor2"></img>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div class="item">
            <img src={motor3} class="d-block" alt="motor3"></img>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div class="item">
            <img src={motor4} class="d-block" alt="motor4"></img>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div class="item">
            <img src={motor5} class="d-block" alt="motor5"></img>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div class="item">
            <img src={motor6} class="d-block" alt="motor6"></img>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div class="item">
            <img src={motor7} class="d-block" alt="motor7"></img>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div class="item">
            <img src={motor8} class="d-block" alt="motor8"></img>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div class="item">
            <img src={motor9} class="d-block" alt="motor9"></img>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div class="item">
            <img src={motor10} class="d-block" alt="motor10"></img>
          </div>
        </Carousel.Item>
      </Carousel>
      <>
      {/* tin tức */}
        <section className="container-fluid mt-5">
          <header className="mb-0 d-flex align-items-center">
            <div className="box d-flex align-items-center">
              <img src={flag} alt="raceflag" className="me-1" ></img>
              <h2 className="mt-0">Latest News</h2>
            </div>
          </header>
          <div>
            <Slider {...settings}>
              <div class="col">
                <div class="card h-100">
                  <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" class="card-img-top"
                    alt="Hollywood Sign on The Hill" />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      This is a longer card with supporting text below as a natural lead-in to
                      additional content. This content is a little bit longer.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card h-100">
                  <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp" class="card-img-top"
                    alt="Palm Springs Road" />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a short card.</p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card h-100">
                  <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp" class="card-img-top"
                    alt="Los Angeles Skyscrapers" />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                      additional content.</p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card h-100">
                  <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp" class="card-img-top"
                    alt="Skyscrapers" />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      This is a longer card with supporting text below as a natural lead-in to
                      additional content. This content is a little bit longer.
                    </p>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </section>

        {/* <div className="mainDiv">
          {mynews.map((ele) => {
            console.log(ele)
            return (
              <>
                <div class="card-group">  
                  <div class="card" style={{ marginTop: "2rem", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                    <img src={ele.urlToImage == null ? "https://kubrick.htvapps.com/vidthumb/f6865cb1-d77d-4a31-ba83-d57c4b2324d8/4b9c9d8f-ad14-47ea-bcf4-bf24ee0bb1f3.jpg?crop=0.383xw:0.383xh;0.517xw,0.252xh&resize=1200:*" : ele.urlToImage} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">{ele.author === "" ? "Janelle Ash" : ele.author}</h5>
                      <p class="card-text">
                        {ele.title}
                      </p>
                      <a href={ele.url} target="_blank" rel="noreferrer" class="btn btn-primary">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div class="view-more text-end mt-4">
          <a href="#" class="btn btn-outline-primary">View More</a>
        </div> */}
      </>
      );
    </>
  );
};

export default Homepage;
