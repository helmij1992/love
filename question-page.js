const pageType = document.body.dataset.proposalType || 'valentine'

const successTargets = {
    valentine: 'yes.html?type=valentine',
    date: 'yes.html?type=date',
    married: 'yes.html?type=married'
}
const localCuteCatAsset = 'assets/story-happy.svg'

const personalizedCopy = {
    valentine: {
        emoji: "💕",
        defaultTitle: "Will you be my Valentine?",
        title: (toName) => `Will you be my Valentine, ${toName}?`,
        prompt: (fromName, toName) => {
            if (fromName && toName) return `${fromName} has one tiny question for ${toName}. 💖`
            if (toName) return `One tiny yes from ${toName} would make this day extra sweet. 💕`
            if (fromName) return `${fromName} will be smiling all day with one little yes. 💕`
            return "One tiny yes and I will be smiling all day. 💕"
        }
    },
    date: {
        emoji: "🎀",
        defaultTitle: "Will you go on a date with me?",
        title: (toName) => `Will you go on a date with me, ${toName}?`,
        prompt: (fromName, toName) => {
            if (fromName && toName) return `${fromName} wants to plan something lovely with ${toName}. 🎀`
            if (toName) return `Say yes, ${toName}, and something lovely will be planned just for you. 🎀`
            if (fromName) return `Say yes and ${fromName} will plan something lovely for both of you. 🎀`
            return "Say yes and I’ll plan something lovely for us. 🎀"
        }
    },
    married: {
        emoji: "💍",
        defaultTitle: "Will you marry me?",
        title: (toName) => `Will you marry me, ${toName}?`,
        prompt: (fromName, toName) => {
            if (fromName && toName) return `${fromName} is asking ${toName} the forever question. 💍`
            if (toName) return `${toName}, this is the forever question, so please be kind. 💍`
            if (fromName) return `${fromName} is asking the forever question, so please be kind. 💍`
            return "This is my forever question, so please be kind. 💍"
        }
    }
}

const gifStages = [
    'assets/story-happy.svg',
    'assets/story-surprised.svg',
    'assets/story-pleading.svg',
    'assets/story-sad.svg',
    'assets/story-crying.svg'
]

const noMessagesByType = {
    valentine: [
        "No",
        "Are you sure? 💕",
        "Please be my Valentine... 🥺",
        "That was a tiny heart break 💔",
        "Still no? I'm pouting now 😢",
        "You can't press me that easily 😜"
    ],
    date: [
        "No",
        "Not even one cute date? 🥺",
        "I can sort out snacks too... 🍓",
        "Come on, it'll be fun 💕",
        "You’re really making me work for it 😭",
        "Too slow, hehe 😜"
    ],
    married: [
        "No",
        "Think about forever first 💍",
        "I promise I'd be adorable 🥺",
        "My heart just gasped 💔",
        "Okay this one hurts a little 😢",
        "Nope, you can't catch this button 😜"
    ]
}

let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const pikachuGif = document.getElementById('pikachu-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')
const heroBanner = document.querySelector('.hero-banner')
const pagePrompt = document.querySelector('.page-prompt')
const backLink = document.querySelector('.back-link')

applyPagePersonalization()
bindImageFallback()

music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
}).catch(() => {
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
    }, { once: true })
})

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false
        music.play().catch(() => {})
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

function handleYesClick() {
    window.location.href = withNameParams(successTargets[pageType] || 'yes.html')
}

function handleNoClick() {
    noClickCount++

    const noMessages = noMessagesByType[pageType] || noMessagesByType.valentine
    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    const yesSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${yesSize * 1.18}px`
    const yesPadY = Math.min(18 + noClickCount * 5, 60)
    const yesPadX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${yesPadY}px ${yesPadX}px`

    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.86, 10)}px`
    }

    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    if (noClickCount >= 4 && !runawayEnabled) {
        showTeaseMessage("The no button has trust issues now 👀")
        enableRunaway()
        runawayEnabled = true
    }
}

function swapGif(src) {
    const nextImage = new Image()

    nextImage.onload = () => {
        pikachuGif.style.opacity = '0'
        setTimeout(() => {
            pikachuGif.src = src
            pikachuGif.style.opacity = '1'
        }, 120)
    }

    nextImage.onerror = () => {
        pikachuGif.src = localCuteCatAsset
        pikachuGif.style.opacity = '1'
    }

    nextImage.src = src
}

function showTeaseMessage(msg) {
    const toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * Math.max(maxX, 40) + margin / 2
    const randomY = Math.random() * Math.max(maxY, 40) + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}

function readStoredNames() {
    const params = new URLSearchParams(window.location.search)
    return {
        fromName: params.get('from') || window.localStorage.getItem('vday-your-name') || '',
        toName: params.get('to') || window.localStorage.getItem('vday-their-name') || ''
    }
}

function withNameParams(base) {
    const { fromName, toName } = readStoredNames()
    const url = new URL(base, window.location.href)

    if (fromName) url.searchParams.set('from', fromName)
    if (toName) url.searchParams.set('to', toName)

    return `${url.pathname.split('/').pop()}${url.search}`
}

function applyPagePersonalization() {
    const { fromName, toName } = readStoredNames()
    const copy = personalizedCopy[pageType]

    if (!copy) return

    const titleText = toName ? copy.title(toName) : copy.defaultTitle

    document.title = `${titleText} ${copy.emoji}`
    heroBanner.innerHTML = `
        <span class="hero-banner-text">${escapeHtml(titleText)}</span>
        <span class="hero-banner-emoji" aria-hidden="true">${copy.emoji}</span>
    `
    pagePrompt.textContent = copy.prompt(fromName, toName)
    backLink.href = withNameParams('index.html')
}

function escapeHtml(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;')
}

function bindImageFallback() {
    pikachuGif.addEventListener('error', () => {
        if (!pikachuGif.src.endsWith(localCuteCatAsset)) {
            pikachuGif.src = localCuteCatAsset
            pikachuGif.style.opacity = '1'
        }
    })
}
