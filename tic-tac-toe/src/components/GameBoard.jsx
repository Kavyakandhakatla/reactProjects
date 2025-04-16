import { motion } from 'framer-motion';

export default function GameBoard({onSelectSquare, board}){
    return(
        <motion.ol
            id="game-board"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {board.map((row, rowIndex)=>(
                <motion.li
                    key={rowIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: rowIndex * 0.1 }}
                >
                    <ol>
                        {row.map((playerSymbol, colIndex)=>(
                            <motion.li
                                key={colIndex}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: (rowIndex * 3 + colIndex) * 0.05 }}
                            >
                                <motion.button
                                    onClick={()=>onSelectSquare(rowIndex, colIndex)}
                                    disabled={playerSymbol!==null}
                                    data-player={playerSymbol}
                                    whileHover={{ y: -5, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {playerSymbol}
                                </motion.button>
                            </motion.li>
                        ))}
                    </ol>
                </motion.li>
            ))}
        </motion.ol>
    );
}