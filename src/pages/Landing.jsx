import React from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import logo from "../assets/logo.svg";
import collageNft from "../assets/collage_nft.png";
import avatarPink from "../assets/avatar_pink.png";
import avatarBlue from "../assets/avatar_blue.png";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Floating Navbar */}
      <header className="floating-navbar">
        <div className="navbar-left">
          <div className="navbar-brand" onClick={() => navigate("/")}>
            <img src={logo} alt="loremint logo" className="navbar-logo-img" />
            <span className="brand-name">loremint</span>
          </div>
          <div className="navbar-menu">
            <div className="menu-item" onClick={() => navigate("/explore")}>
              Discover <span className="chevron-down">▼</span>
            </div>
            <div className="menu-item" onClick={() => {
              document.querySelector(".landing-how-section")?.scrollIntoView({ behavior: "smooth" });
            }}>
              Learn <span className="chevron-down">▼</span>
            </div>
          </div>
        </div>

        <div className="navbar-right">
          <div className="search-container" onClick={() => navigate("/explore")}>
            <svg className="search-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="search-text">Search</span>
          </div>

          <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openConnectModal, authenticationStatus, mounted }) => {
              const ready = mounted && authenticationStatus !== "loading";
              const connected = ready && account && chain;

              return (
                <button
                  className="btn-signin"
                  onClick={connected ? openAccountModal : openConnectModal}
                  type="button"
                >
                  <svg className="key-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3M15.5 7.5L14 9" />
                  </svg>
                  <span>{connected ? account.displayName : "Sign In"}</span>
                </button>
              );
            }}
          </ConnectButton.Custom>

          <button className="cart-btn" onClick={() => navigate("/dashboard")} title="View Dashboard">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
        </div>
      </header>

      {/* Split-Screen Hero Section */}
      <section className="hero-split-section">
        {/* Left Hero Column */}
        <div className="hero-left-col">
          <motion.div
            className="hero-left-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-heading">
              <span className="heading-row">
                Decode the
                <span className="avatar-card pink-card">
                  <img src={avatarPink} alt="pink avatar" />
                </span>
              </span>
              <span className="heading-row">
                <span className="accent-text">True Value</span>
                <span className="avatar-card blue-card">
                  <img src={avatarBlue} alt="blue avatar" />
                </span>
                of Every NFT
              </span>
            </h1>

            <p className="hero-subtext">
              LoreMint combines on-chain analytics with artificial intelligence to reveal what makes each NFT unique from trait rarity to market positioning to cultural significance.
            </p>

            <ConnectButton.Custom>
              {({ account, chain, openConnectModal, authenticationStatus, mounted }) => {
                const ready = mounted && authenticationStatus !== "loading";
                const connected = ready && account && chain;

                return (
                  <button
                    className="btn-create-profile"
                    onClick={connected ? () => navigate("/profile") : openConnectModal}
                    type="button"
                  >
                    {connected ? "VIEW PROFILE" : "CREATE A PROFILE"}
                  </button>
                );
              }}
            </ConnectButton.Custom>
          </motion.div>
        </div>

        {/* Right Hero Column */}
        <div className="hero-right-col">
          <div className="collage-container">
            <img src={collageNft} alt="NFT grid collage" className="collage-image" />

            {/* Center Dark Pill Badge */}
            <div className="badge-videos">
              <span className="badge-loremint">EXPLORE</span>
              <span className="badge-slash">WITH</span>
              <span className="badge-explore">LOREMINT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features-section">
        <div className="section-container">
          <div className="features-header">
            <span className="features-badge">FEATURES</span>
            <h2 className="features-title">NFT Intelligence, Redefined</h2>
            <p className="features-subtitle">
              Go beyond metadata. Understand the story, value, and potential of every digital asset.
            </p>
          </div>

          <div className="features-card-grid">
            <div className="feature-item-card">
              <div className="feat-icon-wrapper gold-theme">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3>Trait Rarity Analysis</h3>
              <p>Instantly calculate how rare each trait is across the entire collection using on-chain data from Alchemy.</p>
            </div>

            <div className="feature-item-card">
              <div className="feat-icon-wrapper mint-theme">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <h3>Market-Aware Valuation</h3>
              <p>Our algorithm weighs trait rarity against floor price, ensuring accurate value assessments across all tiers.</p>
            </div>

            <div className="feature-item-card">
              <div className="feat-icon-wrapper azure-theme">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                  <path d="M12 22c-2.95 0-5.7-.88-8.08-2.42M19.08 19.58A8 8 0 0012 22" />
                  <path d="M2 17.05A8 8 0 018 16" />
                </svg>
              </div>
              <h3>AI Deep Analysis</h3>
              <p>AI-powered insights explain why an NFT is priced the way it is, its cultural significance, and investment outlook.</p>
            </div>

            <div className="feature-item-card">
              <div className="feat-icon-wrapper pink-theme">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <h3>Verified Collection Data</h3>
              <p>Curated backstories for top collections like CryptoPunks, BAYC, and Azuki, no AI hallucinations.</p>
            </div>

            <div className="feature-item-card">
              <div className="feat-icon-wrapper purple-theme">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 00-2-2h-1V9a2 2 0 00-4 0v4h-2V7a2 2 0 00-4 0v6h-1a2 2 0 00-2 2" />
                </svg>
              </div>
              <h3>Community Sentiment</h3>
              <p>Analyze social media buzz and community engagement for each NFT.</p>
            </div>

            <div className="feature-item-card">
              <div className="feat-icon-wrapper crimson-theme">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="M8 12l4 4 8-8" />
                </svg>
              </div>
              <h3>Historical Trends</h3>
              <p>Track price history and ownership trends across time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="landing-how-section">
        <div className="section-container">
          <h2 className="how-title">How LoreMint Works</h2>
          <div className="how-steps-grid">
            <div className="how-step">
              <div className="step-num">01</div>
              <h3>Search or Connect</h3>
              <p>Enter any contract address and token ID, or connect your wallet to analyze your own collection.</p>
            </div>
            <div className="how-step">
              <div className="step-num">02</div>
              <h3>Instant Analysis</h3>
              <p>We fetch real-time data from the blockchain, calculate trait rarity, and prepare the AI context.</p>
            </div>
            <div className="how-step">
              <div className="step-num">03</div>
              <h3>Deep Insights</h3>
              <p>Get a comprehensive research report covering pricing, uniqueness, history, and investment outlook.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Landing Footer */}
      <footer className="new-landing-footer">
        <div className="footer-content">
          <p>© 2026 LoreMint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
