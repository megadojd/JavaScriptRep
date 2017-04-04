class Node {
constructor (name) {
        this.name = name;
		this.value;
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
			let [name1, name2] = edge;
            
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
			node1.children.push(node2);
		}	
	}

	dfs (root) {
        if (root == null) return;
		console.log(root.name);
		root.visited = true;
		for(let child of root.children){
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
		for (let node of current.children) {
			if (!node.visited) {
				node.visited=true;
				queue.push(node);
			}
		}
	}

}


}




let graf = new Graf ([[0,1],[0,4],[0,5],[1,3],[1,4],[3,4],[3,2],[2,1]]);
graf.bfs(graf.nodes[0]);
