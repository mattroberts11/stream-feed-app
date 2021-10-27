import { useEffect, useState } from "react";
import Activities from "./Activities";

const GlobalFeed = ({globalClient, feedType}) => {

  // console.log('GLOBAL FEED', globalClient);

  const [globalActivities, setGlobalActivities] = useState(null);

  const getGlobalActivities = async () => {
    await globalClient.get()
      .then( r => setGlobalActivities(r.results))
  }

  useEffect( () => {
    if(globalClient){
      getGlobalActivities()
    }
  }, [])

  return (
    <>
      <h2>Global Feed</h2>
      {globalActivities &&
        <Activities activities={globalActivities} client={globalClient} feedType={feedType}/>
      }
    </>
  );
};

export default GlobalFeed;
