import AlgorithmLister from './AlgorithmLister'  

export default function Home (){  

        return (
            <>
                <div className="container" style={{ textAlign: "center", display:'flex', justifyContent:'space-around'}}> 
                    
                   <nav className="text-4xl font-bold my-8">
                    VISUALISER
                    </nav>
  
                </div>
                <AlgorithmLister/> 
                
            </>
        )
    }