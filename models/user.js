module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING.BINARY,
      allowNull: true,
    },
    theme: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    retriever: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    retrieverDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'users',
    timestamps: true,
  });
  user.associate = (models) => {
    user.hasMany(models.post, {
      onDelete: 'cascade',
    });
    user.hasMany(models.comment, {
      onDelete: 'cascade',
    });
    user.hasMany(models.tagpro);
    user.hasMany(models.event);
    user.hasMany(models.report, {
      onDelete: 'cascade',
    });
  };
  return user;
};
