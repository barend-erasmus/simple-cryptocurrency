# Simple Cryptocurrency

## How it works?

Cryptocurrencies are decentralized and nodes communicated via P2P(Peer to Peer) protocols.

The objective(s) of this project is as follows:

* Demonstrate how cryptocurrencies make use of the blockchain technology.
* Web Browser Based.
* No central database/datastore.

To demonstrate how cryptocurrencies make use of the blockchain technology we decided to exclude some of the features of Bitcoin, Ethereum, and Litecoin and only focus on the core features of which all cryptocurrencies include.

The only P2P protocol suitable for a Web Browser Based, was [Web Sockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API). 

We implemented a Web Sockets server which only forwards the data to all or one node. By implementing it this way, we still have a decentralized system and do not require a database or datastore.

![](https://github.com/barend-erasmus/simple-cryptocurrency/raw/master/images/diagram.png)

### Startup

When a new node starts-up it has an empty blockchain and will send a request to a random node in which it will respond with the full blockchain.

### Receiving a full blockchain

When a node receives a full blockchain it does a few validations before accepting it.

The validations are:

* Blockchain received should be longer than the one it currently has.
* All blocks in the blockchain should be valid. See below how a valid block is defined.

If all the validations are met, it will replace its own blockchain with the received blockchain.

### Receiving a block

When a node receives a block it does a few validations before accepting it.

The validations are:

* Block should be valid.
* Block should be the next block in the chain by index.
* Transaction(s) in the block should be valid. See below how a valid transaction is defined.

If all the validations are met, it will add the block to its own blockchain.

### Receiving a transaction

When a node receives a transaction is will bundle it with other transactions and create a block.

This block will then be mined and once successfully mined, it will add it to its own blockchain and broadcast the block to other nodes.

## How are blocks validated?

* Hash should be valid.
* Transaction(s) should be valid.

## How are transactions validated?

* The signature should be valid.
* According to the ledger, the `from address` needs to have sufficient funds.

## Where can I see this project running?

[Join Simple Cryptocurrency](http://simple-cryptocurrency.openservices.co.za/)

## Resources

[Github - Naive Blockchain](https://github.com/lhartikk/naivechain)

[Blog - Naive Blockchain](https://medium.com/@lhartikk/a-blockchain-in-200-lines-of-code-963cc1cc0e54)