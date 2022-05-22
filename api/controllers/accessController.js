const { roles } = require('../utils/roles');

exports.grantAccess = function(action, resource) {
  return async (req, res, next) => {
    try {
      
      const data = req.user;
      
      let modAction = action;
      // the statement below works with requests that use a param, such as in POST, PUT and DELETE REQUESTS 
      // as long as the user_id is included in the request body, 
      // without it, the permissions would be overwritten by the wrong user
      if(data.id === parseInt(req.params.id) || data.id === parseInt(req.body.user_id)) {
        modAction = action.replace('Any', 'Own');
      }

      const permission = roles.can(data.role)[modAction](resource);

      if(!permission.granted) {
        return res.status(401).json({
          error: 'You do not have the necessary permission to perform this action.'
        })
      }
      next();
    } catch (error) {
      next(error)
    }
  }
}

exports.allowIfLoggedin = async (req, res, next) => {
  try {
    const user = await req.session.verified;
    
    if(!user) 
      return res.status(401).json({
        error: 'You need to be logged in to access this route.'
      });
      req.user = user;
      
      next();
  } catch (error) {
    next(error.message)
  }
}