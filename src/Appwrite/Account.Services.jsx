import { Account, ID } from "appwrite";
import appwriteClient from ".";
import toast from "react-hot-toast";

class AppwriteAccount {
  constructor() {
    this.account = new Account(appwriteClient);
  }

  // ✅ Create account
  async createAppwriteAccount(email, password, fullname, role) {
    try {
      const result = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name: fullname,
      });

      // login once to store role in prefs
      await this.account.createEmailPasswordSession({ email, password });
      await this.account.updatePrefs({ role });

      // optional logout after signup
      await this.account.deleteSession({ sessionId: "current" });

      return result;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }

  // ✅ Get current logged-in user
  async getAppwriteUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("User Session not found!", error);
      throw error; // 🔥 critical
    }
  }

  // ✅ Login
async createAppwriteEmailPasswordSession(email, password) {
  try {
    return await this.account.createEmailPasswordSession({
      email,
      password,
    });
  } catch (error) {
    toast.error("Login error:", error);
    throw error;
  }
}
  // ✅ Logout
  async logout() {
    try {
      return await this.account.deleteSession({
        sessionId: "current",
      });
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }
}

export default AppwriteAccount;
