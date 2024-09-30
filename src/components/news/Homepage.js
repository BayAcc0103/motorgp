import React, { useState, useEffect } from "react";
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
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  // Xử lí slide tin tức: Nếu chiều rộng màn hình < 1300 => hiển thị 3 slide, <1130 => hiển thị 2 slide, <770 => hiển thị 1 slide
  function getSlidesToShow() {
    const width = window.innerWidth;
    if (width < 400) {
      return 0;
    } else if (width < 770) {
      return 1;
    } else if (width < 1130) {
      return 2;
    } else if (width < 1300) {
      return 3;
    } else {
      return 4;
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const news = [
    {
      link: 'https://www.motogp.com/en/news/2024/09/29/guidotti-to-conclude-ktm-tenure-at-the-end-of-2024/509503 ',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/09/29/20ac4afd-7065-4a1d-8653-d2b78afd81c9/544959_Francesco-Guidotti_Red-Bull-KTM_MotoGP_RC16_Red-Bull-Ring-Spielberg-_AUT_10th-Rnd.-MotoGP-2023-Red-Bull-Ring-Spielberg-_AUT_.jpg?width=400&height=225',
      title: 'Guidotti to conclude KTM tenure at the end of 2024',
      date: '29 Sep 2024'
    },
    {
      link: 'https://www.motogp.com/en/news/2024/09/29/martin-makes-sunday-statement-as-bagnaias-late-surge-salvages-podium/509109',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/09/29/94849a97-91f6-4d1a-bd00-8373a64f8f7b/Report-MGP-RACE.jpg?width=400&height=225',
      title: 'Martin makes Sunday statement as Bagnaia’s late surge salvages podium',
      date: '29 Sep 2024'
    },
    {
      link: 'https://www.motogp.com/en/news/2024/09/29/what-a-race-social-media-reacts-to-a-thrilling-indonesian-gp/509112',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/09/29/9fe6d612-b010-4010-8817-513dcc2b6b78/_DS_0423-1-.jpg?width=400&height=225',
      title: '"WHAT A RACE" - Social media reacts to a thrilling Indonesian GP',
      date: '29 Sep 2024'
    },
    {
      link: 'https://www.motogp.com/en/news/2024/09/29/canet-converts-pole-to-p1-as-ogura-extends-title-advantage/509100',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/09/29/ab2048cc-d59b-4fec-bcf3-a5e7aeea8418/Report-M2-RACE.jpg?width=400&height=225',
      title: 'Canet converts pole to P1 as Ogura extends title advantage',
      date: '26 Sep 2024'
    },
    {
      link: 'https://www.motogp.com/en/news/2024/09/29/alonso-steals-victory-from-fernandez-as-veijer-crashes-in-indonesia/509099',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/09/29/faf89cc6-3f8d-4e40-a39e-4d8e5e91d9c1/Report-M3-RACE.jpg?width=400&height=225',
      title: 'Alonso steals victory from Fernandez as Veijer crashes in Indonesia',
      date: '29 Sep 2024'
    },
    {
      link: 'https://www.motogp.com/en/news/2024/09/29/martin-lands-top-honours-in-warm-up/509103',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/09/29/dc7ffeaa-e5d5-4e1b-b989-d006ffa76a54/Report-MGP-WUP.jpg?width=400&height=225',
      title: 'Martin lands top honours in Warm Up',
      date: '29 Sep 2024'
    },
    {
      link: 'https://www.motogp.com/en/news/2024/09/28/can-bagnaia-join-the-history-books-with-an-eighth-win-on-sunday/509364',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/09/28/68c57878-1cab-4282-a36b-221b8c96cdd6/10_things-EN.jpg?width=400&height=225',
      title: 'Can Bagnaia join the history books with an eighth win on Sunday?',
      date: '28 Sep 2024'
    }
  ]

  // Cài đặt các thuộc tính cho slider
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: slidesToShow,
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
              {news.map((news) => (
                <div class="col">
                  <a class="content-item__link text-decoration-none" href={news.link}>
                    <div class="card h-100 w-auto">
                      <img src={news.image} class="card-img-top"
                        alt="Hollywood Sign on The Hill" />
                      <div class="card-body text-dark">
                        <h5 class="card-title">{news.title}</h5>
                        <p class="card-text">
                          {news.date}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </>
      );
    </>
  );
};

export default Homepage;
