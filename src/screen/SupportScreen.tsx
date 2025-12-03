

// import React, { useState, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
//   ScrollView,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { COLORS } from "../theme/color"; // ✅ your theme

// type Props = {
//   navigation: any;
// };

// type Message = {
//   id: string;
//   text: string;
//   type: "support" | "user" | "closed" | "order";
//   time: string;
//   date?: string;
//   status?: "success" | "failed";
// };

// const SupportScreen: React.FC<Props> = ({ navigation }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [chatEnded, setChatEnded] = useState(false);
//   const [inputVisible, setInputVisible] = useState(true);
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: "1",
//       text: "Hi Saif, please select the order for which you seek support.",
//       type: "support",
//       time: "11:27 AM",
//       date: "5 September 2025",
//     },
//     {
//       id: "2",
//       text: "The conversation has been closed due to inactivity",
//       type: "closed",
//       time: "",
//     },
//     {
//       id: "3",
//       text: "Hi Saif, please select the order for which you seek support.",
//       type: "support",
//       time: "11:44 AM",
//       date: "Today",
//     },
//     {
//       id: "4",
//       text: "Order from Pizza Hut\n17th Feb at 4:16 PM | Create Your Flavour Fun Combo - Box Of 2 - Veg Pizza\nYour order was delivered",
//       type: "order",
//       time: "",
//       status: "success",
//     },
//     {
//       id: "5",
//       text: "Order from Pizza Hut\n17th Feb at 4:15 PM | Create Your Flavour Fun Combo - Box Of 2 - Veg Pizza\nPayment failed",
//       type: "order",
//       time: "",
//       status: "failed",
//     },
//   ]);

//   const [newMessage, setNewMessage] = useState("");
//   const scrollRef = useRef<ScrollView>(null);

//   const handleBack = () => navigation.goBack();

//   const handleEndChat = () => setModalVisible(true);

//   const confirmEndChat = () => {
//     setModalVisible(false);
//     setChatEnded(true);
//     setInputVisible(false);
//   };

//   const handleKeepChatting = () => {
//     setModalVisible(false);
//     setInputVisible(true);
//   };

//   const sendMessage = () => {
//     if (newMessage.trim()) {
//       const userMsg: Message = {
//         id: Date.now().toString(),
//         text: newMessage.trim(),
//         type: "user",
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       };

//       setMessages((prev) => [...prev, userMsg]);
//       setNewMessage("");

//       scrollRef.current?.scrollToEnd({ animated: true });

//       setTimeout(() => {
//         const botMsg: Message = {
//           id: (Date.now() + 1).toString(),
//           text: "Thank you for your message. Our support team will review it and get back to you shortly.",
//           type: "support",
//           time: new Date().toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         };
//         setMessages((prev) => [...prev, botMsg]);
//         scrollRef.current?.scrollToEnd({ animated: true });
//       }, 1500);
//     }
//   };

//   const renderMessage = (msg: Message) => {
//     switch (msg.type) {
//       case "support":
//         return (
//           <View style={styles.messageBubbleLeft}>
//             <Text style={styles.message}>{msg.text}</Text>
//             <Text style={styles.time}>{msg.time}</Text>
//           </View>
//         );

//       case "user":
//         return (
//           <View style={styles.messageBubbleRight}>
//             <Text style={styles.messageUser}>{msg.text}</Text>
//             <Text style={styles.time}>{msg.time}</Text>
//           </View>
//         );

//       case "closed":
//         return (
//           <View style={styles.closedBubble}>
//             <Ionicons
//               name="alert-circle-outline"
//               size={20}
//               color={COLORS.accent}
//             />
//             <Text style={styles.closedText}>{msg.text}</Text>
//           </View>
//         );

//       case "order":
//         return (
//           <TouchableOpacity style={styles.orderCard} activeOpacity={0.7}>
//             <View style={styles.orderHeader}>
//               <Ionicons
//                 name={
//                   msg.status === "success"
//                     ? "checkmark-circle"
//                     : "close-circle"
//                 }
//                 size={20}
//                 color={
//                   msg.status === "success"
//                     ? COLORS.highlight
//                     : COLORS.primary
//                 }
//               />
//               <Text style={styles.orderTitle}>
//                 {msg.text.split("\n")[0]}
//               </Text>
//             </View>

