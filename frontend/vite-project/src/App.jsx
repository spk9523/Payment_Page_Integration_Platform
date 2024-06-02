import ProductCard from "./components/productCard";

const App = () => {
  return (
    <section className="flex justify-center items-center h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white">
      {/* Main  */}
      <ProductCard></ProductCard>
      
    </section>
  );
}

export default App;