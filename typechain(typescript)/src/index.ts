import * as CryptoJS from 'crypto-js';

class Block {
  // static: 생성자 없이 사용 가능한 함수
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string,
  ): string => {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
  };

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === 'number' &&
    typeof aBlock.hash === 'string' &&
    typeof aBlock.previousHash === 'string' &&
    typeof aBlock.data === 'string' &&
    typeof aBlock.timestamp === 'number';

  constructor(
    public index: number,
    public hash: string,
    public previousHash: string,
    public data: string,
    public timestamp: number,
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(0, '2020202020202', '', 'Hello', 123456);

const blockchain: Block[] = [genesisBlock];

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const getHashforBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  }
  if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  }
  if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  }
  if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  }
  return true;
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();

  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimestamp,
    data,
  );

  const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);

  addBlock(newBlock);

  return newBlock;
};

createNewBlock('second Block');
createNewBlock('third Block');
createNewBlock('fourth Block');

console.log(blockchain);
