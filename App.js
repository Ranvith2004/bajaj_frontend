import React, { useState } from 'react';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('localhost:4000/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonInput
            });
            const data = await res.json();
            setResponse(data);
        } catch (err) {
            setError('Failed to fetch data. Please check your API URL and JSON format.');
        }
    };

    return (
        <div className="App">
            <h1>BFHL Challenge</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    rows="5"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='Enter JSON input, e.g., { "data": ["A", "1", "B"] }'
                />
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
