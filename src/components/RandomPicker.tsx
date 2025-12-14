import { useRef, useEffect, useState, useCallback } from 'react';

import type { Restaurant } from '@/common/types/Restaurant';
import { CATEGORY_LABELS } from '@/common/const';
import useCustomStore from '@/zustand/store';
import { cn } from '@/common/util';
import { Button } from '@/components/Button';

interface RandomPickerProps {
  restaurants: Restaurant[];
}

export default function RandomPicker({ restaurants }: RandomPickerProps) {
  // state.
  const [displayRestaurant, setDisplayRestaurant] = useState<Restaurant | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const isSpinning = useCustomStore((state) => state.isSpinning);

  // set method.
  const setIsSpinning = useCustomStore((state) => state.setIsSpinning);

  // ref.
  const resultRef = useRef<HTMLDivElement>(null);

  const handlePick = useCallback(() => {
    if (restaurants.length === 0) return;

    setIsSpinning(true);
    let counter = 0;
    const spinDuration = 2000; // 2초
    const intervalTime = 80; // 80ms마다 변경
    const totalSpins = Math.floor(spinDuration / intervalTime);

    const spinInterval = setInterval(() => {
      const randomRestaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
      setDisplayRestaurant(randomRestaurant);
      counter++;

      if (counter >= totalSpins) {
        clearInterval(spinInterval);
        setIsSpinning(false);
        // 최종 결과 설정
        const finalIndex = Math.floor(Math.random() * restaurants.length);
        setSelectedRestaurant(restaurants[finalIndex]);
      }
    }, intervalTime);
  }, [restaurants, setIsSpinning]);

  // Dialog가 열릴 때 자동으로 추첨 시작
  useEffect(() => {
    if (restaurants.length > 0) {
      handlePick();
    }
  }, [handlePick, restaurants.length]);

  useEffect(() => {
    if (selectedRestaurant && resultRef.current) {
      // 스크롤 애니메이션
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);

      // 폭죽 효과
      createConfetti();
    }
  }, [selectedRestaurant]);

  const createConfetti = () => {
    const colors = ['#646cff', '#61dafb', '#10b981', '#f59e0b', '#ef4444', '#a855f7'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'fixed w-2.5 h-2.5 -top-2.5 z-[9999] animate-confetti-fall opacity-100';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.3 + 's';
      confetti.style.animationDuration = Math.random() * 2 + 2 + 's';

      document.body.appendChild(confetti);

      // 애니메이션 종료 후 제거
      setTimeout(() => {
        confetti.remove();
      }, 4000);
    }
  };

  return (
    <div className="w-full max-w-[600px] flex flex-col gap-8 items-center">
      <h2 className="text-2xl mb-4 h-8 font-semibold">오늘의 메뉴는...</h2>
      {(isSpinning || selectedRestaurant) && (
        <div className="animate-fadeIn w-full max-w-[300px]" ref={resultRef}>
          <div
            className={cn('px-1 py-4 bg-gradient-to-br from-blue-500/20 to-blue-400/20 rounded-xl border-4 border-blue-500 shadow-[0_8px_24px_rgba(100,108,255,0.3)] w-full justify-center overflow-hidden',
              isSpinning ? 'animate-pulse' : ''
            )}
          >
            <p className="w-full text-xl mb-2 text-blue-500 font-semibold text-center truncate px-2">
              {isSpinning ? displayRestaurant?.name : selectedRestaurant!.name}
            </p>
            <p className="w-full text-lg text-gray-500 text-center">
              {isSpinning ? (displayRestaurant && CATEGORY_LABELS[displayRestaurant.category]) : CATEGORY_LABELS[selectedRestaurant!.category]}
            </p>
          </div>
        </div>
      )}
      <Button
        onClick={handlePick}
        disabled={isSpinning}
        className="px-6 py-3 text-xl bg-blue-500 hover:bg-blue-600"
      >
        {isSpinning ? '추첨 중...' : '재추첨'}
      </Button>
    </div>
  );
}
