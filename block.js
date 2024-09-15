const SHA256 = require('crypto-js/sha256');

class transactions{
    constructor(fromAdd, toAdd, amount){ 
        this.fromAdd = fromAdd; 
        this.toAdd= toAdd; 
        this.amount= amount;
    }
}

class Block {
constructor (timestamp, transactions, previousHash=''){
this.timestamp= timestamp;
this.transactions= transactions
this.previousHash = previousHash;
this.hash = this.calculateHash();
this.nonce = 0;
}
calculateHash(){
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).tostring()
}

mineBlock(difficulty){
while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
    this.nonce++;
    this.hash= this.calculateHash();
}
console.log("Block mined: "+ this.hash);
}
}

// const bkl1 = new Block(1, "9/8/24", {amount:2});
// console.log(bkl1);


class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty=2;
        this.pendingTransc=[];
        this.miningReward= 50;
    }

 //first block   
createGenesisBlock(){
    return new Block("1/8/24", "Genisis Block", "0000"); 
}

//last block
getLatestBlock(){
    return this.chain[this.chain.length - 1];
}

//------Addblock ---------
// addBlock(newBlock){
// newBlock.previousHash = this.getLatestBlock().hash;
// newBlock.hash= newBlock.calculateHash();
// this.chain.push(newBlock);
// }
//------Addblock ---------

//mining process
minePendingTransc(miningRewardAdd) {
    let block = new Block(Date.now(), this.pendingTransc);
    block.previousHash = this.getLatestBlock().hash;
    block.mineBlock(ths.difficulty);
    console.log("Block Sucessfully mined");
    this.chain.push(block);
    this.pendingTransc= [
        new transactions(null, miningRewardAdd, this.miningReward)
    ]
}

//transaction create
createTransc(transc){
    this.pendingTransc.push(transc);
}

//wallet of miner
getBalance(add){
    let balance = 0;
    for (const block of this.chain) {
        for (const trans of block.transactions){
            if(trans.fromAdd === add){
                balance -= trans.amount;
            }

            if(trans.toAdd = add){
                balance += trans.amount
            }
        }
    }
    return balance
}

//chain validate
isChainValid(){
    for(let i = 1;i < this.chain.length; i++){
        const curBlock = this.chain[i];
        const prevBlock = this.chain[i-1];
    
        if(curBlock.hash !== curBlock.calculateHash()){
            return false;
        }
        if(curBlock.prevBlock !== prevBlock.calculateHash()){
            return false;
        }
    }
    return true;
}


}


let masterCoin = new Blockchain();
masterCoin.createTransc(new transactions('Rohit', 'Aman', 500));
masterCoin.createTransc(new transactions('Aman', 'Bharti', 600));
masterCoin.createTransc(new transactions('Bharati', 'Aryan', 500));

console.log('\nSatrting the mining....');
masterCoin.minePendingTransc('Shantanu');

console.log('\nBalance of Shantanu is ',masterCoin.getBalance('Shantanu'));
masterCoin.minePendingTransc('Shantanu');

console.log('\nBalance of Shantanu is ',masterCoin.getBalance('Shantanu'));
console.log('\nBalance of Rohit is ',masterCoin.getBalance('Rohit'));





// -------Data--------

// let bctCoin = new Blockchain();
// bctCoin.addBlock(new Block(1, "09/08/24",{amount:4}));
// bctCoin.addBlock(new Block(2, "10/8/24", {amount:5}));

// console.log(JSON.stringify(bctCoin,null,3));

// let bctCoin = new Blockchain();
// bctCoin.addBlock(new Block(1, "09/08/24",{amount:4}));
// bctCoin.addBlock(new Block(2, "10/8/24", {amount:5}));
// console.log("Is Chain is Valid?:", bctCoin.validateChain());

// //after adding data again
// bctCoin.chain[1].data= {amount:16205};
// bctCoin.chain[1].hash = bctCoin.chain[1].calculateHash();
// console.log("Is Chain is Valid?:", bctCoin.validateChain());

//-------Data-----------