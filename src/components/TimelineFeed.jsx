import { useEffect, useState } from "react";
import Activities from "./Activities";

const TimelineFeed = ({timelineClient}) => {

  console.log('TIMELINE FEED', timelineClient);

  const [timelineActivies, setTimelineActivities] = useState([]);

  const getTimelineActivities = async () => {
    await timelineClient.get()
      .then( r => setTimelineActivities(r.results))
  }
console.log("TIMELINE ACTIVITES", timelineActivies);
  useEffect( ()=> {
    if(timelineClient){
      getTimelineActivities()
    }
  }, [])

  return (
    <>
    <h2>{`${timelineClient.userId}'s`} Timeline</h2>
    
    {timelineActivies.length > 0
      ?
        <Activities activities={timelineActivies}/>
      :
        <p>Your timeline is empty becuase you don't follow anyone yet.  Go follow somene now!</p>
    }
    </>
  );
};

export default TimelineFeed;