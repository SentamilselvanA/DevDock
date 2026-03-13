import mongoose from 'mongoose';

const connectDB = async () => {
  let retries = 5;
  const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/devvault';
  
  const attemptConnection = async () => {
    try {
      await mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });

      console.log('✅ MongoDB connected successfully');
      return mongoose.connection;
    } catch (error) {
      retries--;
      if (retries > 0) {
        console.log(`⏳ Connection failed, retrying... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        return attemptConnection();
      } else {
        console.error('❌ MongoDB connection error:', error.message);
        console.error('⚠️ Using in-memory data. Install MongoDB or set MONGODB_URI to MongoDB Atlas');
        return null;
      }
    }
  };

  return attemptConnection();
};

export default connectDB;
