# Auth RBAC backend project

## Project Description
This is a backend CRUD API that includes a simple user signup and signin feature that is token secured. Signed in users can create posts and comment on posts. There is also a simple role based access control system with three levels of access: reader, moderator and editor. This project is intended to be used as a backend to any frontend project. It was also made to be used as a template or starting point for projects that use similar features it currently posesses, so it can be stripped down or built further on.

### What it is made from
The project is built on Node.js and uses Express.js for http routes. There is an SQLite3 database that uses Knex.js as the query builder. Tokenization is provided by jsonwebtoken and encryption is provided by bcryptjs. The role based access control is provided by accesscontrol. 

### Why did I build it this way?
I chose my stack because of my exposure to these technologies from self teaching and from bootcamps I attended.

### Challenges 
The challenges I faced when doing this project were mostly figuring out and planning the database schema on the planned user experience. After that, planning my project file structure, which I appreciate now. The last of my challenges was making sure to be aware if I am getting in the weeds when I find a technology I have not used before and decide to test and as I consider implementing it. I lost a lot of time but enjoyed the experience. 

## Installation 
Clone or fork it, run server (npm run server), test with Postman or your preferred API testing platform. Make sure to have a bash terminal with node and npm installed. You will also need to have a database softwrae installed. I used DB Browser for SQLite as my local database. 

### How to use it
If you install it locally, you will need to use an API testing software so you can make POST, PUT and DELETE requests. Once installed on your computer, from your terminal, execute `npm run server` and the server will start on port 5000. From here, you can load the endpoints in your API testing software. 

## Endpoints 
#### Auth
| Method  | Endpoint | Fields | Description | 
| ------------- | ------------- | ------------- | ------------- |
| POST  | /api/auth/register  | username (str), email (str), password (str), confirm_password (str), role (null) | Signup |
| POST   | /api/auth/login  | username (str), password (str) | Signin |
| POST   | /api/auth/refresh_token  | token (str) or refreshToken (str) | Refresh Token |
| POST   | /api/auth/check_token  | token (str) or refreshToken (str) | Check token |
| DELETE  | /api/auth/logout  | username (str) | Signout |
* role is automatically included in the request body of /register, then assigned `reader` once you signin.

##### Request body
| Endpoint  | Required fields |
| ------------- | ------------- | 
| /api/auth/register | username (str), email (str), password (str), l  |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

#### Users
| Method  | Endpoint | Fields | Description |
| ------------- | ------------- | ------------- | ------------- |
| GET  | /api/users  | none | Get all users | 
| GET  | /api/users/:id  | param: user id (int) | Get user by id |
| PUT  | /api/users/:id  | param: user id (int) | Edit user |
| DELETE  | /api/users/:id  | param: user id (int) | Delete user | 
| PUT  | /api/users/:id/upload  | param: user id (int) | Upload avatar | 
| GET  | /api/users/:id/upload  | param: user id (int) | Get avatar | 
| PATCH  | /api/users/:id/upload  | param: user id (int) | Remove avatart | 

##### Request body
| Method  | Endpoint | Required Fields |
| ------------- | ------------- | ------------- |
| GET  | /api/users  | none |
| GET  | /api/users/:id  | none |
| PUT  | /api/users/:id  | username (str), email (str), password (str) all optional |
| DELETE  | /api/users/:id  | none |
| PUT  | /api/users/:id/upload  | file: .png, jpg, .jpeg |
| GET  | /api/users/:id/upload  | none |
| PATCH  | /api/users/:id/upload  | none |

#### Posts
| Method  | Endpoint | Fields | Description |
| ------------- | ------------- | ------------- | ------------- |
| GET  | /api/posts  | none | Get all posts |
| GET  | /api/posts/:id  | param: post id (int) | Get post by id |
| POST  | /api/posts/:id  | param: user id (int) | Create post |
| PUT  | /api/posts/:id  | param: post id (int) | Edit post |
| DELETE  | /api/posts/:id  | param: post id (int) | Delete post |

##### Request body
| Method  | Endpoint | Required Fields |
| ------------- | ------------- | ------------- |
| GET  | /api/posts  | none |
| GET  | /api/posts/:id | none |
| POST  | /api/posts/:id  | post_title (str), post_body (str) |
| PUT  | /api/posts/:id  | post_title (str), post_body (str) optional |
| DELETE  | /api/posts/:id  | none |


