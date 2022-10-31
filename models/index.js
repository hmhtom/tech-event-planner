const User = require("./User");
const Event = require("./Event");
const Comment = require("./Comment");
const Category = require("./Category");
const Participant = require("./Participant");

User.hasMany(Event, {
  foreignKey: "user_id",
  as: "created",
  onDelete: "CASCADE",
});
Event.belongsTo(User, {
  foreignKey: "user_id",
  as: "creator",
  onDelete: "CASCADE",
});
Category.hasMany(Event, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});
Event.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

User.belongsToMany(Event, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Participant,
    unique: true,
  },
  foreignKey: "user_id",
  as: "attend",
  otherKey: "event_id",
});

Event.belongsToMany(User, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Participant,
    unique: true,
  },
  foreignKey: "event_id",
  as: "attendee",
  otherKey: "user_id",
});

module.exports = { User, Event, Participant, Category };
