import * as mongoose from 'mongoose';

interface IItem {
	_id: string;
  description: string;
  pic?: string; // url for image
}

const ItemSchema = new mongoose.Schema({
	description: String
});

const ItemModel = mongoose.model('Item', ItemSchema);

export { ItemModel, IItem }