// module.exports = (sequelize, DataTypes) => {
//   const Note = sequelize.define('Note', {
//     text: DataTypes.STRING,
//   }, {
//     tableName: 'note',
//     classMethods: {
//       associate(models) {
//         // associations can be defined here
//       },
//     },
//   });
//   return Note;
// };

module.exports = (sequelize, DataTypes) => {
  const note = sequelize.define('note', {

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

  return note;
};
