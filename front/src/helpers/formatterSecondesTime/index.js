

export default function formatterSecondesTime(totalTime){
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const secondes = totalTime % 60;

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSecondes = secondes < 10 ? `0${secondes}` : secondes;

    return `${formattedHours}:${formattedMinutes}:${formattedSecondes}`
}