//             <Text style={styles.orderDetails}>
//               {msg.text.split("\n").slice(1, -1).join(" | ")}
//             </Text>

//             <Text
//               style={[
//                 styles.orderStatus,
//                 msg.status === "success"
//                   ? styles.success
//                   : styles.failed,
//               ]}
//             >
//               {msg.text.split("\n").pop()}
//             </Text>
//           </TouchableOpacity>
//         );
//     }
//   };

//   return (
//     <SafeAreaView 
//       style={styles.container} 
//       edges={['top', 'left', 'right']} // ✅ Only manage top/sides here, let keyboard view manage bottom
//     >
//       <KeyboardAvoidingView
//         style={styles.flexContainer}
//         behavior={Platform.OS === "ios" ? "padding" : undefined} // ✅ Better android behavior
//         keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
//             <Ionicons
//               name="arrow-back"
//               size={24}
//               color={COLORS.textPrimary}
//             />
//           </TouchableOpacity>

//           <View style={styles.headerContent}>
//             <Text style={styles.headerTitle}>Restro Support</Text>
//             <Text style={styles.headerSubtitle}>We're here to help! 👋</Text>
//           </View>

//           {!chatEnded && (
//             <TouchableOpacity onPress={handleEndChat} style={styles.endChatBtn}>
//               <Text style={styles.endChatText}>End</Text>
//             </TouchableOpacity>
//           )}
//         </View>

//         {/* Chat */}
//         <ScrollView
//           ref={scrollRef}
//           style={styles.chatContainer}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.chatContent}
//         >
//           {messages.map((msg) => (
//             <View key={msg.id}>{renderMessage(msg)}</View>
//           ))}

//           {chatEnded && (
//             <View style={styles.chatEndedBanner}>
//               <Ionicons
//                 name="checkmark-done-circle"
//                 size={18}
//                 color={COLORS.highlight}
//               />
//               <Text style={styles.chatEndedText}>
//                 Chat has been ended. Thanks for reaching out!
//               </Text>
//             </View>
//           )}
//         </ScrollView>

//         {/* Input */}
//         {!chatEnded && inputVisible && (
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.textInput}
//               value={newMessage}
//               onChangeText={setNewMessage}
//               placeholder="Type your message..."
//               placeholderTextColor={COLORS.muted}
//               multiline
//               scrollEnabled={true}
//             />

//             <TouchableOpacity
//               disabled={!newMessage.trim()}
//               onPress={sendMessage}
//               style={[
//                 styles.sendBtn,
//                 !newMessage.trim() && styles.sendBtnDisabled,
//               ]}
//             >
//               <Ionicons name="send" size={20} color={COLORS.white} style={{ marginLeft: 2 }} />
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* Modal */}
//         <Modal visible={modalVisible} transparent animationType="fade">
//           <TouchableOpacity
//             style={styles.modalOverlay}
//             activeOpacity={1}
//             onPress={() => setModalVisible(false)}
//           >
//             <View style={styles.modalBox}>
//               <Ionicons
//                 name="chatbubble-ellipses-outline"
//                 size={48}
//                 color={COLORS.muted}
//               />

//               <Text style={styles.modalTitle}>End this chat session?</Text>
//               <Text style={styles.modalSubtitle}>
//                 We'll be here whenever you need us next time 😊
//               </Text>

//               <TouchableOpacity style={styles.endBtn} onPress={confirmEndChat}>
//                 <Text style={styles.endBtnText}>Yes, End Chat</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.cancelBtn}
//                 onPress={handleKeepChatting}
//               >
//                 <Text style={styles.cancelBtnText}>Keep Chatting</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//         </Modal>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default SupportScreen;

