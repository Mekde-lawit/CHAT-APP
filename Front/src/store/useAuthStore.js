import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { data } from "react-router-dom";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
    } catch (error) {
      console.error("Error checking authentication:", error);
      set({ isCheckingAuth: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  },
}));
