module.exports = (sequelize, DataTypes) => {
  const report = sequelize.define('report', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  }, {
    tableName: 'reports',
    timestamps: false,
  });
  report.associate = (models) => {
    report.belongsTo(models.user, {
      allowNull: false,
    });
    report.belongsTo(models.post, {
      allowNull: true,
    });
    report.belongsTo(models.comment, {
      allowNull: true,
    });
  };
  return report;
};
