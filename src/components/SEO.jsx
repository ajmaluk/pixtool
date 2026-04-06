import { useEffect, useMemo, useRef, useState } from 'react'
import { ALL_TOOLS_MAP, IMAGE_TOOLS, PDF_TOOLS, UTILITY_TOOLS, AI_TOOLS, MATH_TOOLS, PRODUCTIVITY_TOOLS } from '../data/tools'
import { SITE_URL, SITE_NAME } from '../config/app.config'
import { getOverallRating, getToolRatingStats } from '../services/supabaseService'
import { hasSupabaseConfig } from '../lib/supabaseClient'

const SITE_DEFAULT_DESCRIPTION = 'Free online AI, image, PDF, math, and productivity tools that run in your browser with privacy-first processing.'

const ROUTE_SECTIONS = [
    {
        path: '/image-tools',
        name: 'Image Tools',
        title: 'Free Online Image Tools',
        description: 'Resize, crop, convert, compress, flip, and enhance images in your browser with privacy-first processing.',
        keywords: 'image tools, image editor online, resize image, crop image, compress image, convert image, watermark image, browser image editor',
        tools: IMAGE_TOOLS,
    },
    {
        path: '/pdf-tools',
        name: 'PDF Tools',
        title: 'Free Online PDF Tools',
        description: 'Merge, split, compress, protect, unlock, and convert PDF files locally in your browser without uploads.',
        keywords: 'pdf tools, pdf editor online, merge pdf, split pdf, compress pdf, protect pdf, unlock pdf, browser pdf tools',
        tools: PDF_TOOLS,
    },
    {
        path: '/utility-tools',
        name: 'Utility Tools',
        title: 'Free Online Utility Tools',
        description: 'Use disposable email, QR tools, typing practice, and developer utilities with fast browser-based privacy.',
        keywords: 'utility tools, temp mail, qr generator, qr scanner, typing test, json formatter, unit converter, password generator',
        tools: UTILITY_TOOLS,
    },
    {
        path: '/ai-tools',
        name: 'AI Tools',
        title: 'Free AI Tools',
        description: 'Browse focused AI writing, coding, marketing, and productivity tools designed for fast browser use.',
        keywords: 'ai tools, ai writing tools, ai content generator, ai chat, ai resume generator, ai coding tools, ai marketing tools',
        tools: AI_TOOLS,
    },
    {
        path: '/math-tools',
        name: 'Math Tools',
        title: 'Free Online Math Tools',
        description: 'Solve equations, visualize graphs, and work through algebra, finance, and statistics in your browser.',
        keywords: 'math tools, scientific calculator, equation solver, graph visualizer, matrix solver, fraction calculator, financial calculator',
        tools: MATH_TOOLS,
    },
    {
        path: '/productivity-tools',
        name: 'Productivity Tools',
        title: 'Free Productivity Tools',
        description: 'Stay organized with kanban boards, timers, notes, habits, and other browser-based productivity apps.',
        keywords: 'productivity tools, kanban board, todo list, pomodoro timer, habit tracker, notepad, drawing board, file manager',
        tools: PRODUCTIVITY_TOOLS,
    },
]

const dedupeKeywords = (values) => {
    const seen = new Set()
    const output = []

    values
        .flatMap((value) => {
            if (!value) return []
            if (Array.isArray(value)) return value
            return String(value).split(',')
        })
        .map((value) => String(value).trim())
        .filter(Boolean)
        .forEach((keyword) => {
            const normalized = keyword.toLowerCase()
            if (seen.has(normalized)) return
            seen.add(normalized)
            output.push(keyword)
        })

    return output
}

const normalizeText = (value) => String(value || '').replace(/\s+/g, ' ').trim()

const ensureBrandSuffix = (value, siteName) => {
    const normalized = normalizeText(value)
    if (!normalized) return siteName
    if (normalized.toLowerCase().includes(siteName.toLowerCase())) return normalized
    return `${normalized} | ${siteName}`
}

const humanizePathSegment = (segment) => segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const getRouteSection = (path) => {
    const normalizedPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path
    return ROUTE_SECTIONS.find((section) => {
        if (normalizedPath === section.path) return true
        if (normalizedPath.startsWith(`${section.path}/`)) return true
        if (section.path === '/utility-tools') {
            return section.tools.some((tool) => tool.path === normalizedPath)
        }
        return false
    }) || null
}

const getDefaultBreadcrumbs = ({ path, section, title, toolTitle }) => {
    if (path === '/') return []

    const crumbs = [{ name: 'Home', item: '/' }]
    if (section) {
        crumbs.push({ name: section.name, item: section.path })
    }

    if (path !== section?.path) {
        const finalLabel = toolTitle || title || humanizePathSegment(path.split('/').filter(Boolean).at(-1) || 'Overview')
        crumbs.push({ name: finalLabel, item: path })
    }

    return crumbs
}

