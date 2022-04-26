module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
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
