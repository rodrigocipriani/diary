module.exports = (sequelize, DataTypes) => {
  const NoteModel = sequelize.define('NoteModel', {

    id: {
      type: DataTypes.INTEGER,
      underscored: true,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      underscored: true,
    },
    createAt: {
      type: DataTypes.DATE,
      underscored: true,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'note',
  });

  /*
  NoteModel.associate = (models) => {
    NoteModel.belongsToMany(models.Team, {
      through: 'member',
      foreignKey: 'userId',
    });
  };
  */

  return NoteModel;
};
