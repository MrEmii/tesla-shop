import mongoose, { Schema, Model, model } from 'mongoose';
import { Product } from '../interfaces';

const productSchema = new Schema(
  {
    description: {
      type: String,
      required: true
    },
    images: [{ type: String }],
    inStock: {
      type: Number,
      required: true,
      default: 0
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    sizes: [
      {
        type: String,
        enum: {
          values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
          message:
            'enum validator failed for path `{PATH}` with value `{VALUE}`'
        }
      }
    ],
    slug: {
      type: String,
      required: true,
      unique: true
    },
    tags: [
      {
        type: String
      }
    ],
    title: {
      type: String,
      required: true
    },
    type: [
      {
        type: String,
        enum: {
          values: ['shirts', 'pants', 'hoodies', 'hats'],
          message:
            'enum validator failed for path `{PATH}` with value `{VALUE}`'
        }
      }
    ],
    gender: {
      type: String,
      enum: {
        values: ['men', 'women', 'kid', 'unisex'],
        message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
      }
    }
  },
  {
    timestamps: true
  }
);

productSchema.index({ title: 'text', tags: 'text' });

const ProductModel: Model<Product> =
  mongoose.models.Product || model('Product', productSchema);

export default ProductModel;
