import { db } from "@/lib/firebase/firebase";
import { Chat, Message } from "@/types";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore";

export const generateChatId = (id1: string, id2: string) => [id1, id2].sort().join("_");

export const listenUserChats = (
    userId: string,
    callback: (chats: Chat[]) => void
) => {
    const q = query(
        collection(db, "chats"),
        where("participants", "array-contains", userId)
    );

    return onSnapshot(q, (snapshot) => {
        const chats = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Chat[];
        
        // Ordenar en el cliente
        chats.sort((a, b) => {
            const aTime = a.lastMessageAt?.toMillis() || 0;
            const bTime = b.lastMessageAt?.toMillis() || 0;
            return bTime - aTime;
        });
        
        callback(chats);
    })
}

export const createChatIfNotExists = async (id1: string, id2: string) => {
    const chatId = generateChatId(id1, id2);
    const chatRef = doc(db, "chats", chatId);
    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) {
        await setDoc(chatRef, {
            chatId,
            participants: [id1, id2],
            lastMessage: "",
            createdAt: serverTimestamp(),
            lastMessageAt: serverTimestamp()
        })
    }
    return chatId;
}

export const listenMessages = (
    chatId: string,
    callback: (messages: Message[]) => void
) => {
    const q = query(
        collection(db, "chats", chatId, "messages"),
        orderBy("createdAt", "asc")
    )

    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Message[];
        callback(messages);
    });
}

export const sendMessage = async (
    chatId: string,
    senderId: string,
    text: string
) => {
    const messagesRef = collection(db, "chats", chatId, "messages");

    await addDoc(messagesRef, {
        senderId,
        text,
        createdAt: serverTimestamp(),
        readBy: [senderId]
    })

    const chatRef = doc(db, "chats", chatId);
    await setDoc(
        chatRef,
        {
            lastMessage: text,
            lastMessageAt: serverTimestamp()
        },
        { merge: true }
    )
}

export const getUserInfo = async (id: string) => {
    const userRef = doc(db, "users", id);
    const snap = await getDoc(userRef);
    return snap.exists() ? snap.data() : null;
}

export const getMedicoUsers = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("role", "==", "medico"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
    }));
}

export const getPacienteUsers = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("role", "==", "paciente"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
    }));
}