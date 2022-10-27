const User = require('./User');
const Event = require('./Event');
const Comment = require('./Comment');
const Category = require('./Category');
const Participant = require('./Participant');

User.hasMany(Event,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE'

});
Category.hasMany(Event,{
    foreignKey: 'category_id',
    onDelete: 'CASCADE'

});
Event.belongsTo(Category, {
    foreignKey: 'event_id',
    onDelete: 'CASCADE'
  });

Event.belongsToMany(User, {
    // Define the third table needed to store the foreign keys
    through: {
      model: Participant,
      unique: true,
      
    },
    foreignKey: 'event_id',
    otherKey: 'user_id'


});
User.belongsToMany(Event, {
    // Define the third table needed to store the foreign keys
    through: {
      model: Participant,
      unique: true,
    },
    foreignKey: 'user_id',
    otherKey: 'event_id'


});
module.exports = {User, Event, Participant, Category};
