const router = require('express').Router()
const  { generateToken }  = require('../util/generateToken');
const { register, login, logout } = require('../services/user.js');

/////////////////////////////////
//register, login, logout

router.post('/register', async (req, res) => { 
 
  try {

    if (req.body.password.trim().length < 2) {
      return res.status(401).json({ message: 'Password must be at least 2 character long' });
      //throw new Error('Password must be at least 2 character long')
    } 
     //console.log(req.body) 
  
  
    let user = await register(req.body.username, req.body.email, req.body.password) 

          const userData = { 
            _id: user._id,
            email: user.email
          }
          
          const  accessToken = generateToken(userData)
        if (user) { 
          const data = {
            _id: user._id,
            username: user.username,
            email: user.email,
            koshnica: user.koshnica,
            accessToken
          } 
          res.status(201).json(data) 
        }
       
		 
  } catch(err) {
     console.error(err);
     res.status(400).json({ message: err.message });
   }  
})
////////////////////////////////////////////////

                 

//TOO check
router.post('/login', async (req, res) => { 
  try {    
    const user = await login(req.body.email, req.body.password);

    const userData = { 
      _id: user._id,
      email: user.email
    }
    const  accessToken = generateToken(userData)
    const data = {
      _id: user._id,
      username: user.username,
      email: user.email,
      koshnica: user.koshnica,
      accessToken: accessToken
    }
 
        if (user) { 
          res.status(200).json(data) 
        }
    
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }                  
});
///

router.get('/logout', (req, res) => { // isUser()
  //const accessToken = req.header('x-authorization')
  const accessToken = req.headers["authorization"]
  const [bearer, token] = accessToken.split(' '); //not show Bearer
   //console.log('logout ' + token)
  try {
     logout(token); 
      res.status(204).end();
    
  }  catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
})

module.exports = router;//otivame v  config/routes.js
////////////////////////////////////////////////

//ako ima chekvane po pol v register.hbs.
//<input="gender" value="female" {{#unless data.isMile}}checked{{/unless}}> //ako ne e maj chekni
//<input="gender" value="male" {{#if data.isMale}}checked{{/if}}>
