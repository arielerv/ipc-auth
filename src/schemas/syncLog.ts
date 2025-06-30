import { model, models, Schema, Types } from 'mongoose';

const syncLogsSchema = {
    _id: { type: Types.ObjectId },
    userId: { type: String },
    day: { type: Number },
    month: { type: Number },
    year: { type: Number },
    surveys: { type: String },
    progress: { type: String },
    username: { type: String },
    name: { type: String },
    packageName: { type: String },
    panels: { type: [Number] },
};

const customSchema = new Schema(syncLogsSchema, {
    collection: 'syncLogs',
    timestamps: true,
    versionKey: false,
});

const customModel = models.Team || model('SyncLog', customSchema);

export default customModel;
