import { Eye, EyeOff, Loader2, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    const { email, fullname, password } = formData;
    if (!fullname) {
      return toast.error("Full name is required");
    }
    if (!email) {
      return toast.error("Email is required");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return toast.error("Email is invalid");
    }
    if (!password) {
      return toast.error("Password is required");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success == true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side  */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <MessageSquare />
          </div>
          <h1>create new account</h1>
          <p>get started with your new account</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <Mail />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="fullname">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                value={formData.fullname}
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="password">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div>
            <p>
              Already have an account?
              <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
