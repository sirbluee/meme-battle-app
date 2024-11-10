import mongoose from 'mongoose';

const ScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: Number,
  gameMode: { type: String, enum: ['regular', 'daily'], default: 'regular' },
  captions: [String],
  date: { type: Date, default: Date.now }
});

export default mongoose.models.Score || mongoose.model('Score', ScoreSchema);