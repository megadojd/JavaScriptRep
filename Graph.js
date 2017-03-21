let Node=function(value) {
    this.value=value;
    this.lines=[];
}

let Graph=function() {
    this.nodes=[];
    this.addNode=function(value) {

let node = this.find(value);
if (node) {
    //node.lines.push();
} else {
        this.nodes.push(new Node(value));
}

    }

    this.find=function(value) {
 //       return this.nodes.find(function(node) {
  //          return node.value === value;
   //     });

  for (let i=0, l=this.nodes.length; i<l; i++) {
        if (this.nodes[i].value===value) {
            return this.nodes[i];
        }
  }
        return undefined;
    }

    this.addLine=function(startValue, endValue, weight) {
       // Найдём вершины для каждого из значений.
        let startNode = this.find(startValue);
        let endNode = this.find(endValue);

      // Ругнёмся, если не нашли одной или другой.
      if (!startNode || !endNode) {   
            throw new Error('Обе вершины должны существовать');
       }

       // В стартовую вершину startNode добавим ссылку на конечную вершину endNode.
        startNode.lines.push([endNode, weight]);
    }

    this.DFS=function DFS () {
        let clone=this.nodes;
        let start_node=clone[0];
        this.DFS_helper(this.nodes[0]);

    }

    this.DFS_helper=function(start_node) {
        if (start_node.lines) {
        while (start_node.lines.length>0) {
            let next_element=start_node.lines[0];//.shift();
            console.log(next_element[0].value);
            this.DFS_helper(next_element[0]);
        }
        } else {
            //console.log(next_element.value);
        }
    }



}

let inputArray=[
    [0,3,5],
    [1,3,11],
    [2,3,56],
    [4,3,77],
    [5,4,89]
];

function MakeGraph(inputArray) {
    let graph = new Graph();
    for (let i=0, l=inputArray.length; i<l; i++) {
        let current=inputArray[i];
        //console.log(i);
        graph.addNode(current[0]);
        graph.addNode(current[1]);
        graph.addLine(current[0], current[1], current[2]);
        //graph.addLine(current[1], current[0], current[2]);
    }
    return graph;
}

let graph=MakeGraph(inputArray);
graph.DFS();
