import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, Postcard } from "../componets";

function Allpost() {
   const [posts, setPosts] = useState([]);

   useEffect(() => {}, []);
   appwriteService.getPost([]).then((posts) => {
      if (posts) {
         setPosts(posts.documents);
      }
   });

   return (
      <div className="w-full py-8">
         <Container>
            <div className="flex flex-wrap">
               {posts.map((post) => (
                  <div key={post.$id} className="p-2 w-1/4">
                     <Postcard {...post}/>
                  </div>
               ))}
            </div>
         </Container>
      </div>
   );
}

export default Allpost;