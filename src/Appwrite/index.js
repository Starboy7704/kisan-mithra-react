import { Client, Functions } from "appwrite";
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "../Utils/Appwrite/constants";

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

export const functions = new Functions(client);

export default client;
