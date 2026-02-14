
import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    volunteers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed'],
        default: 'upcoming',
    }
}, {
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
