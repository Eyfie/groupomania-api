module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
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
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
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
    //* TODO Change rank to role in doc (type string)
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
  User.associate = (models) => {
    User.hasMany(models.Post, {
      onDelete: 'cascade',
    });
    User.hasMany(models.Comment, {
      onDelete: 'cascade',
    });
    User.hasMany(models.Tagpro);
    User.hasMany(models.Event);
    User.hasMany(models.Report, {
      onDelete: 'cascade',
    });
  };
  return User;
};
