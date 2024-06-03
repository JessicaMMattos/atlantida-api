import mongoose from 'mongoose';

const connectToDB = async () => {
 try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mongodb-atlantida';

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB!');
 } catch (error) {
    console.error('Erro na conexão com o MongoDB:', error);
 }
};

export default connectToDB;
