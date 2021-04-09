---
title: Solidity v_0.7.0+ 学习笔记
date: '2021-2-3'
sidebar: 'auto'
categories:
- 区块链
tags:
- solidity
publish: true
---



### 函数定义 `function` 
* 语法
    > function (<parameter types>) [parivate|internal|external|public] [pure|view|payable] (returns()) {}
    * `internal` 修饰的函数, 可以在合约内部或子合约中调用, 不能在外部调用
    * `external` 修饰的函数, 只能在合约外部调用，不能在合约内部调用
    * `view` 视图函数
    * `Pure` 纯函数
    * 返回值
 
* 修饰符 `parivate`|`internal`|`external`|`public`
    ```
    contract ModifierFather{
        // internal 修饰的函数, 可以在合约内部或继承合约中调用, 不能在外部调用
        function internalFun() internal pure returns(string memory) {
            return "internal";
        }
        
        // external 修饰的函数, 只能在合约外部调用，不能在合约内部调用
        function externalFun() external pure returns(string memory) {
            return "external";
        }
        
        function fun2() public pure returns(string memory) {
            return internalFun();
        }
        
        function fun4() public view returns(string memory) {
            // this.externalFun() 等价于从外部调用 externalFun
            return this.externalFun();
        }
        
    }

    contract ModifierSon is ModifierFather {
        
        function fun3() public pure returns(string memory) {
            return internalFun();
        }
        
    }

    // external 修饰的函数, 调用的第二种方式, 在另一个合约中 new一个合约，在调用
    contract externalTest {
        ModifierFather f = new ModifierFather();
        
        function fun1() public view returns(string memory) {
            return f.externalFun();
        }
        
    }
    ```

* `result`
    ```
    contract funReturn{
        
        // 可以直接为返回值复制
        function fun() public pure returns(uint num){
            num = 100;
        }
        
        // 可以有多返回值
        function fun1() public pure returns(uint num, uint num1){
            num = 100;
            num1 = 200;
        }
        
        // 使用 return(parame list)
        function fun2() public pure returns(uint num, string memory str){
            return (100,"Sinon");
        }
    
    }
    ```

### `constructor` 构造函数，部署合约时被执行. 与java类似
```
contract constructorTest{
    
    address owner;
    uint public a;
    string public b;
    
    constructor(uint _a, string memory _b){
        owner = msg.sender;
        a = _a;
        b = _b;
    }
    
}

```

### 数据类型 

* `address` 地址类型， 地址长度40位, 在内存种存储方式等价于 uint160, 可以相互强制转换
* `string` 字符串
* `uint` 二进制

#### `constant` 常量关键字
```
contract constantTest{
    
    uint constant num  = 100;
    string constant str = "Tan";
    
    function fun1(uint a) public view returns(uint){
        // 内部函数不可使用 constant
        //uint constant c = 100;
        
        // constant 申明的变量不可被修改
        // num = a;
        return num;   
    }
}

```


### `payable` 关键字

```solidity
// payable 关键字代表我们可以通过这个函数给我们合约地址转账，充值
contract payableTest{
    
    function pay() public payable {
        
    }
    
    function getAccountBalance(address account) public view returns(uint) {
        return account.balance;
    }
    
    // `account.transfer`代表给账号转账
    // 如果函数没有如何操作，但是有`payable`属性，会直接转入至合约地址
    function transfer(address payable account) public payable {
        account.transfer(msg.value);
    }
    
    function sendMoney() public payable{
        address payable account = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
        // 使用 transfer 代替, send 函数比较危险
        account.send(10 ether);
    }
}
```




### 全局变量

#### `msg`
* msg.sender // 合约发起者地址
* msg.value //这个消息所附带的以太币，单位wei
* 

#### `block`
* block.difficulty // 当前块的困难度
* block.number  // 当前区块号
* block.coinbase    // 当前块矿工地址

```solidity
contract Grobal {
    function getGrobal() public view returns(address){
        return msg.sender;
    }
    
    function getGrobal2() public view returns(uint){
        return block.difficulty;
    }  
    
    function getGrobal3() public view returns(uint){
        return block.number;
    }
    
    function getGrobal4() public view returns(address){
        return block.coinbase;
    }
    
}
```

### 数据位置 `memory`, `，storage`, `calldata`
> * `memory`：存储位置同我们普通程序的内存一致。即分配，即使用，越过作用域即不可被访问，等待被回收。   
> * `storage`：这种类型了，一旦使用这个类型，数据将永远存在。   
> * `calldata`：它存储的是函数参数，是只读的，不会永久存储的一个数据位置。外部函数的参数（不包括返回参数）被强制指定为`calldata`。效果与`memory`差不多。   


### `mapping` 类似与java `map`
```
contract mappingTest{
    
    // 定义 mapping {key:adderss, val: uint}
    mapping(address => uint) idMapping;
    
    mapping(uint => string) nameMapping;
    
    uint public id = 0;
    
    // 通过名称注册
    function register(string calldata _name) public {
        id++;
        address account = msg.sender;
        // set val
        idMapping[account] = id;
        nameMapping[id] = _name;
    }
    
    // 通过 id 获取 name
    function getName(uint _id) public view returns (string memory){
        // get val
        return nameMapping[_id];
    }
    
    
}
```


### 作用域
```
contract ScopeTest{
    
    uint public a = 100;
    
    function fun1() public view returns(uint){
        uint z = 999;
        {
            // 可以调用作用域外变量
            uint b = a;
        }
        // 无法读取作用域内变量b
        // z = b;
        return z;
    }
    
}

```

### `modifier`自定义函数修饰符, 用法类似于java Aop切面 
```
contract modifierTest{
    
    address owner;
    uint public a = 1;
    
    
    constructor(){
        owner = msg.sender;
    }
    
      // 定义 modifer
    modifier OnlyOwner {
        a = 1;
        require(msg.sender == owner, "400");
        _;
        a = 2;
    }

    // 定义 modifer
    modifier modifier1(address _a) {
        a = 3
        require(_a == owner, "Error");
        _;
        a = 4;
    }
    
    // 附加上了 modifer, 执行 require(msg.sender == owner, "400"); 判断合约调用者是否为合约创建者， 成功在执行fun1函数
    function fun1() OnlyOwner public  returns(address){
        return owner;
    }
    
    // 执行顺序 a=1 --> a=3 --> a=100 --> a=4 --> a=2
    function fun2() OnlyOwner modifier1(owner) public  {
        a = 100;
    }
}

```


### 函数的继承



### getter
```
contract getterTest{
    
    // public 修饰符会自动生成get方法，供外部调用
    uint public num = 100;
    
    // 等价于该函数
    // function num() external view returns(uint) {
    //     return num;
    // }
    
}
```

### Destruction
```
contract Destruction{
    
    address owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    function kill() public payable{
        if(msg.sender == owner){
            selfdestruct(msg.sender);
        }
    }
    
}
```


### 值传递互补影响.
```
contract MemoryTest{
     
    uint public a = 1000;
    uint public b = a;
    
    function fun1() public {
        a = 10000;
    }
    
}

```

### 
