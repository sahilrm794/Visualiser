import React, { useEffect, useState, useRef } from 'react';

const Sieve = () => {
  const [n, setN] = useState(5);
  const [array, setArray] = useState([]);
  const sliderRef = useRef(null);
  const nOutputRef = useRef(null);
  const divRef = useRef(null);

  // Initialize array when component mounts
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.value = 5;
      initializeArray(5);
    }
  }, []);

  const initializeArray = (value) => {
    const newArray = Array.from({ length: value }, (_, i) => [i, i]);
    setArray(newArray);

    // Reset colors
    const parent = divRef.current?.childNodes;
    if (parent) {
      parent.forEach(child => {
        const box = child.childNodes[0];
        box.style.backgroundColor = 'steelblue';
      });
    }
  };

  const handleRange = (e) => {
    const value = parseInt(e.target.value);
    setN(value);
    if (nOutputRef.current) {
      nOutputRef.current.innerHTML = `N=${value}`;
    }
    initializeArray(value);
  };

  const SieveAlgorithm = () => {
    const parent = divRef.current.childNodes;
    const N = n;
    let prime = Array(N + 1).fill(true);
    let primes = [];

    // Mark non-primes
    for (let i = 2; i <= N; i++) {
      if (prime[i]) {
        primes.push(i);
        for (let j = 2 * i; j <= N; j += i) {
          prime[j] = false;
        }
      }
    }

    let timer = 0;
    for (let x = 0; x < primes.length; x++) {
      const i = primes[x];
      let cnt = ((N - i) / i) * 200;

      setTimeout(() => {
        const mainBar = parent[i - 1]?.childNodes[0];
        if (!mainBar) return;

        mainBar.style.backgroundColor = 'purple';
        mainBar.style.fontSize = '22px';
        mainBar.style.fontWeight = 'bold';
        mainBar.animate({ transform: 'scale(1.25, 0.5)' }, { duration: cnt, iterations: 1 });

        setTimeout(() => {
          mainBar.style.backgroundColor = 'green';
          mainBar.style.fontWeight = 'normal';
          mainBar.style.fontSize = '20px';
        }, cnt);

        for (let j = 2 * i; j <= N; j += i) {
          setTimeout(() => {
            const bar = parent[j - 1]?.childNodes[0];
            if (bar) {
              bar.style.backgroundColor = 'violet';
              bar.animate({ transform: 'scale(1.25)' }, { duration: 200, iterations: 1 });
            }
          }, ((j - i) / i) * 200);

          setTimeout(() => {
            const bar = parent[j - 1]?.childNodes[0];
            if (bar) {
              bar.style.backgroundColor = 'red';
            }
          }, ((j - i) / i) * 200 + 200);
        }
      }, timer);

      timer += cnt + 500;
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="container" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ borderRadius: '0px 0px 10px 10px', height: '75px' }}>
          <a className="navbar-brand" href="/" style={{ margin: '0px 15px', fontSize: '30px' }}>
            AlgoVisualizer
          </a>

          <div className="d-flex flex-column bd-highlight mb-3" style={{ alignItems: 'center' }}>
            <label ref={nOutputRef} htmlFor="slider" style={{ color: 'white', display: 'block' }}>
              N=5
            </label>
            <input type="range" ref={sliderRef} onInput={handleRange} min="5" max="150" step={1} style={{ display: 'block' }} />
          </div>

          <button className="btn btn-dark" onClick={SieveAlgorithm}>
            Visualise Sieve
          </button>
        </nav>
      </div>

      <div className="container">
        <div
          id="myDiv"
          ref={divRef}
          className="container d-flex justify-content-start flex-wrap"
          style={{
            padding: '20px',
            margin: '50px 0px',
            width: '1300x',
            border: '2px solid steelblue',
            justifyContent: 'center',
          }}
        >
          {array.map((element) => (
            <div
              key={element[1]}
              className="user"
              style={{ position: 'relative', margin: '5px 10px', height: 55, width: 55 }}
            >
              <div
                id={element[0]}
                className="user"
                style={{
                  padding: '4px',
                  justifyContent: 'center',
                  fontSize: '20px',
                  textAlign: 'center',
                  color: 'white',
                  height: '45px',
                  width: '45px',
                  backgroundColor: 'steelblue',
                  borderRadius: '5px',
                }}
              >
                {element[0] + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sieve;