const getRouteSeoDefaults = ({ path, toolData, title, description }) => {
    const section = getRouteSection(path)

    if (path === '/') {
        return {
            title: title || 'Free Online AI, Image, PDF & Productivity Tools',
            description: description || SITE_DEFAULT_DESCRIPTION,
            keywords: 'free online tools, ai tools, image tools, pdf tools, utility tools, math tools, productivity tools, privacy-first browser tools',
            section,
            toolTitle: null,
        }
    }

    if (toolData?.id) {
        return {
            title: title || toolData.title,
            description: description || toolData.description || SITE_DEFAULT_DESCRIPTION,
            keywords: dedupeKeywords([
                toolData.title,
                toolData.description,
                section?.name,
                section?.keywords,
                toolData.features,
                toolData.howItWorks,
                'free online tool',
                'browser-based tool',
                'privacy-first processing',
            ]).join(', '),
            section,
            toolTitle: toolData.title,
        }
    }

    if (section) {
        return {
            title: title || section.title,
            description: description || section.description,
            keywords: dedupeKeywords([
                section.keywords,
                section.tools?.map((tool) => tool.title),
                title,
                description,
                'free online tools',
            ]).join(', '),
            section,
            toolTitle: null,
        }
    }

    return {
        title: title || SITE_NAME,
        description: description || SITE_DEFAULT_DESCRIPTION,
        keywords: dedupeKeywords([
            title,
            description,
            'free online tools',
            'privacy-first browser tools',
            'productivity suite',
        ]).join(', '),
        section: null,
        toolTitle: null,
    }
}

const getScreenshotPath = (pagePath) => {
    const cleanPath = pagePath.endsWith('/') && pagePath.length > 1 ? pagePath.slice(0, -1) : pagePath
    
    // Dynamic lookup from global tools map - This is the single source of truth
    const toolData = ALL_TOOLS_MAP[cleanPath]
    if (toolData && toolData.screenshot) {
        return `/screenshots/${toolData.screenshot}`
    }

    // Fallback for category hubs or special pages
    const fallbackMap = {
        '/': 'pixtool-all-in-one-productivity-suite.png',
        '/image-tools': 'professional-online-image-studio.png',
        '/pdf-tools': 'secure-pdf-management-suite.png',
        '/utility-tools': 'all-in-one-web-utility-toolbox.png',
        '/ai-tools': 'pixtool-all-in-one-productivity-suite.png',
        '/math-tools': 'pixtool-all-in-one-productivity-suite.png'
    }

    return `/screenshots/${fallbackMap[cleanPath] || fallbackMap['/']}`
}

