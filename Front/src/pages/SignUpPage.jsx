import { Eye, EyeOff, Loader2, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";


const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullN: "",
    password: "",
  });

  const {signup, isSigningUp} = useAuthStore();

  const validateForm = () => {}

  const handleSubmit = (e) => {
  e.preventDefault();
  }


  return(
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
          <label htmlFor="email">Email</label>
          <Mail />
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="fullName">fullName

          </label>
          <input
            type="text"
            id="fullName
"
            value={formData.fullName
  
            }
            onChange={(e) => setFormData({ ...formData, fullName
  : e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (<EyeOff />) : (<Eye />)} 
          </button>
        </div>
        <button className="btn btn-primary w-full" type="submit" disabled={isSigningUp}>
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
        <p>Already have an account? 
          <Link to="/login">Log in</Link>
          </p>
      </div>

</div>
      </div>

     

    </div>
  )
}

export default SignUpPage