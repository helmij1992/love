let musicPlaying = false
const localCuteCatAsset = 'assets/cute-cat.svg'

const successContent = {
    valentine: {
        title: "Happy Valentine's Day! 💕",
        message: "You're my Valentine! 💖"
    },
    date: {
        title: "It’s a date! 🎉",
        message: "I can’t wait to go out with you! 💕"
    },
    married: {
        title: "We're getting married! 💍",
        message: "This is my favourite yes, forever. 💞"
    }
}

window.addEventListener('load', () => {
    applyPageContent()
    bindImageFallback()
    launchConfetti()

    // Autoplay music (works since user clicked Yes to get here)
    const music = document.getElementById('bg-music')
    music.volume = 0.3
    music.play().catch(() => {})
    musicPlaying = true
    document.getElementById('music-toggle').textContent = '🔊'
})

function applyPageContent() {
    const params = new URLSearchParams(window.location.search)
    const type = params.get('type')
    const content = successContent[type]
    const fromName = params.get('from') || window.localStorage.getItem('vday-your-name') || ''
    const toName = params.get('to') || window.localStorage.getItem('vday-their-name') || ''

    if (!content) return

    const title = personalizeSuccessTitle(type, content.title, toName)
    const message = personalizeSuccessMessage(type, content.message, fromName, toName)

    document.title = title
    document.getElementById('success-title').textContent = title
    document.getElementById('success-message').textContent = message
    document.querySelector('.back-link').href = withNameParams('index.html', fromName, toName)
}

function launchConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffb3c1', '#ff0000', '#ff6347', '#fff', '#ffdf00']
    const duration = 6000
    const end = Date.now() + duration

    // Initial big burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors
    })

    // Continuous side cannons
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        })

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        })
    }, 300)
}

function toggleMusic() {
    const music = document.getElementById('bg-music')
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

function personalizeSuccessTitle(type, fallbackTitle, toName) {
    if (!toName) return fallbackTitle

    if (type === 'valentine') return `Happy Valentine's Day, ${toName}! 💕`
    if (type === 'date') return `${toName} said yes to the date! 🎉`
    if (type === 'married') return `${toName} said yes forever! 💍`

    return fallbackTitle
}

function personalizeSuccessMessage(type, fallbackMessage, fromName, toName) {
    if (!fromName && !toName) return fallbackMessage

    if (type === 'valentine') {
        if (fromName && toName) return `${toName} just made ${fromName} the happiest person ever. 💖`
        return `${toName || fromName} just made this page even sweeter. 💖`
    }

    if (type === 'date') {
        if (fromName && toName) return `${fromName} and ${toName} officially have a cute date to look forward to. 💕`
        return `That yes just turned into a very cute date plan. 💕`
    }

    if (type === 'married') {
        if (fromName && toName) return `${fromName} and ${toName} just unlocked the forever timeline. 💞`
        return `That yes just turned into the sweetest forever answer. 💞`
    }

    return fallbackMessage
}

function withNameParams(base, fromName, toName) {
    const url = new URL(base, window.location.href)

    if (fromName) url.searchParams.set('from', fromName)
    if (toName) url.searchParams.set('to', toName)

    return `${url.pathname.split('/').pop()}${url.search}`
}

function bindImageFallback() {
    const successImage = document.getElementById('pikachu-gif')
    successImage.addEventListener('error', () => {
        successImage.src = localCuteCatAsset
    })
}
