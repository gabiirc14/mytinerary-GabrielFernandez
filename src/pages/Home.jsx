import React from 'react';
import Carousel from '../components/Carousel';
import Hero from '../components/Hero';
import CallToAction from '../components/CallToAction';


function HomePage() {
    return (
      <div>
        <Hero />
        <Carousel />
        <CallToAction />

      </div>
    );
  }

  export default HomePage;