import conf from "../conf/conf.js"
import {Client,ID, Databases, Storage, Query} from "appwrite";

export class DatabaseService{
   client = new Client();
   databases;
   bucket;

   constructor(){
      this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectID);

      this.databases = new Databases(this.client);
      this.bucket =new Storage(this.client);
   }

   // create post 
   async createPost({title, slug, content, featuredImaged, status, userId}){
      try{
         return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
               title,
               content,
               featuredImaged,
               status,
               userId,
            }
         )
      }
      catch(error){
         console.log("Appwrite service :: createPost :: error", error);
      }
   }
 
   // update Post
   async updatePost(slug, {title, content, featuredImaged, status}){
      try{
         return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
               title,
               content,
               featuredImaged,
               status,
            }
         )
      }
      catch(error){
         console.log("Appwrite service :: updatePost :: error", error);
      }
   }

   // delete post
   async deletePost(slug){
      try{
         await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
         )

         return true;
      }
      catch(error){
         console.log("Appwrite service :: deletePost :: error", error);
         return false;
      }
   }

   // get Post 
   async getPost(slug){
      try{
         return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
         )
      }
      catch(error){
         console.log("Appwrite service :: getPost :: error", error);
         return false
      }
   }

   // get  all Post 
   async getAllPost(queries = [Query.equal("status","active")]){
      try{
         return await this.databases.listDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries, 
         )
      }
      catch(error){
         console.log("Appwrite service :: getAllPost :: error", error);
         return false;
      }
   }


   // file upload service

   // upload file
   async  uploadFile(File){
      try{
         return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            File
         )
      }
      catch(error){
         console.log("Appwrite service :: uploadFile :: error", error)
         return false;
      }
   }
   
   // delete file
   async  deleteFile(fileId){
      try{
         await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
         )
         return true;
      }
      catch(error){
         console.log("Appwrite service :: deleteFile :: error", error)
         return false;
      }
   }

   getFilePreview(fileId){
      return this.bucket.getFilePreview(
         conf.appwriteBucketId,
         fileId
      )
   }
   
}

const service = new DatabaseService();
export default service;