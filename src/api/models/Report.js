module.exports = (sequelize) => {
  const Report = sequelize.define('Report', {});
  Report.associate = (models) => {
    Report.belongsTo(models.User, {
      allowNull: false,
    });
    Report.belongsTo(models.Post, {
      allowNull: true,
    });
    Report.belongsTo(models.Comment, {
      allowNull: true,
    });
  };
  return Report;
};