export default function SEO({
    title = null,
    description = null,
    keywords = null,
    path = '/',
    type = 'website',
    image = null,
    twitterImage = null,
    schema = null,
    articlePublishedTime = null,
    articleAuthor = null,
    articleSection = null,
    noIndex = false,
    breadcrumbs = null,
    faqs = null,
    articleTags = null,
    readingTime = null,
    toolName = null,
    toolSteps = null,
    lastModified = null,
    screenshot = null,
    imageAlt = null,
    imageTitle = null
}) {
    const siteUrl = SITE_URL
    const siteName = SITE_NAME
    const cleanPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path
    const fullUrl = cleanPath === '/' ? siteUrl : `${siteUrl}${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`
    const toolDataFromMap = ALL_TOOLS_MAP[cleanPath]
    const isToolPath = !!(toolDataFromMap && toolDataFromMap.id)
    const routeDefaults = getRouteSeoDefaults({
        path: cleanPath,
        toolData: toolDataFromMap,
        title,
        description,
    })
    const resolvedTitle = routeDefaults.title
    const resolvedDescription = normalizeText(routeDefaults.description)
    const resolvedToolName = toolName || routeDefaults.toolTitle || toolDataFromMap?.title || null
    const resolvedToolSteps = toolSteps || toolDataFromMap?.howItWorks || null
    const resolvedImageAlt = imageAlt || toolDataFromMap?.imageAlt || `${resolvedTitle} - PixTool`
    const resolvedImageTitle = imageTitle || toolDataFromMap?.imageTitle || resolvedTitle
    const [liveRatings, setLiveRatings] = useState({ tool: null, overall: null })
    const [liveRatingMeta, setLiveRatingMeta] = useState({ toolFetchedAt: null, overallFetchedAt: null })
    const [showSchemaDiagnostics, setShowSchemaDiagnostics] = useState(false)
    const [diagnosticsOffset, setDiagnosticsOffset] = useState({ x: 0, y: 0 })
    const [diagnosticsCopied, setDiagnosticsCopied] = useState(false)
    const dragStateRef = useRef(null)
    const searchQuery = typeof window !== 'undefined' ? window.location.search : ''
    const shouldNoIndex = noIndex || path.startsWith('/pix-admin') || searchQuery.includes('q={search_term_string}') || searchQuery.includes('?q=')

    const brandTitle = ensureBrandSuffix(resolvedTitle, siteName)

    const defaultScreenshot = getScreenshotPath(path)
    const baseImagePath = image || screenshot || defaultScreenshot
    const ogImage = baseImagePath.startsWith('http') ? baseImagePath : `${siteUrl}${baseImagePath.startsWith('/') ? baseImagePath : `/${baseImagePath}`}`
    const twBaseImagePath = twitterImage || baseImagePath
    const twImage = twBaseImagePath.startsWith('http') ? twBaseImagePath : `${siteUrl}${twBaseImagePath.startsWith('/') ? twBaseImagePath : `/${twBaseImagePath}`}`
    const dynamicImageAlt = resolvedImageAlt

    useEffect(() => {
        let mounted = true

        const loadRatings = async () => {
            if (!hasSupabaseConfig || shouldNoIndex) {
                if (mounted) setLiveRatings({ tool: null, overall: null })
                if (mounted) setLiveRatingMeta({ toolFetchedAt: null, overallFetchedAt: null })
                return
            }

            const next = { tool: null, overall: null }
            const nextMeta = { toolFetchedAt: null, overallFetchedAt: null }

            if (isToolPath && toolDataFromMap?.id) {
                try {
                    const toolStats = await getToolRatingStats(toolDataFromMap.id)
                    if (toolStats && Number(toolStats.totalVotes || 0) > 0) {
                        next.tool = toolStats
                        nextMeta.toolFetchedAt = new Date().toISOString()
                    }
                } catch {
                    // Keep schema clean when live rating fetch fails.
                }
            }

            const isHubPath = path === '/' || path === '/image-tools' || path === '/pdf-tools' || path === '/ai-tools' || path === '/math-tools' || path === '/utility-tools'
            if (isHubPath) {
                try {
                    const overallStats = await getOverallRating()
                    if (overallStats && Number(overallStats.totalVotes || 0) > 0) {
                        next.overall = overallStats
                        nextMeta.overallFetchedAt = new Date().toISOString()
                    }
                } catch {
                    // Keep schema clean when live rating fetch fails.
                }
            }

            if (mounted) {
                setLiveRatings(next)
                setLiveRatingMeta(nextMeta)

                if (import.meta.env.DEV && (nextMeta.toolFetchedAt || nextMeta.overallFetchedAt)) {
                    console.info('[SEO] Live ratings refreshed', {
                        path,
                        toolSlug: toolDataFromMap?.id || null,
                        toolRating: next.tool,
                        overallRating: next.overall,
                        fetchedAt: nextMeta,
                    })
                }
            }
        }

        loadRatings()
        return () => {
            mounted = false
        }
    }, [isToolPath, toolDataFromMap?.id, path, shouldNoIndex])

    // Enhanced keywords based on page type and tool
    const enhancedKeywords = useMemo(() => {
        const routeKeywords = routeDefaults.keywords
        const contentKeywords = []

        if (resolvedToolName) contentKeywords.push(resolvedToolName)
        if (resolvedDescription) contentKeywords.push(resolvedDescription)
        if (toolDataFromMap?.features?.length) contentKeywords.push(toolDataFromMap.features)
        if (resolvedToolSteps?.length) contentKeywords.push(resolvedToolSteps)

        return dedupeKeywords([
            keywords,
            routeKeywords,
            contentKeywords,
            'PixTool',
            'free online tools',
            'privacy-first browser tools',
            'browser-based productivity suite',
        ]).join(', ')
    }, [keywords, routeDefaults.keywords, resolvedToolName, resolvedDescription, resolvedToolSteps, toolDataFromMap])

    // Generate JSON-LD schemas
    const schemas = useMemo(() => {
        const globalSchemas = []

        globalSchemas.push(
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": `${fullUrl}#webpage`,
                "url": fullUrl,
                "name": brandTitle,
                "description": resolvedDescription,
                "inLanguage": "en",
                "isPartOf": { "@id": `${siteUrl}/#website` },
                "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": ogImage,
                },
                "publisher": { "@id": `${siteUrl}/#organization` }
            }
        )

        // Only include Organization and WebSite schemas on the homepage to avoid duplication
        if (path === '/') {
            globalSchemas.push(
                {
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "@id": `${siteUrl}/#organization`,
                    "name": siteName,
                    "url": siteUrl,
                    "logo": {
                        "@type": "ImageObject",
                        "url": `${siteUrl}/logo.webp`,
                        "width": "512",
                        "height": "512"
                    },
                    "image": ogImage,
                    "description": resolvedDescription,
                    "sameAs": [
                        "https://www.linkedin.com/company/uthakkan",
                        "https://twitter.com/ajmal_uk_",
                        "https://www.instagram.com/ajmal_uk_",
                        "https://github.com/ajmaluk",
                        "https://youtube.com/shorts/fzIhPN-gv_E"
                    ]
                },
                {
                    "@context": "https://schema.org",
                    "@type": "VideoObject",
                    "name": "PixTool - The Ultimate Private AI & Productivity Suite [2026 Trailer]",
                    "description": "Discover PixTool, the world's most secure and fast all-in-one productivity hub. Featuring 100+ private tools for PDF, Image processing, and AI generation—all running locally in your browser.",
                    "thumbnailUrl": [
                        "https://img.youtube.com/vi/fzIhPN-gv_E/maxresdefault.jpg"
                    ],
                    "uploadDate": "2026-03-01T08:00:00+08:00",
                    "duration": "PT0M58S",
                    "contentUrl": "https://youtube.com/shorts/fzIhPN-gv_E",
                    "embedUrl": "https://www.youtube.com/embed/fzIhPN-gv_E",
                    "interactionStatistic": {
                        "@type": "InteractionCounter",
                        "interactionType": { "@type": "WatchAction" },
                        "userInteractionCount": 12500
                    },
                    "regionsAllowed": "ALL"
                },
                {
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "@id": `${siteUrl}/#website`,
                    "name": "PixTool",
                    "url": siteUrl,
                    "publisher": { "@id": `${siteUrl}/#organization` },
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": `${siteUrl}/search?q={search_term_string}`,
                        "query-input": "required name=search_term_string"
                    }
                }
            )
        }

        if (routeDefaults.section && path === routeDefaults.section.path) {
            globalSchemas.push(
                {
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": routeDefaults.section.title,
                    "description": resolvedDescription,
                    "url": fullUrl,
                    "isPartOf": { "@id": `${siteUrl}/#website` },
                    "about": routeDefaults.section.name
                },
                {
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "name": routeDefaults.section.name,
                    "itemListElement": routeDefaults.section.tools.map((tool, idx) => ({
                        "@type": "ListItem",
                        "position": idx + 1,
                        "name": tool.title,
                        "url": `${siteUrl}${tool.path}`
                    }))
                }
            )
        }

        // Include WebApplication only on actual tool pages.
        if (isToolPath) {
            const webAppSchema = {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": resolvedToolName || brandTitle || siteName,
                "url": fullUrl,
                "applicationCategory": path.includes('/pdf') ? "BusinessApplication" : "UtilitiesApplication",
                "operatingSystem": "All",
                "isAccessibleForFree": true,
                "author": { "@id": `${siteUrl}/#organization` },
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "url": fullUrl,
                    "availability": "https://schema.org/InStock",
                    "eligibleRegion": [
                        { "@type": "Country", "name": "IN" },
                        { "@type": "Country", "name": "US" },
                        { "@type": "Country", "name": "GB" },
                        { "@type": "Country", "name": "AU" }
                    ]
                }
            }

            if (liveRatings.tool) {
                webAppSchema.aggregateRating = {
                    "@type": "AggregateRating",
                    "ratingValue": Number(Number(liveRatings.tool.avgRating || 0).toFixed(1)),
                    "bestRating": 5,
                    "worstRating": 1,
                    "ratingCount": Number(liveRatings.tool.totalVotes || 0)
                }
            }

            globalSchemas.push(webAppSchema)
        }

        // BreadcrumbList
        const breadcrumbList = Array.isArray(breadcrumbs) ? [...breadcrumbs] : getDefaultBreadcrumbs({
            path: cleanPath,
            section: routeDefaults.section,
            title: resolvedTitle,
            toolTitle: resolvedToolName,
        })

        if (breadcrumbList.length > 0) {
            const breadcrumbItems = breadcrumbList[0]?.item === '/' || breadcrumbList[0]?.name === 'Home'
                ? breadcrumbList
                : [{ name: 'Home', item: siteUrl }, ...breadcrumbList]

            globalSchemas.push({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    ...breadcrumbItems.map((crumb, idx) => ({
                        "@type": "ListItem",
                        "position": idx + 1,
                        "name": crumb.name,
                        "item": crumb.item.startsWith('http') ? crumb.item : `${siteUrl}${crumb.item}`
                    }))
                ]
            })
        }

        // FAQPage
        const finalFaqs = (faqs && Array.isArray(faqs)) ? faqs : (schema?.faq && Array.isArray(schema.faq) ? schema.faq : null)
        if (finalFaqs && finalFaqs.length > 0) {
            globalSchemas.push({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": finalFaqs.map(f => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f.a
                    }
                }))
            })
        }

        // SoftwareApplication (Tool specific)
        if (path !== '/' && isToolPath) {
            const toolTitle = resolvedToolName || brandTitle || resolvedTitle
            globalSchemas.push({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": toolTitle,
                "description": resolvedDescription,
                "applicationCategory": path.includes('/pdf') ? "BusinessApplication" : "UtilitiesApplication",
                "url": fullUrl,
                "image": ogImage,
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock",
                    "url": fullUrl,
                    "eligibleRegion": [
                        { "@type": "Country", "name": "IN" },
                        { "@type": "Country", "name": "US" },
                        { "@type": "Country", "name": "GB" },
                        { "@type": "Country", "name": "AU" }
                    ]
                },
                "softwareVersion": "2026.04",
                "operatingSystem": "All (Web-based Browser Studio)",
                "author": {
                    "@type": "Organization",
                    "name": siteName,
                    "url": siteUrl
                }
            })

            // Add HowTo schema for tool steps if provided
            if (resolvedToolSteps && Array.isArray(resolvedToolSteps) && resolvedToolSteps.length > 0) {
                globalSchemas.push({
                    "@context": "https://schema.org",
                    "@type": "HowTo",
                    "name": `How to use ${toolTitle} | PixTool Guide`,
                    "description": `Step-by-step tutorial on using the ${toolTitle} to achieve professional results locally in your browser.`,
                    "url": fullUrl,
                    "image": ogImage,
                    "totalTime": "PT1M",
                    "supply": [
                        { "@type": "HowToSupply", "name": "Source File" }
                    ],
                    "tool": [
                        { "@type": "HowToTool", "name": "PixTool Browser Studio" }
                    ],
                    "step": resolvedToolSteps.map((step, idx) => ({
                        "@type": "HowToStep",
                        "position": idx + 1,
                        "name": `Step ${idx + 1}: ${step.split('.')[0]}`,
                        "text": step,
                        "url": `${fullUrl}#step-${idx + 1}`
                    }))
                })
            }
        }

        // Article fallback only when no custom article schema is provided
        if (type === 'article' && articlePublishedTime && !schema) {
            const articleSchema = {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": resolvedTitle,
                "datePublished": articlePublishedTime,
                "dateModified": lastModified || new Date().toISOString(),
                "author": {
                    "@type": "Person",
                    "name": articleAuthor || "UTHAKKAN"
                }
            }

            if (articleSection) {
                articleSchema.articleSection = articleSection
            }
            if (articleTags) {
                articleSchema.keywords = Array.isArray(articleTags) ? articleTags.join(', ') : articleTags
            }
            if (readingTime) {
                articleSchema.timeRequired = `PT${readingTime}M`
            }

            globalSchemas.push({
                ...articleSchema
            })
        }

        // ImageObject
        const finalScreenshot = screenshot ? (screenshot.startsWith('http') ? screenshot : `${siteUrl}${screenshot}`) : (path !== '/' ? `${siteUrl}${defaultScreenshot}` : null)
        if (finalScreenshot) {
            globalSchemas.push({
                "@context": "https://schema.org",
                "@type": "ImageObject",
                "contentUrl": finalScreenshot,
                "name": resolvedImageTitle,
                "caption": dynamicImageAlt
            })
        }

        // LocalBusiness schema (added to homepage only to avoid duplication)
        if (path === '/') {
            globalSchemas.push({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "@id": `${siteUrl}/#local-business`,
                "name": siteName,
                "image": `${siteUrl}/logo.webp`,
                "description": "All-in-one free online productivity suite with AI tools, PDF management, image editing, and privacy-first email services.",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Kannur",
                    "addressLocality": "Kannur",
                    "addressRegion": "KL",
                    "postalCode": "670001",
                    "addressCountry": "IN"
                },
                "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "Customer Support",
                    "email": "support@pixtool.in"
                },
                "url": siteUrl,
                "sameAs": [
                    "https://www.linkedin.com/company/uthakkan",
                    "https://twitter.com/ajmal_uk_",
                    "https://www.instagram.com/ajmal_uk_",
                    "https://github.com/ajmaluk"
                ],
                "priceRange": "$0",
                "areaServed": "Worldwide"
            })
        }

        // Promotional Ad Video Schema (YouTube Short)
        const hubPages = ['/', '/about', '/image-tools', '/pdf-tools', '/utility-tools', '/ai-tools', '/math-tools', '/productivity-tools']
        if (hubPages.includes(path)) {
            globalSchemas.push({
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": `${siteName} - The Ultimate Free Productivity Suite`,
                "description": "Discover PixTool, the free privacy-first web studio with 101+ tools including AI generation, PDF management, and image editing utilities. 100% browser-based secured processing.",
                "thumbnailUrl": [
                    "https://img.youtube.com/vi/fzIhPN-gv_E/hqdefault.jpg"
                ],
                "uploadDate": "2026-03-01T00:00:00Z",
                "duration": "PT0M60S",
                "contentUrl": "https://youtube.com/shorts/fzIhPN-gv_E",
                "embedUrl": "https://www.youtube.com/embed/fzIhPN-gv_E",
                "publisher": {
                    "@type": "Organization",
                    "name": siteName,
                    "logo": {
                        "@type": "ImageObject",
                        "url": `${siteUrl}/logo.webp`
                    }
                }
            })
        }

        // SoftwareApplication schema for tool category collections (Fix for Merchant/Review Snippet errors)
        if (routeDefaults.section && path === routeDefaults.section.path) {
            const hubSoftwareSchema = {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "@id": `${fullUrl}/#software-suite`,
                "name": `${brandTitle} Suite`,
                "description": resolvedDescription,
                "applicationCategory": path.includes('/pdf') ? "BusinessApplication" : "UtilitiesApplication",
                "operatingSystem": "All (Web-based Browser Studio)",
                "url": fullUrl,
                "image": ogImage,
                "isAccessibleForFree": true,
                "author": { "@id": `${siteUrl}/#organization` },
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock",
                    "url": fullUrl
                }
            }

            if (liveRatings.overall) {
                hubSoftwareSchema.aggregateRating = {
                    "@type": "AggregateRating",
                    "ratingValue": Number(Number(liveRatings.overall.avgRating || 0).toFixed(1)),
                    "bestRating": 5,
                    "worstRating": 1,
                    "ratingCount": Number(liveRatings.overall.totalVotes || 0)
                }
            }

            globalSchemas.push(hubSoftwareSchema)
        }

        // Combine into schemasToInject
        let schemasToInject = [...globalSchemas]
        if (schema) {
            const extraSchemas = Array.isArray(schema) ? schema : [schema]
            schemasToInject = schemasToInject.concat(extraSchemas)
        }

        return schemasToInject
    }, [resolvedTitle, resolvedDescription, path, fullUrl, ogImage, siteUrl, siteName, schema, articlePublishedTime, articleAuthor, articleSection, articleTags, readingTime, breadcrumbs, faqs, resolvedToolName, resolvedToolSteps, type, lastModified, screenshot, resolvedImageTitle, brandTitle, defaultScreenshot, dynamicImageAlt, isToolPath, liveRatings, routeDefaults.section, cleanPath])

    useEffect(() => {
        document.title = brandTitle

        const updateMeta = (name, content, attribute = 'name') => {
            let meta = document.querySelector(`meta[${attribute}="${name}"]`)
            if (!meta) {
                meta = document.createElement('meta')
                meta.setAttribute(attribute, name)
                document.head.appendChild(meta)
            }
            meta.setAttribute('content', content)
        }

        const removeMeta = (name, attribute = 'name') => {
            const nodes = document.querySelectorAll(`meta[${attribute}="${name}"]`)
            nodes.forEach(node => node.remove())
        }

        updateMeta('description', resolvedDescription)
        updateMeta('keywords', enhancedKeywords)
        const robotsContent = shouldNoIndex
            ? 'noindex, nofollow, noarchive, nosnippet, noimageindex'
            : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        updateMeta('robots', robotsContent)
        updateMeta('googlebot', robotsContent)
        
        // Open Graph
        updateMeta('og:title', brandTitle, 'property')
        updateMeta('og:description', resolvedDescription, 'property')
        updateMeta('og:url', fullUrl, 'property')
        updateMeta('og:image', ogImage, 'property')
        updateMeta('og:image:secure_url', ogImage, 'property')
        updateMeta('og:image:alt', dynamicImageAlt, 'property')
        updateMeta('og:image:width', '1280', 'property')
        updateMeta('og:image:height', '720', 'property')
        updateMeta('og:image:type', 'image/webp', 'property')
        updateMeta('og:type', type, 'property')
        updateMeta('og:site_name', siteName, 'property')
        updateMeta('og:locale', 'en_US', 'property')
        const existingLocaleAlternates = document.querySelectorAll('meta[property="og:locale:alternate"]')
        existingLocaleAlternates.forEach(node => node.remove())
        ;['en_GB', 'en_IN'].forEach((locale) => {
            const localeMeta = document.createElement('meta')
            localeMeta.setAttribute('property', 'og:locale:alternate')
            localeMeta.setAttribute('content', locale)
            document.head.appendChild(localeMeta)
        })

        // Twitter
        updateMeta('twitter:card', 'summary_large_image')
        updateMeta('twitter:title', brandTitle)
        updateMeta('twitter:description', resolvedDescription)
        updateMeta('twitter:image', twImage)
        updateMeta('twitter:image:alt', dynamicImageAlt)
        updateMeta('twitter:creator', '@ajmal_uk_')
        updateMeta('twitter:domain', 'pixtool.in')

        // Article specific meta tags for blog posts
        if (type === 'article' && articlePublishedTime) {
            updateMeta('article:published_time', articlePublishedTime, 'property')
            updateMeta('article:modified_time', lastModified || articlePublishedTime, 'property')
            updateMeta('article:author', articleAuthor || 'UTHAKKAN', 'property')
            if (articleSection) {
                updateMeta('article:section', articleSection, 'property')
            }
            document.querySelectorAll('meta[property="article:tag"]').forEach(node => node.remove())
            if (articleTags && Array.isArray(articleTags)) {
                articleTags.forEach((tag) => {
                    const tagMeta = document.createElement('meta')
                    tagMeta.setAttribute('property', 'article:tag')
                    tagMeta.setAttribute('content', tag)
                    document.head.appendChild(tagMeta)
                })
            }
        } else {
            document.querySelectorAll('meta[property="article:tag"]').forEach(node => node.remove())
        }

        // GEO Tags for Local SEO
        updateMeta('geo.region', 'IN-KL')
        updateMeta('geo.placename', 'Kannur, Kerala, India')
        updateMeta('geo.position', '11.8745;75.3664')
        updateMeta('ICBM', '11.8745, 75.3664')

        // Additional meta tags for better indexing
        updateMeta('google', 'nositelinkssearchbox')

        // Debug freshness markers for verifying schema rating recency.
        if (liveRatingMeta.toolFetchedAt) {
            updateMeta('pixtool:tool-rating-fetched-at', liveRatingMeta.toolFetchedAt)
        } else {
            removeMeta('pixtool:tool-rating-fetched-at')
        }

        if (liveRatingMeta.overallFetchedAt) {
            updateMeta('pixtool:overall-rating-fetched-at', liveRatingMeta.overallFetchedAt)
        } else {
            removeMeta('pixtool:overall-rating-fetched-at')
        }

        // Canonical Link
        let canonical = document.querySelector('link[rel="canonical"]')
        // Language Alternates (hreflang)
        let alternateEn = document.querySelector('link[hreflang="en"]')
        let alternateDefault = document.querySelector('link[hreflang="x-default"]')

        if (!shouldNoIndex) {
            if (!canonical) {
                canonical = document.createElement('link')
                canonical.setAttribute('rel', 'canonical')
                document.head.appendChild(canonical)
            }
            canonical.setAttribute('href', fullUrl)

            if (!alternateEn) {
                alternateEn = document.createElement('link')
                alternateEn.setAttribute('rel', 'alternate')
                alternateEn.setAttribute('hreflang', 'en')
                document.head.appendChild(alternateEn)
            }
            alternateEn.setAttribute('href', fullUrl)

            if (!alternateDefault) {
                alternateDefault = document.createElement('link')
                alternateDefault.setAttribute('rel', 'alternate')
                alternateDefault.setAttribute('hreflang', 'x-default')
                document.head.appendChild(alternateDefault)
            }
            alternateDefault.setAttribute('href', fullUrl)
        } else {
            if (canonical) canonical.remove()
            if (alternateEn) alternateEn.remove()
            if (alternateDefault) alternateDefault.remove()
        }

    }, [brandTitle, resolvedDescription, enhancedKeywords, shouldNoIndex, fullUrl, ogImage, type, siteName, twImage, articlePublishedTime, lastModified, articleAuthor, articleSection, articleTags, dynamicImageAlt, liveRatingMeta])

    const schemasToRender = useMemo(() => (shouldNoIndex ? [] : schemas), [shouldNoIndex, schemas])
    const schemaDiagnostics = useMemo(() => {
        if (shouldNoIndex) {
            return { issues: [], hasIssue: false }
        }

        const issues = []

        if (schemasToRender.length === 0) {
            issues.push('No JSON-LD schema was generated for an indexable page.')
        }

        schemasToRender.forEach((schemaItem, index) => {
            if (!schemaItem || typeof schemaItem !== 'object') {
                issues.push(`Schema #${index + 1} is not a valid object.`)
                return
            }

            if (!schemaItem['@context']) {
                issues.push(`Schema #${index + 1} is missing @context.`)
            }

            if (!schemaItem['@type']) {
                issues.push(`Schema #${index + 1} is missing @type.`)
            }
        })

        if (isToolPath && !schemasToRender.some(item => item?.['@type'] === 'WebApplication')) {
            issues.push('Tool page is missing WebApplication schema.')
        }

        if (routeDefaults.section && path === routeDefaults.section.path && !schemasToRender.some(item => item?.['@type'] === 'SoftwareApplication')) {
            issues.push('Hub page is missing SoftwareApplication suite schema.')
        }

        if (faqs && Array.isArray(faqs) && faqs.length > 0 && !schemasToRender.some(item => item?.['@type'] === 'FAQPage')) {
            issues.push('FAQ content is present but FAQPage schema was not generated.')
        }

        if (resolvedToolSteps && Array.isArray(resolvedToolSteps) && resolvedToolSteps.length > 0 && !schemasToRender.some(item => item?.['@type'] === 'HowTo')) {
            issues.push('Tool steps are present but HowTo schema was not generated.')
        }

        return { issues, hasIssue: issues.length > 0 }
    }, [schemasToRender, shouldNoIndex, isToolPath, path, faqs, resolvedToolSteps, routeDefaults.section])

    useEffect(() => {
        if (import.meta.env.DEV) {
            setShowSchemaDiagnostics(schemaDiagnostics.hasIssue)
        }
    }, [schemaDiagnostics.hasIssue])

    useEffect(() => {
        if (!import.meta.env.DEV || !showSchemaDiagnostics) {
            return
        }

        const handlePointerMove = (event) => {
            if (!dragStateRef.current?.dragging) return
            event.preventDefault()
            const deltaX = event.clientX - dragStateRef.current.startX
            const deltaY = event.clientY - dragStateRef.current.startY
            setDiagnosticsOffset({
                x: dragStateRef.current.baseX + deltaX,
                y: dragStateRef.current.baseY + deltaY,
            })
        }

        const handlePointerUp = () => {
            if (dragStateRef.current) {
                dragStateRef.current.dragging = false
            }
        }

        window.addEventListener('pointermove', handlePointerMove, { passive: false })
        window.addEventListener('pointerup', handlePointerUp)
        window.addEventListener('pointercancel', handlePointerUp)

        return () => {
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerup', handlePointerUp)
            window.removeEventListener('pointercancel', handlePointerUp)
        }
    }, [showSchemaDiagnostics])

    useEffect(() => {
        if (!diagnosticsCopied) return undefined
        const timeoutId = window.setTimeout(() => setDiagnosticsCopied(false), 1400)
        return () => window.clearTimeout(timeoutId)
    }, [diagnosticsCopied])

    const beginDiagnosticsDrag = (event) => {
        if (!import.meta.env.DEV) return
        dragStateRef.current = {
            dragging: true,
            startX: event.clientX,
            startY: event.clientY,
            baseX: diagnosticsOffset.x,
            baseY: diagnosticsOffset.y,
        }
        event.currentTarget.setPointerCapture?.(event.pointerId)
    }

    const copySchemasToClipboard = async () => {
        if (!schemasToRender.length) return

        const payload = JSON.stringify(schemasToRender, null, 2)
        try {
            await navigator.clipboard.writeText(payload)
            setDiagnosticsCopied(true)
        } catch {
            const fallbackTextarea = document.createElement('textarea')
            fallbackTextarea.value = payload
            fallbackTextarea.style.position = 'fixed'
            fallbackTextarea.style.opacity = '0'
            document.body.appendChild(fallbackTextarea)
            fallbackTextarea.select()
            document.execCommand('copy')
            document.body.removeChild(fallbackTextarea)
            setDiagnosticsCopied(true)
        }
    }

    return (
        <>
            {schemasToRender.map((s, idx) => (
                <script
                    key={idx}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
                />
            ))}
            {import.meta.env.DEV && schemasToRender.length > 0 && (
                <>
                    <button
                        type="button"
                        onClick={() => setShowSchemaDiagnostics(prev => !prev)}
                        style={{
                            position: 'fixed',
                            right: '0.75rem',
                            bottom: '0.75rem',
                            zIndex: 2147483647,
                            border: '1px solid var(--border-color)',
                            borderRadius: '999px',
                            padding: '0.35rem 0.7rem',
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'var(--text-primary)',
                            background: 'var(--bg-glass)',
                            backdropFilter: 'blur(18px)',
                            WebkitBackdropFilter: 'blur(18px)',
                            boxShadow: '0 12px 28px rgba(15, 23, 42, 0.18)',
                            cursor: 'pointer'
                        }}
                        aria-label="Toggle schema diagnostics"
                    >
                        Schema
                    </button>

                    {showSchemaDiagnostics && (
                        <div
                            style={{
                                position: 'fixed',
                                right: '0.75rem',
                                bottom: '3.4rem',
                                width: 'min(360px, calc(100vw - 1.5rem))',
                                maxHeight: '38vh',
                                zIndex: 2147483647,
                                border: '1px solid var(--border-color)',
                                borderRadius: '14px',
                                background: 'var(--bg-card)',
                                boxShadow: '0 18px 40px rgba(15, 23, 42, 0.18)',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                transform: `translate(${diagnosticsOffset.x}px, ${diagnosticsOffset.y}px)`,
                                touchAction: 'none'
                            }}
                        >
                            <div
                                onPointerDown={beginDiagnosticsDrag}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.6rem', padding: '0.65rem 0.8rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)', cursor: 'grab', userSelect: 'none' }}
                            >
                                <strong style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Schema Diagnostics</strong>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                                    <button
                                        type="button"
                                        onClick={copySchemasToClipboard}
                                        style={{
                                            border: '1px solid var(--border-color)',
                                            background: 'var(--bg-primary)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.68rem',
                                            fontWeight: 800,
                                            cursor: 'pointer',
                                            borderRadius: '999px',
                                            padding: '0.28rem 0.55rem'
                                        }}
                                        aria-label="Copy schema JSON-LD"
                                    >
                                        {diagnosticsCopied ? 'Copied' : 'Copy'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowSchemaDiagnostics(false)}
                                        style={{
                                            border: 'none',
                                            background: 'transparent',
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.85rem',
                                            fontWeight: 700,
                                            cursor: 'pointer'
                                        }}
                                        aria-label="Close schema diagnostics"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                            <div style={{ padding: '0.7rem 0.8rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(239, 68, 68, 0.05)', color: 'var(--text-primary)', fontSize: '0.72rem', lineHeight: 1.45 }}>
                                {schemaDiagnostics.hasIssue ? (
                                    <>
                                        <strong>Issues found:</strong>
                                        <ul style={{ margin: '0.35rem 0 0', paddingLeft: '1rem' }}>
                                            {schemaDiagnostics.issues.slice(0, 4).map((issue) => (
                                                <li key={issue}>{issue}</li>
                                            ))}
                                            {schemaDiagnostics.issues.length > 4 && <li>+{schemaDiagnostics.issues.length - 4} more</li>}
                                        </ul>
                                    </>
                                ) : (
                                    <strong>No schema issues detected for this route.</strong>
                                )}
                            </div>
                            <pre style={{ margin: 0, padding: '0.75rem 0.8rem', fontSize: '0.68rem', lineHeight: 1.45, overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: 'var(--text-primary)' }}>
{JSON.stringify(schemasToRender, null, 2)}
                            </pre>
                        </div>
                    )}
                </>
            )}
        </>
    )
}
