import React, { useState, useEffect, useRef } from 'react';

const Sorting = () => {
  const [array, setArray] = useState([]);
  const [arrayLength, setArrayLength] = useState(5);

  const timer = useRef(1);
  const Arr = useRef([]);
  const tempArray = useRef([]);
  const mergeSortAnimations = useRef([]);

  useEffect(() => {
    const element = document.getElementById('slider');
    element.value = 5;
    element.addEventListener('input', handleRange);
    generateArray(5);
    return () => element.removeEventListener('input', handleRange);
  }, []);

  const generateRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const handleRange = () => {
    const element = document.getElementById('slider');
    const target = document.getElementById('nOutput');
    const value = Number(element.value);
    target.innerHTML = `N=${value}`;
    generateArray(value);
  };

  const generateArray = (size) => {
    const newArray = Array.from({ length: size }, (_, i) => [generateRandom(5, 500), i]);
    setArray(newArray);
    setArrayLength(size);
    resetBarColors();
  };

  const resetBarColors = () => {
    const parent = document.getElementById('myDiv')?.childNodes || [];
    parent.forEach(bar => {
      bar.style.backgroundColor = 'steelblue';
    });
  };

  const handleRandomise = () => {
    generateArray(array.length);
  };

  const swapBars = (bar1, bar2) => {
    const temp = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = temp;
  };

  const swapArray = (cloneArray, i, j) => {
    const temp = cloneArray[i][0];
    cloneArray[i][0] = cloneArray[j][0];
    cloneArray[j][0] = temp;
  };

  const assignBar = (i, newValue) => {
    const bar = document.getElementById('myDiv')?.childNodes[i];
    if (bar) bar.style.height = `${newValue}px`;
  };

  const bubbleSort = () => {
    const parent = document.getElementById('myDiv')?.childNodes;
    let cloneArray = [...array];
    let animations = [];

    for (let i = 0; i < arrayLength; i++) {
      for (let j = 0; j < arrayLength - 1 - i; j++) {
        if (cloneArray[j][0] > cloneArray[j + 1][0]) {
          swapArray(cloneArray, j, j + 1);
          animations.push(j);
        }
      }
      animations.push([array.length - i - 1]);
    }

    animations.forEach((j, i) => {
      if (Array.isArray(j)) {
        setTimeout(() => {
          const bar = parent[j[0]];
          bar.style.backgroundColor = 'green';
        }, (200 * i + 100) * timer.current);
      } else {
        const bar1 = parent[j];
        const bar2 = parent[j + 1];
        setTimeout(() => {
          bar1.style.backgroundColor = 'red';
          bar2.style.backgroundColor = 'red';
        }, 200 * i * timer.current);
        setTimeout(() => {
          swapBars(bar1, bar2);
          bar1.style.backgroundColor = 'steelblue';
          bar2.style.backgroundColor = 'steelblue';
        }, (200 * i + 100) * timer.current);
      }
    });

    setTimeout(() => {
      setArray(cloneArray);
    }, 300 * timer.current * animations.length);
  };

  const selectionSort = () => {
    const parent = document.getElementById('myDiv')?.childNodes;
    let newArray = [...array];
    let N = newArray.length;

    for (let i = 0; i < N; i++) {
      setTimeout(() => {
        let minIndex = i;
        const mainBar = parent[i];
        mainBar.style.backgroundColor = 'red';
        for (let j = i + 1; j < N; j++) {
          const compareBar = parent[j];
          setTimeout(() => compareBar.style.backgroundColor = 'purple', (j - i) * 200 * timer.current);
          setTimeout(() => compareBar.style.backgroundColor = 'steelblue', (j - i) * 200 * timer.current + 200);
          if (newArray[j][0] < newArray[minIndex][0]) {
            minIndex = j;
          }
        }
        const bar1 = parent[i];
        const bar2 = parent[minIndex];
        swapArray(newArray, minIndex, i);
        setTimeout(() => {
          for (let j = i + 1; j < N; j++) {
            parent[j].style.backgroundColor = 'steelblue';
          }
          swapBars(bar1, bar2);
          parent[i].style.backgroundColor = 'green';
        }, (N - i) * 200 * timer.current + 200);
      }, ((i / 2) * (N * 2 - i) * 200) * timer.current);
    }
  };

  const insertionSort = () => {
    const parent = document.getElementById('myDiv')?.childNodes;
    const N = array.length;
    let newArray = [...array];
    let animations = [];

    for (let step = 1; step < N; step++) {
      let key = newArray[step][0];
      let j = step - 1;
      animations.push([step, step]);
      while (j >= 0 && key < newArray[j][0]) {
        newArray[j + 1][0] = newArray[j][0];
        animations.push([step, j + 1, newArray[j][0]]);
        j--;
      }
      newArray[j + 1][0] = key;
      animations.push([step, j + 1, key]);
    }

    animations.forEach((anim, i) => {
      if (anim.length === 3) {
        const bar = parent[anim[1]];
        setTimeout(() => bar.style.backgroundColor = anim[1] !== anim[0] ? 'red' : '', 200 * i * timer.current);
        setTimeout(() => {
          bar.style.backgroundColor = 'steelblue';
          assignBar(anim[1], anim[2]);
        }, (200 * i + 200) * timer.current);
      } else {
        const bar = parent[anim[0]];
        setTimeout(() => bar.style.backgroundColor = 'blue', 200 * i * timer.current);
        setTimeout(() => bar.style.backgroundColor = 'steelblue', 200 * (i + 1) * timer.current);
      }
    });
  };

  const mergeSort = () => {
    Arr.current = [...array];
    mergeSortAnimations.current = [];
    tempArray.current = [];
    performMergeSort(0, Arr.current.length - 1);
    const parent = document.getElementById('myDiv')?.childNodes;
    let animations = mergeSortAnimations.current;
    let cnt = 0;

    animations.forEach((anim, i) => {
      setTimeout(() => {
        const [type, ...rest] = anim;
        if (type === 'start') {
          parent[rest[0]].style.backgroundColor = 'red';
          parent[rest[1]].style.backgroundColor = 'red';
        } else if (type === 'left') {
          parent[rest[0]].style.backgroundColor = 'pink';
        } else if (type === 'right') {
          parent[rest[0]].style.backgroundColor = 'violet';
        }
      }, cnt * 50);

      setTimeout(() => {
        const [type, ...rest] = anim;
        if (type === 'assign') {
          assignBar(rest[0], rest[1]);
          parent[rest[0]].style.backgroundColor = rest[3] === 0 && rest[5] === Arr.current.length - 1 ? 'green' : 'cyan';
        } else if (type === 'end') {
          parent[rest[0]].style.color = parent[rest[1]].style.color = rest[2] === Arr.current.length - 1 && rest[0] === 0 ? 'green' : 'cyan';
        }
      }, cnt * 50 + 30);

      cnt += ['start', 'assign', 'end'].includes(anim[0]) ? 1 : 0.05;
    });
  };

  const performMergeSort = (start, end) => {
    if (start < end) {
      let mid = Math.floor((start + end) / 2);
      performMergeSort(start, mid);
      performMergeSort(mid + 1, end);
      mergeSortHelper(start, mid, end);
    }
  };

  const mergeSortHelper = (start, mid, end) => {
    mergeSortAnimations.current.push(['start', start, end, mid]);
    tempArray.current = [];
    let i = start, j = mid + 1;

    for (let x = start; x <= mid; x++) mergeSortAnimations.current.push(['left', x]);
    for (let x = mid + 1; x <= end; x++) mergeSortAnimations.current.push(['right', x]);

    while (i <= mid && j <= end) {
      if (Arr.current[i][0] <= Arr.current[j][0]) {
        tempArray.current.push(Arr.current[i++]);
      } else {
        tempArray.current.push(Arr.current[j++]);
      }
    }

    while (i <= mid) tempArray.current.push(Arr.current[i++]);
    while (j <= end) tempArray.current.push(Arr.current[j++]);

    for (let x = start; x <= end; x++) {
      mergeSortAnimations.current.push(['assign', x, tempArray.current[x - start][0], start, mid, end]);
      Arr.current[x] = tempArray.current[x - start];
    }

    mergeSortAnimations.current.push(['end', start, end, mid]);
  };

  return (
    <>
      <div className="container" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ borderRadius: '0px 0px 10px 10px', height: '75px' }}>
          <a className="navbar-brand" href="/" style={{ margin: '0px 15px', fontSize: '30px' }}>AlgoVisualizer</a>
          <div className="d-flex flex-column bd-highlight mb-3" style={{ alignItems: 'center' }}>
            <label id="nOutput" htmlFor="slider" style={{ color: 'white', display: 'block' }}>N=5</label>
            <input type="range" id="slider" name="quantity" min="5" max="200" step={1} style={{ display: 'block' }} />
          </div>
          <button onClick={mergeSort} className="btn btn-dark">Merge Sort</button>
          <button onClick={bubbleSort} className="btn btn-dark">Bubble Sort</button>
          <button onClick={selectionSort} className="btn btn-dark">Selection Sort</button>
          <button onClick={insertionSort} className="btn btn-dark">Insertion Sort</button>
          <button onClick={handleRandomise} className="btn btn-dark">Randomise Values</button>
        </nav>
      </div>
      <div className="container" style={{ alignItems: "center", justifyContent: "center" }}>
        <div id="myDiv" className="container d-flex align-items-end justify-content-around" style={{ margin: "50px 0px", width: "1500px", height: "550px", border: "2px solid steelblue" }}>
          {array.map(([height, key]) => (
            <div key={key} style={{ backgroundColor: 'steelblue', height: `${height}px`, width: `${150 / (arrayLength + 1)}px` }} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sorting;