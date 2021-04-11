// import React, {useState} from 'react';
// import {Launcher} from 'react-chat-window';
// import PropTypes from 'prop-types';
//
// const ChatWindow = ({isOpenChat, setOpenChat, connection}) => {
//   const [messageList, setMessageList] = useState([]);
//
//   const onMessageWasSent = (message) => {
//     setMessageList([...messageList, message]);
//   };
//
//   const onFilesSelected = (fileList) => {
//     const objectURL = window.URL.createObjectURL(fileList[0]);
//     setMessageList([
//       messageList,
//       {
//         type: 'file',
//         author: 'me',
//         data: {
//           url: objectURL,
//           fileName: fileList[0].name,
//         },
//       },
//     ]);
//   };
//
//   const handleClick = () => {
//     setOpenChat(false);
//   };
//
//   return (
//     <Launcher
//       agentProfile={{
//         teamName: connection.name,
//         imageUrl: connection.image,
//       }}
//       onMessageWasSent={onMessageWasSent}
//       onFilesSelected={onFilesSelected}
//       messageList={messageList}
//       handleClick={handleClick}
//       isOpen={isOpenChat}
//       showEmoji
//     />
//   );
// };
//
// export default ChatWindow;
//
// ChatWindow.defaultProps = {
//   connection: null,
// };
//
// ChatWindow.prototype = {
//   isOpenChat: PropTypes.bool.isRequired,
//   setOpenChat: PropTypes.func.isRequired,
//   connection: PropTypes.object,
// };
