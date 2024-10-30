import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./home.css";
import Header from "../components/Header.jsx";
import About from "../components/About.jsx";

const HomePage = () => {
  const tRef = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(tRef.current, {
      duration: 0.5,
      scale: 1.5,
      ease: "elastic.out(1, 0.3)",
      yoyo: true,
      repeat: 1,
    });
  }, []);

  return (
    <>
    <Header/>
    <h1 className="githubtxt">GITHUB CAMPUS CLUB PRESENTS</h1>
    <div className="txt">
      <h1 style={{ display: "inline-block",color:"#d91656" }}>
        GI
        <span ref={tRef} className="ttxt">
          T
        </span>
        OGETHER
      </h1>
    </div>
    <h1 className="tagline">A Fun Non Technical Event</h1>
    <button className="morebtn">More About Git Together</button>
    <About/>
    </>
  );
};

export default HomePage;
