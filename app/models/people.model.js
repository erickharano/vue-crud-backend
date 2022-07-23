module.exports = (sequelize, Sequelize) => {
  const People = sequelize.define("people", {
    name: {
      type: Sequelize.STRING
    },
    birth: {
      type: Sequelize.DATE
    }
  });
  
  return People;
};