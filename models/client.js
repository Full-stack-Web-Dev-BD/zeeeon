const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	about: {
		type: String,
		required: true
	},
	validity: {
		type: Date,
		required: true
	}
})
const clientModel = mongoose.model('client', clientSchema);
module.exports= clientModel