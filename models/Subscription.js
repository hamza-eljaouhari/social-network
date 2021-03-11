
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  
  const Subscription = sequelize.define('subscription', {
        created_at : DataTypes.DATE,
        updated_at : DataTypes.DATE,
        user_id : DataTypes.INTEGER,
        community_id : DataTypes.INTEGER,
      },{underscored: true}
    );

  Subscription.associate = (models) => {
    Subscription.belongsTo(models.User) 
    Subscription.belongsTo(models.Community) 
  }
  
  return Subscription;
}