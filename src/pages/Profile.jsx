import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useDisconnect } from "wagmi";
import { useNFTData } from "../hooks/useNFTData";
import ConnectWalletPopup from "../components/common/ConnectWalletPopup";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { nfts, loading } = useNFTData(address, isConnected);
  const [popupDismissed, setPopupDismissed] = useState(false);
  const [prevAddress, setPrevAddress] = useState(address);
  const [profilePic, setProfilePic] = useState(() => {
    if (address) {
      return localStorage.getItem(`loremint_avatar_${address}`) || "";
    }
    return "";
  });
  const fileInputRef = useRef(null);

  if (address !== prevAddress) {
    setPrevAddress(address);
    const storedPic = address ? localStorage.getItem(`loremint_avatar_${address}`) || "" : "";
    setProfilePic(storedPic);
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("File is too large. Please select an image under 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        if (address) {
          localStorage.setItem(`loremint_avatar_${address}`, base64String);
          setProfilePic(base64String);
          window.dispatchEvent(new Event("loremint_avatar_updated"));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePic = () => {
    if (address) {
      localStorage.removeItem(`loremint_avatar_${address}`);
      setProfilePic("");
      window.dispatchEvent(new Event("loremint_avatar_updated"));
    }
  };

  // Handle popup close - navigate away if still not connected
  const handlePopupClose = () => {
    setPopupDismissed(true);
    navigate("/explore");
  };

  // Show popup if not connected and popup hasn't been dismissed
  if (!isConnected) {
    return (
      <ConnectWalletPopup
        isOpen={!popupDismissed}
        onClose={handlePopupClose}
        featureName="your profile"
      />
    );
  }

  const formatAddress = (addr) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  // Group NFTs by collection
  const collectionStats = nfts.reduce((acc, nft) => {
    const collection = nft.collection || "Unknown";
    if (!acc[collection]) {
      acc[collection] = { count: 0, nfts: [] };
    }
    acc[collection].count++;
    acc[collection].nfts.push(nft);
    return acc;
  }, {});

  return (
    <div className="profile-page">
      <div className="container">
        {/* Top Navigation */}
        <nav className="profile-nav">
          <button onClick={() => navigate(-1)} className="back-btn">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
          <div className="nav-actions">
            <a
              href={`https://etherscan.io/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
              </svg>
              Etherscan
            </a>
          </div>
        </nav>

        {/* Profile Header */}
        <section className="profile-header glass-card">
          <div className="profile-info">
            <div className="profile-avatar" onClick={handleAvatarClick} title="Change Profile Picture">
              {profilePic ? (
                <img src={profilePic} alt="Avatar" className="avatar-img" />
              ) : (
                <span className="avatar-placeholder">
                  {address ? address.substring(2, 4).toUpperCase() : "??"}
                </span>
              )}
              <div className="avatar-edit-overlay">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />
            <div className="profile-details">
              <h1 className="profile-address">{formatAddress(address)}</h1>
              <p className="wallet-label">Connected Wallet</p>
            </div>
          </div>

          <div className="profile-actions">
            {profilePic && (
              <button onClick={handleRemovePic} className="btn btn-secondary btn-danger">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
                Remove Picture
              </button>
            )}
            <button
              onClick={() => navigator.clipboard.writeText(address)}
              className="btn btn-secondary"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy Address
            </button>
            <button
              onClick={() => disconnect()}
              className="btn btn-ghost btn-danger"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Disconnect
            </button>
          </div>
        </section>

        {/* Portfolio Stats */}
        <section className="portfolio-stats">
          <div className="profile-stat-card glass-card">
            <span className="stat-value">{loading ? "..." : nfts.length}</span>
            <span className="stat-label">Total NFTs</span>
          </div>
          <div className="profile-stat-card glass-card">
            <span className="stat-value">
              {loading ? "..." : Object.keys(collectionStats).length}
            </span>
            <span className="stat-label">Collections</span>
          </div>
        </section>

        {/* Collections Breakdown */}
        <section className="collections-breakdown">
          <h2 className="section-title">Your Collections</h2>

          {loading ? (
            <div className="loading-state">
              <p>Loading your NFTs...</p>
            </div>
          ) : Object.keys(collectionStats).length > 0 ? (
            <div className="collections-list">
              {Object.entries(collectionStats).map(([collection, data]) => (
                <div key={collection} className="collection-item glass-card">
                  <div className="collection-info">
                    <h3 className="collection-name">{collection}</h3>
                    <span className="collection-count">
                      {data.count} NFT{data.count !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="btn btn-ghost btn-small"
                  >
                    View All
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state glass-card">
              <p>No NFTs found in this wallet</p>
              <button
                onClick={() => navigate("/explore")}
                className="btn btn-primary"
              >
                Explore NFTs
              </button>
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-grid">
            <button
              onClick={() => navigate("/dashboard")}
              className="action-card glass-card"
            >
              <span className="action-title">View Collection</span>
              <span className="action-desc">Browse all your NFTs</span>
            </button>
            <button
              onClick={() => navigate("/explore")}
              className="action-card glass-card"
            >
              <span className="action-title">Analyze NFT</span>
              <span className="action-desc">Search any NFT by contract</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
