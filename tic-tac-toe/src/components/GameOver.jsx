import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export default function GameOver({winner, onRestart}){
    const { width, height } = useWindowSize();

    return(
        <div id="game-over">
            {winner && (
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={500}
                    gravity={0.2}
                />
            )}

            {winner && (
                <motion.img
                    src="./src/assets/images/trophy.svg"
                    alt="Trophy"
                    className="trophy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.3
                    }}
                />
            )}

            <motion.h2
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Game Over!
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {winner ? `${winner} won!` : "It's a draw"}
            </motion.p>

            <motion.button
                onClick={onRestart}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Play Again
            </motion.button>
        </div>
    );
}