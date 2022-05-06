module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    textcontent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  Event.associate = (models) => {
    Event.hasMany(models.Participant, {
      onDelete: 'cascade',
    });
    Event.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Event;
};
