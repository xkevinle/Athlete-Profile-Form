import { connect, model, Schema, Model, Document, Types } from 'mongoose';


const MONGO_URI = 'mongodb+srv://opensponsorship:OfFnd5tYHquW6PNK@cluster0.uvftduh.mongodb.net/?retryWrites=true&w=majority';

connect(MONGO_URI, {
  dbName: 'atheleteProfiles'
})
  .then(() => console.log('Connected to MongoDB.'))
  .catch(err => console.log(err))

interface IProfileSchema extends Document {
  firstName: string;
  lastName: string;
  sports: string[];
  gender: string;
  dob: Date;
  interests: string;
  location: string;
  team: string;
}

const ProfileSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  sports: { type: [String], required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  interests: { type: String, required: true },
  location: { type: String, required: true },
  team: { type: String, required: true },
});

const Profile: Model<IProfileSchema> = model<IProfileSchema>('Profile', ProfileSchema);

export default Profile;
