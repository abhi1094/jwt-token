const jwtoken  = require('jsonwebtoken');
const config = require('config');

module.exports =   (req,res,next)=> {
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({ msg: 'No token, authorisation denied'} )
    }

    try{
        jwtoken.verify(token, config.get('jwtSecret'), (error,decode) => {
            if (error) {
                return res.status(401).json({ msg: 'Token is not valid' });
            } 
              else{
                  req.user = decode.user;
                  next();
            }
        })
    } catch(err) {
        console.log(err.message);
        res.status(500).json({ msg: 'something is wrong with auth middleware'});
    }
}