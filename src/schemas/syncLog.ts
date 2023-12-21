import { model, models, Schema, Types } from 'mongoose';

const syncLogsSchema = {
    _id: { type: Types.ObjectId },
    userId: { type: String },
    day: { type: Number },
    month: { type: Number },
    year: { type: Number },
    surveys: { type: String },
};

const customSchema = new Schema(syncLogsSchema, {
    collection: 'syncLogs',
    timestamps: true,
    versionKey: false,
});

const customModel = models.Team || model('Log', customSchema);

export default customModel;
