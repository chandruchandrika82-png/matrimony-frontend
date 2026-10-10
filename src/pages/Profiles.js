import { useLanguage } from "../Language";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { API } from "../config/api";
import "./Profiles.css";
import ProfilePhotos from "../components/ProfilePhotos";
import { isConnected } from "../config/connections";

const districts = [
  "",
  "Namakkal",
  "Chennai",
  "Coimbatore",
  "Erode",
  "Karur",
  "Madurai",
  "Salem",
  "Tiruchirappalli",
  "Tiruppur",
  "Vellore",
  "Other",
];

function Profiles() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    gender: "",
    minAge: "",
    maxAge: "",
    district: "",
    religion: "",
    motherTongue: "",
  });

  const [sort, setSort] = useState("newest");

  useEffect(() => {
    if (location.state) {
      setFilters((current) => ({
        ...current,
        ...location.state,
      }));
    }
  }, [location.state]);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API}/users`);

      setUsers(response.data || []);
    } catch (error) {
      console.error("LOAD USERS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateFilter = (event) => {
    setFilters((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const resetFilters = () => {
    setSearch("");

    setFilters({
      gender: "",
      minAge: "",
      maxAge: "",
      district: "",
      religion: "",
      motherTongue: "",
    });
  };

  const visibleProfiles = useMemo(() => {
    const matches = users.filter((user) => {
      if (user._id === currentUser?._id) return true;
      const haystack = `${user.name || ""} ${
        user.currentCity || ""
      } ${user.nativePlace || ""}`.toLowerCase();

      return (
        haystack.includes(search.toLowerCase()) &&
        (!filters.gender ||
          user.gender === filters.gender) &&
        (!filters.minAge ||
          Number(user.age) >= Number(filters.minAge)) &&
        (!filters.maxAge ||
          Number(user.age) <= Number(filters.maxAge)) &&
        (!filters.district ||
          user.district === filters.district) &&
        (!filters.religion ||
          user.religion === filters.religion) &&
        (!filters.motherTongue ||
          user.motherTongue === filters.motherTongue)
      );
    });

    return [...matches].sort((first, second) => {
      if (first._id === currentUser?._id) return -1;
      if (second._id === currentUser?._id) return 1;
      if (sort === "age-low") {
        return (
          Number(first.age || 0) -
          Number(second.age || 0)
        );
      }

      if (sort === "age-high") {
        return (
          Number(second.age || 0) -
          Number(first.age || 0)
        );
      }

      if (sort === "name") {
        return (first.name || "").localeCompare(
          second.name || ""
        );
      }

      return (
        new Date(second.createdAt || 0) -
        new Date(first.createdAt || 0)
      );
    });
  }, [filters, search, sort, users, currentUser?._id]);

  const loggedInUserProfile = users.find(
    (user) => user._id === currentUser?._id
  );

  const isInterested = (profile) =>
    profile.interestRequests?.some(
      (id) => id.toString() === currentUser?._id
    );

  const isFavorite = (profileId) =>
    loggedInUserProfile?.favoriteProfiles?.some(
      (id) => id.toString() === profileId
    );

  const toggleInterest = async (profileId) => {
    if (!currentUser?._id || !token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.put(
        `${API}/users/${profileId}/interest/${currentUser._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      await loadUsers();
    } catch (error) {
      alert(
        error.response?.data?.error ||
          "Unable to update interest"
      );
    }
  };

  const toggleFavorite = async (profileId) => {
    if (!currentUser?._id || !token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.put(
        `${API}/users/${currentUser._id}/favorite/${profileId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await loadUsers();

      if (response.data.message) {
        console.log(response.data.message);
      }
    } catch (error) {
      alert(
        error.response?.data?.error ||
          "Unable to update favorite"
      );
    }
  };

  return (
    <main className="directory-page">
      <div className="directory-shell">

        <header className="directory-header">
          <div>
            

            <p className="directory-kicker">{t("Member directory")}</p>

            <h1>{t("Discover compatible profiles")}</h1>

            <p>{t("Refine your search across Namakkal and Tamil Nadu.")}</p>
          </div>

          <button
            className="directory-primary"
            onClick={() => navigate("/my-profile")}
          >{t("Complete my profile")}</button>
        </header>

        <div className="directory-layout">

          <aside className="filter-panel">

            <div className="filter-title">
              <h2>{t("Filters")}</h2>

              <button onClick={resetFilters}>{t("Clear all")}</button>
            </div>

            <label>{t("Search")}<input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder={t("Name or place")}
              />
            </label>

            <label>{t("Looking for")}<select
                name="gender"
                value={filters.gender}
                onChange={updateFilter}
              >
                <option value="">{t("Anyone")}</option>
                <option value="Female">{t("Women")}</option>
                <option value="Male">{t("Men")}</option>
              </select>
            </label>

            <div className="filter-age">

              <label>{t("Age from")}<input
                  name="minAge"
                  type="number"
                  value={filters.minAge}
                  onChange={updateFilter}
                  min="18"
                />
              </label>

              <label>{t("Age to")}<input
                  name="maxAge"
                  type="number"
                  value={filters.maxAge}
                  onChange={updateFilter}
                  min="18"
                />
              </label>

            </div>

            <label>{t("District")}<select
                name="district"
                value={filters.district}
                onChange={updateFilter}
              >
                <option value="">{t("All districts")}</option>

                {districts
                  .slice(1)
                  .map((district) => (
                    <option
                      key={district}
                      value={district}
                    >
                      {t(district)}
                    </option>
                  ))}
              </select>
            </label>

            <label>{t("Religion")}<select
                name="religion"
                value={filters.religion}
                onChange={updateFilter}
              >
                <option value="">{t("All religions")}</option>

                {[
                  "Hindu",
                  "Muslim",
                  "Christian",
                  "Jain",
                  "Other",
                ].map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {t(item)}
                  </option>
                ))}
              </select>
            </label>

            <label>{t("Mother tongue")}<select
                name="motherTongue"
                value={filters.motherTongue}
                onChange={updateFilter}
              >
                <option value="">{t("All languages")}</option>

                {[
                  "Tamil",
                  "Malayalam",
                  "Telugu",
                  "Kannada",
                  "Hindi",
                  "English",
                ].map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {t(item)}
                  </option>
                ))}
              </select>
            </label>

          </aside>

          <section className="profile-results">

            <div className="results-bar">

              <p>
                <strong>
                  {visibleProfiles.length}
                </strong>{" "}{t("profiles found")}</p>

              <label>{t("Sort by")}<select
                  value={sort}
                  onChange={(event) =>
                    setSort(event.target.value)
                  }
                >
                  <option value="newest">{t("Newest")}</option>

                  <option value="age-low">{t("Age: low to high")}</option>

                  <option value="age-high">{t("Age: high to low")}</option>

                  <option value="name">{t("Name")}</option>
                </select>
              </label>

            </div>

            {loading ? (

              <div className="directory-status">{t("Loading profiles...")}</div>

            ) : visibleProfiles.length ? (

              <div className="profile-grid">

                {visibleProfiles.map((profile) => {
                  const owned =
                    profile._id === currentUser?._id;

                  const interested =
                    isInterested(profile);

                  const favorite =
                    isFavorite(profile._id);
                  const connected = isConnected(loggedInUserProfile, profile);

                  return (
                    <article
                      className="directory-card"
                      key={profile._id}
                    >

                      <ProfilePhotos profile={profile} owner={owned} />

                      <div className="directory-card-body">

                        <div className="profile-card-heading">

                          <div>
                            <h2>
                              {profile.name ||
                                t("Member")}
                            </h2>

                            <p className="profile-location">
                              {[
                                profile.age &&
                                  `${profile.age} ${t("years")}`,
                                profile.currentCity ||
                                  profile.district,
                              ]
                                .filter(Boolean)
                                .join(" | ") ||
                                t("Tamil Nadu")}
                            </p>
                          </div>

                          {!owned && (
                            <button
                              type="button"
                              className={
                                favorite
                                  ? "favorite-button favorite-active"
                                  : "favorite-button"
                              }
                              onClick={() =>
                                toggleFavorite(
                                  profile._id
                                )
                              }
                              title={
                                favorite
                                  ? t("Remove from favorites")
                                  : t("Add to favorites")
                              }
                              aria-label={
                                favorite
                                  ? t("Remove from favorites")
                                  : t("Add to favorites")
                              }
                            >
                              {favorite ? (
                                <FaHeart />
                              ) : (
                                <FaRegHeart />
                              )}
                            </button>
                          )}

                        </div>

                        <p className="profile-meta">
                          {[
                            profile.education,
                            t(profile.occupationType),
                            t(profile.motherTongue),
                          ]
                            .filter(Boolean)
                            .join(" | ") ||
                            t("Details shared on profile")}
                        </p>

                        <div className="card-actions">

                          <Link
                            to={`/profile/${profile._id}`}
                          >{t("View profile")}</Link>

                          {owned ? (

                            <button
                              onClick={() =>
                                navigate(
                                  `/edit/${profile._id}`
                                )
                              }
                            >{t("Edit profile")}</button>

                          ) : connected ? <Link className="connected-chat" to={`/chat/${profile._id}`}>{t("Chat")}</Link> : (

                            <button
                              className={
                                interested
                                  ? "interest-active"
                                  : "interest-button"
                              }
                              onClick={() =>
                                toggleInterest(
                                  profile._id
                                )
                              }
                            >
                              {interested
                                ? t("Interest sent")
                                : t("Send interest")}
                            </button>

                          )}

                        </div>

                      </div>

                    </article>
                  );
                })}

              </div>

            ) : (

              <div className="directory-status">
                <h2>{t("No profiles match these filters.")}</h2>

                <p>{t("Try clearing a filter or expanding your age range.")}</p>

                <button onClick={resetFilters}>{t("Reset filters")}</button>
              </div>

            )}

          </section>

        </div>
      </div>
    </main>
  );
}

export default Profiles;
