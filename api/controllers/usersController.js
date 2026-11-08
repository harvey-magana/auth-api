const Users = require('../models/usersModel');
const nodePath = require('path');
const { roles } = require('../utils/roles');

exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await Users.find();
		res.status(200).json({data: users});
	} catch (error) {
		next(error.message);
	}
};

// new getOneUser function start
exports.getOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.user;

    const isOwner = Number(data.id) === Number(id);

    const permission =
      isOwner && roles.can(data.role).readOwn('profile').granted
        ? roles.can(data.role).readOwn('profile')
        : roles.can(data.role).readAny('profile');

    if (!permission.granted) {
      return res.status(403).json({
        message: 'Forbidden'
      });
    }

    const [user] = await Users.findById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    return res.status(200).json({
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return next(error);
  }
};

// updated updateUser function start
exports.updateUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const data = req.user;
		const userBody = req.body;

		const permission =
			Number(data.id) === Number(id) && roles.can(data.role).updateOwn('profile').granted
				? roles.can(data.role).updateOwn('profile')
				: roles.can(data.role).updateAny('profile');

		if (!permission.granted) {
			return res.status(403).json({
				message: 'Forbidden'
			});
		}

		if (userBody.username) {
			return res.status(405).json({
				message: 'You cannot update your username.'
			});
		}

		delete userBody.password;
		delete userBody.role;
		delete userBody.confirm_password;

		const user = await Users.update(id, userBody);

		if (!user) {
			return res.status(404).json({
				message: 'User not found'
			});
		}

		return res.status(201).json({
			data: user,
			message: 'User has been updated'
		});
	} catch (error) {
		return next(error);
	}
};

exports.deleteUser = async (req, res, next) => {
	try {
		const userId = req.params.id; // user id 
		const data = req.user;

		const permission = (data.id === userId && roles.can(data.role).deleteOwn('profile').granted) ? roles.can(data.role).deleteOwn('profile') : roles.can(data.role).deleteAny('profile');

		if(permission.granted) {
			const user = await Users.remove(userId);

			if (user) {
				res.status(200).json({
					message: 'The user has been deleted...',
					data: null
				});
			} else {
				res.status(500).json({
					message: 'Sorry, there was a problem with that last commend...'
				});
			}
		}
		next();
	} catch (error) {
		next(error.message);
	}
};

exports.uploadImage = async (req, res, next) => {
	try {
		const data = req.user;
		let sampleFile;
		let uploadPath;

		if(!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).json({
				message: 'No files were uploaded.'
			});
		}

		sampleFile = req.files.avatar;
		const uploadDir = nodePath.resolve(process.cwd(), 'api/uploads');
		const originalName = nodePath.basename(sampleFile.name);
		const safeFileName = originalName.replace(/[^a-zA-Z0-9._-]/g, '_');
		uploadPath = nodePath.resolve(nodePath.join(uploadDir, safeFileName));
		const extensionName = nodePath.extname(safeFileName).toLowerCase();
		const allowedExtension = ['.png', '.jpg', '.jpeg'];

		if(!allowedExtension.includes(extensionName)) {
			return res.status(422).json({
				message: 'Invalid file'
			});
		}

		if(uploadPath !== uploadDir && !uploadPath.startsWith(uploadDir + nodePath.sep)) {
			return res.status(422).json({
				message: 'Invalid file path'
			});
		}

		const { id } = req.params; // user id 

		const permission = (data.id === id && roles.can(data.role).updateOwn('avatar').granted) ? roles.can(data.role).updateOwn('avatar') : roles.can(data.role).updateAny('avatar');

		if(permission.granted) {
			await Users.addImage({ id: id, image_path: uploadPath });
			sampleFile.mv(uploadPath, function(err) {
				if(err) return res.status(500).send(err);
	
				return res.send('File uploaded!');
			});
		}

	} catch (error) {
		next(error.message + '!!');
	}
};

exports.getUserImage = async (req, res, next) => {
	try {
		const { id } = req.params; // user id 
		const data = req.user;

		const permission = (data.id === id && roles.can(data.role).readOwn('avatar').granted) ? roles.can(data.role).readOwn('avatar') : roles.can(data.role).readAny('avatar');

		if(permission.granted) {
			const [user] = await Users.findById(id);

			if(!user) {
				return res.status(400).json({
					message: 'Sorry, user image not found...'
				});
			}
			
			res.status(200).json({
				id: user.id,
				username: user.username,
				image_path: user.image_path
			});
		}
	
	} catch (error) {
		next(error.message);
	}
};

