import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Player({initialName, symbol, isActive, onChangeName}){
    const [playerName, setPlayerName]= useState(initialName);
    const [isEditing, setIsEditing]= useState(false);
    const [avatar, setAvatar] = useState(`./src/assets/images/avatar-${symbol === 'X' ? '1' : '2'}.svg`);

    useEffect(() => {
        // Update avatar when symbol changes
        setAvatar(`./src/assets/images/avatar-${symbol === 'X' ? '1' : '2'}.svg`);
    }, [symbol]);

    function handleEditClick(){
        setIsEditing((editing)=> !editing);
        if(isEditing){
            onChangeName(symbol, playerName);
        }
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    let editablePlayerName = (
        <motion.span
            className="player-name"
            animate={{ color: isActive ? 'var(--accent)' : 'var(--text-secondary)' }}
            transition={{ duration: 0.3 }}
        >
            {playerName}
        </motion.span>
    );

    if(isEditing){
        editablePlayerName = (
            <motion.input
                type="text"
                required
                value={playerName}
                onChange={handleChange}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
            />
        );
    }

    return(
        <motion.li
            className={isActive ? 'active' : undefined}
            animate={{
                scale: isActive ? 1.05 : 1,
                y: isActive ? -5 : 0
            }}
            transition={{ duration: 0.3 }}
        >
            <span className="player">
                <motion.img
                    src={avatar}
                    alt={`${playerName} avatar`}
                    className="player-avatar"
                    width="40"
                    height="40"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: isActive ? 10 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
                {editablePlayerName}
                <motion.span
                    className="player-symbol"
                    animate={{ color: isActive ? 'var(--accent)' : 'var(--text-secondary)' }}
                    transition={{ duration: 0.3 }}
                >
                    {symbol}
                </motion.span>
            </span>
            <motion.button
                onClick={handleEditClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isEditing ? 'Save': 'Edit'}
            </motion.button>
        </motion.li>
    )
}