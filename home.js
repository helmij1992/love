const homePages = ['valentine.html', 'date.html', 'married.html']

let musicPlaying = true

const music = document.getElementById('bg-music')
const yourNameInput = document.getElementById('your-name')
const theirNameInput = document.getElementById('their-name')
const homeTitle = document.getElementById('home-title')
const homeSubtitle = document.getElementById('home-subtitle')
const primaryLink = document.querySelector('.home-primary')
const cardLinks = Array.from(document.querySelectorAll('.question-card'))
const shareUrlInput = document.getElementById('share-url')
const copyLinkBtn = document.getElementById('copy-link-btn')
const shareStatus = document.getElementById('share-status')

const defaultYourName = 'muhd helmi'
const defaultSiteTitle = `${defaultYourName} | Cute Love Page`
const defaultShareHint = 'Your personalized link updates automatically.'

const defaultCopy = {
    title: 'Build a cute little love page for someone special.',
    subtitle: 'Add your names, pick the mood, and let this cute cat-powered page do the blushing for you.'
}

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

function readNames() {
    return {
        yourName: yourNameInput.value.trim(),
        theirName: theirNameInput.value.trim()
    }
}

function buildUrl(base) {
    const params = new URLSearchParams()
    const { yourName, theirName } = readNames()

    if (yourName) params.set('from', yourName)
    if (theirName) params.set('to', theirName)

    const query = params.toString()
    return query ? `${base}?${query}` : base
}

function updateHomeCopy() {
    const { yourName, theirName } = readNames()

    if (!yourName && !theirName) {
        document.title = defaultSiteTitle
        homeTitle.textContent = defaultCopy.title
        homeSubtitle.textContent = defaultCopy.subtitle
        return
    }

    if (yourName && theirName) {
        document.title = `${yourName} + ${theirName} | Mydate`
        homeTitle.textContent = `${yourName} made this cute little surprise for ${theirName}.`
        homeSubtitle.textContent = `Pick the sweetest question and let the cat-approved romance begin.`
        return
    }

    if (theirName) {
        document.title = `${theirName} | Mydate`
        homeTitle.textContent = `A cute little surprise page for ${theirName}.`
        homeSubtitle.textContent = `Add your own name too, then choose the perfect question to ask.`
        return
    }

    document.title = `${yourName} | Mydate`
    homeTitle.textContent = `${yourName}, your cute love page is almost ready.`
    homeSubtitle.textContent = `Add their name next, then launch the sweetest question with the cat cheering you on.`
}

function updateLinks() {
    primaryLink.href = buildUrl('valentine.html')

    cardLinks.forEach((link) => {
        const rawHref = link.dataset.baseHref || link.getAttribute('href')
        link.dataset.baseHref = rawHref
        link.setAttribute('href', buildUrl(rawHref))
    })
}

function persistNames() {
    const { yourName, theirName } = readNames()
    window.localStorage.setItem('vday-your-name', yourName)
    window.localStorage.setItem('vday-their-name', theirName)
}

function syncPersonalization() {
    updateHomeCopy()
    updateLinks()
    updateShareLink()
    persistNames()
}

function hydrateNames() {
    const params = new URLSearchParams(window.location.search)
    const storedYourName = window.localStorage.getItem('vday-your-name') || defaultYourName
    const storedTheirName = window.localStorage.getItem('vday-their-name') || ''

    yourNameInput.value = params.get('from') || storedYourName
    theirNameInput.value = params.get('to') || storedTheirName
}

function updateShareLink() {
    const shareUrl = new URL(buildUrl('valentine.html'), window.location.href)
    shareUrlInput.value = shareUrl.toString()
    shareStatus.textContent = defaultShareHint
}

hydrateNames()
syncPersonalization()

yourNameInput.addEventListener('input', syncPersonalization)
theirNameInput.addEventListener('input', syncPersonalization)

document.getElementById('surprise-btn').addEventListener('click', () => {
    const target = homePages[Math.floor(Math.random() * homePages.length)]
    window.location.href = buildUrl(target)
})

copyLinkBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(shareUrlInput.value)
        shareStatus.textContent = 'Link copied. Send it to your person 💕'
    } catch (error) {
        shareUrlInput.select()
        shareStatus.textContent = 'Copy failed, but the link is selected for you.'
    }
})