// /* -------------------------------- Styles with THEME -------------------------------- */

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background },
//   flexContainer: { flex: 1 },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: COLORS.white,
//   },
//   backBtn: { padding: 6, marginRight: 8 },
//   headerContent: { flex: 1 },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLORS.textPrimary,
//   },
//   headerSubtitle: {
//     fontSize: 14,
//     color: COLORS.textSecondary,
//     marginTop: 2,
//   },
//   endChatBtn: {
//     backgroundColor: COLORS.accent + "44",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   endChatText: {
//     color: COLORS.primary,
//     fontWeight: "700",
//   },

//   chatContainer: { flex: 1 },
//   chatContent: { padding: 16, paddingBottom: 20 },

//   messageBubbleLeft: {
//     backgroundColor: COLORS.secondary,
//     padding: 12,
//     maxWidth: "75%",
//     borderRadius: 14,
//     marginBottom: 8,
//   },
//   messageBubbleRight: {
//     backgroundColor: COLORS.primary,
//     padding: 12,
//     maxWidth: "75%",
//     alignSelf: "flex-end",
//     borderRadius: 14,
//     marginBottom: 8,
//   },
//   message: { fontSize: 15, color: COLORS.textPrimary },
//   messageUser: { fontSize: 15, color: COLORS.white },

//   time: {
//     fontSize: 11,
//     marginTop: 4,
//     color: COLORS.muted,
//     alignSelf: "flex-end",
//   },

//   closedBubble: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: COLORS.accent + "22",
//     padding: 10,
//     borderRadius: 10,
//   },
//   closedText: {
//     marginLeft: 8,
//     fontSize: 14,
//     color: COLORS.primary,
//   },

//   orderCard: {
//     backgroundColor: COLORS.white,
//     borderRadius: 12,
//     padding: 14,
//     marginBottom: 12,
//     borderColor: COLORS.secondary,
//     borderWidth: 1,
//   },
//   orderHeader: { flexDirection: "row", alignItems: "center" },
//   orderTitle: { marginLeft: 8, fontSize: 16, fontWeight: "600" },
//   orderDetails: {
//     marginTop: 6,
//     color: COLORS.textSecondary,
//     fontSize: 14,
//   },
//   orderStatus: { marginTop: 6, fontSize: 14 },
//   success: { color: COLORS.highlight },
//   failed: { color: COLORS.primary },

//   // ✅ Fixed Input Styles
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     paddingHorizontal: 10,
//     paddingVertical: 10, // ✅ Ensure uniform padding
//     backgroundColor: COLORS.white,
//     borderTopWidth: 1,
//     borderColor: COLORS.secondary,
//   },
//   textInput: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 16,
//     paddingTop: 12, // ✅ Explicit top padding for multiline
//     paddingBottom: 12, // ✅ Explicit bottom padding
//     borderRadius: 24,
//     fontSize: 15,
//     color: COLORS.textPrimary,
//     maxHeight: 100,
//     minHeight: 48, // ✅ Increased touch target
//     textAlignVertical: 'top',
//   },
//   sendBtn: {
//     width: 44,
//     height: 44,
//     backgroundColor: COLORS.primary,
//     borderRadius: 22,
//     justifyContent: "center",
//     alignItems: "center",
//     marginLeft: 10,
//     marginBottom: 2, // ✅ Slight lift to align with text baseline
//   },
//   sendBtnDisabled: {
//     backgroundColor: COLORS.muted,
//   },

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "#00000055",
//     justifyContent: "center",
//     padding: 20,
//   },
//   modalBox: {
//     backgroundColor: COLORS.white,
//     padding: 20,
//     borderRadius: 16,
//     alignItems: "center",
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: COLORS.textPrimary,
//     marginTop: 6,
//   },
//   modalSubtitle: {
//     fontSize: 14,
//     color: COLORS.textSecondary,
//     textAlign: "center",
//     marginVertical: 12,
//   },
//   endBtn: {
//     backgroundColor: COLORS.primary,
//     paddingVertical: 12,
//     borderRadius: 12,
//     width: "100%",
//     alignItems: "center",
//   },
//   endBtnText: { color: COLORS.white, fontSize: 16, fontWeight: "600" },
//   cancelBtn: {
//     marginTop: 8,
//     paddingVertical: 12,
//     borderRadius: 12,
//     width: "100%",
//     alignItems: "center",
//   },
//   cancelBtnText: { fontSize: 16, color: COLORS.primary, fontWeight: "600" },

