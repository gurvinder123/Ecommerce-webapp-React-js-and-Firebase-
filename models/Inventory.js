const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  productID:{
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Inventory',InventorySchema);
