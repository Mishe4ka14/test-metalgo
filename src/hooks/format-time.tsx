// функция форматирования времени
const formatTime = (dateStr: string | Date): string => {
  const date = new Date(dateStr);
    return date.toTimeString().substring(0, 5);
};

export default formatTime;