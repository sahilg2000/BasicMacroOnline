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
    console.log("Connected to Macros Data...");
});

/**
 * Define the macros schema
 */
const macroSchema = mongoose.Schema({
    name: { type: String, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
    proteins: { type: Number, required: true }
});


/**
 * Compile the models from the schemas. This must be done after defining the schema.
 */
const Macro = mongoose.model("Macro", macroSchema);

const createMacro = async (name, carbs, fats, proteins) => {
    const macro = new Macro({name: name, carbs: carbs, fats :fats, proteins: proteins});
    return macro.save();
}

const findMacrobyId = async (_id) => {
    const query = Macro.findById(_id);
    return query.exec()
}

const findMacros = async (filter) => {
    const query = Macro.find(filter);
    return query.exec()
}

const updateMacros = async(_id, update) => {
    const result = await Macro.replaceOne(_id, update);
    return result.modifiedCount;
};

const deleteMacroById = async (_id) => {
    const result = await Macro.deleteOne({ _id: _id });
    return result.deletedCount;
};


export{ createMacro, findMacrobyId, findMacros, updateMacros, deleteMacroById };
