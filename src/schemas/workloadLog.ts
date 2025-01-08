import { model, models, Schema, Types } from 'mongoose';

const workloadLogsSchema = {
    _id: { type: Types.ObjectId },
    userId: { type: String },
    day: { type: Number },
    month: { type: Number },
    year: { type: Number },
    syncLogId: { type: Types.ObjectId, ref: 'SyncLog' },
    workload: { type: String },
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

const customModel = models.WorkloadLog || model('WorkloadLog', customSchema);

export default customModel;
