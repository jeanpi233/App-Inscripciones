import Contenido from "./components/Contenido";
import Menulateral from "./components/MenuLateral";
const Home = () => {
  return (
    <div className="home">
      <Menulateral />
      <Contenido/>
    </div>
  );
};

export default Home;
