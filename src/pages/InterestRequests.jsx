import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaUserFriends,
} from "react-icons/fa";

import { API, resolveMediaUrl } from "../config/api";
import "./Profiles.css";

function InterestRequests() {
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myProfile, setMyProfile] = useState(null);

  const [activeTab, setActiveTab] = useState("received");
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API}/users`);

const allUsers = response.data || [];

setUsers(allUsers);

const me = allUsers.find(
  (u) => u._id.toString() === currentUser?._id
);

setMyProfile(me);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const receivedRequests = useMemo(() => {
  if (!myProfile) return [];

  return users.filter((user) =>
    (myProfile.interestRequests || []).some(
      (id) => id.toString() === user._id
    )
  );
}, [users, myProfile]);

  const sentRequests = useMemo(() => {
  return users.filter((user) =>
    (user.interestRequests || []).some(
      (id) => id.toString() === currentUser?._id
    )
  );
}, [users, currentUser]);

  const acceptedRequests = useMemo(() => {
    return users.filter((user) =>
      (user.acceptedRequests || []).some(
        (id) => id.toString() === currentUser?._id
      )
    );
  }, [users, currentUser]);

  const filteredProfiles = useMemo(() => {
    let data = [];

    if (activeTab === "received") {
      data = receivedRequests;
    } else if (activeTab === "sent") {
      data = sentRequests;
    } else {
      data = acceptedRequests;
    }

    return data.filter((profile) =>
      `${profile.name || ""} ${profile.currentCity || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [
    activeTab,
    search,
    receivedRequests,
    sentRequests,
    acceptedRequests,
  ]);

  const acceptRequest = async (senderId) => {
    try {
      const response = await axios.put(
        `${API}/users/${currentUser._id}/accept/${senderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      loadUsers();
    } catch (err) {
      alert(err.response?.data?.error || "Unable to accept request");
    }
  };

  const rejectRequest = async (senderId) => {
    try {
      const response = await axios.put(
        `${API}/users/${currentUser._id}/reject/${senderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      loadUsers();
    } catch (err) {
      alert(err.response?.data?.error || "Unable to reject request");
    }
  };

  return (
    <main className="directory-page">
      <div className="directory-shell">

        <header className="directory-header">

          <div>

            

            <h1>
              Interest Requests
            </h1>

            <p>
              View received, sent and accepted interests.
            </p>

          </div>

        </header>

        <div
          style={{
            display: "flex",
            gap: 15,
            marginBottom: 25,
            flexWrap: "wrap",
          }}
        >

          <button
            className={
              activeTab === "received"
                ? "directory-primary"
                : ""
            }
            onClick={() => setActiveTab("received")}
          >
            <FaClock /> Received (
            {receivedRequests.length})
          </button>

          <button
            className={
              activeTab === "sent"
                ? "directory-primary"
                : ""
            }
            onClick={() => setActiveTab("sent")}
          >
            <FaUserFriends /> Sent (
            {sentRequests.length})
          </button>

          <button
            className={
              activeTab === "accepted"
                ? "directory-primary"
                : ""
            }
            onClick={() => setActiveTab("accepted")}
          >
            <FaCheckCircle /> Accepted (
            {acceptedRequests.length})
          </button>

        </div>

        <div
          style={{
            position: "relative",
            marginBottom: 25,
          }}
        >

          <FaSearch
            style={{
              position: "absolute",
              left: 15,
              top: 14,
              color: "#888",
            }}
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px 15px 12px 45px",
              borderRadius: 10,
              border: "1px solid #ddd",
            }}
          />

        </div>

        {loading ? (
          <div className="directory-status">
            Loading...
          </div>
        ) : (
          <div className="profile-grid">
                        {filteredProfiles.length === 0 ? (
              <div className="directory-status">

                <FaUserFriends
                  size={60}
                  color="#8B0000"
                />

                <h2>
                  No Interest Requests
                </h2>

                <p>
                  There are no profiles to display.
                </p>

              </div>
            ) : (
              filteredProfiles.map((profile) => {

                const received =
                  activeTab === "received";

                const accepted =
                  activeTab === "accepted";

                return (

                  <article
                    key={profile._id}
                    className="directory-card"
                  >

                    <Link
                      to={`/profile/${profile._id}`}
                      className="card-image-link"
                    >

                      <img
                        src={
                          resolveMediaUrl(profile.image) ||
                          "https://placehold.co/480x540?text=Photo"
                        }
                        alt={profile.name}
                      />

                      <span>
                        {profile.profileVisibility ===
                        "Private"
                          ? "Private Profile"
                          : "Member Profile"}
                      </span>

                    </Link>

                    <div className="directory-card-body">

                      <div>

                        <h2>
                          {profile.name}
                        </h2>

                        <p className="profile-location">

                          {[
                            profile.age &&
                              `${profile.age} years`,
                            profile.currentCity ||
                              profile.district,
                          ]
                            .filter(Boolean)
                            .join(" | ")}

                        </p>

                      </div>

                      <p className="profile-meta">

                        {[
                          profile.education,
                          profile.occupationType,
                          profile.motherTongue,
                        ]
                          .filter(Boolean)
                          .join(" | ")}

                      </p>

                      <div className="card-actions">

                        <Link
                          to={`/profile/${profile._id}`}
                        >
                          View Profile
                        </Link>

                        {received && (
                          <>
                            <button
                              className="interest-button"
                              onClick={() =>
                                acceptRequest(
                                  profile._id
                                )
                              }
                            >
                              Accept
                            </button>

                            <button
                              style={{
                                background:
                                  "#d32f2f",
                                color: "#fff",
                                border: "none",
                                borderRadius: 8,
                                padding:
                                  "10px 18px",
                                cursor:
                                  "pointer",
                              }}
                              onClick={() =>
                                rejectRequest(
                                  profile._id
                                )
                              }
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {accepted && (
                          <Link
                            to={`/chat/${profile._id}`}
                          >
                            <button
                              className="interest-active"
                            >
                              Chat
                            </button>
                          </Link>
                        )}

                        {activeTab === "sent" && (
                          <button
                            className="interest-active"
                          >
                            Interest Sent
                          </button>
                        )}

                      </div>

                    </div>

                  </article>

                );

              })
            )}

          </div>
        )}

      </div>
    </main>
  );
}

export default InterestRequests;