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

exports.getOneUser = async (req, res, next) => {
	try {
		const { id } = req.params; // user id 
		const data = req.user;

		const permission = (data.id === id && roles.can(data.role).readOwn('profile').granted) ? roles.can(data.role).readOwn('profile') : roles.can(data.role).readAny('profile');
		if(permission.granted) {
			const [user] = await Users.findById(id);
			return res.status(200).json({data: user});
		}

	} catch (error) {
		next(error.message);
	}
};

exports.updateUser = async (req, res, next) => {
	try {
		const { id } = req.params; // user id 
		const data = req.user;
		const userBody = req.body;

		const permission = (data.id === id && roles.can(data.role).updateOwn('profile').granted) ? roles.can(data.role).updateOwn('profile') : roles.can(data.role).updateAny('profile');

		if(permission.granted) {
			if (userBody.username) {
				res.status(405).json({
					message: 'You cannot update your username.'
				});
			}

			const user = await Users.update(id, userBody);

			if(user) {
				res.status(201).json({
					data: user,
					message: 'User has been updated'
				});
			} else {
				res.status(500).json({
					message: 'Fail...'
				});
			}
		}
	} catch (error) {
		next(error.message);
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
		uploadPath = process.cwd() + '/api/uploads/' + sampleFile.name;
		const extensionName = nodePath.extname(sampleFile.name);
		const allowedExtension = ['.png', '.jpg', '.jpeg'];

		if(!allowedExtension.includes(extensionName)) {
			return res.status(422).json({
				message: 'Invalid file'
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

