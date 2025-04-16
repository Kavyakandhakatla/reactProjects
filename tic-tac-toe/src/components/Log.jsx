import { motion } from 'framer-motion';

export default function Log({turns}){
    return(
        <motion.ol
            id="log"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {turns.map((turn, index) => (
                <motion.li
                    key={`${turn.square.row}${turn.square.col}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={index === 0 ? 'highlighted' : ''}
                >
                    <strong>{turn.player}</strong> placed at position ({turn.square.row},{turn.square.col})
                </motion.li>
            ))}
            {turns.length === 0 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    Game moves will appear here
                </motion.p>
            )}
        </motion.ol>
    );
}