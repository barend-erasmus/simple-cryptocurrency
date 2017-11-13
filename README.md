# Simple Cryptocurrency

## How it works?

Cryptocurrencies are decentralized and nodes communicated via P2P(Peer to Peer) protocols.

The objective(s) of this project is as follow:

* Demonstrate how cryptocurrencies makes use of the blockchain technology.
* Web Browser Based.
* No central database/datastore.

To demonstrate how cryptocurrencies makes use of the blockchain technology we decided to exclude some of the features of Bitcoin, Ethereum and Litecoin and only focus on the core features of which all cryptocurrencies include.

The only P2P protocol suitable for a Web Browser Based, was [Web Sockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API). 

We implemented a Web Sockets server which only forwards the data to all or one node. By implementing it this way, we still have a decentalized system and do not require a database or datastore.

![](https://github.com/barend-erasmus/simple-cryptocurrency/raw/master/images/diagram.png)

## Resources

[Github - Naive Blockchain](https://github.com/lhartikk/naivechain)

[Blog - Naive Blockchain](https://medium.com/@lhartikk/a-blockchain-in-200-lines-of-code-963cc1cc0e54)