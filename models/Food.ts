import mongoose, { Schema, Document, Model } from 'mongoose'

interface FoodDoc extends Document {
    vendorId: string;
    name: string;
    description: string;
    category: string;
    foodType: [string];
    readyTime: number;
    price: number;
    rating: number;
    images: [string];
}

const FoodSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    foodType: { type: [String], required: true },
    readyTime: { type: Number, required: true },
    price: { type: Number, required: true },
    rating: { type: Number },
    vendorId: { type: mongoose.SchemaTypes.ObjectId, required: true },
    images: { type: [String] },
}, {
    toJSON: {
        transform(doc: any, ret: any) {
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
})

const Food = mongoose.model<FoodDoc>('food', FoodSchema);

export { Food };




    