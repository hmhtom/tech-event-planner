const sequelize = require('../config/connection');
const { User, Event, Category, Participant } = require('../models');

const userData = require('./userData.json');
const eventData = require('./eventData.json');
const categoryData = require('./categoryData.json');
const participantData = require('./participantData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  for (const event of eventData) {
    await Event.create({
      ...event,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
}
    const category = await Category.bulkCreate(categoryData, {
  
    returning: true,
  });
  const participant = await Participant.bulkCreate(participantData, {
  
    returning: true,
  });

  process.exit(0);
};

seedDatabase();