import {useAuthStore} from "../store/useAuthStore";
import { Camera } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
const ProfilePage = () => {

  const {authUser , isUpdatingProfile, updateProfile} = useAuthStore();
const [selectedImage, setSelectedImage] = useState(null);
  const handleImageUpload = async (e)=>{
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);

       await updateProfile({ profilePic: base64Image });

  }
}
  return (
    <div
    className="h-screen pt-20">
     
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="mb-4">Your profile information</p>

<div className="flex flex-col items-center gap-4">
  <div className="relative">
    <img 
      src={selectedImage || authUser.profilePic  || "./default.png"}
      alt="Profile"
      className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 mb-4"
    />
    <label htmlFor="profile-pic-upload" className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}> </label>
    <Camera />
    <input
      type="file"
      id="profile-pic-upload"
      accept="image/*"
      onChange={handleImageUpload}
      className="hidden"
      disabled={isUpdatingProfile}
    />
   
  </div>
  <p className="text-sm text-gray-500">{
    isUpdatingProfile ? "Uploading..." : "Click the camera icon to change profile picture"
  }</p>
</div>
        {authUser && (
          <div>
            <p>Email: {authUser?.email}</p>
            <p>Name: {authUser?.fullname}</p>
            <div>
              <p>Account Information</p>

              <p>Member Since: <span className="alert">{authUser?.createdAt?.split("T")[0]}</span></p>
<p>Account Type: <span className="alert">Active</span></p>
            </div>
          </div>

          
        )}
      </div>
    </div>
  )
}

export default ProfilePage