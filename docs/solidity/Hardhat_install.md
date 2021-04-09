---
title: Hardhat 安装 #
date: '2021-1-3'
sidebar: 'auto'
categories:
- 区块链
tags:
- solidity
publish: true
---

> [Hardhat 官方文档](https://hardhat.org/config/#solidity-configuration)   
> [Openzeppelin learn](https://docs.openzeppelin.com/learn/developing-smart-contracts)

## npm 初始化, `npm init -y`

```
$ npm init -y

Wrote to G:\workspace\DApp\learn-hardhat\package.json:

{
  "name": "learn-hardhat",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```


## hardhat 安装, `npm install --save-dev hardhat`

```shell
$ npm install --save-dev hardhat
```


## hardhat 运行, `npx hardhat`

```shell
$ npx hardhat
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

Welcome to Hardhat v2.1.1

√ What do you want to do? · Create a sample project
√ Hardhat project root: · G:\workspace\DApp\learn-hardhat
√ Do you want to add a .gitignore? (Y/n) · y
√ Help us improve Hardhat with anonymous crash reports & basic usage data? (Y/n) · true

You need to install these dependencies to run the sample project:
  npm install --save-dev "hardhat@^2.1.1" "@nomiclabs/hardhat-waffle@^2.0.0" "ethereum-waffle@^3.0.0" "chai@^4.2.0" "@nomiclabs/hardhat-ethers@^2.0.0" "ethers@^5.0.0"

Project created

Try running some of the following tasks:
  npx hardhat accounts
  npx hardhat compile
  npx hardhat test
  npx hardhat node
  node scripts/sample-script.js
  npx hardhat help

```


## 编译
* ### 配置solc版本, 我们在中指定了Solidity 0.7.3 solc版本hardhat.config.js。

    ```
    // hardhat.config.js

    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    module.exports = {
    solidity: "0.7.3",
    };
    ```

* ### compile, `npx hardhat compile`

    ```
    $ npx hardhat compile
    Downloading compiler 0.7.3
    Compiling 1 file with 0.7.3
    Compilation finished successfully
    ```

## 部署只能合约

* ### 配置本地开发环境 `Hardhat Network` 
  ```shell
  $ npx hardhat node
  ``` 


* ### 脚本部署
  ```javascript
  // scripts/deploy.js
  async function main() {
    // We get the contract to deploy
    const Box = await ethers.getContractFactory("Box");
    console.log("Deploying Box...");
    const box = await Box.deploy();
    await box.deployed();
    console.log("Box deployed to:", box.address);
  }

  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  ```
  > 我们在脚本中使用了ethers，因此我们需要安装`ethers`,`@nomiclabs/hardhat-ethers`插件。
  ```
  $ npm install --save-dev @nomiclabs/hardhat-ethers ethers
  ```
  > 我们需要添加我们正在使用插件的 [配置](https://hardhat.org/config/) `@nomiclabs/hardhat-ethers`
  ```javascript
  // hardhat.config.js
  require('@nomiclabs/hardhat-ethers');

  module.exports = {
  ...
  };
  ```
  > 使用run命令，我们可以将Box合同部署到本地网络（Hardhat Network）
  ```shell
  $ npx hardhat run --network localhost scripts/deploy.js
  Deploying Box...
  Box deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
  ```


* ### 从控制台进行交互
  > 随着我们的Box合同部署，我们就可以开始使用它的时候了。   
  > 我们将使用安全帽控制台与Box本地网络上已部署的合同进行交互。

  ```
  npx hardhat console --network localhost
  > const Box = await ethers.getContractFactory("Box")
  undefined
  > const box = await Box.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3")
  undefined
  ```