//   chatEndedBanner: {
//     flexDirection: "row",
//     padding: 12,
//     backgroundColor: COLORS.highlight + "22",
//     borderRadius: 12,
//     marginTop: 10,
//   },
//   chatEndedText: {
//     marginLeft: 8,
//     color: COLORS.primary,
//     fontWeight: "600",
//   },
// });



import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../theme/color"; // ✅ your theme

// --- THEME COLORS ---
const BG_COLOR = '#F4F6F9'; // Light Grey-Blue for Chat Background
const WHITE = '#FFFFFF';
const PRIMARY = COLORS.primary; 

type Props = {
  navigation: any;
};

type Message = {
  id: string;
  text: string;
  type: "support" | "user" | "closed" | "order";
  time: string;
  date?: string;
  status?: "success" | "failed";
};

const SupportScreen: React.FC<Props> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const [inputVisible, setInputVisible] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi Saif, please select the order for which you seek support.",
      type: "support",
      time: "11:27 AM",
      date: "5 September 2025",
    },
    {
      id: "2",
      text: "The conversation has been closed due to inactivity",
      type: "closed",
      time: "",
    },
    {
      id: "3",
      text: "Hi Saif, please select the order for which you seek support.",
      type: "support",
      time: "11:44 AM",
      date: "Today",
    },
    {
      id: "4",
      text: "Order from Pizza Hut\n17th Feb at 4:16 PM | Create Your Flavour Fun Combo - Box Of 2 - Veg Pizza\nYour order was delivered",
      type: "order",
      time: "",
      status: "success",
    },
    {
      id: "5",
      text: "Order from Pizza Hut\n17th Feb at 4:15 PM | Create Your Flavour Fun Combo - Box Of 2 - Veg Pizza\nPayment failed",
      type: "order",
      time: "",
      status: "failed",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  const handleBack = () => navigation.goBack();

  const handleEndChat = () => setModalVisible(true);

  const confirmEndChat = () => {
    setModalVisible(false);
    setChatEnded(true);
    setInputVisible(false);
  };

  const handleKeepChatting = () => {
    setModalVisible(false);
    setInputVisible(true);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMsg: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        type: "user",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setNewMessage("");

      // Auto scroll
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);

      setTimeout(() => {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thank you for your message. Our support team will review it and get back to you shortly.",
          type: "support",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, botMsg]);
        setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
      }, 1500);
    }
  };

  const renderMessage = (msg: Message) => {
    switch (msg.type) {
      case "support":
        return (
          <View style={{ marginBottom: 16 }}>
            {msg.date && (
                <View style={styles.dateBadge}>
                    <Text style={styles.dateText}>{msg.date}</Text>
                </View>
            )}
            <View style={styles.rowLeft}>
                <View style={styles.avatar}>
                    <Ionicons name="headset" size={16} color={PRIMARY} />
                </View>
                <View style={styles.messageBubbleLeft}>
                    <Text style={styles.messageTextLeft}>{msg.text}</Text>
                    <Text style={styles.timeLeft}>{msg.time}</Text>
                </View>
            </View>
          </View>
        );

      case "user":
        return (
          <View style={styles.messageBubbleRight}>
            <Text style={styles.messageTextRight}>{msg.text}</Text>
            <Text style={styles.timeRight}>{msg.time}</Text>
          </View>
        );

      case "closed":
        return (
          <View style={styles.closedBubble}>
            <Ionicons
              name="lock-closed-outline"
              size={16}
              color="#666"
            />
            <Text style={styles.closedText}>{msg.text}</Text>
          </View>
        );

      case "order":
        const isSuccess = msg.status === "success";
        return (
          <TouchableOpacity style={styles.orderCard} activeOpacity={0.9}>
            {/* Header Line */}
            <View style={[styles.orderHeaderLine, { backgroundColor: isSuccess ? '#E8F5E9' : '#FFEBEE' }]}>
                <Ionicons
                    name={isSuccess ? "checkmark-circle" : "alert-circle"}
                    size={18}
                    color={isSuccess ? "#2E7D32" : "#C62828"}
                />
                <Text style={[styles.orderStatusTitle, { color: isSuccess ? "#2E7D32" : "#C62828" }]}>
                    {isSuccess ? "Delivered" : "Payment Failed"}
                </Text>
            </View>
            
            <View style={styles.orderContent}>
                <Text style={styles.orderRestaurantTitle}>
                  {msg.text.split("\n")[0]}
                </Text>
                <Text style={styles.orderDetails}>
                  {msg.text.split("\n")[1]}
                </Text>
                <View style={styles.helpButtonSmall}>
                    <Text style={styles.helpButtonText}>Select Order</Text>
                    <Ionicons name="chevron-forward" size={14} color={PRIMARY} />
                </View>
            </View>
          </TouchableOpacity>
        );
    }
  };

  return (
    <SafeAreaView 
      style={styles.container} 
      edges={['top', 'left', 'right']} 
    >
      <StatusBar barStyle="dark-content" backgroundColor={WHITE} />
      
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined} 
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#1C1C1C"
            />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Support Chat</Text>
            <View style={styles.onlineIndicatorRow}>
                <View style={styles.greenDot} />
                <Text style={styles.headerSubtitle}>We're typically reply in 2 mins</Text>
            </View>
          </View>

          {!chatEnded && (
            <TouchableOpacity onPress={handleEndChat} style={styles.endChatBtn}>
              <Text style={styles.endChatText}>End Chat</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Chat Area */}
        <ScrollView
          ref={scrollRef}
          style={styles.chatContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatContent}
        >
          {messages.map((msg) => (
            <View key={msg.id}>{renderMessage(msg)}</View>
          ))}

          {chatEnded && (
            <View style={styles.chatEndedBanner}>
                <View style={styles.chatEndedIcon}>
                     <Ionicons name="checkmark" size={20} color="#fff" />
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.chatEndedTitle}>Chat Ended</Text>
                    <Text style={styles.chatEndedText}>
                        This session has been closed. Start a new chat if you need more help.
                    </Text>
                </View>
            </View>
          )}
          <View style={{height: 10}} />
        </ScrollView>

        {/* Input Area */}
        {!chatEnded && inputVisible && (
          <View style={styles.inputWrapper}>
            <View style={styles.inputInnerContainer}>
                <TextInput
                style={styles.textInput}
                value={newMessage}
                onChangeText={setNewMessage}
                placeholder="Type your message..."
                placeholderTextColor="#999"
                multiline
                />

                <TouchableOpacity
                disabled={!newMessage.trim()}
                onPress={sendMessage}
                style={[
                    styles.sendBtn,
                    !newMessage.trim() && styles.sendBtnDisabled,
                ]}
                >
                <Ionicons name="send" size={18} color={WHITE} style={{ marginLeft: 2 }} />
                </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Modal */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalBox}>
              <View style={styles.modalIconBg}>
                  <Ionicons
                    name="chatbubbles"
                    size={32}
                    color={PRIMARY}
                  />
              </View>

              <Text style={styles.modalTitle}>End Chat Session?</Text>
              <Text style={styles.modalSubtitle}>
                Are you sure you want to end this conversation? You can always start a new one later.
              </Text>

              <View style={styles.modalButtonRow}>
                  <TouchableOpacity 
                    style={styles.cancelBtn} 
                    onPress={handleKeepChatting}
                  >
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.endBtn} onPress={confirmEndChat}>
                    <Text style={styles.endBtnText}>End Chat</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SupportScreen;

