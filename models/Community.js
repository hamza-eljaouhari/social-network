
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  
  const Community = sequelize.define('community', {
    name : DataTypes.STRING,
created_at : DataTypes.DATE,
updated_at : DataTypes.DATE,
owner_id : DataTypes.INTEGER,

      },{underscored: true}
    );

    
    

  Community.associate = (models) => {
      Community.belongsTo(models.User) 
 
  }    
  return Community
}