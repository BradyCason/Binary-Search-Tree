class Node{
    constructor(data = null, left = null, right = null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree{
    constructor(array = null){
        this.root = this.buildTree(this.mergesort(this.removeDuplicates(array)))
    }

    removeDuplicates(array){
        let values = []
        for (let i = 0; i < array.length; i++){
            if(!(values.includes(array[i]))){
                values.push(array[i])
            }
        }
        return values
    }

    mergesort(list){
        if(list.length <= 1){
            return list
        }
        else{
            let listA = this.mergesort(list.slice(0, Math.round(list.length/2)))
            let listB = this.mergesort(list.slice(Math.round(list.length/2), list.length))
    
            let combinedList = []
            while(listA.length > 0 || listB.length > 0){
                if(listA.length == 0){
                    combinedList.push(listB.shift())
                }
                else if(listB.length == 0){
                    combinedList.push(listA.shift())
                }
                else if(listA[0] > listB[0]){
                    combinedList.push(listB.shift())
                }
                else{
                    combinedList.push(listA.shift())
                }
            }
            return combinedList
        }
    }

    buildTree(array, left = 0, right = (array.length - 1)){
        if(array.slice(left, right + 1).length == 0){
            return;
        }
        if(array.slice(left, right + 1).length == 1){
            return new Node(array.slice(left, right + 1)[0])
        }

        let mid = Math.round((left + right) / 2);

        let newNode = new Node(array[mid], this.buildTree(array, left, mid - 1), this.buildTree(array, mid + 1, right))
        return newNode;
    }

    insert(value, node = this.root){
        if (value < node.data){
            if (node.left){
                this.insert(value, node.left)
            }
            else{
                node.left = new Node(value)
            }
        }
        else if (node.right){
                this.insert(value, node.right)
        }
        else{
                node.right = new Node(value)
            }
    }

    deleteItem(value, node = this.root, nodeAbove = null, pathHere = null){
        if (value == node.data){
            if (node.left && node.right){
                // find node.rights left most item
                let nextNode = node.right
                while (nextNode.left){
                    nextNode = nextNode.left
                }
                this.deleteItem(nextNode.data)
                node.data = nextNode.data
            }
            else if (node.left){
                if (pathHere == "right"){
                    nodeAbove.right = node.left
                }
                else if (pathHere == "left"){
                    nodeAbove.left = node.left
                }
            }
            else if (node.right){
                if (pathHere == "right"){
                    nodeAbove.right = node.right
                }
                else if (pathHere == "left"){
                    nodeAbove.left = node.right
                }
            }
            else{
                if (nodeAbove){
                    if (pathHere == "right"){
                        nodeAbove.right = null
                    }
                    else if (pathHere == "left"){
                        nodeAbove.left = null
                    }
                }
                else{
                    this.root = null
                }
            }
        }
        else if (value < node.data && node.left){
            this.deleteItem(value, node.left, node, "left")
        }
        else if (node.right){
            this.deleteItem(value, node.right, node, "right")
        }
    }

    find(value, node = this.root){
        if (node.data == value){
            return node;
        }
        else if (value < node.data){
            return this.find(value, node.left);
        }
        else {
            return this.find(value, node.right);
        }
    }

    levelOrder(callback = (node) => {return(node.data)}, node = this.root){
        let queue = [node]
        let returnList = []
        while (queue.length > 0){
            let nextNode = queue.shift()
            if (nextNode.left){
                queue.push(nextNode.left)
            }
            if (nextNode.right){
                queue.push(nextNode.right)
            }

            returnList.push(callback(nextNode))
        }
        return returnList
    }

    inOrder(callback = (node) => {return(node.data)}, node = this.root){
        let returnList = []

        let rightItems;
        let leftItems;
        if (node.left){
            leftItems = this.inOrder(callback, node.left)
            leftItems.forEach(item => {
                returnList.push(item)
            });
        }
        returnList.push(callback(node))
        if (node.right){
            rightItems = this.inOrder(callback, node.right)
            rightItems.forEach(item => {
                returnList.push(item)
            });
        }

        return returnList;
    }

    preOrder(callback = (node) => {return(node.data)}, node = this.root){
        let returnList = [callback(node)]

        let rightItems;
        let leftItems;
        if (node.left){
            leftItems = this.preOrder(callback, node.left)
            leftItems.forEach(item => {
                returnList.push(item)
            });
        }
        if (node.right){
            rightItems = this.preOrder(callback, node.right)
            rightItems.forEach(item => {
                returnList.push(item)
            });
        }

        return returnList;
    }

    postOrder(callback = (node) => {return(node.data)}, node = this.root){
        let returnList = []

        let rightItems;
        let leftItems;
        if (node.left){
            leftItems = this.postOrder(callback, node.left)
            leftItems.forEach(item => {
                returnList.push(item)
            });
        }
        if (node.right){
            rightItems = this.postOrder(callback, node.right)
            rightItems.forEach(item => {
                returnList.push(item)
            });
        }

        returnList.push(callback(node))

        return returnList;
    }

    height(node){
        if (!(node.left || node.right)){
            return 0
        }

        let leftHeight = 0;
        let rightHeight = 0;
        if (node.left){
            leftHeight = this.height(node.left) + 1
        }
        if (node.right){
            rightHeight = this.height(node.right) + 1
        }
        if (leftHeight > rightHeight){
            return leftHeight
        }
        return rightHeight
    }

    depth(node, rootNode = this.root){
        if (node.data == rootNode.data){
            return 0;
        }
        

        if (node.data < rootNode.data){
            return this.depth(node, rootNode.left) + 1;
        }
        else {
            return this.depth(node, rootNode.right) + 1;
        }
    }

    isBalanced(node = this.root){
        let rightHeight;
        let leftHeight;

        let currentBal = true;
        let leftBal = true;
        let rightBal = true;
        if (node.left){
            leftBal = this.isBalanced(node.left)
            leftHeight = this.height(node.left)
        }
        else{
            leftHeight = -1;
        }
        if (node.right){
            rightBal = this.isBalanced(node.right)
            rightHeight = this.height(node.right)
        }
        else {
            rightHeight = -1;
        }

        if (Math.abs(rightHeight - leftHeight) > 1){
            currentBal = false
        }

        if (currentBal && rightBal && leftBal){
            return true;
        }
        return false;
    }

    rebalance(){
        this.root = this.buildTree(this.inOrder())
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node == null) {
            return;
        }
        if (node.right) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };
}