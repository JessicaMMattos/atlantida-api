import AddressesService from '../services/addressesService.js';

class AddressesController {
 static async findAdressByUserId(req, res) {
  try {
    const { userId } = req.params;
    const addresses = await AddressesService.findAddressByUserId(userId);
    if (addresses.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(addresses);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
 }

 static async createAddress(req, res) {
    try {
      const newAddress = await AddressesService.createAddress(req.body);
      return res.status(201).set('Location', `/api/Addresses/${newAddress._id}`).json(newAddress);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
 }

 static async updateAddress(req, res) {
    try {
      const updatedAddress = await AddressesService.updateAddress(req.params.id, req.body);
      if (!updatedAddress) {
        return res.status(404).json({ message: 'Endereço não encontrado' });
      }
      return res.status(200).json(updatedAddress);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
 }

 static async deleteAddress(req, res) {
    try {
      await AddressesService.deleteAddress(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
 }
}

export default AddressesController;
