import React, { Component } from 'react'
import Xarrow from 'react-xarrows';
class QElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor(x) {
        this.items = [];
    }
    enqueue(element, priority) {
        var qElement = new QElement(element, priority);
        var contain = false;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }
        if (!contain) {
            this.items.push(qElement);
        }
    }
    dequeue() {
        if (this.isEmpty()===true)
            return "Underflow";
        return this.items.shift();
    }
    front() {
        if (this.isEmpty()===true)
            return "No elements in Queue";
        return this.items[0];
    }
    isEmpty() {
        return !this.items.length>0;
    }
    rear()
    {
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[this.items.length - 1];
    }
}

export default class Graph extends Component {
    state = {
        array: [],
        edgeArray: [],
        N: 0,
        addingNode: false,
        addingEdge: 0,
        graph: [],
        error: false,
        addOrRemove:"Add Edge",
        algorithmRunning:false,
        algorithmName:"Dijkstra's Algorithm",
        tableArray:[0]
    }
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            edgeArray: [],
            N: 0,
            addingNode: false,
            graph: [],
            error: false,
            algorithmName:"Dijkstra's Algorithm",
            tableArray:[0]
        }
    }
    componentDidMount = () => {
        this.setState({ array: [[610, 173, 1], [537, 305, 2], [479, 423, 3], [596, 441, 4], [733, 308, 5], [830, 311, 6], [736, 453, 7], [978, 464, 8], [912, 481, 9]], edgeArray: [["1","7",1,-1],["1", "2",2,0], ["1", "5",3 ,1], ["1", "6",4 ,2], ["2", "3", 5,3], ["2", "4", 6,4], ["5", "7", 7,5], ["6", "9", 8,6], ["6", "8", 8,7]], N: 0, addingNode: false, graph: [[1, 4, 5,6], [0, 2, 3], [1], [1], [0, 6], [0, 8, 7], [0,4], [5], [5]], error: false, addingEdge: false,tableArray:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]});
    }
    handleClick = (event) => {
        const x = event.clientX;
        const y = event.clientY;
        if(this.state.array.length===20){
            this.setState({error:true});
            setTimeout(()=>{
                this.setState({error:false});
            },1500)
            return;
        }
        let newArray = this.state.array;
        const len = newArray.length + 1;
        newArray.push([x, y, len]);
        this.setState({ array: newArray })
    }
    handleCreateNode = () => {
        this.setState({ addingNode: true })
        document.getElementById('myDiv').addEventListener("click", this.handleClick);
    }
    handleDoneNode = () => {
        this.setState({ addingNode: 0 })
        document.getElementById('myDiv').removeEventListener("click", this.handleClick);
    }
    handleClear = () => {
        this.setState({ array: [] });
        this.setState({ edgeArray: [] });
    }
    handleAddEdge = () => {
        this.setState({ addingEdge: 1, addOrRemove:"Add Edge"});
    }
    handleRemoveEdge=()=>{
        this.setState({addingEdge:2,addOrRemove:"Remove Edge"});
    }
    
    addEdge = () => {
        if(this.state.addingEdge===1){
        const var1 = document.getElementById('edgeInput1').value;
        const var2 = document.getElementById('edgeInput2').value;
        const var3 = document.getElementById('edgeInput3').value;
        let check = false;
        for (let i = 0; i < this.state.edgeArray.length; i++) {
            if ((this.state.edgeArray[i][0] === var1 + '' && this.state.edgeArray[i][1] === var2 + '')||(this.state.edgeArray[i][1] === var1 + '' && this.state.edgeArray[i][0] === var2 + '')) {
                check = true;
                break;
            }
        }
        if (var1 <= 0 || var2 <= 0 || var1 > this.state.array.length || var2 > this.state.array.length || var1 === var2 || check === true) {
            this.setState({ error: true });
            setTimeout(() => {
                this.setState({ error: false })
            }, 2000)
            return;
        }
        const cloneEdgeArray = this.state.edgeArray;
        cloneEdgeArray.push([var1, var2, parseInt(var3), cloneEdgeArray.length]);
        this.setState({ edgeArray: cloneEdgeArray });

        let newGraph = [];

        for (let i = 1; i <= this.state.array.length; i++) {
            let arrayHere = [];
            for (let j = 0; j < this.state.edgeArray.length; j++) {
                if (i === parseInt(this.state.edgeArray[j][0])) {
                    arrayHere.push(parseInt(this.state.edgeArray[j][1]) - 1);
                }
                if (i === parseInt(this.state.edgeArray[j][1])) {
                    arrayHere.push(parseInt(this.state.edgeArray[j][0]) - 1);
                }
            }
            newGraph.push(arrayHere);
        }
        this.setState({ graph: newGraph});
        }
        else{
        let var1 = document.getElementById('edgeInput1').value;
        let var2 = document.getElementById('edgeInput2').value;
        let check = false;
        for (let i = 0; i < this.state.edgeArray.length; i++) {
            if (this.state.edgeArray[i][0] === var1 + '' && this.state.edgeArray[i][1] === var2 + '') {
                check = true;
                break;
            }
        }
        if (var1 <= 0 || var2 <= 0 || var1 > this.state.array.length || var2 > this.state.array.length || var1 === var2 || check === false) {
            this.setState({ error: true });
            setTimeout(() => {
                this.setState({ error: false })
            }, 2000)
            return;
        }
        var1--;
        var2--;
        let newGraph=this.state.graph;
        for(let i=0;i<newGraph[var1].length;i++){
            if(newGraph[var1][i]===var2){
                newGraph[var1].splice(i,1);
                break;
            }
        }
        for(let i=0;i<newGraph[var2].length;i++){
            if(newGraph[var2][i]===var1){
                newGraph[var2].splice(i,1);
                break;
            }
        }
        let newEdgeArray=this.state.edgeArray;
        for(let i=0;i<newEdgeArray.length;i++){
            let here=newEdgeArray[i][0]-1;
            let also=newEdgeArray[i][1]-1;
            if((here===var1 && also===var2)){
                newEdgeArray.splice(i,1);
                break;
            }
        }
        let temp=var1;
        var1=var2;
        var2=temp;
        newGraph=this.state.graph;
        for(let i=0;i<newGraph[var1].length;i++){
            if(newGraph[var1][i]===var2){
                newGraph[var1].splice(i,1);
                break;
            }
        }
        for(let i=0;i<newGraph[var2].length;i++){
            if(newGraph[var2][i]===var1){
                newGraph[var2].splice(i,1);
                break;
            }
        }
        newEdgeArray=this.state.edgeArray;
        for(let i=0;i<newEdgeArray.length;i++){
            let here=newEdgeArray[i][0]-1;
            let also=newEdgeArray[i][1]-1;
            if((here===var1 && also===var2)){
                newEdgeArray.splice(i,1);
                break;
            }
        }
        this.setState({graph:newGraph,edgeArray:newEdgeArray})
        }
    }
    backFromEdge = () => {
        this.setState({ addingEdge: 0 })
    }

    findEdgeFromNodes=(node1,node2)=>{
        for(let i=0;i<this.state.edgeArray.length;i++){
            if(parseInt(this.state.edgeArray[i][0])===parseInt(node1) && parseInt(this.state.edgeArray[i][1])===parseInt(node2)){
                return i;
            }
            if(parseInt(this.state.edgeArray[i][1])===parseInt(node1) && parseInt(this.state.edgeArray[i][0])===parseInt(node2)){
                return i;
            }
        }
        return -1;
    }

    dfsTimer=0;
    DFS = (node, par, visited, inTime, outTime) => {
        inTime[node] = [this.dfsTimer++,par+1,node+1];
        visited[node] = true;
        for (let x = 0; x < this.state.graph[node].length; x++) {
            let i = this.state.graph[node][x];
            if (!visited[i]) {
                this.DFS(i,node, visited, inTime, outTime);
            }
        }
        outTime[node] = [this.dfsTimer,node,par];
        this.dfsTimer++;
    }
    handleDFS = () => {
        this.setState({algorithmRunning:true});
        this.dfsTimer=0;
        let inTime = [];
        let outTime = [];
        let visited = [];
        for (let i = 0; i < this.state.array.length; i++) {
            visited.push(false);
            inTime.push([]);
            outTime.push([]);
        }
        this.DFS(0, 0, visited, inTime, outTime);
        let last=0;
        for (let i = 0; i < inTime.length; i++) {
            if(inTime[i].length===0){
                continue;
            }
            const bar = document.getElementById('myDiv').childNodes[i];
            let index=3*this.findEdgeFromNodes(inTime[i][1],inTime[i][2]);
            setTimeout(() => {
                bar.style.backgroundColor = 'red';
                if(index>=0){
                    document.getElementsByTagName('path')[index].style.stroke='blue';
                    document.getElementsByTagName('path')[index].style.strokeWidth='5';
                    document.getElementsByTagName('path')[index+1].style.fill='purple';
                    document.getElementsByTagName('path')[index+2].style.fill='purple';
                }
            }, inTime[i][0] * 500);
            setTimeout(() => {
                if(index>=0){
                    document.getElementsByTagName('path')[index].style.stroke='cyan';
                    document.getElementsByTagName('path')[index].style.strokeWidth='3';
                }
            }, inTime[i][0] * 500+500);

            setTimeout(() => {
                bar.style.backgroundColor = 'green';
                if(index>=0){
                    document.getElementsByTagName('path')[index].style.strokeWidth='3';
                }
            }, outTime[i][0] * 500);
            last=outTime[i][0]*500+1500;
        }
        setInterval(()=>{
            this.setState({algorithmRunning:false});
        },last);
    }
    bfstimer=1;
    BFS = (node, visited, inTime, outTime) => {
        this.bfstimer=1;
        let q=[0];
        inTime[0]=[0,1,1];
        visited[0]=true;
        while(q.length>0){
            let node=q[0];
            q.shift();
            for(let i=0;i<this.state.graph[node].length;i++){
                if(!visited[this.state.graph[node][i]]){
                    q.push(this.state.graph[node][i]);
                    visited[this.state.graph[node][i]]=true;
                    inTime[this.state.graph[node][i]]=[this.bfstimer,node+1,1+this.state.graph[node][i]];
                    this.bfstimer++;
                }
            }
            outTime[node]=[this.bfstimer+1,node+1,node+1];
            this.bfstimer++;
        }
    }
    handleBFS = () => {
        this.setState({algorithmRunning:'true'});
        let last=0;
        this.bfstimer=1;
        let inTime = [];
        let outTime = [];
        let visited = [];
        for (let i = 0; i < this.state.array.length; i++) {
            visited.push(false);
            inTime.push([]);
            outTime.push([]);
        }
        this.BFS(0, visited, inTime, outTime);
        for (let i = 0; i < inTime.length; i++) {
            if(outTime[i].length===0){
                continue;
            }
            const bar = document.getElementById('myDiv').childNodes[i];
            let index=3*this.findEdgeFromNodes(inTime[i][1],inTime[i][2]);
            setTimeout(() => {
                bar.style.backgroundColor = 'red';
                if(index>=0){
                    document.getElementsByTagName('path')[index].style.stroke='blue';
                    document.getElementsByTagName('path')[index].style.strokeWidth='5';
                    document.getElementsByTagName('path')[index+1].style.fill='purple';
                    document.getElementsByTagName('path')[index+2].style.fill='purple';
                }
            }, inTime[i][0] * 500);
            
            setTimeout(() => {
                if(index>=0){
                    document.getElementsByTagName('path')[index].style.stroke='cyan';
                    document.getElementsByTagName('path')[index].style.strokeWidth='3';
                }
            }, inTime[i][0] * 500+500);

            setTimeout(() => {
                bar.style.backgroundColor = 'green';
                if(index>=0){
                    document.getElementsByTagName('path')[index].style.strokeWidth='3';
                }
            }, outTime[i][0] * 500);
            last=outTime[i][0]*500+1500;
        }
        setTimeout(() => {
            this.setState({algorithmRunning:false})
        }, last);
    }
    parent=[];
    DSUfind=(node)=>{
        if(node===this.parent[node]){
            return node;
        }
        return this.parent[node]=this.DSUfind(this.parent[node]);
    }
    DSUmerge=(node1,node2)=>{
        let x=(this.DSUfind(node1));
        let y=(this.DSUfind(node2));
        if(x!==y){
            this.parent[y]=x;
        }
    }
    handleMST=()=>{
        this.setState({algorithmRunning:true});
        const finalEdges=[];
        const edges=[];
        this.parent=[];
        for(let i=0;i<this.state.array.length+5;i++){
            this.parent.push(i);
        }
        let original=this.state.edgeArray;
        for(let i=0;i<this.state.edgeArray.length;++i){
            edges.push([original[i][0],original[i][1],original[i][2]?original[i][2]:500,original[i][3]]);
        }
        this.setState({edgeArray:edges})
        edges.sort(function(x,y){
            return x[2]-y[2];
        });
        console.log(edges)
        for(let i=0;i<edges.length;i++){
            const node1=parseInt(edges[i][0]);
            const node2=parseInt(edges[i][1]);
            if(this.DSUfind(node1)!==this.DSUfind(node2)){
                this.DSUmerge(node1,node2);
                finalEdges.push(edges[i]);
            }
        }
        let j=0;
        for(let i=0;i<edges.length;i++){
            setTimeout(()=>{
                if(edges[i]===finalEdges[j]){
                    const edgeIndex=this.findEdgeFromNodes(edges[i][0],edges[i][1])*3;
                    const edge=document.getElementsByTagName('path')[edgeIndex];
                    edge.style.stroke='blue';
                    setTimeout(()=>{
                        edge.style.stroke='cyan'
                        edge.style.strokeWidth='4px'
                        document.getElementsByTagName('path')[edgeIndex+1].style.fill='purple';
                        document.getElementsByTagName('path')[edgeIndex+2].style.fill='purple';
                    },400)
                    j++;
                }
                else{
                    const edgeIndex=this.findEdgeFromNodes(edges[i][0]-'',edges[i][1]-'')*3;
                    const edge=document.getElementsByTagName('path')[edgeIndex];
                    edge.style.stroke='blue';
                    setTimeout(()=>{
                        edge.style.stroke='gray'
                        edge.style.strokeWidth='2px'
                    },400)
                }
            },i*500)
        }
        setTimeout(() => {
            this.setState({algorithmRunning:false})
        }, edges.length*500+1000);
    }
    // Dijkstra's Algorithm
    setTable=(distances)=>{
        for(let i=1;i<=this.state.array.length;i++){
            const row=document.getElementById('tableDiv').childNodes[i];
            row.childNodes[1].innerHTML=distances[i-1];
        }
    }
    handleDijkstra = () => {
        this.setState({algorithmRunning:true,algorithmName:"Dijkstra's Algorithm"});
        let newArray=[];
        for(let i=0;i<this.state.array.length+1;i++){
            newArray.push(i);
        }
        this.setState({tableArray:newArray})
        const firstRow=document.getElementById('tableDiv').childNodes[0];
        firstRow.childNodes[0].innerHTML="Node";
        firstRow.childNodes[1].innerHTML="Distance";
        for(let i=1;i<=this.state.array.length;i++){
            const row=document.getElementById('tableDiv').childNodes[i];
            row.childNodes[0].innerHTML=i;
        }
        let startNode=0;
        let distances = [];
        let distanceArray=[];
        let prev = [];
        let pq = new PriorityQueue();
        let animations=[]
        for(let i=0;i<this.state.array.length;i++){
            if(i!==startNode){
                distances.push(Infinity);
                pq.enqueue(i,Infinity);
            }
            else{
                distances.push(0);
                pq.enqueue(i,0);
            }
            prev.push(i);
        }
        for(let i=0;i<distances.length;i++){
            distanceArray.push(distances[i]);
        }
        while (!pq.isEmpty()) {
            let minNode = pq.dequeue();
            let currNode = minNode.element;
            animations.push([currNode,-1]);
            this.state.graph[currNode].forEach(neighbor => {
                let alt = distances[currNode] + this.state.edgeArray[this.findEdgeFromNodes(minNode.element+1,neighbor+1)][2];
                if (alt < distances[neighbor]) {
                    animations.push([currNode,neighbor,'less']);
                    distances[neighbor] = alt;
                    prev[neighbor] = currNode;
                    pq.enqueue(neighbor, distances[neighbor]);
                    for(let i=0;i<distances.length;i++){
                        distanceArray.push([distances[i],neighbor,animations.length]);
                    }
                }
                else{
                    animations.push([currNode,neighbor,'notLess']);
                }
            });
            animations.push([currNode,-2]);
        }
        for(let i=0;i<animations.length;i++){
            let x=animations[i];
            if(x[1]===-1){
                setTimeout(()=>{
                    const node=document.getElementById('myDiv').childNodes[x[0]];
                    node.style.backgroundColor='red';
                },i*500)
            }
            else if(x[1]===-2){
                setTimeout(()=>{
                    const node=document.getElementById('myDiv').childNodes[x[0]];
                    node.style.backgroundColor='steelblue';
                },i*500)
            }
            else{
                setTimeout(()=>{
                    const edge=document.getElementsByTagName('path')[this.findEdgeFromNodes(x[0]+1,x[1]+1)*3];
                    const node=document.getElementById('myDiv').childNodes[x[1]];
                    edge.style.strokeWidth='5px';
                    edge.style.stroke='orange';
                    if(x[2]==='less'){
                        node.style.backgroundColor='violet';
                    }
                    else{
                        node.style.backgroundColor='pink';
                    }
                },i*500)
                setTimeout(()=>{
                    const edge=document.getElementsByTagName('path')[this.findEdgeFromNodes(x[0]+1,x[1]+1)*3];
                    const node=document.getElementById('myDiv').childNodes[x[1]];
                    edge.style.strokeWidth='3px';
                    edge.style.stroke='purple';
                    node.style.backgroundColor='steelblue';
                },i*500+400)
            }
        }
        for(let i=0;i<distanceArray.length;i+=this.state.array.length){
            setTimeout(()=>{
                const arrayHere=[];
                for(let j=0;j<this.state.array.length;j++){
                    arrayHere.push(distanceArray[j+i][0]);
                }
                const row=document.getElementById('tableDiv').childNodes[distanceArray[i][1]+1];
                row.style.backgroundColor='cyan';
                setTimeout(()=>{
                    row.style.backgroundColor='white';
                },500)
                this.setTable(arrayHere);
            },distanceArray[i][2]*500);
        }
        console.log(distanceArray)
        setTimeout(()=>{
            this.setState({algorithmRunning:false});
        },animations.length*500+1000)
    }
    render() {
        return (
            <>
                {/* Navbar */}
                <div className="container" style={{ alignItems: "center", justifyContent: "center" }}>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ borderRadius: "0px 0px 10px 10px", height: "75px" }}>

                        <a className="navbar-brand" href="/" style={{ margin: "0px 15px", fontSize: "30px" }}>AlgoVisualizer</a>

                        {!this.state.addingEdge && <button className="btn btn-dark" onClick={this.handleCreateNode}disabled={this.state.algorithmRunning} >Add Nodes</button>}
                        {!this.state.addingNode && !this.state.addingEdge && <button className="btn btn-dark" disabled={this.state.algorithmRunning} onClick={this.handleAddEdge}>Add Edge</button>}
                        {!this.state.addingNode && !this.state.addingEdge && <button className="btn btn-dark" disabled={this.state.algorithmRunning} onClick={this.handleRemoveEdge}>Remove Edge</button>}
                        {!this.state.addingEdge && !this.state.addingNode && <button className="btn btn-dark" disabled={this.state.algorithmRunning} onClick={this.handleClear}>Clear Graph</button>}
                        {!this.state.addingEdge && !this.state.addingNode && <button className="btn btn-dark" disabled={this.state.algorithmRunning} onClick={this.handleDFS}>DFS</button>}
                        {!this.state.addingEdge && !this.state.addingNode && <button className="btn btn-dark" disabled={this.state.algorithmRunning} onClick={this.handleBFS}>BFS</button>}
                        {!this.state.addingEdge && !this.state.addingNode && <button className="btn btn-dark" disabled={this.state.algorithmRunning} onClick={this.handleMST}>MST</button>}
                        {!this.state.addingEdge && !this.state.addingNode && <button className="btn btn-dark" disabled={this.state.algorithmRunning} onClick={this.handleDijkstra}>Dijkstra</button>}

                        {this.state.addingNode && <button className='btn btn-dark' onClick={this.handleDoneNode}>Done</button>}
                        {this.state.addingEdge && <input style={{ width: "80px", margin: "5px", backgroundColor: "white" }} id='edgeInput1' type="number" placeholder='From'/>}
                        {this.state.addingEdge && <input style={{ width: "80px", margin: "5px" , backgroundColor: "white"}} id='edgeInput2' type="number" placeholder='To'/>}
                        {this.state.addingEdge===1 && <input style={{ width: "80px", margin: "5px" , backgroundColor: "white"}} id='edgeInput3' type="number" placeholder='Weight'/>}
                        {this.state.addingEdge && <button onClick={this.addEdge} className="btn btn-dark">{this.state.addOrRemove}</button>}
                        {this.state.addingEdge && <button onClick={this.backFromEdge} className="btn btn-dark">Back</button>}

                    </nav>
                </div>
                {this.state.error && <div className="container" id="errorDiv" style={{ margin: '3px', color: 'red', textAlign: 'center', position: "fixed" }}>Please enter valid Node-Values to add an Edge</div>}
                <div className="d-flex" style={{alignItems:'center',justifyContent:'center'}}>
                    <div style={{ margin: "50px 0px", height: "550px", width: "990px", border: "2px solid steelblue"}}>
                    <div id="myDiv" className="container" style={{margin:'0px 50px 50px 0px',height: '500px',width:'940px'}}>
                        {this.state.array.map((element) => (
                            <div key={element[2]} className="user" id={element[2]} style={{ alignItems:'center',color: 'white', fontSize: "20px", textAlign: 'center', padding: "10px", left: element[0] + "px", top: element[1] + "px", position: "absolute", borderRadius: "50px", backgroundColor: "steelblue", height: 50, width: 50 }}>{element[2]}</div>
                        ))}
                        {this.state.edgeArray.map((element) => (
                            <Xarrow key={element[3]} labels={{ middle:<div style={{ borderRadius:'15px',backgroundColor:'white',fontWeight:'revert',fontSize: "1em"}}>{element[2]}</div>}} showTail={true} tailShape={'arrow1'} tailColor={'red'} tailSize={3} zIndex={-1} animateDrawing={0.1} headColor={'red'} headSize={3} color={'black'} strokeWidth={3} path={'smooth'} curveness={0.0} start={element[0]} end={element[1]} />                  
                        ))}
                    </div>
                    </div>
                    <div id='infoDiv' className="container" style={{ margin: "50px 10px",height: "550px", width: "300px", border: "2px solid steelblue", justifyContent: "center" }}>
                        <h3>{this.state.algorithmName}</h3>
                        <div id="colorIndex">

                        </div>
                        {this.state.algorithmName==="Dijkstra's Algorithm" && <div id="tableDiv">
                            {this.state.tableArray.map((element)=>(
                                <div key={element} className='d-flex' style={{alignItems:'flex-start',width:'200px',height:'20px',border:'0.5px solid steelblue'}}>
                                    <div style={{fontSize:'12px',height:'20px',width:'50%',lineHeight:'20px', textAlign:'center',justifyContent:'center',border:'0.5px solid steelblue'}}></div>
                                    <div style={{fontSize:'12px',height:'20px',width:'50%',lineHeight:'20px', textAlign:'center',justifyContent:'center',border:'0.5px solid steelblue'}}></div>
                                </div>
                            ))}
                        </div>}
                    </div>
                </div>
            </>
        )
    }
}