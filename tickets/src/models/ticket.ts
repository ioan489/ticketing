import mongoose, { Schema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

interface TicketDocument extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  orderId?: string;
  version: number;
}

interface TicketModel extends mongoose.Model<TicketDocument> {
  build(attrs: TicketAttrs): TicketDocument;
}

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};
ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

const Ticket = mongoose.model<TicketDocument, TicketModel>(
  'ticket',
  ticketSchema
);

export { Ticket };