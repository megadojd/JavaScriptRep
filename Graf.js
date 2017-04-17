class Node {
constructor (name) {
        this.name = name;
		//this.value;
		this.visited=false;
        this.children = [];
	}
}


class Graf {
    constructor (edges){
    	this.nodes = [];
		let createdNodes = new Map();
        for (let edge of edges) {
            let node1, node2;
			let [name1, name2, weight] = edge;
            
			if (!createdNodes.has(name1)){
				node1=new Node(name1);
				createdNodes.set (name1, node1);
				this.nodes.push(node1);                 
            }
            else {
				node1 = createdNodes.get(name1);
			}
			
			if (!createdNodes.has(name2)){
				node2=new Node(name2);
				createdNodes.set (name2, node2);
				this.nodes.push(node2);                 
            }
            else {
				node2 = createdNodes.get(name2);
			}
			node1.children.push([node2, weight]);
		}	
	}

	dfs (root) {
        if (root == null) return;
		console.log(root.name);
		root.visited = true;
		for(let [child, weight] of root.children){
			if(!child.visited) {
				this.dfs(child);
			}
		}
    }

bfs (root) {
	if (!root) {
		return undefined;
	}
	let queue=[];
	queue.push(root);
	while (queue.length>0) {
		let current=queue.shift();
		console.log(current.name);
		for (let [node, weight] of current.children) {
			if (!node.visited) {
				node.visited=true;
				queue.push(node);
			}
		}
	} 

}


bfs_min (start, end) {
	if (!start) {
		return undefined;
	}
	if (!start) {
		return undefined;
	}
	let path=[];


	let queue=[];
	queue.push([start, 0]);
	while (queue.length>0) {
		let [current, weight]=queue.shift();
		console.log(current.name);


		let children=Object.assign([], current.children);
		children.sort(sortFunction);

		for (let [node, weight] of children) {
			if (!node.visited) {
				node.visited=true;
				queue.push([node, weight]);
			}
		}
	} 

}



bfs_min2 (root) {
	if (!root) {
		return undefined;
	}
	let queue=[];
	queue.push(root);
	while (queue.length>0) {
		let current=queue.shift();
		console.log(current.name);
		let min=current.children[0].value;
		let min_node=current.children[0];
		for (let node of current.children) {
			if (!node.visited) {

if (node.value<min) {
	min=node.value;
	min_node=node;
}

				node.visited=true;
				queue.push(node);
			}
		}
	} 

}

}


//let graf = new Graf ([[0,1],[0,4],[0,5],[1,3],[1,4],[3,4],[3,2],[2,1]]);

let graf = new Graf ([[0,1,7],[0,2,1],[0,3,4],[1,4,2],[2,5,3],[3,7,3],[4,6,2],[5,4,1],[5,8,1],[8,7,1]]);

//graf.bfs(graf.nodes[0]);
graf.bfs_min(graf.nodes[0]);

	function sortFunction(a, b){
	  if(a[0] < b[0])
	     return -1 // Или любое число, меньшее нуля
	  if(a[0] > b[0] )
	     return 1  // Или любое число, большее нуля
	  // в случае а = b вернуть 0
	  return 0
	}