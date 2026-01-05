import { Client } from "appwrite";
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "../Utils/Appwrite/constants";

console.log(APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID);

const appwriteClient = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);


  export default appwriteClient