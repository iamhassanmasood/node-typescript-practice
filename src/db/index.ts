import mongoose, { ConnectOptions } from 'mongoose';

type DbInput = {
  db: string;
};

export default ({ db }: DbInput): void => {
  const connect = (): Promise<void> => {
    return mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => {
        console.info(`✅ Successfully connected to ${db}`);
      })
      .catch((error) => {
        console.error('❌ Error connecting to the database: ', error);
        process.exit(1);
      });
  };

  connect();

  mongoose.connection.on('disconnected', connect);
};
