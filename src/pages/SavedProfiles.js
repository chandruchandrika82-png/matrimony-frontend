import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PageBack from "../components/PageBack";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
} from "react-icons/fa";

import { API, resolveMediaUrl } from "../config/api";
import "./Profiles.css";

function SavedProfiles() {
  const currentUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const token = localStorage.getItem("token");

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API}/users/${currentUser._id}/favorites`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFavorites(response.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeFavorite = async (favoriteId) => {
    try {
      await axios.put(
        `${API}/users/${currentUser._id}/favorite/${favoriteId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadFavorites();

    } catch (err) {
      alert(
        err.response?.data?.error ||
          "Unable to remove favorite"
      );
    }
  };

  return (
    <main className="directory-page">
      <div className="directory-shell">
        <PageBack />

        <header className="directory-header">
          <div>
            <h1>❤️ Saved Profiles</h1>

            <p>
              Your favourite Namakkal Matrimony matches.
            </p>
          </div>
        </header>

        {loading ? (
          <div className="directory-status">
            Loading...
          </div>
        ) : (
          <div className="profile-grid">

            {favorites.length === 0 ? (

              <div className="directory-status">

                <FaHeart
                  size={60}
                  color="#8B0000"
                />

                <h2>No Saved Profiles</h2>

                <p>
                  You haven't added any profiles to favourites yet.
                </p>

              </div>

            ) : (

              favorites.map((profile) => (
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
                      {profile.profileVisibility === "Private"
                        ? "Private Profile"
                        : "Member Profile"}
                    </span>
                  </Link>

                  <div className="directory-card-body">

                    <div>

                      <h2>{profile.name}</h2>

                      <p className="profile-location">
                        <FaMapMarkerAlt />{" "}
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
                      <FaGraduationCap />{" "}
                      {profile.education || "Not Updated"}

                      <br />

                      <FaBriefcase />{" "}
                      {profile.occupationType ||
                        "Not Updated"}
                    </p>

                    <div className="card-actions">

                      <Link
                        to={`/profile/${profile._id}`}
                      >
                        View Profile
                      </Link>

                      <button
                        className="interest-button"
                        onClick={() =>
                          removeFavorite(profile._id)
                        }
                        style={{
                          background: "#d32f2f",
                          color: "#fff",
                        }}
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </article>

              ))

            )}

          </div>

        )}
              </div>
    </main>
  );
}

export default SavedProfiles;
