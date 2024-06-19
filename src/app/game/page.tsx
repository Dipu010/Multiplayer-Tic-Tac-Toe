"use client";
import { ModeToggle } from '@/components/theme/mode-toggle';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const IndexPage: React.FC = () => {
  const [board, setBoard] = useState<String[]>(Array(9).fill(null));

  const handleClick = (index: number) => {
    const newBoard = [...board];
    newBoard[index] = newBoard[index] !== "0" ? "0" : "X"; // Toggle between null and 1 for demonstration
    setBoard(newBoard);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background relative">
      <div className='  ml-[700px] mb-[100px]  '>
        <ModeToggle/>
      </div>
      <p className=' text-5xl text-center font-semibold mb-[50px]'> Tic Tac Toe</p>
      <div className="grid grid-cols-3 gap-4">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="flex items-center justify-center w-24 h-24 text-2xl font-bold text-background bg-foreground rounded hover:bg-muted-foreground"
          >
            {value !== null ? value : ''}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