exports.deleteImage = async (req, res, next) => {
	try {
		const id = req.params.id; // user id 
		const data = req.user;

		const permission = (data.id === id && roles.can(data.role).deleteOwn('avatar').granted) ? roles.can(data.role).deleteOwn('avatar') : roles.can(data.role).deleteAny('avatar');

		if(permission.granted) {
			const [user] = await Users.findById(id);

			const image = await Users.removeImage({ id: user.id, image_path: user.image_path});

			if(image) {
				res.status(200).json({
					message: 'image deleted.',
					image: image
				});
			} else {
				return res.status(400).json({
					message: 'Sorry, user image not found.'
				});
			}
		}

	} catch (error) {
		next(error.message);
	}
};

// recommended improvement start 

const ROLE_TRANSITIONS = Object.freeze({
  upgrade: Object.freeze({
    reader: 'moderator',
    moderator: 'editor'
  }),
  downgrade: Object.freeze({
    editor: 'moderator',
    moderator: 'reader'
  })
});

async function changeUserRole(req, res, next, direction) {
  try {
    const rawTargetId = req.params.id;
    const targetId = Number(rawTargetId);
    const actorId = Number(req.user?.id);

    if (
      !/^[1-9]\d*$/.test(rawTargetId) ||
      !Number.isSafeInteger(targetId)
    ) {
      return res.status(400).json({
        message: 'Invalid user ID'
      });
    }

    if (!Number.isSafeInteger(actorId) || actorId < 1) {
      return res.status(401).json({
        message: 'Invalid authenticated user'
      });
    }

    // Recheck the caller against current database state.
    const [actor] = await Users.findById(actorId);

    if (!actor) {
      return res.status(401).json({
        message: 'Authenticated user no longer exists'
      });
    }

    if (actor.role !== 'admin') {
      return res.status(403).json({
        message: 'Administrator privileges required'
      });
    }

    // Administrators cannot alter their own role.
    if (actorId === targetId) {
      return res.status(403).json({
        message: 'Cannot change your own role'
      });
    }

    const [target] = await Users.findById(targetId);

    if (!target) {
      return res.status(404).json({
        message: 'Target user not found'
      });
    }

    // Administrators cannot modify other administrators.
    if (target.role === 'admin') {
      return res.status(403).json({
        message: 'Administrator roles cannot be changed here'
      });
    }

    // Client-supplied role values are never trusted.
    const nextRole = ROLE_TRANSITIONS[direction][target.role];

    if (!nextRole) {
      return res.status(409).json({
        message: 'No valid role transition is available'
      });
    }

    const updatedUser = await Users.updateRole(
      targetId,
      target.role,
      nextRole
    );

    if (!updatedUser) {
      return res.status(409).json({
        message: 'Role changed during the request. Retry.'
      });
    }

    return res.status(200).json({
      message: 'User role updated successfully',
      data: updatedUser
    });
  } catch (error) {
    return next(error);
  }
}

exports.upgradeUser = (req, res, next) =>
  changeUserRole(req, res, next, 'upgrade');

exports.downgradeUser = (req, res, next) =>
  changeUserRole(req, res, next, 'downgrade');
// recommended improvement end

exports.upgradeUser = async (req, res, next) => {
	try {
		const { id } = req.params; // user id 
		let session = req.session.verified;
		let upgradeBody = {};
		let [user] = await Users.findById(id);

		if (user.id === session.id && user.role === 'reader') {
      session.role = 'moderator';
      upgradeBody.username = session.username;
      upgradeBody.role = session.role;
    } else if (user.role === 'moderator') {
      session.role = 'editor';
      upgradeBody.username = session.username;
      upgradeBody.role = session.role;
    } else {
      console.error('This is as high as it goes, sorry...');
    }

    if (Object.keys(upgradeBody).length > 0) {
      user = await Users.update(id, upgradeBody);
      return res.status(201).json({
				data: user,
				message: 'Role updated...'
			});
    } else {
			return res.status(400).json({
				message: 'Empty object, nothing to upgrade.'
			});
    }
	} catch (error) {
		next(error + '!!!');
	}
}

exports.downgradeUser = async (req, res, next) => {
	try {
		const { id } = req.params; // user id 
		let session = req.session.verified;
		let downgradeBody = {};
		let [user] = await Users.findById(id);

		if (user.id === session.id && user.role === 'editor') {
			session.role = 'moderator';
      downgradeBody.username = session.username;
      downgradeBody.role = session.role;
		} else if (user.role === 'moderator') {
      session.role = 'reader';
      downgradeBody.username = session.username;
      downgradeBody.role = session.role;
		} else {
      console.error('This is as low as it goes, sorry...');
    }

		if (Object.keys(downgradeBody).length > 0) {
			user = await Users.update(id, downgradeBody);
			return res.status(201).json({
				data: user,
				message: 'Role downgrade...'
			});
		} else {
			return res.status(400).json({
				message: 'Empty object, nothing to downgrade.'
			});
		}

	} catch (error) {
		next(error + '!!!')
	}
}
