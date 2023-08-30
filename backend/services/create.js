const Post = require('../models/Create.js') 
const User = require('../models/User.js')

//Catalog
async function getPost() { 
  //return dannite
    return await Post.find({}) 
   
}
//////////


//Create
async function createPost(post) {
  const result = new Post(post);
  return await result.save()
}
///////


//Details
async function getPostById(id) {
  return Post.findById(id)   
}


//Edit
async function editPost(id, post) {
  const existing = await Post.findById(id); 
   
   existing.title = post.title;
   existing.imageUrl = post.imageUrl;
   existing.description = post.description;
   existing.price = post.price;
   existing.type = post.type;
   
   return await existing.save()
}
///////

//Delete
async function deletePost(id) {
  return Post.findByIdAndDelete(id)
}  

/////////////////////////////////

//Buyer
async function buyer(postId, userId) {
  const post = await Post.findById(postId) 
 
    if (post.boughtBy.includes(userId)) { 
       return 'User has already buy it'
    }
   
  
   post.boughtBy.push(userId) 
  await post.save()


  const user = await User.findById(userId)
  user.basket.push(postId) 
  await user.save()
  
  return post.boughtBy.length;
}
////////////////////////

//Likes
async function likesPost(postId, userId) {
  const post = await Post.findById(postId) 
   
  if (post.likes.includes(userId)) {  
    throw new Error('User has already like it')
  }
  
  post.likes.push(userId)
  await post.save()
  
  return post.likes.length
} 
////////////////////////

//My Profil
  async function getProfil(userId) {
     return await Post.find({ owner: userId }) 
   }
////////

//My shopping 
async function getShopping(userId) {
  const user = await User.findById(userId)
  const basketBuyId = user.basket; 
  const allBuyPosts = await Post.find({ _id: basketBuyId });
  return allBuyPosts;
}



 ///
module.exports = {
  createPost,
  getPost,
  getPostById,
  editPost,
  deletePost,
  buyer,
  likesPost,
  getProfil,
  getShopping
}

