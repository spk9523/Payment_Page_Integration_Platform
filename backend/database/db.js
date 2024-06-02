import { connect } from "mongoose";

const connectToMongo = async () => {
  try {
    await connect(
      `mongodb+srv://paymentprakash:${process.env.DB_PASSWORD}@firstatlasdatabase.mziskgy.mongodb.net/paymentgateway`
    );
    console.log("---***Database Connected Successfully***---");
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongo;
