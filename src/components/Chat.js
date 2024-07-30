import { useEffect, useState, useRef } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from "../firebase-config"; // Ensure the correct file extension for your configuration
import "../styles/Chat.css"; // Import the CSS file for styling

export const Chat = (props) => {
  const { room } = props; // Destructure room from props
  const [newMessage, setNewMessage] = useState(""); // State for the new message input
  const [messages, setMessages] = useState([]); // State to store the messages

  const messagesRef = collection(db, "messages"); // Reference to the messages collection in Firestore
  const messagesEndRef = useRef(null); // Reference to the end of the messages container

  useEffect(() => {
    // Query messages from Firestore where the room matches and order by creation time
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    
    // Subscribe to changes in the messages collection
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id }); // Push each message along with its id
      });

      setMessages(messages); // Update the messages state
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [room]); // Dependency array includes room to re-run effect when room changes

  useEffect(() => {
    // Scroll to the bottom of the messages container when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return; // Do nothing if the new message is empty

    // Add a new message to the Firestore collection
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage(""); // Clear the new message input
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room}</h1> {/* Display the current chat room */}
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <span className="user">{message.user}</span> {/* Display the user */}
            {message.text} {/* Display the message text */}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Empty div to scroll into view */}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message here. . ."
          onChange={(e) => setNewMessage(e.target.value)} // Update the new message state on input change
          value={newMessage} // Bind the input value to the new message state
        />
        <button type="submit" className="send-button">Send</button> {/* Submit button to send the message */}
      </form>
    </div>
  );
};
