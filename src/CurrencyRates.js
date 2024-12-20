import React, { useEffect, useState } from 'react';

const CurrencyRates = () => {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://www.cbr-xml-daily.ru/daily_json.js')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setRates(data.Valute);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Currency Exchange Rates</h1>
            <ul>
                {Object.keys(rates).map(key => (
                    <li key={key}>
                        {rates[key].Name}: {rates[key].Value} RUB
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CurrencyRates;
