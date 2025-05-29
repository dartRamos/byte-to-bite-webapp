import React from "react";
import '../styling/AboutPage.css';


const AboutPage = () => {
  return (
    <div className="fridge-page">

    <div className="about-page-container">
      <div className="about-page-title">
        <h1>About Us</h1>
        </div>
        <div className="about-page-text">
  

          <p>
            At Byte-To-Bite, we believe cooking should be easy, enjoyable, and accessible to everyone. Simply tell us what's in your kitchen, and we'll suggest recipes that match. 
          </p>

          <p>
            Our mission is to reduce food waste, save you time, and spark creativity in the kitchen. With built-in features like smart grocery list, nutrition facts, ingredient substitutions, and personalized cooking timers, Byte-To-Bite takes the guesswork out of meal planning.
          </p>

          <p>
            We’re passionate about using technology to make cooking smarter and more sustainable — one byte at a time.

          </p>

          <p>Let's get cooking! <span class="emoji">🍳🔥👩‍🍳</span></p>
        </div>
      </div>
    </div>
  
  );
};

export default AboutPage;
