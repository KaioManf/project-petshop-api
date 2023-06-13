module.exports = (sequelize, Sequelize) => {
  const service = sequelize.define("service", {
    service_type: {
      type: Sequelize.STRING,
    },
    animal: {
      type: Sequelize.STRING,
    },
    scheduled_date: {
      type: Sequelize.STRING,
    },
  })

  return service
}