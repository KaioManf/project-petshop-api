module.exports = (sequelize, Sequelize) => {
  const serviceType = sequelize.define("serviceType", {
    name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.STRING,
    },
    duration: {
      type: Sequelize.STRING,
    },
  })

  return serviceType
}