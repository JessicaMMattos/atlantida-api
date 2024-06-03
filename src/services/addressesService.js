import AddressRepository from '../repositories/addressRepository.js';
import logger from '../utils/logger.js';

class AddressesService {
 static async findAddressById(id) {
    logger.info('AddressesService.findAddressById');
    return await AddressRepository.findById(id);
 }

 static async createAddress(addressData) {
    logger.info('AddressesService.createAddress');
    return await AddressRepository.create(addressData);
 }

 static async updateAddress(id, updateData) {
    logger.info('AddressesService.updateAddress');
    return await AddressRepository.updateById(id, updateData);
 }

 static async deleteAddress(id) {
    logger.info('AddressesService.deleteAddress');
    return await AddressRepository.deleteById(id);
 }
}

export default AddressesService;
