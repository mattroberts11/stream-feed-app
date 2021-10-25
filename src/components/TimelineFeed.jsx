import { useEffect, useState } from "react";
import Activities from "./Activities";

const TimelineFeed = ({timelineClient}) => {

  console.log('TIMELINE FEED', timelineClient);

  const [timelineActivies, setTimelineActivities] = useState(null);

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
    <h2>My Timeline</h2>
    {timelineActivies &&
      <Activities activities={timelineActivies}/>
    }
    </>
  );
};

export default TimelineFeed;