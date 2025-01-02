pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;
    address public owner;
    mapping(address => bool) public voters;

    uint256 public votingStart;
    uint256 public votingEnd;

    // Modifier to restrict functions to only the owner
    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // Constructor initializes the contract with a list of candidates and duration
    constructor(string[] memory _candidateNames, uint256 _durationInMinutes) {
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                name: _candidateNames[i],
                voteCount: 0
            }));
        }
        owner = msg.sender;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
    }

    // Function to allow only the owner to add a new candidate
    function addCandidate(string memory _name) public onlyOwner {
        require(bytes(_name).length > 0, "Candidate name cannot be empty");
        candidates.push(Candidate({
            name: _name,
            voteCount: 0
        }));
    }

    // Function to allow users to vote for a candidate
    function vote(uint256 _candidateIndex) public {
        require(!voters[msg.sender], "You have already voted");
        require(_candidateIndex < candidates.length, "Invalid candidate index");
        require(block.timestamp >= votingStart && block.timestamp < votingEnd, "Voting is not active");

        candidates[_candidateIndex].voteCount++;
        voters[msg.sender] = true;
    }

    // Function to get all candidates with their vote counts
    function getAllVotesOfCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    // Function to check if voting is active
    function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= votingStart && block.timestamp < votingEnd);
    }

    // Function to get remaining time for voting
    function getRemainingTime() public view returns (uint256) {
        if (block.timestamp >= votingEnd) {
            return 0;
        }
        return votingEnd - block.timestamp;
    }

    // Function to get total number of candidates
    function getTotalCandidates() public view returns (uint256) {
        return candidates.length;
    }
}