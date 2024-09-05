import React from "react";
import "./Homepage.css"
import logo from './asset/motor (1).jpg'
import logo2 from './asset/motor (2).jpg'
import logo3 from './asset/motor (3).jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Carousel from 'react-bootstrap/Carousel';
import flag from './asset/raceflag.png'

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
      <Carousel>
        <Carousel.Item>
          <div class="item active">
            <img src={logo} class="d-block " alt="Los Angeles"></img>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div class="item">
            <img src={logo2} class="d-block" alt="Chicago"></img>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div class="item">
            <img src={logo3} class="d-block" alt="New York"></img>
          </div>
        </Carousel.Item>
      </Carousel>
      {/* <div class="carousel-container">
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" dat a-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="item active">
              <img src={logo} class="d-block w-100" alt="Los Angeles"></img>
            </div>

            <div class="item">
              <img src={logo2} class="d-block w-100" alt="Chicago"></img>
            </div>

            <div class="item">
              <img src={logo3} class="d-block w-100" alt="New York"></img>
            </div>
          </div>
          <a class="left carousel-control" href="#myCarousel" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="#myCarousel" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div> */}

      <>
        <section className="container-fluid mt-3">
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
