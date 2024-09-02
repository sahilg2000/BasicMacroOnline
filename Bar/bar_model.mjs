import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Bar data is accessed now...");
});

/**
 * Define the bar schema
 */
const barSchema = mongoose.Schema({
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
    proteins: { type: Number, required: true },
    max: { type: Number, required: true }
});


/**
 * Compile the models from the schemas. This must be done after defining the schema.
 */
const Bar = mongoose.model("Bar", barSchema);

const findBarbyId = async (_id) => {
    const query = Bar.findById(_id);
    return query.exec()
}

const updateBar = async(_id, update) => {
    const result = await Bar.replaceOne(_id, update);
    return result.modifiedCount;
};



export{ findBarbyId, updateBar };
