const router = require('express').Router(); 

const { getDataFromToken } = require('../util/generateToken')
const { createPost, getPostById, editPost, deletePost, buyer, likesPost, getProfil, getShopping } = require('../services/create') //
const { isUser, isOwner } = require('../middlewares/guards')
const errorMapper = require('../util/errorMapper');


/////////////////////////////////////////
//Create  
router.post('/create', isUser(), async (req, res) => { 
    
  const post = {
      title: req.body.title,
      imageUrl: req.body.imageUrl,           
      description: req.body.description,  
      price: req.body.price,
      type: req.body.type,
      owner: req.body.owner,
  }

  //console.log(req.body)

  try {    
      const result = await createPost(post)
      res.json(result); 
  } catch(err) {
      console.error(err);
      const message = errorMapper(err);
      res.status(400).json({ message });    
  }
  
})

//Details 
router.get('/details/:id', isUser(), async (req, res) => {  //
  const id = req.params.id; // = /:id
  //console.log('details' + id)
    try {
    const post = await getPostById(id) 
      if (post) {
      res.status(200).json(post);
     }
   } catch (err) {
    console.error(err);
    const message = errorMapper(err);
    res.status(400).json({ message });    
   }                                    
  
  });
///////////////////////////////////

//Edit 
  router.put('/edit/:id', isOwner(), async(req, res) => {  //
     
    const post = {
      title: req.body.title,
      imageUrl: req.body.imageUrl, 
      description: req.body.description,
      price: req.body.price,
      type: req.body.type,
    }

   
    try {
      const id = req.params.id;
        const result = await editPost(id, post) 
        //console.log(`edit type ${result.type}`)

        res.status(200).json(result); //davame dannite na frontenda
        
    } catch (err) {
      console.error(err);
      const message = errorMapper(err);
      res.status(400).json({ message });
    }
});
/////////////////////////////

//Delete
router.get('/delete/:id',isOwner(), async (req, res) => { //

  const id = req.params.id; //vzima /:id ot gornoto
   try {
        const result = await deletePost(id)
        res.status(200).json(result);
    } catch (err) {
      console.error(err);
      const message = errorMapper(err);
      res.status(400).json({ message });
   }        
 })
////////////////////////////

//buyer
router.get('/buy/:id', isUser(), async (req, res) => {
    const postId = req.params.id; //vzima /:id ot gornoto
    
      //  const accessToken = req.header('x-authorization')
      const accessToken = req.headers["authorization"]
       const userDataToken = await getDataFromToken(accessToken.split(' ').pop()) 
      const userId = userDataToken.id._id
        
    try {
       const result = await buyer(postId, userId)
        //console.log(`buyer ${postId}`)
       res.status(200).json(result);
    } catch (err) {
        console.error(err);
        const message = errorMapper(err);
        res.status(400).json({ message });
     } 
   
  })
  ////////////////////////////////////

  //Likes
router.put('/likes/:id', isUser(), async (req, res) => {
     const postId = req.params.id; //take /likes/:id
     const accessToken = req.header('x-authorization')
     const userDataToken = await getDataFromToken(accessToken)
  try {
     const result = await likesPost(postId, userDataToken.id._id)
     //console.log(`likes ${result}`)
     res.status(200).json(result);
  } catch (err) {
      console.error(err);
      const message = errorMapper(err);
      res.status(400).json({ message });
   } 
 
})
//////////////////////////////////

//My Profil //Mylist 
router.get('/mylist/:id', isUser(), async (req, res) => {  
  //const accessToken = req.header('x-authorization')
  const accessToken = req.headers["authorization"]
  const userDataToken = await getDataFromToken(accessToken.split(' ').pop())
  const userId = userDataToken.id._id;
  //console.log('backend Myprofil userId' + userId)

  try {
    const posts = await getProfil(userId) 
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    const message = errorMapper(err);
    res.status(400).json({ message });
  }
 
});
////////////////////////////////

//My Shopping 
router.get('/shopping/:id', isUser(), async (req, res) => { 
  //console.log('backend.Params ' + req.params.id) //= /:id v sluchaq (userId) 
  // const accessToken = req.header('x-authorization')
  // const userDataToken = getDataFromToken(accessToken)
  const accessToken = req.headers["authorization"]
  //console.log('accessToken ' + accessToken) //Bearer 35552444
  const userDataToken = await getDataFromToken(accessToken.split(' ').pop()) 
  const userId = userDataToken.id._id;

  try {
    const posts = await getShopping(userId)
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    const message = errorMapper(err);
    res.status(400).json({ message });
  }
});


module.exports = router;
