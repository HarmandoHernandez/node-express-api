const $ = id => document.getElementById(id)
const updateTime = (k) => (k < 10) ? '0' + k : k
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function currentTime () {
  const date = new Date()
  let hour = date.getHours()
  let min = date.getMinutes()
  const sec = date.getSeconds()
  const month = date.getMonth()
  let day = date.getDate()
  const year = date.getFullYear()

  const showDay = document.querySelectorAll('#days span')
  hour = updateTime(hour)
  min = updateTime(min)
  day = updateTime(day)

  $('hour').innerText = hour
  $('min').innerText = min
  $('seconds-indicator').style.transform = `rotate(${sec * 6}deg)`
  $('full-date').innerText = `${MONTHS[month]} ${day} ${year}`
  showDay[date.getDay()].style.display = 'block'
}

setInterval(currentTime, 1000)
