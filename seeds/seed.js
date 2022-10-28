const sequelize = require('../config/connection');
const { User, Event, Category, Participant } = require('../models');

const userData = require('./userData.json');
const eventData = require('./eventData.json');
const categoryData = require('./categoryData.json');
const participantData = require('./participantData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
   await Event.bulkCreate(eventData, {
        returning: true,
    });
     
     

 await Category.bulkCreate(categoryData, {
  
    returning: true,
     });
await Participant.bulkCreate(participantData, {
  
    returning: true,
     });

  process.exit(0);
};

seedDatabase();