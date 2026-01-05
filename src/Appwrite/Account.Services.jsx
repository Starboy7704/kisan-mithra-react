import { Account, ID } from "appwrite";
import appwriteClient from ".";

class AppwriteAccount {
  constructor() {
    this.account = new Account(appwriteClient);
  }
  async createAppwriteAccount(email, password, fullname) {
    const result = await this.account.create({
      userId: ID.unique(),
      email: email,
      password: password,
      name: fullname,
    });
    return result;
  }

  //user
  async getAppwriteUser(){
    try{
   const result= await this.account.get();
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
