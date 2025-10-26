import { Eye, EyeOff, Loader2, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const LogInPage = () => {

  const [formData, setFormData] = useState({
     email: "", password: "" });
  const [showPassword, setShowPassword]= useState(false);
  const {login, isLoggingIn} = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };


  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>  
            <Mail />
            <input
             type="email" 
             id="email" 
             value={formData.email}
             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
             className="input" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
             type={showPassword ? "text" : "password"}
             id="password"
             value={formData.password}
             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
             className="input" />
             <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (<EyeOff />) : (<Eye />)} 
          </button>
          </div>
         <button className="btn btn-primary" type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? (
            <>
            <Loader2 />
            Loading...
            </>
          ) : (
            "Log In"
          )}
        </button>
        </form>
        <div>
        <p>Create new account? 
          <Link to="/signup">Sign up</Link>
          </p>
      </div>
      </div>
    </div>
  )
}

export default LogInPage