import { useEffect, useState } from "react";
import Activities from "./Activities";

const TimelineFeed = ({timelineClient, feedType, followerId, token, user}) => {

  const [timelineActivies, setTimelineActivities] = useState([]);

  const getTimelineActivities = async () => {
    await timelineClient.get({reactions: {own: true, recent: true, counts: true}})
      .then( r => setTimelineActivities(r.results))
  }

  useEffect( ()=> {
    if(timelineClient){
      getTimelineActivities()
    }
  },[timelineClient])
// console.log('TIMELINE ACTIVITIES', timelineActivies);
  return (
    <>
    <h2>{`${timelineClient.userId}'s`} Timeline</h2>
    
    {timelineActivies.length > 0
      ?
        <Activities 
          activities={timelineActivies} 
          client={timelineClient} 
          feedType={feedType}
          followerId={followerId}
          token={token}
        />
      :
        <p>Your timeline is empty becuase you don't follow anyone yet.  Go follow somene now!</p>
    }
    </>
  );
};

export default TimelineFeed;