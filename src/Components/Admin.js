import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../Constant/constant';

const Admin = ({ account, onBackToLogin }) => {
    const [newCandidate, setNewCandidate] = useState('');
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        fetchCandidates();
    }, []);

    const handleAddCandidate = async () => {
        if (!newCandidate) return;
    
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
    
        try {
            const tx = await contractInstance.addCandidate(newCandidate);
            await tx.wait();
            alert(`Candidate "${newCandidate}" added successfully!`);
            setNewCandidate('');
            fetchCandidates();
        } catch (error) {
            console.error("Error adding candidate:", error);
            alert("Failed to add candidate. Make sure you are the owner.");
        }
    };

    const fetchCandidates = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
    
        try {
            const candidatesList = await contractInstance.getAllVotesOfCandidates();
            const formattedCandidates = candidatesList.map((candidate, index) => ({
                index: index,
                name: candidate.name,
                voteCount: candidate.voteCount.toNumber(),
            }));
            setCandidates(formattedCandidates);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };
    

    return (
        <div className="admin-container">
            <h1>Welcome Admin</h1>
            <p>Your account: {account}</p>
            <input
                type="text"
                placeholder="Candidate Name"
                value={newCandidate}
                onChange={(e) => setNewCandidate(e.target.value)}
            />
            <button onClick={handleAddCandidate}>Add Candidate</button>

            <h2>Candidate List:</h2>
            <ul>
                {candidates.map((candidate) => (
                    <li key={candidate.index}>
                        {candidate.name} - Votes: {candidate.voteCount}
                    </li>
                ))}
            </ul>

            {/* Tombol untuk kembali ke halaman login */}
            <button onClick={onBackToLogin} style={{ marginTop: '20px' }}>
                Back to Login
            </button>
        </div>
    );
};

export default Admin;