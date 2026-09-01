import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AccountSettings() {
  const navigate = useNavigate();
  const API = "https://matrimony-backend-zbvm.onrender.com/api";

  const loggedInUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [otpForm, setOtpForm] = useState({
    mobileOtp: "",
    emailOtp: "",
    newMobile: "",
    newEmail: "",
  });

  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!loggedInUser?._id) {
          navigate("/login");
          return;
        }

        const res = await axios.get(`${API}/users/${loggedInUser._id}`);
        setProfile({
          name: res.data.name || "",
          mobile: res.data.mobile || "",
          email: res.data.email || "",
        });
      } catch (err) {
        console.log(err);
        alert("Failed to load account settings");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [API, loggedInUser?._id, navigate]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtpChange = (e) => {
    const { name, value } = e.target;
    setOtpForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    try {
      setSavingProfile(true);

      const res = await axios.put(`${API}/users/${loggedInUser._id}`, {
        name: profile.name,
        mobile: profile.mobile,
        email: profile.email,
      });

      alert("Profile updated successfully ❤️");

      const currentUser = JSON.parse(localStorage.getItem("user") || "null");
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...currentUser,
          ...res.data,
          name: res.data.name || profile.name,
          mobile: res.data.mobile || profile.mobile,
          email: res.data.email || profile.email,
        })
      );

      window.location.reload();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const sendOtp = async (type) => {
    try {
      const payload =
        type === "mobile"
          ? { type: "mobile", value: otpForm.newMobile || profile.mobile }
          : { type: "email", value: otpForm.newEmail || profile.email };

      const res = await axios.post(`${API}/auth/send-otp`, payload);
      alert(res.data.message || "OTP sent successfully");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Failed to send OTP");
    }
  };

  const verifyOtp = async (type) => {
    try {
      const otp = type === "mobile" ? otpForm.mobileOtp : otpForm.emailOtp;

      const payload =
        type === "mobile"
          ? {
              type: "mobile",
              value: otpForm.newMobile || profile.mobile,
              otp,
            }
          : {
              type: "email",
              value: otpForm.newEmail || profile.email,
              otp,
            };

      const res = await axios.post(`${API}/auth/verify-otp`, payload);

      alert(res.data.message || "OTP verified successfully");

      if (type === "mobile") setMobileVerified(true);
      if (type === "email") setEmailVerified(true);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "OTP verification failed");
    }
  };

  const changePassword = async () => {
    try {
      if (!passwordForm.oldPassword || !passwordForm.newPassword) {
        alert("Please fill old password and new password");
        return;
      }

      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        alert("New password and confirm password do not match");
        return;
      }

      setChangingPassword(true);

      const res = await axios.put(`${API}/users/${loggedInUser._id}/password`, {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      });

      alert(res.data.message || "Password changed successfully");
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Password change failed");
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          ← Back
        </button>

        <div style={styles.card}>
          <h1 style={styles.title}>Account Settings</h1>
          <p style={styles.subtitle}>
            Update your profile details and verify contact information.
          </p>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Profile Details</h3>

            <label style={styles.label}>Full Name</label>
            <input
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              style={styles.input}
              placeholder="Full name"
            />

            <label style={styles.label}>Mobile Number</label>
            <input
              name="mobile"
              value={profile.mobile}
              onChange={handleProfileChange}
              style={styles.input}
              placeholder="Mobile number"
            />

            <label style={styles.label}>Gmail / Email</label>
            <input
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              style={styles.input}
              placeholder="Email"
            />

            <button
              onClick={saveProfile}
              style={styles.primaryBtn}
              disabled={savingProfile}
            >
              {savingProfile ? "Saving..." : "Save Profile"}
            </button>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Verify Mobile Number</h3>

            <label style={styles.label}>New Mobile Number</label>
            <input
              name="newMobile"
              value={otpForm.newMobile}
              onChange={handleOtpChange}
              style={styles.input}
              placeholder="Enter new mobile number"
            />

            <div style={styles.row}>
              <button
                onClick={() => sendOtp("mobile")}
                style={styles.secondaryBtn}
              >
                Send OTP
              </button>
              <button
                onClick={() => verifyOtp("mobile")}
                style={styles.secondaryBtn}
                disabled={!otpForm.mobileOtp}
              >
                Verify OTP
              </button>
            </div>

            <label style={styles.label}>OTP</label>
            <input
              name="mobileOtp"
              value={otpForm.mobileOtp}
              onChange={handleOtpChange}
              style={styles.input}
              placeholder="Enter mobile OTP"
            />

            {mobileVerified && (
              <p style={styles.verifiedText}>Mobile verified ✅</p>
            )}
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Verify Email</h3>

            <label style={styles.label}>New Email</label>
            <input
              name="newEmail"
              value={otpForm.newEmail}
              onChange={handleOtpChange}
              style={styles.input}
              placeholder="Enter new email"
            />

            <div style={styles.row}>
              <button
                onClick={() => sendOtp("email")}
                style={styles.secondaryBtn}
              >
                Send OTP
              </button>
              <button
                onClick={() => verifyOtp("email")}
                style={styles.secondaryBtn}
                disabled={!otpForm.emailOtp}
              >
                Verify OTP
              </button>
            </div>

            <label style={styles.label}>OTP</label>
            <input
              name="emailOtp"
              value={otpForm.emailOtp}
              onChange={handleOtpChange}
              style={styles.input}
              placeholder="Enter email OTP"
            />

            {emailVerified && (
              <p style={styles.verifiedText}>Email verified ✅</p>
            )}
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Change Password</h3>

            <label style={styles.label}>Current Password</label>
            <input
              type="password"
              name="oldPassword"
              value={passwordForm.oldPassword}
              onChange={handlePasswordChange}
              style={styles.input}
              placeholder="Current password"
            />

            <label style={styles.label}>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              style={styles.input}
              placeholder="New password"
            />

            <label style={styles.label}>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              style={styles.input}
              placeholder="Confirm new password"
            />

            <button
              onClick={changePassword}
              style={styles.primaryBtn}
              disabled={changingPassword}
            >
              {changingPassword ? "Updating..." : "Change Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#ffe4ec",
    padding: "110px 20px 40px",
  },
  wrapper: {
    maxWidth: 900,
    margin: "0 auto",
  },
  card: {
    background: "#fff",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
    border: "1px solid #f4d8df",
  },
  backBtn: {
    marginBottom: 16,
    padding: "10px 18px",
    background: "#8B0000",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
  },
  title: {
    margin: 0,
    color: "#8B0000",
    fontSize: 34,
    fontWeight: 800,
  },
  subtitle: {
    marginTop: 8,
    color: "#6f5b61",
  },
  section: {
    marginTop: 28,
    padding: 20,
    borderRadius: 18,
    background: "#fff8fa",
    border: "1px solid #f2d6dd",
  },
  sectionTitle: {
    margin: "0 0 16px",
    color: "#8B0000",
    fontSize: 22,
  },
  label: {
    display: "block",
    marginBottom: 8,
    color: "#444",
    fontWeight: 600,
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid #e3c7cf",
    outline: "none",
    fontSize: 15,
    marginBottom: 14,
    boxSizing: "border-box",
  },
  row: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 14,
  },
  primaryBtn: {
    padding: "12px 18px",
    background: "#8B0000",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 700,
  },
  secondaryBtn: {
    padding: "10px 16px",
    background: "#ff4d6d",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 700,
  },
  verifiedText: {
    marginTop: 6,
    color: "green",
    fontWeight: 700,
  },
};

export default AccountSettings;