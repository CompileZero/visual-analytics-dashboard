import React from 'react';

const Loading = () => {
    return (
        <div className="align-self-center">

            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading</span>
                </div>
            </div>
        </div>
    );
};

export default Loading;
