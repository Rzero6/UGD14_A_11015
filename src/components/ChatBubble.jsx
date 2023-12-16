import React from "react";
import "./ChatBubble.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
const ChatBubble = ({
  message,
  isUser,
  userName,
  timestamp,
  userProfilePic,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={`chat-container ${isUser ? "user" : "other"}`}>
      <div className="d-flex">
        {!isUser && (
          <img src={userProfilePic} alt="Not Found" className="profile-pic" />
        )}
        <div className={`chat-bubble mx-2 ${isUser ? "user" : "other"}`}>
          <div className="d-flex align-items-center">
            <h6 className="me-1">
              <strong>{userName}</strong>
            </h6>
            {isUser && (
              <DropdownButton
                id="dropdown-basic-button"
                variant="light"
                size="sm"
              >
                <Dropdown.Item onClick={onEdit}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
              </DropdownButton>
            )}
          </div>
          <p style={{ fontSize: "16px" }}>{message}</p>
          <p className="timestamp-small">{timestamp}</p>
        </div>
        {isUser && (
          <img src={userProfilePic} alt="Not Found" className="profile-pic" />
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
