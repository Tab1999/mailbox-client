// useMailbox.js
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const useMailbox = (mailboxPath) => {
    const [mails, setMails] = useState([]);
    const email = useSelector((state) => state.auth.email);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const [newMails, setNewMails] = useState([]);

    useEffect(() => {
        const fetchMails = async () => {
            try {
                setIsLoading(true);
                const querySnapshot = await getDocs(collection(db, `${mailboxPath}`));
                const fetchedMails = [];

                querySnapshot.forEach((doc) => {
                    fetchedMails.push({ id: doc.id, ...doc.data(), read: doc.data().read || false });
                });

                setMails(fetchedMails);
            } catch (error) {
                console.log("Error Fetching", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMails();
    }, [email, mailboxPath]);


    const fetchNewMails = async () => {
        try {
          const queryData = await getDocs(collection(db, `${mailboxPath}`));
              //  console.log(queryData);
          const fetchedMails = [];
          queryData.forEach((doc) => {
            fetchedMails.push({ id: doc.id, ...doc.data(), read: doc.data().read || false });
          });
    
    
          const newMails = fetchedMails.filter((mail) => !mails.find((existingMail) => existingMail.id === mail.id));
    
          if (newMails.length > 0) {
            setMails((prevMails) => [...newMails, ...prevMails]);
            // setMails((prevMails) => [...newMails.reverse(), ...prevMails]);
            
          }
        } catch (error) {
          console.error('Error fetching new mails: ', error);
        }
      };
    
      useEffect(() => {
        const intervalId = setInterval(fetchNewMails, 2000);
        return () => clearInterval(intervalId);
      }, [email, mails]);

    const handleMailClick = async (mail) => {
    
        if (!mail.read) {
                  const mailDocRef = doc(db, `mailboxes/${email}/inbox`, mail.id);
                  await updateDoc(mailDocRef, { read: true });
            
                  const updatedReceivedMails = mails.map((m) =>
                    m.id === mail.id ? { ...m, read: true } : m
                  );
                  setMails(updatedReceivedMails);
        }
        

        history.push(`/message/${mail.id}`);
      };

      const countUnreadMails=()=>{
        return mails.filter((mail) => !mail.read).length;
      }

      const handleComposeClick = () => {
        history.replace("./compose");
  };


      
    return { mails, isLoading, handleMailClick , countUnreadMails,handleComposeClick };
};

export default useMailbox;
