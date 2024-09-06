import conf from "../conf/conf.js"
import {Client, Account , ID} from "appwrite";

export class AuthService {
   client = new Client();
   account;

   constructor(){
      this.client
           .setEndpoint(conf.appwriteUrl)
           .setProject(conf.appwriteProjectID);
      this.account = new Account(this.client);
   }

   // creating account
   async createAccount({email, password,name }){
      try{
         const userAccount = await this.account.create(ID.unique() ,email, password, name);

         if(userAccount){
            // call another function for login
            return this.login({email, password})
         }
         else{
            return userAccount 
         }
      }
      catch(error){
         throw error;
      }
   }

   // login 
   async login({email, password}){
      try{
         const userLogin = await this.account.createEmailSession(email, password)

         return userLogin;
      }
      catch(error){
         throw error;
      }
   }

   // get current user
   async getCurrentUser(){
      try{
         return await this.account.get();
      }
      catch(error){
         console.log("Appwrite service :: getCurrentUser :: error", error);
      }
      return null;
   }

   // user Logout
   async Logout(){
      try{
         await this.account.deleteSessions();
      }
      catch(error){
         console.log("Appwrite service :: Logout :: error", error);
      }
   }


   
}

const authService = new AuthService();

export default authService