import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
    courseID: {type: mongoose.Schema.Types.ObjectID,
        ref: 'Course',
        required: true
    },
    userID: {
        type: String,
        ref: 'User',
        required: true
    },
    amount: {type: Number, required: true},
    status: {type: String, enum: ['pending', 'completed', 'failed'], default: 'pending'}
}, {timestamps: true});

export const Purchase = mongoose.model('Purchase', PurchaseSchema)