module.exports = (sequelize, Sequelize) => {
    const Issue = sequelize.define("issues", {
      label: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.STRING
      }
    });
  
    return Issue;
  };