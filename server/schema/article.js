/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('article', {
    id: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    classification: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Creation_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    title: {
      type: DataTypes.CHAR(50),
      allowNull: false
    }
  }, {
    tableName: 'article'
  });
};
