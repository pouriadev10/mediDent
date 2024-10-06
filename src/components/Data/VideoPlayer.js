import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the app element for accessibility

const VideoPlayer = ({ videoUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handlePlay = () => {
        setIsFullScreen(true);
        setIsPlaying(true);
    };

    const handleCloseModal = () => {
        setIsFullScreen(false);
        setIsPlaying(false);
    };

    return (
        <div>
            <div className="video-thumbnail" onClick={handlePlay}>
                <ReactPlayer url={videoUrl} playing={false} controls={true} width={175} height={110} />
            </div>

            <Modal
                isOpen={isFullScreen}
                onRequestClose={handleCloseModal}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        height: '90%',
                    },
                }}
            >
                <ReactPlayer url={videoUrl} playing={isPlaying} controls={true} width="100%" height="100%" />
                <button onClick={handleCloseModal}>Close</button>
            </Modal>
        </div>
    );
};

export default VideoPlayer;
