import React, { useState } from 'react';
import { getInternById } from '../InternData';
// import './Home.css'; // Nichay di gayi CSS yahan paste karein

const Home = () => {
    const [certID, setCertID] = useState("");
    const [internData, setInternData] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        if (!certID) return;

        setLoading(true);
        setError(false);
        setInternData(null);

        const result = await getInternById(certID);

        if (result.success) {
            setInternData(result.data);
            setError(false);
        } else {
            setInternData(null);
            setError(true);
        }
        setLoading(false);
    };

    return (
        <div className="home-wrapper">
            <div className="glass-card">
                {/* Search Section */}
                <div className="search-container text-center">
                    <div className="system-label mb-3">Vivexa Tech Verification Portal</div>
                    <h1 className="fw-bolder mb-4 main-title">Verify Credentials</h1>
                    
                    <div className="input-group-custom">
                        <input 
                            type="text" 
                            className="form-control input-field" 
                            placeholder="Enter Certificate ID"
                            value={certID}
                            onChange={(e) => setCertID(e.target.value.toUpperCase())}
                            onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                        />
                        <button 
                            className="btn btn-verify" 
                            onClick={handleVerify}
                            disabled={loading}
                        >
                            {loading ? "Checking..." : "Verify Now"}
                        </button>
                    </div>
                    {error && <p className="text-danger mt-4 fw-bold">⚠️ No matching record found in our database.</p>}
                </div>

                {/* Result Section */}
                {internData && (
                    <div id="resultArea" style={{ display: 'block', opacity: loading ? 0.4 : 1 }}>
                        <div className="row g-5 align-items-center">
                            <div className="col-lg-7">
                                <div className="certificate-wrapper">
                                    <img src={internData.certImage} alt="Certificate" className="certificate-preview" />
                                </div>
                            </div>

                            <div className="col-lg-5">
                                <div className="detail-box">
                                    <div className="verification-tag">
                                        <span className="me-2">●</span> Verified Intern
                                    </div>

                                    <div className="info-item">
                                        <div className="meta-label">Intern Name</div>
                                        <div className="meta-value">{internData.studentName}</div>
                                    </div>

                                    <div className="info-item">
                                        <div className="meta-label">Father's Name</div>
                                        <div className="meta-value">{internData.fatherName}</div>
                                    </div>

                                    <div className="info-item">
                                        <div className="meta-label">Internship Period</div>
                                        <div className="meta-value">{internData.startDate} to {internData.endDate}</div>
                                    </div>

                                    <div className="info-item mb-0">
                                        <div className="meta-label">Total Duration</div>
                                        <div className="meta-value text-primary">{internData.duration}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;