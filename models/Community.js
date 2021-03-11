
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  
  const Community = sequelize.define('community', {
    name : DataTypes.STRING,
    owner_id : DataTypes.INTEGER,
      },{underscored: true}
    );
    
  Community.associate = (models) => {
    Community.belongsToMany(models.User, {through: models.Subscription});
  }

  return Community
}