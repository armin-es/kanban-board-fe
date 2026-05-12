import { ApolloProvider } from "@apollo/client/react";
import { client } from "./graphql/apollo";
import { KanbanBoard } from "./components/KanbanBoard";

function App() {
  return (
    <ApolloProvider client={client}>
      <KanbanBoard />
    </ApolloProvider>
  );
}

export default App;
