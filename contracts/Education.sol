pragma solidity ^0.5.0;

contract Education {
    uint public eduCount = 0;

    struct EduInfo {
        uint id;
        string name;
        string level;
        string ca;
        string result;
        string content;
        string uAddress;
        bool completed;
    }
    mapping(uint => EduInfo) public eduInformations;

    event EduInfoCreated(
        uint id,
        string name,
        string level,
        string ca,
        string result,
        string content,
        string uAddress,
        bool completed
    );

    event EduInfoCompleted(
        uint id,
        bool completed
    );

    // constructor() public {
    //     createEduInfo("student name","The first time deployment");
    // }

    function createEduInfo(string memory _name, string memory _level, string memory _ca,
        string memory _result,string memory _content, string memory _address) public {
        eduCount ++;
        eduInformations[eduCount] = EduInfo(eduCount, _name, _level, _ca, _result, _content, _address, false);
        emit EduInfoCreated(eduCount, _name, _level, _ca, _result, _content, _address, false);
    }

    function toggleCompleted(uint _id) public {
        EduInfo memory _eduInfo = eduInformations[_id];
        _eduInfo.completed = !_eduInfo.completed;
        eduInformations[_id] = _eduInfo;
        emit EduInfoCompleted(_id, _eduInfo.completed);
    
    }
}