import React, { useState, useEffect } from 'react';
import { heroBackground, purrfect, aummm } from "../assets";
import Section from "./Section";
import { BottomLine, Gradient } from "./design/Hero";
import Home from "./Home";
import Tasks from "./Tasks";
import Upgrades from "./Upgrades";
import Friends from "./Friends";
import useGameLogic from './game';
import FloatingText from "./Floatingtext.jsx";

const Hero = () => {
  const userId = "some-unique-user-id"; // Replace with actual user ID
  
  const {
    loading,
    health,
    hunger,
    serenity,
    points,
    healthUpgrade,
    hungerUpgrade,
    serenityUpgrade,
    upgradePrices,
    increaseStat,
    buyUpgrade,
  } = useGameLogic(userId);

  const [currentPage, setCurrentPage] = useState("home");
  const [floatingText, setFloatingText] = useState({ show: false, imageUrl: '' });

  const triggerFloatingImage = (imageUrl) => {
    setFloatingText({ show: true, imageUrl });
  };

  const handleAnimationEnd = () => {
    setFloatingText({ show: false, imageUrl: '' });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // To ensure the animation can re-trigger, we briefly hide the floating text before showing it again
      setFloatingText({ show: false, imageUrl: '' });
      setTimeout(() => {
        triggerFloatingImage(aummm);
      }, 10);
    }, 10000); // Set interval to 10 seconds

    return () => clearInterval(interval);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home health={health} hunger={hunger} serenity={serenity} points={points} increaseStat={increaseStat} />;
      case "tasks":
        return <Tasks />;
      case "upgrades":
        return <Upgrades buyUpgrade={buyUpgrade} points={points} healthUpgrade={healthUpgrade} hungerUpgrade={hungerUpgrade} serenityUpgrade={serenityUpgrade} upgradePrices={upgradePrices} />;
      case "friends":
        return <Friends />;
      default:
        return <Home health={health} hunger={hunger} serenity={serenity} points={points} increaseStat={increaseStat} />;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Section
      className="pt-0 -mt-0 h-screen overflow-hidden"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="relative w-full">
        <div className="relative max mx-auto md:max-w-4xl xl:mb-24">
          <div className="relative z-1 p-1 bg-repeat-image w-full flex-col rounded-[0.5rem] bg-n-14 overflow-y-auto min-h-screen">
            {(currentPage === 'home' || currentPage === 'upgrades') && (
              <div className="relative top rounded-[0.5rem]">
                <div className="h-[0.5rem] bg-n-11 rounded-t-[1rem]" />
                <div className="relative aspect-[1/1.3] rounded-b-[0.9rem] overflow-hidden md:aspect-[1366/768] lg:aspect-[1366/768]">
                  <img
                    src={purrfect}
                    className="w-full scale-[0.7] translate-y-[20%] md:scale-[1.388] md:-translate-y-[27%] lg:-translate-y-[27%] lg:scale-[1.388]"
                    width={1024}
                    height={1024}
                    alt="purrfect"
                  />
                  {floatingText.show && (
                    <FloatingText imageUrl={floatingText.imageUrl} show={floatingText.show} onAnimationEnd={handleAnimationEnd} />
                  )}
                </div>
              </div>
            )}
            <div className="relative mt-[8rem] bg-black">
              {renderPage()}
            </div>
            <div className="relative flex-grow py-5 min-h-screen bg-black">
              <div className="fixed bottom-[1rem] flex w-full bg-white">             
                <button onClick={() => setCurrentPage("home")} className="px-4 py-2 mx-auto bg-blue-500 text-white rounded">Home</button>
                <button onClick={() => setCurrentPage("tasks")} className="px-4 py-2 mx-auto bg-green-500 text-white rounded">Tasks</button>
                <button onClick={() => setCurrentPage("upgrades")} className="px-4 py-2 mx-auto bg-yellow-500 text-white rounded">Upgrades</button>
                <button onClick={() => setCurrentPage("friends")} className="px-4 py-2 mx-auto bg-purple-500 text-white rounded">Friends</button>
              </div>
            </div>
          </div>
          <div className="">
            <img
              src={heroBackground}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>
        </div>
      </div>
      <BottomLine />
    </Section>
  );
};

export default Hero;
