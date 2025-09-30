/**
 * Level progression data based on TRD-W3QH-V1.0 Section 4.A
 */
export const LEVEL_THRESHOLDS = [
  { level: 1, title: 'Newbie', xpRequired: 0 },
  { level: 2, title: 'Cadet', xpRequired: 500 },
  { level: 3, title: 'Apprentice', xpRequired: 1250 },
  { level: 4, title: 'Wanderer', xpRequired: 2250 },
  { level: 5, title: 'Trader', xpRequired: 3500 },
  { level: 6, title: 'Collector', xpRequired: 5000 },
  { level: 7, title: 'Guardian', xpRequired: 6750 },
  { level: 8, title: 'Architect', xpRequired: 8750 },
  { level: 9, title: 'Veteran', xpRequired: 11000 },
  { level: 10, title: 'Frontier Citizen', xpRequired: 13500 },
];

export const calculateLevel = (totalXP: number): number => {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_THRESHOLDS[i].xpRequired) {
      return LEVEL_THRESHOLDS[i].level;
    }
  }
  return 1;
};

export const getLevelTitle = (level: number): string => {
  const levelData = LEVEL_THRESHOLDS.find(l => l.level === level);
  return levelData?.title || 'Unknown';
};

export const getProgressToNextLevel = (totalXP: number): {
  currentLevelXP: number;
  nextLevelXP: number;
  percentage: number;
} => {
  const currentLevel = calculateLevel(totalXP);
  
  if (currentLevel >= 10) {
    return { currentLevelXP: totalXP, nextLevelXP: totalXP, percentage: 100 };
  }

  const currentThreshold = LEVEL_THRESHOLDS[currentLevel - 1].xpRequired;
  const nextThreshold = LEVEL_THRESHOLDS[currentLevel].xpRequired;
  
  const progressXP = totalXP - currentThreshold;
  const requiredXP = nextThreshold - currentThreshold;
  const percentage = (progressXP / requiredXP) * 100;

  return {
    currentLevelXP: progressXP,
    nextLevelXP: requiredXP,
    percentage: Math.min(percentage, 100),
  };
};
