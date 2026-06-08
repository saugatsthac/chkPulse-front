import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
};

const modalStyle = {
    background: '#fff',
    borderRadius: 8,
    maxWidth: '90%',
    width: 500,
    padding: 20,
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    position: 'relative',
};

const closeBtnStyle = {
    position: 'absolute',
    top: 8,
    right: 8,
    background: 'transparent',
    border: 'none',
    fontSize: 20,
    cursor: 'pointer',
};

function Model({ isOpen, onClose, title, children }) {
    useEffect(() => {
        if (!isOpen) return;
        function onKey(e) {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div style={overlayStyle} onMouseDown={onClose} role="dialog" aria-modal="true">
            <div style={modalStyle} onMouseDown={e => e.stopPropagation()}>
                <button aria-label="Close modal" style={closeBtnStyle} onClick={onClose}>&times;</button>
                {title && <h2 style={{ marginTop: 0 }}>{title}</h2>}
                <div>{children}</div>
            </div>
        </div>
    );
}

Model.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    children: PropTypes.node,
};

Model.defaultProps = {
    isOpen: false,
    onClose: () => { },
    title: null,
    children: null,
};

export default Model;
