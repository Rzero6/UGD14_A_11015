import { useEffect, useState } from "react";
import { db, DB_CHAT_KEY } from "../../firebaseConfig";
import { ref, onValue, set, off } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Form, Row, Col, Container } from "react-bootstrap";
import InputForm from "../components/InputForm";
import "./chat.css";
import ChatBubble from "../components/ChatBubble";
export default function GroupChat() {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("userfb");
    if (!userLocalStorage) {
      navigate("/");
    } else {
      const userLocalStorageObject = JSON.parse(userLocalStorage);
      setUser(userLocalStorageObject);

      const dataRef = ref(db, DB_CHAT_KEY);

      const onDataChange = (snapshot) => {
        const newData = snapshot.val();
        if (!Array.isArray(newData)) {
          setChats([]);
        } else {
          setChats(newData);
        }
      };

      onValue(dataRef, onDataChange);

      return () => {
        off(dataRef, onDataChange);
      };
    }
  }, []);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    const newData = chats || [];

    if (message.trim()) {
      const currentDate = new Date();
      const newItem = {
        id: Date.now(),
        message: message,
        sent_at: currentDate.toLocaleString(),
        user: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
      };
      setMessage("");
      newData.push(newItem);

      const dataRef = ref(db, DB_CHAT_KEY);
      set(dataRef, newData);
    }
  };

  const handleDelete = (id) => {
    const newData = chats || [];

    const index = newData.findIndex((item) => item.id === id);
    if (index !== -1) {
      newData.splice(index, 1);
    }

    const dataRef = ref(db, DB_CHAT_KEY);
    set(dataRef, newData);
  };
  const handleEdit = (id) => {
    const newData = [...chats];
    const index = newData.findIndex((item) => item.id === id);

    if (index !== -1) {
      const isiMessage = prompt("Update Message: ");
      if (isiMessage.trim()) {
        newData[index].message = isiMessage;

        const dataRef = ref(db, DB_CHAT_KEY);
        set(dataRef, newData);
      }
    }
  };

  const boxStyle = {
    height: "90vh",
    overflowY: "auto",
    padding: "10px",
  };

  return (
    <Container>
      <div style={boxStyle}>
        {chats.length > 0 ? (
          chats.map((item) => (
            <ChatBubble
              key={item.id}
              message={item.message}
              isUser={item.user.uid === user.uid}
              userName={item.user.displayName}
              userProfilePic={item.user.photoURL}
              timestamp={item.sent_at}
              onEdit={() => handleEdit(item.id)}
              onDelete={() => handleDelete(item.id)}
            ></ChatBubble>
          ))
        ) : (
          <p>Tidak ada chat</p>
        )}
      </div>
      <br />
      <div>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex">
            <div className="flex-grow-1 me-2">
              <InputForm
                type="text"
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
              />
            </div>
            <Button variant="primary" type="submit" disabled={!message.trim()}>
              Send
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}
