module.exports = (sequelize, Sequelize) => {
  const animal = sequelize.define("animal", {
    name: {
      type: Sequelize.STRING,
    },
    breed: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    weight: {
      type: Sequelize.FLOAT,
    },
    owner_name: {
      type: Sequelize.STRING,
    },
    is_vacinated: {
      type: Sequelize.STRING,
    },
  })

  return animal
}