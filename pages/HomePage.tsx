import React from 'react';
import Hero from '../components/Hero';
import WhyMubsir from '../components/WhyMubsir';
import HowToUse from '../components/HowToUse';
import Team from '../components/Team';
import CallToAction from '../components/CallToAction';

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
      <CallToAction onNavigate={onNavigate} />
    </>
  );
};

export default HomePage;