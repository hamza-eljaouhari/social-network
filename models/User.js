
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function EmailAlreadyTakenException(message){
  this.message = message;
  this.name = "EmailAlreadyTakenException"
}

function WrongPasswordOrUsernameException(message){
  this.message = message;
  this.name = "WrongPasswordOrUsernameException"
}


module.exports = (sequelize, DataTypes) => {
  
  const User = sequelize.define('user', {
      username : DataTypes.STRING,
      email : DataTypes.STRING,
      password : DataTypes.STRING,
    },{underscored: true}
  );

    User.signIn = async (email,password) => {
      let user = await User.findOne({where : { email : email}})
      if(!user) throw new WrongPasswordOrUsernameException('Wrong email or password');
  
      let status = await bcrypt.compare(password,user.toJSON().password)
      if(!status) throw new WrongPasswordOrUsernameException('Wrong email or password');
  
      let token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_ENCRYPTION, { expiresIn: process.env.JWT_EXPIRATION });
      return ({ user: { id: user.id, username: user.username, email: user.email }, access_token: token })
    };
    User.signUp = async (name,email,password) => {
      let user = await User.findOne({ where: { email: email } })
      if (user) throw new EmailAlreadyTakenException('Email already taken'); 
  
      const encryptedPass = await bcrypt.hash(password, parseInt(process.env.JWT_SALT))
      user = await User.create({  
                                email: email, 
                                username: name, 
                                password: encryptedPass,
                              })
      const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_ENCRYPTION, { expiresIn: process.env.JWT_EXPIRATION });
      return ({ user: { id: user.id, username: user.username, email: user.email }, access_token: token })
    }

  User.associate = (models) => {
    User.belongsToMany(models.Community, {through: models.Subscription});
  }    
  return User
}