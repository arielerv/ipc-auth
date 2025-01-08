import { model, models, Schema, Types } from 'mongoose';

const workloadLogsSchema = {
    _id: { type: Types.ObjectId },
    userId: { type: String },
    day: { type: Number },
    month: { type: Number },
    year: { type: Number },
    workload: { type: String },
    syncLogId: { type: Types.ObjectId, ref: 'SyncLog' },
    responseSurveys: { type: String },
    referenceSurveys: { type: String },
    priceTypes: { type: String },
    formRejections: { type: String },
    priceVariation: { type: String },
};

const customSchema = new Schema(workloadLogsSchema, {
    collection: 'workloadLogs',
    timestamps: true,
    versionKey: false,
});

const customModel = models.Team || model('WorkloadLog', customSchema);

export default customModel;
