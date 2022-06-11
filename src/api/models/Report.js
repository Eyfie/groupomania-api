module.exports = (sequelize) => {
  const Report = sequelize.define('Report', {});
  Report.associate = (models) => {
    Report.belongsTo(models.User, {
      onDelete: 'CASCADE',
    });
    Report.belongsTo(models.Post, {
      onDelete: 'CASCADE',
    });
    Report.belongsTo(models.Comment, {
      onDelete: 'CASCADE',
    });
  };
  return Report;
};
