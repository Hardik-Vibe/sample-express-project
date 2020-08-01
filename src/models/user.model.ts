import * as mongoose from 'mongoose';

export default class UserModel {
    schema: mongoose.Schema<any> = null;
    model: mongoose.Model<mongoose.Document, {}> = null;
    constructor( ) {
        this.schema = new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
                unique: true,
                lowercase: true
            }
        });
        this.model = mongoose.model('users', this.schema);
    }
}