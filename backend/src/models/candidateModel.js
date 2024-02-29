import mongoose from "mongoose";

const candidateModel = mongoose.Schema({
  name:{
    type:String,
    required:[true,'Name of the candidate is required']
  },
  party:{
    type:String,
    required:[true,'Representing party is required']
  },
  constituency:{
    type:String,
    required:[true,'Constituency of candidate is required']
  },
  voters: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],

  history:{
    type:String,
    default:null
  }
});

candidateModel.methods= {
  addVote : function(userId) {
    this.voters.addToSet(userId);
    this.save();
  }
}

export default mongoose.model('Candidate',candidateModel)