/* -------------------------------- THEMED STYLES -------------------------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  flexContainer: { flex: 1, backgroundColor: BG_COLOR },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: WHITE,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    zIndex: 10,
  },
  backBtn: { padding: 4, marginRight: 12 },
  headerContent: { flex: 1 },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1C1C1C",
  },
  onlineIndicatorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 2,
  },
  greenDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#2E7D32',
      marginRight: 6,
  },
  headerSubtitle: {
    fontSize: 10,
    color: "#666",
    fontWeight: '500',
  },
  endChatBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFF0F1',
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  endChatText: {
    color: '#D32F2F',
    fontWeight: "900",
    fontSize: 9,
  },

  /* Chat List */
  chatContainer: { flex: 1 },
  chatContent: { padding: 16, paddingBottom: 20 },

  /* Date Badge */
  dateBadge: {
      alignSelf: 'center',
      backgroundColor: '#E0E0E0',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 10,
      marginBottom: 16,
  },
  dateText: { fontSize: 10, fontWeight: '700', color: '#555' },

  /* Support Message (Left) */
  rowLeft: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginBottom: 4,
  },
  avatar: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: '#E3F2FD',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
      marginBottom: 2,
  },
  messageBubbleLeft: {
    backgroundColor: WHITE,
    padding: 12,
    maxWidth: "80%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 4, // Tail effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  messageTextLeft: { fontSize: 15, color: "#333", lineHeight: 22 },
  timeLeft: {
    fontSize: 10,
    marginTop: 6,
    color: "#999",
    alignSelf: "flex-start",
  },

  /* User Message (Right) */
  messageBubbleRight: {
    backgroundColor: PRIMARY,
    padding: 12,
    maxWidth: "80%",
    alignSelf: "flex-end",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4, // Tail effect
    marginBottom: 16,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  messageTextRight: { fontSize: 15, color: WHITE, lineHeight: 22 },
  timeRight: {
    fontSize: 10,
    marginTop: 6,
    color: "rgba(255,255,255,0.7)",
    alignSelf: "flex-end",
  },

  /* System/Closed Message */
  closedBubble: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#EEEEEE",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 16,
  },
  closedText: {
    marginLeft: 6,
    fontSize: 12,
    color: "#666",
    fontWeight: '600',
  },

  /* Order Card */
  orderCard: {
    backgroundColor: WHITE,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    marginLeft: 36, // Indent to align with support chat
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeaderLine: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
  },
  orderStatusTitle: {
      fontSize: 12,
      fontWeight: '700',
      marginLeft: 6,
      textTransform: 'uppercase',
  },
  orderContent: {
      padding: 12,
  },
  orderRestaurantTitle: { 
      fontSize: 15, 
      fontWeight: "700", 
      color: '#1C1C1C', 
      marginBottom: 4 
  },
  orderDetails: {
    color: "#666",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  helpButtonSmall: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: '#F5F5F5',
      paddingTop: 8,
  },
  helpButtonText: {
      color: PRIMARY,
      fontSize: 13,
      fontWeight: '700',
  },

  /* Input Area */
  inputWrapper: {
    backgroundColor: WHITE,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#F0F0F0",
  },
  inputInnerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#F8F9FA",
    borderRadius: 24,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10, 
    paddingBottom: 10,
    fontSize: 15,
    color: "#333",
    maxHeight: 100,
    minHeight: 40,
  },
  sendBtn: {
    width: 40,
    height: 40,
    backgroundColor: PRIMARY,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  sendBtnDisabled: {
    backgroundColor: "#CCC",
    shadowOpacity: 0,
    elevation: 0,
  },

  /* Chat Ended Banner */
  chatEndedBanner: {
    flexDirection: "row",
    alignItems: 'center',
    padding: 16,
    backgroundColor: WHITE,
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
  },
  chatEndedIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#BDBDBD',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
  },
  chatEndedTitle: { fontSize: 14, fontWeight: '700', color: '#333' },
  chatEndedText: {
    marginTop: 2,
    color: "#666",
    fontSize: 12,
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 24,
  },
  modalBox: {
    backgroundColor: WHITE,
    padding: 24,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIconBg: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#E3F2FD',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1C1C1C",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  modalButtonRow: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      gap: 12,
  },
  endBtn: {
    flex: 1,
    backgroundColor: '#D32F2F',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  endBtnText: { color: WHITE, fontSize: 15, fontWeight: "700" },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: '#F5F5F5',
  },
  cancelBtnText: { fontSize: 15, color: "#333", fontWeight: "700" },
});