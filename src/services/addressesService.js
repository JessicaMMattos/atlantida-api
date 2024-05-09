import AddressRepository from '../repositories/addressRepository.js';

class AddressesService {
 static async findAddressById(id) {
    return await AddressRepository.findById(id);
 }

 static async createAddress(addressData) {
    return await AddressRepository.create(addressData);
 }

 static async updateAddress(id, updateData) {
    return await AddressRepository.updateById(id, updateData);
 }

 static async deleteAddress(id) {
    return await AddressRepository.deleteById(id);
 }
}

export default AddressesService;
