import React from 'react';
import { Carousel } from 'antd';
import ArrowLeft from '../../../images/icons/circle-arrow-left.png';
import ArrowRight from '../../../images/icons/circle-arrow-right.png';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 815,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 530,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

class ServicesCarousel extends React.Component {
  state = {
    current: 0
  };

  goToPreviousSlide = (e) => {
    e.preventDefault();

    if (this.slider === null) {
      return;
    }

    this.slider.slick.slickPrev();
  };

  goToNextSlide = (e) => {
    e.preventDefault();

    if (this.slider === null) {
      return;
    }

    this.slider.slick.slickNext();
  };

  initCarouselRef = (ref) => {
    this.slider = ref;
    return ref;
  };

  changeCarousel = (slide) => {
    this.setState({
      current: slide
    });
  };

  getCurrent = () => {
    const slide = (this.slider === null) ? 0 : this.state.current;
    const current = slide + this.getBreakpointSettings(this.slider ? this.slider.slick.state.breakpoint : null).slidesToShow;

    return (current < this.props.children.length) ? current : this.props.children.length;
  };

  getBreakpointSettings = (value) => {
    const breakpoints = settings.responsive.filter((breakpoint) => breakpoint.breakpoint === value);
    return breakpoints.length ? breakpoints[0].settings : settings;
  };

  slider = null;

  render() {
    const { children, ...props } = this.props;
    const infinite = this.getBreakpointSettings(this.slider ? this.slider.slick.state.breakpoint : null).slidesToShow < children.length;

    return (
      <div className="juvo-carousel services-carousel">
        <div className="control">
          <a href="" className="m-r-sm" onClick={this.goToPreviousSlide}><img src={ArrowLeft} alt="previous" /></a>
          <div className="carousel-pagination">{`${this.getCurrent()} of ${children.length}`}</div>
          <a href="" className="m-l-sm" onClick={this.goToNextSlide}><img src={ArrowRight} alt="next" /></a>
        </div>
        <Carousel {...settings} ref={this.initCarouselRef} afterChange={this.changeCarousel} {...props} infinite={infinite}>
          {children}
        </Carousel>
      </div>
    );
  }
}

export default ServicesCarousel;
