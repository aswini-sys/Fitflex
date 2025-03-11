import React from "react";
import './Pricing.css'; // Ensure the CSS file is imported
import v2 from '../../assets/v2.mp4'; // Background video

const Pricing = () => {
  return (
    <div className="pricing-container">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src={v2} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Main Content */}
      <header className="pricing-header">
        <h1>Choose Your Plan</h1>
        <p>Find the perfect plan to reach your fitness goals.</p>
      </header>

      <section className="pricing-tiers">
        <div className="tier-card">
          <h2>Free Plan</h2>
          <p className="price">Free</p>
          <ul>
            <li>Basic Workouts</li>
            <li>Limited Exercise Videos</li>
            <li>Basic Tracking</li>
          </ul>
          <button className="cta-button">Start Free Trial</button>
        </div>

        <div className="tier-card">
          <h2>Basic Plan</h2>
          <p className="price">$5.99/month</p>
          <ul>
            <li>Standard Workout Plans</li>
            <li>Basic Tracking Metrics</li>
            <li>Email Support</li>
          </ul>
          <button className="cta-button">Subscribe</button>
        </div>

        <div className="tier-card">
          <h2>Pro Plan</h2>
          <p className="price">$14.99/month</p>
          <ul>
            <li>Personalized Workout Plans</li>
            <li>Advanced Tracking Metrics</li>
            <li>Access to Live Classes</li>
            <li>Nutrition Guides</li>
          </ul>
          <button className="cta-button">Subscribe</button>
        </div>

        <div className="tier-card">
          <h2>Elite Plan</h2>
          <p className="price">$29.99/month</p>
          <ul>
            <li>All Pro Features</li>
            <li>One-on-One Virtual Personal Training</li>
            <li>Exclusive Content</li>
            <li>Priority Support</li>
          </ul>
          <button className="cta-button">Subscribe</button>
        </div>
      </section>

      <section className="pricing-policies">
        <h2>Pricing Policies</h2>
        <div className="policy">
          <h3>Free Trials</h3>
          <p>Enjoy a 7-day free trial on our premium plans to explore all features before committing.</p>
        </div>
        <div className="policy">
          <h3>Discounts & Promotions</h3>
          <p>Seasonal discounts and introductory offers are available. Check our website for current promotions.</p>
        </div>
        <div className="policy">
          <h3>Refund Policy</h3>
          <p>If you are not satisfied with your subscription, contact support within 14 days for a full refund.</p>
        </div>
        <div className="policy">
          <h3>Tax Compliance</h3>
          <p>Prices include applicable taxes based on your location. No hidden fees.</p>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
