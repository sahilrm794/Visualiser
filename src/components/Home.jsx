import AlgorithmLister from './AlgorithmLister';
import logo from './logo.png';

export default function Home() {
  return (
    <>
      <div 
        className="container my-8" 
        style={{ textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}
      >
        <nav className="text-4xl font-bold flex items-center">
          <img 
            src={logo} 
            alt="Logo" 
            style={{ height: "40px", width: "40px", marginRight: "10px" }} 
          />
          VISUALISER
        </nav>
      </div>

      <AlgorithmLister />
    </>
  );
}