#### Comments
| Method  | Endpoint | Fields | Description | 
| ------------- | ------------- | ------------- | ------------- |
| GET  | /api/comments  | none | Get all comments |
| GET  | /api/comments/:id  | param: comment id (int) | Get comment by id |
| POST  | /api/comments/:id  | param: user_id (int) | Comment on a post |
| PUT  | /api/comments/:id  | param: comment id (int) | Edit comment |
| DELETE  | /api/comments/:id  | param: comment id (int) | Delete comment |

##### Request body
| Method  | Endpoint | Required Fields |
| ------------- | ------------- | ------------- |
| GET  | /api/comments  | none |
| GET  | /api/comments/:id  | none |
| POST  | /api/comments/:id   | post_id (int), body (str) |
| PUT  | /api/comments/:id   | post_id (int), body (str) optional |
| DELETE  | /api/comments/:id   | none |

## Database schema 
#### Users 
| field  | data type | metadata
| ------------- | ------------- | ------------- |
| id  | int  | primary key |
| username  | str  | unique, not null |
| email  | str  | unique, not null |
| password  | str  | unique, not null |
| confirm_password  | str  | unique, not null |
| image_path  | bin  | none |
| role  | str  | none |

#### Posts
| field  | data type | metadata
| ------------- | ------------- | ------------- |
| id  | int  | primary key |
| post_title  | str  | none |
| post_body  | str  | none |
| user_id  | int  | foreign key |

#### Comments 
| field  | data type | metadata
| ------------- | ------------- | ------------- |
| id  | int  | primary key |
| user_id  | int  | foreign key |
| post_id  | int | foreign key |
| body  | str  | none |

### Dependencies 
The following is a quick breakdown of the included dependencies:

* express - provides http, routing and much more. click [here](https://expressjs.com/) for more details. 
* sqlite3 - lightweight SQL module for the project data. click [here](https://www.npmjs.com/package/sqlite3) for more details. 
* knex - query builder used in conjunction with sqlite3. click [here](https://knexjs.org/#Installation) for more details. 
* knex-cleaner - helper library used as the first seed in my list of seed files. click [here](https://www.npmjs.com/package/knex-cleaner) for more details. 
* express-session - session management middleware. click [here](http://expressjs.com/en/resources/middleware/session.html) for more details.
* connect-session-knex - session storage system click [here](https://www.npmjs.com/package/connect-session-knex) to learn more about it.
* express-validator - input validator and sanitizer middleware. click [here](https://express-validator.github.io/docs/) for more details. 
* jsonwebtoken - web token middleware that further makes authentication sessions more secure. click [here](https://www.npmjs.com/package/jsonwebtoken) for more details. 
* jwt-decode - used to decode the jsonwebtoken at certain points of the project. click [here](https://www.npmjs.com/package/jwt-decode) to read about it.
* bcryptjs - used to hash passwords makes them a bit more secure. click [here](https://www.npmjs.com/package/bcryptjs) for more details. 
* accesscontrol - role based access control system used to restrict actions on posts, comments and user profiles, depending on whether a user is a reader, moderator or editor. click [here](https://onury.io/accesscontrol/) to learn more.
* helmet - middleware used for add security to the http headers. click [here](https://www.npmjs.com/package/helmet) for more details.
* cors - middleware used to enable CORS on the project and prevent errors triggering from resource traffic in and out of the project. click [here](https://www.npmjs.com/package/cors) for more details.
* nodemon - helper module that will keep your server up and alert you to any problems that caused the server to crash. click [here](https://www.npmjs.com/package/nodemon) for more details. 
* dotenv - this helper loads environment variables from ==process.env== and makes referencing them more secure. click [here](https://www.npmjs.com/package/dotenv?activeTab=readme) for more details.
* jest - testing framework used to test the endpoints. click [here](https://jestjs.io/docs/getting-started) for more details. 
* supertest - http assertion library, used in combination with jest. click [here](https://www.npmjs.com/package/supertest) for more details.
* cross-env - helper module that provides cross platform functionality for setting environment variables. click [here](https://www.npmjs.com/package/cross-env) for more details. 
* express-fileupload - file upload service to allow users to upload a profile avatar. click [here](https://www.npmjs.com/package/express-fileupload) for more details. 
* eslint - linting system to ensure that code is well formed. click [here](https://www.npmjs.com/package/eslint) to read about it. 
* eslint-config-google - supplemental linting dependency. click [here](https://www.npmjs.com/package/eslint-config-google) to learn more about it.

## Unfinished Business 
This section is included to inform you of what I started and did not finish or what was not implemented that I meant to add. 
- Session management
- Protection against XXS 
- File upload 
- Request that uses JOIN to gather user, post and comment data in one call. 
- Signing JWT using RSA key 
- API key generator 
