/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tabs', {
    id: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      primaryKey: true
    },
    article_id: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'tabs'
  });
};
