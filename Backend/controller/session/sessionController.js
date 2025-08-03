import { SessionModel } from "../../model/session.js";

// POST method for sessions
export const sessionSaveDraft = async (req, res) => {
    try {
        const { sessionId, title, description ,tags, json_file_url, difficulty} = req.body;
        if (!title || !json_file_url) {
            return res.status(400).json({ message: "Title and JSON File URL are required." });
        }

        const tagList = tags.split(",").map((tag) => tag.trim()).filter(Boolean) || [];
        let session;

        if (sessionId) {
            session = await SessionModel.findOneAndUpdate(
                { _id: sessionId },
                {
                    title : title,
                    description : description,
                    tags: tagList,
                    json_file_url : json_file_url,
                    status: "draft",
                    difficulty : difficulty,
                }, { new: true })
        } else {
            session = await SessionModel({
                user_id: req.user.id,
                title,
                description,
                tags: tagList,
                json_file_url,
                difficulty,
                status: "draft"
            })
            await session.save();
        }
        res.status(200).json({ message: "Draft saved successfully", session });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

// For publish session

export const publishSession = async (req, res) => {
    try {
        const { sessionId, title, description ,  tags, json_file_url , difficulty } = req.body;
        if (!title || !json_file_url) {
            return res.status(400).json({ message: "Title and JSON File URL are required." });
        }

        const tagList = tags.split(",").map((tag) => tag.trim()).filter(Boolean) || []
        let session;

        if (sessionId) {
            session = await SessionModel.findOneAndUpdate(
                { _id: sessionId },
                {
                    title : title,
                    description : description,
                    tags: tagList,
                    json_file_url : json_file_url,
                    status: "published",
                    difficulty : difficulty,
                }, { new: true }
            );
        } else {
            session = await SessionModel({
                user_id: req.user.id,
                title,
                description,
                tags: tagList,
                json_file_url,
                difficulty,
                status: "published"
            })
            await session.save();

        }
        res.status(200).json({ message: "Session published successfully", session });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}
// Delete method 

export const deleteSessions = async(req , res) => {
    try {
        const { id } = req.params;
    
        const deletedSession = await SessionModel.findByIdAndDelete(id);
    
        if (!deletedSession) {
          return res.status(404).json({ message: 'Session not found' });
        }
    
        res.status(200).json({ message: 'Session deleted successfully', session: deletedSession });
      } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

// Get method controller 

// get all session 
export const getAllSession = async (req , res) => {
    try {
        const publishedSession = await SessionModel.find({status : "published"}).sort({ createdAt : -1 });
        res.status(200).json({ message : "Published session" , publishedSession : publishedSession})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}


export const getMySession = async (req , res) => {
    try {
        const MySessions = await SessionModel.find({ user_id : req.user.id }).sort({ updated_at : -1 });
        res.status(200).json({ message : "my all sessions" , mySessions : MySessions})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}


export const getOneSession = async (req , res) => {
    try {
        const { id } = req.params;

        const oneSession = await SessionModel.findOne({ _id : id , user_id : req.user.id})

        if (!oneSession) {
            return res.status(404).json({ message: "Session not found or unauthorized" });
        }
        res.status(200).json({ message : "selected sessions" , sessions : oneSession})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}