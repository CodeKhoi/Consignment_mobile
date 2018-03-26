module.exports = function(sequelize, DataTypes) {
  var Consignment = sequelize.define("Consignment", {
    item_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    item_qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isDecimal: true,
      }
    },
    consignment_received: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isDecimal: true,
      }
    },    
  });
  return Consignment;
};

