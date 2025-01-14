// src/appwrite.js
import { Client, Account, OAuthProvider } from 'appwrite'

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')// The Appwrite API endpoint
  .setProject('6786319900161f5048aa')// Your Appwrite project IDexport 
  const account = new Account(client)
export {  account ,client}

