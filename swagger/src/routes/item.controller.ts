import { ItemModel, IItem } from '../models/item';
import { Controller, Route, Get, Post, BodyProp, Put, Delete } from 'tsoa';

@Route('/item')
export class ItemController extends Controller {
	@Get()
	public async getAll(): Promise<IItem[]> {
		try {
			let items: any = await ItemModel.find({});
			items = items.map((item) => { return {id: item._id, description: item.description}});
			return items;
		} catch (err) {
			this.setStatus(500);
			console.error('Caught error', err);
		}
	}

	@Post()
	public async create(@BodyProp() description: string) : Promise<void> {
		const item = new ItemModel({description: description});
		await item.save();
	}

	@Put('/{id}')
	public async update(id: string, @BodyProp() description: string) : Promise<void> {
		await ItemModel.findOneAndUpdate({_id: id}, {description: description});
	}

	@Delete('/{id}')
	public async remove(id: string) : Promise<void> {
		await ItemModel.findByIdAndRemove(id);
	}
}
