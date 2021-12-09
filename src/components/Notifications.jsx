import { useEffect } from "react";


const Notifications = ({notificationsClient})=> {

  console.log('NOTIFICATIONS CLIENT =', notificationsClient);


  
  const getNotifications = async () => {
    const activities = notificationsClient.get()
  }


  useEffect( ()=> {
    notificationsClient.get().then( r => console.log(r))
    // console.log('notifications activities', activities)
  })


  return (
    <h4>Notifications</h4>
  )
}

export default Notifications;