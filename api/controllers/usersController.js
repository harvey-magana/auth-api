const Users = require('../models/usersModel');
const nodePath = require('path');
// added the following two to improve nodePath
const fs = require('fs');
const crypto = require('crypto');
const { roles } = require('../utils/roles');

exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await Users.find();
		res.status(200).json({data: users});
	} catch (error) {
		next(error.message);
	}
};

exports.getOneUser = async (req, res, next) => {
	try {
		const { id } = req.params; // user id 
		const data = req.user;

		const permission = (Number(data.id) === Number(id) && roles.can(data.role).readOwn('profile').granted) ? roles.can(data.role).readOwn('profile') : roles.can(data.role).readAny('profile');
		if(permission.granted) {
			const [user] = await Users.findById(id);
			return res.status(201).json({data: user});
		}

	} catch (error) {
		next(error.message);
	}
};

// updated code start 
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

		const permission = (Number(data.id) === userId && roles.can(data.role).deleteOwn('profile').granted) ? roles.can(data.role).deleteOwn('profile') : roles.can(data.role).deleteAny('profile');

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

// updated uploadImaage function 
exports.uploadImage = async (req, res, next) => {
	try {
		const data = req.user;
		const { id } = req.params;

		if (!req.files || Object.keys(req.files).length === 0 || !req.files.avatar) {
			return res.status(400).json({
				message: 'No files were uploaded.'
			});
		}

		const sampleFile = req.files.avatar;

		if (Array.isArray(sampleFile)) {
			return res.status(400).json({
				message: 'Only one avatar file may be uploaded.'
			});
		}

		const extensionName = nodePath.extname(sampleFile.name).toLowerCase();
		const allowedExtension = ['.png', '.jpg', '.jpeg'];

		if (!allowedExtension.includes(extensionName)) {
			return res.status(422).json({
				message: 'Invalid file'
			});
		}

		const permission =
			Number(data.id) === Number(id) && roles.can(data.role).updateOwn('avatar').granted
				? roles.can(data.role).updateOwn('avatar')
				: roles.can(data.role).updateAny('avatar');

		if (!permission.granted) {
			return res.status(403).json({
				message: 'Forbidden'
			});
		}

		const uploadsDir = nodePath.resolve(process.cwd(), 'api', 'uploads');
		fs.mkdirSync(uploadsDir, { recursive: true });

		const safeFileName = `${crypto.randomUUID()}${extensionName}`;
		const uploadPath = nodePath.join(uploadsDir, safeFileName);

		if (!uploadPath.startsWith(uploadsDir + nodePath.sep)) {
			return res.status(400).json({
				message: 'Invalid upload path'
			});
		}

		await sampleFile.mv(uploadPath);

		const imagePath = nodePath.join('api', 'uploads', safeFileName);

		await Users.addImage({
			id,
			image_path: imagePath
		});

		return res.status(200).json({
			message: 'File uploaded!',
			image_path: imagePath
		});
	} catch (error) {
		return next(error);
	}
};

exports.getUserImage = async (req, res, next) => {
	try {
		const { id } = req.params; // user id 
		const data = req.user;

		const permission = (Number(data.id) === Number(id) && roles.can(data.role).readOwn('avatar').granted) ? roles.can(data.role).readOwn('avatar') : roles.can(data.role).readAny('avatar');

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

		const permission = (Number(data.id) === Number(id) && roles.can(data.role).deleteOwn('avatar').granted) ? roles.can(data.role).deleteOwn('avatar') : roles.can(data.role).deleteAny('avatar');

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
