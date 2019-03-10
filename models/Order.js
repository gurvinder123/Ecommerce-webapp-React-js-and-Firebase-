const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  ID: {
      type: String,
      default: ''
  },

  userID: {
      type: String,
      default: ''
  },

  products: {
      type: Array,
      default: []
  },

  totalPrice: {
      type: String,
      default: ''
  },

  orderDate: {
      type: String,
      default: ''
  },

  shipDate: {
      type: String,
      default:''
  },
  paymentType: {
      type: String,
      default: ''
  },

  shippingFee: {
      type: String,
      default: ''
  }
});

module.exports = mongoose.model('Order', OrderSchema);
