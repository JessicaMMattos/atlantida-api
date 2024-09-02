import express from "express";
import AddressController from '../controllers/addressesController.js';

const adressesRoutes = express.Router();

adressesRoutes
  .get('/addresses/user/:userId', AddressController.findAdressByUserId)
  .post('/api/addresses', AddressController.createAddress)
  .put('/api/addresses/:id', AddressController.updateAddress)
  .delete('/api/addresses/:id', AddressController.deleteAddress);

export default adressesRoutes;
