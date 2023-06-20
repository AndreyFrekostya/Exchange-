import { Dispatch, SetStateAction } from "react";
import { TransfromDateTimer } from "./TransformDateTimer";

export function TimeStampToDateTimer(timeFrame:string,setTimer:Dispatch<SetStateAction<string>>){
  const date = new Date();
  // Получаем значения года, месяца, дня и часа
  let year = date.getUTCFullYear();
  let month = String(date.getUTCMonth() + 1).padStart(2, '0');
  let day = String(date.getUTCDate()).padStart(2, '0');
  let hour = String(date.getUTCHours()).padStart(2, '0');
  let minutes = String(date.getUTCMinutes()).padStart(2, '0')
  let seconds = String(date.getUTCSeconds()).padStart(2, '0')
  //
  if(timeFrame==='1М'){
    seconds=String(60-Number(seconds))
    seconds=seconds.length===1 ? '0'+seconds : seconds
    seconds=seconds==='60' ? '00' : seconds
    setTimer(`00:${seconds}`)
  }
  if(timeFrame==='5М' ||  timeFrame==='15М' || timeFrame==='30М' || timeFrame==='1Ч'){
    let time=timeFrame==='1Ч' ? 60 :Number(timeFrame.split('М')[0])
    seconds=String(60-Number(seconds))
    seconds=seconds.length===1 ? '0'+seconds : seconds
    let dividedMinutes=minutes[0]=='0' ? Number(minutes[1])+1 : Number(minutes)+1
    if(seconds==='60'){
      dividedMinutes=dividedMinutes-1
      seconds='00'
    }
    minutes=String(TransfromDateTimer(dividedMinutes,time))
    minutes=minutes.length===1 ? '0'+minutes : minutes
    setTimer(`${minutes}:${seconds}`)
  }
  if(timeFrame==='4Ч' || timeFrame==='Д'){
    let time=timeFrame[0]==='Д'? 12 : 4
    seconds=String(60-Number(seconds))
    seconds=seconds.length===1 ? '0'+seconds : seconds
    //minuts
    let dividedMinutes=minutes[0]=='0' ? Number(minutes[1])+1 : Number(minutes)+1
    if(seconds==='60'){
      dividedMinutes=dividedMinutes-1
      seconds='00'
    }
    minutes=String(TransfromDateTimer(dividedMinutes,60))
    minutes=minutes.length===1 ? '0'+minutes : minutes
    //hours
    let dividedHours=hour[0]=='0' ? Number(hour[1])+1 : Number(hour)+1
    if(minutes==='60'){
      dividedHours=dividedHours-1
      minutes='00'
    }
    hour=String(TransfromDateTimer(dividedHours,time,24))
    hour=hour.length===1 ? '0'+hour : hour
    setTimer(`${hour}:${minutes}:${seconds}`)
  }
  if(timeFrame==='Н'){
    let currentDay = date.getDay();
    let remainingDays = 7 - currentDay;
    let dividedHours=hour[0]=='0' ? Number(hour[1]) : Number(hour)
    hour=String(TransfromDateTimer(dividedHours,12,24))
    hour=hour.length===1 ? '0'+hour : hour
    setTimer(`${remainingDays}d ${hour}h`)
  }
  if( timeFrame==='Mес'){
    const currentMonth = date.getMonth();
    const nextMonth = currentMonth + 1;
  
    // Устанавливаем дату на первое число следующего месяца
    const nextMonthFirstDay = new Date(year, nextMonth, 1);
  
    // Вычитаем 1 день от даты первого числа следующего месяца,
    // чтобы получить последний день текущего месяца
    const lastDayOfMonth = new Date(Number(nextMonthFirstDay) - 1);
  
    // Вычисляем количество дней до конца месяца
    const daysRemaining = lastDayOfMonth.getDate() - date.getDate();
    let dividedHours=hour[0]=='0' ? Number(hour[1]) : Number(hour)
    hour=String(TransfromDateTimer(dividedHours,12,24))
    setTimer(`${daysRemaining}d ${hour}h`)
  }
}