pragma solidity ^0.5.0;

contract Education {
    uint public eduCount = 0;

    struct EduInfo {
        uint id;
        string name;
        string content;
        bool completed;
    }
    mapping(uint => EduInfo) public eduInformations;

    constructor() public {
        createEduInfo("student name","The first time deployment");
    }

    function createEduInfo(string memory _name, string memory _content) public {
        eduCount ++;
        eduInformations[eduCount] = EduInfo(eduCount, _name, _content, false);
    }
}