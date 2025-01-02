import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from './Constant/constant';
import Login from './Components/Login';
import Finished from './Components/Finished';
import Connected from './Components/Connected';
import Admin from './Components/Admin';
import './App.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setRemainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [canVoteState, setCanVoteState] = useState(true);  // renamed to avoid conflict
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getCandidates();
    getRemainingTime();
    getCurrentStatus();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, [account]);

  const handleBackToLogin = () => {
    setIsConnected(false);
    setAccount(null); // Set account to null to ensure it's considered logged out
    setIsAdmin(false); // Reset admin status
  };

  async function vote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );

    const tx = await contractInstance.vote(number);
    await tx.wait();
    checkCanVote(); // renamed function call to avoid confusion
  }

  async function checkCanVote() {  // renamed to avoid conflict
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const voteStatus = await contractInstance.voters(await signer.getAddress());
    setCanVoteState(voteStatus);
  }

  async function getCandidates() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // Ensure wallet is connected
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);

    try {
      const candidatesList = await contractInstance.getAllVotesOfCandidates();
      const formattedCandidates = candidatesList.map((candidate, index) => ({
        index: index,
        name: candidate.name,
        voteCount: candidate.voteCount.toNumber(),
      }));
      setCandidates(formattedCandidates); // Update the state with formatted data
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  }

  async function getCurrentStatus() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const status = await contractInstance.getVotingStatus();
    setVotingStatus(status);
  }

  async function getRemainingTime() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const time = await contractInstance.getRemainingTime();
    setRemainingTime(parseInt(time, 16));
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      checkCanVote(); // renamed function call to avoid confusion
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setIsConnected(true);
        checkCanVote();  // renamed function call to avoid confusion
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser");
    }
  }

  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  async function getOwner() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
    const contractOwner = await contractInstance.owner();
    return contractOwner;
  }

  // Check if connected account is the owner
  useEffect(() => {
    async function checkAdmin() {
      const contractOwner = await getOwner();
      if (account && contractOwner.toLowerCase() === account.toLowerCase()) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
    if (account) {
      checkAdmin();
    }
  }, [account]);

  return (
    <div className="App">
      {isAdmin ? (
        <Admin account={account} onBackToLogin={handleBackToLogin} />
      ) : votingStatus ? (
        isConnected ? (
          <Connected
            account={account}
            candidates={candidates}
            remainingTime={remainingTime}
            number={number}
            handleNumberChange={handleNumberChange}
            voteFunction={vote}
            showButton={canVoteState}
          />
        ) : (
          <Login
            connectWallet={connectToMetamask}
            onAdminLogin={(account) => {
              setAccount(account); // Set admin account
              setIsAdmin(true);    // Switch to admin page
            }}
          />
        )
      ) : (
        <Finished />
      )}
    </div>
  );
}

export default App;