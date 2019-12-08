import React from "react";
import { RestfulProvider } from "restful-react";
import GetPrices from "./GetPrices";

const App: React.FC = () => {
  return (
    <RestfulProvider base={"https://api.nomics.com/v1/"}>
      <GetPrices />
    </RestfulProvider>
  );
};

export default App;
