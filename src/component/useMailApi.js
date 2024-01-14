
import { useState, useEffect } from 'react';
import { getDocs, collection, doc, updateDoc } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { mailAction } from '../store/mails';
import { db } from '../Firebase';
import { useHistory } from 'react-router-dom';

const useMailApi = (mailboxType) => {
  const [receivedMails, setReceivedMails] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const fetchReceivedMails = async () => {
     
      try {
        setIsLoading(true);
        const queryData = await getDocs(collection(db, `mailboxes/${email}/inbox`));

        const mails = [];
        queryData.forEach((doc) => {
          mails.push({ id: doc.id, ...doc.data(), read: doc.data().read || false });
        });

        setReceivedMails(mails);
       
      } catch (error) {
        console.error('Error fetching received mails: ', error);
      }
      finally{
        setIsLoading(false);
       
      }
    };

    fetchReceivedMails();
  }, [email]);
   
  

  const fetchNewMails = async () => {
    try {
      const queryData = await getDocs(collection(db, `mailboxes/${email}/inbox`));
          //  console.log(queryData);
      const mails = [];
      queryData.forEach((doc) => {
        mails.push({ id: doc.id, ...doc.data(), read: doc.data().read || false });
      });


      const newMails = mails.filter((mail) => !receivedMails.find((existingMail) => existingMail.id === mail.id));

      if (newMails.length > 0) {
        setReceivedMails((prevMails) => [...newMails, ...prevMails]);

        // const newUnreadCount = countUnreadMails() + newMails.filter((mail) => !mail.read).length;
        // dispatch(mailAction.updateUnreadCount(newUnreadCount));
      }
    } catch (error) {
      console.error('Error fetching new mails: ', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchNewMails, 2000);
    return () => clearInterval(intervalId);
  }, [email, receivedMails, dispatch]);


  
  const handleComposeClick = () => {
    history.replace("./compose");
  };

  const handleMailClick = async (mail) => {
    
    if (!mail.read) {
              const mailDocRef = doc(db, `mailboxes/${email}/inbox`, mail.id);
              await updateDoc(mailDocRef, { read: true });
        
              const updatedReceivedMails = receivedMails.map((m) =>
                m.id === mail.id ? { ...m, read: true } : m
              );
              setReceivedMails(updatedReceivedMails);
        
             
              // dispatch(mailAction.sendMail({
              //   id: mail.id,
              //   from: mail.from,
              //   subject: mail.subject,
              //   content: mail.content,
              //   read: true,
              // }));
             
            }
        
            
            history.push(`/message/${mail.id}`);
  };

  const countUnreadMails = () => {
    return receivedMails.filter((mail) => !mail.read).length;
  };

  return {
    receivedMails,
    handleComposeClick,
    handleMailClick,
    countUnreadMails,
    isLoading,
  };

};

export default useMailApi;







// useEffect(() => {
  //   const fetchMessage = async () => {
  //     try {
  //       let mailboxPath = '';
        
  //       if (mailboxType === 'inbox') {
  //         mailboxPath = `mailboxes/${email}/inbox`;
  //       } else if (mailboxType === 'sentbox') {
  //         mailboxPath = `mailboxes/${email}/sentbox`;
  //       }

  //       const mailboxMessageDoc = await getDocs(doc(db, mailboxPath));

  //       if (mailboxMessageDoc.exists()) {
  //         setReceivedMails([mailboxMessageDoc.data()]);
  //       } else {
  //         // If the specified mailbox is empty, set receivedMails to an empty array
  //         setReceivedMails([]);
  //       }
  //     } catch (error) {
  //       console.error(`Error fetching ${mailboxType} message: `, error);
  //     }
  //   };

  //   fetchMessage();
  // }, [email, mailboxType]);