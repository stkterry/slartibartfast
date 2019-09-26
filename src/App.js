import React from 'react';
import ViewAnim from "./components/animations/view/ViewAnim";
import SceneView from "./components/babylon/SceneView";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Header Bit</h1>
      </header>
        <ViewAnim />
        <SceneView />
    </div>
  );
}

export default App;
