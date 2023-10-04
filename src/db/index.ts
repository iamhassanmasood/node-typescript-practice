import mongoose, { ConnectOptions } from 'mongoose';

type DbInput = {
  db: string;
};
export default ({ db }: DbInput) => {
  const connect = () => {
    mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => {
        return console.info(`✅ Successfully connected to ${db}`);
      })
      .catch((error) => {
        console.error('❌ Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
