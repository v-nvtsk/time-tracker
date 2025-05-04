/**
 * Форматирует время в секундах в строку в формате "ХХд чч:мм:сс".
 * Если количество дней равно нулю, дни не отображаются.
 * Если количество часов равно нулю, часы не отображаются.
 *
 * @param time - Время (по-умолчанию в миллисекундах).
 * @param timeType - тип переданного времени - "ms" (миллисекунды) или "s" (секунды).
 * @returns Строка, представляющая отформатированное время в формате "ХХд чч:мм:сс".
 */

export const formatTime = (time: number, timeType:'ms' | 's' = 'ms') => {
  let remainder = timeType === 'ms' ? time / 1000 : time;
  const days = Math.floor(remainder / 24 / 3600);

  remainder = remainder - days * 24 * 3600;

  const hours = Math.floor(remainder / 3600);

  remainder = remainder - hours * 3600;

  const minutes = Math.floor(remainder / 60);

  remainder -= minutes * 60;

  const seconds = Math.floor(remainder % 60);

  return `${days > 0 ? `${addPadding(days)}d ` : ''}${hours > 0 ? `${addPadding(hours)}:` : ''}${addPadding(minutes)}:${addPadding(seconds)}`;
};

const addPadding = (value: number) => value.toString().padStart(2, '0');