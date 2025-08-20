import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUserFromSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password -__v");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error fetching users from sidebar:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: userToChatId },
        { sender: userToChatId, receiver: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "messages",
      });
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message({
      senderId,
      receiverId,
      text,
      image: imageUrl || null,
    });

    await newMessage.save();

    // todo: real-time message sending logic =>using socket.io
    // Emit the new message to the receiver via socket.io (not implemented here)

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
