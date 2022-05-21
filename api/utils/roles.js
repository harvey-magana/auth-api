const AccessControl = require('accesscontrol');
const ac = new AccessControl();

exports.roles = (function() {
  ac.grant('reader')
    .createAny('post').readAny('post').updateAny('post').deleteAny('post')
    .createAny('comment').readAny('comment').updateAny('comment').deleteAny('comment')
    .readAny('profile').updateAny('profile').deleteAny('profile')
    .readAny('avatar').updateAny('avatar').deleteAny('avatar')

  ac.grant('moderator')
    .createAny('post').readAny('post').updateAny('post').deleteAny('post')
    .createAny('comment').readAny('comment').updateAny('comment').deleteAny('comment')
    .readAny('profile').updateAny('profile').deleteAny('profile')
    .readAny('avatar').updateAny('avatar').deleteAny('avatar')
  
  ac.grant('editor')
    .createAny('post').readAny('post').updateAny('post').deleteAny('post')
    .createAny('comment').readAny('comment').updateAny('comment').deleteAny('comment')
    .readAny('profile').updateAny('profile').deleteAny('profile')
    .readAny('avatar').updateAny('avatar').deleteAny('avatar')
  return ac;
})();