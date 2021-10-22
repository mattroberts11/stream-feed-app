import { useContext, useState } from "react";
import { connect } from "getstream";

const api_key = process.env.REACT_API_KEY;

export const FeedClientContext = createContext();

export const FeedClientProvider = (props) => {

  const [feedClient] = useState();



}
