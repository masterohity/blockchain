const crypto = require("crypto");

class Block {
constructor (index, timestamp, data, previousHash=''){
this.index = index;
this.timestamp= timestamp;
this.data = data;
this.previousHash = previousHash;
this.hash = this.calculateHash();
}
calculateHash(){
    return crypto.createHash('SHA256').update(this.previousHash + this.timestamp + JSON.stringify(this.data)).digest('hex');
}
}

// const bkl1 = new Block(1, "9/8/24", {amount:2});
// console.log(bkl1);

class Blockchain{
    constructor(){
        this.chain = [this.genesisBlock()];
    }
genesisBlock(){
    return new Block(0, "1/8/24", {amount:0}, "0000"); 
}
getLatestBlock(){
    return this.chain[this.chain.length - 1];
}
addBlock(newBlock){
newBlock.previousHash = this.getLatestBlock().hash;
newBlock.hash= newBlock.calculateHash();
this.chain.push(newBlock);
}
validateChain(){
    for(let i = 1;i < this.chain.length; i++){
        const curBlock = this.chain[i];
        const prevBlock = this.chain[i-1];
    
        if(curBlock.hash !== curBlock.calculateHash()){
            return false;
        }
        if(curBlock.previousHash !== prevBlock.calculateHash() ){
    return false;
        }

    }
    return true;
}
}

// let bctCoin = new Blockchain();
// bctCoin.addBlock(new Block(1, "09/08/24",{amount:4}));
// bctCoin.addBlock(new Block(2, "10/8/24", {amount:5}));

// console.log(JSON.stringify(bctCoin,null,3));

let bctCoin = new Blockchain();
bctCoin.addBlock(new Block(1, "09/08/24",{amount:4}));
bctCoin.addBlock(new Block(2, "10/8/24", {amount:5}));
console.log("Is Chain is Valid?:", bctCoin.validateChain());

//after adding data again
bctCoin.chain[1].data= {amount:16205};
bctCoin.chain[1].hash = bctCoin.chain[1].calculateHash();
console.log("Is Chain is Valid?:", bctCoin.validateChain());
