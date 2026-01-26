import { Account, ID } from "appwrite";
import appwriteClient from ".";

class AppwriteAccount {
  constructor() {
    this.account = new Account(appwriteClient);
  }
  async createAppwriteAccount(email, password, fullname, role) {
    // Create the account
    const result = await this.account.create({
      userId: ID.unique(),
      email: email,
      password: password,
      name: fullname,
    });

    // Try to sign in right away and persist the role to account prefs so it can be read later
    try {
      await this.account.createEmailPasswordSession({ email, password });
      // store role in prefs (Appwrite supports storing user preferences)
      await this.account.updatePrefs({ role });
      // optional: end the session created during signup if you don't want to keep it
      await this.account.deleteSession({ sessionId: "current" });
    } catch (error) {
      console.log("Warning: could not set role prefs after signup", error);
    }

    return result;
  }

  //user
  async getAppwriteUser(){
    try{
   const result= await this.account.get();
   console.log(result)
   return result;
    }catch(error){
        console.log("User Session not found!",error)
        return null;
    }
  }
  //create new user
  async createAppwriteEmailPasswordSession(email, password) {
    try{
    const result=await this.account.createEmailPasswordSession({
      email: email,
      password: password,
    });
    return result;
  }catch(error){
    console.log("Error in logging in the user",error)
    return ""
  }
}

async logout(){
    try{
  const result=await this.account.deleteSession({
        sessionId:'current'
    });
    console.log(result)
    return result;
}catch(error){
console.log(error)
}
}
}

export default AppwriteAccount;
