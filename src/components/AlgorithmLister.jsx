import React from 'react'
import AlgorithmCard from './AlgorithmCard'

function AlgorithmLister() {
  return (
    <div
      className="
        grid
        grid-cols-8
        gap-[60px]
        auto-rows-[120px]
        items-center
        justify-center
        justify-items-center
      "
    >
      <div className="col-span-4 row-span-2">
        <AlgorithmCard
          whichLink="/sorting"
          heading="Sorting Algorithms"
          description="Visualize and compare different Sorting techniques interactively"
        />
      </div>

      <div className="col-span-4 row-span-2">
        <AlgorithmCard
          whichLink="/sieve"
          heading="Sieve Primality"
          description="Visualize the Sieve of Eratosthenes to find prime numbers"
        />
      </div>

      <div className="col-span-8 row-span-2">
        <AlgorithmCard
          whichLink="/graph"
          heading="Graph Algorithms"
          description="Explore and visualize different Graph Algorithms"
        />
      </div>
    </div>
  )
}

export default AlgorithmLister
