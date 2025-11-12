
import React from 'react';
import Hero from '../Hero';
import WhyMubsir from '../WhyMubsir';
import HowToUse from '../HowToUse';
import Team from '../Team';
import Testimonials from '../Testimonials';
import CallToAction from '../CallToAction';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <>
      <Hero onStartClick={() => onNavigate('sign-to-text')} />
      <WhyMubsir />
      <HowToUse />
      <Team />
      <Testimonials />
      <CallToAction onNavigate={onNavigate} />
    </>
  );
};

export default HomePage;