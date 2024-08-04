import React from 'react';

const Loading = () => {
    return (
        <div className="container mx-auto">
            <div className="mt-5 w-50 mx-auto">
                <div className="loading-container text-center mt-5">
                    <h1 style={{ color: 'black', fontSize: '24px' }}>Loading...</h1>
                </div>
            </div>
        </div>
    );
};

export default Loading;