import "./App.css";
import NavBar from "./components/navbar/NavBar";
import InventoryListPage from "./pages/InventoryListPage/InventoryListPage";

function App() {
    return (
        <div className="App">
            <NavBar />
            <InventoryListPage />
        </div>
    );
}

export default App;
