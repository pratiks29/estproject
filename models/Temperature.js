import mongoose from 'mongoose';

const TemperatureSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Temperature || mongoose.model('Temperature', TemperatureSchema);
