import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { socketConnectionRequest } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../slices/constants";

const ChatBox = ({ userName = "Anil Kumar" }) => {
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state?.user || {});
  const selectedConnection = useSelector((state) => state.allConnections?.selectedConnection);
  const { targetUserId } = useParams(); // ✅ fixed typo
  const [input, setInput] = useState("");
  const userId = user?._id;
  const sendMessage = () => {
    if (!input.trim()) return;
    const socket = socketConnectionRequest();
    socket.emit("sendMessage", { userId, targetUserId, text: input });
    // setMessages(prev=>[...prev, { from: "me", text: input }]);
    setInput("");
  };
  const getChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    console.log("getChatMessages==>", { chat });
    const chatMsg = chat?.data?.messages?.map((item) => ({
      userId: item?.senderId?._id,
      text: item?.text,
    }));
    setMessages(chatMsg);
  };
  useEffect(() => {
    getChatMessages();
  }, []);
  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = socketConnectionRequest();

    socket.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });
    socket.on("messageRecieved", ({ from, userId, targetUserId, text }) => {
      setMessages((prev) => [...prev, { userId, targetUserId, text }]);
    });
    return () => {
      console.log("socket disconnected.....");
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col h-[80vh] w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white font-semibold flex items-center justify-between">
          <h2 className="text-lg">{selectedConnection?.firstName}</h2>
          <div className="flex gap-2 items-center">
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-100">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg?.userId === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
                  msg?.userId === userId
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-white flex items-center border-t border-gray-200">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-95 transition duration-150"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
