import { useEffect, useMemo } from 'react'
import { ALL_TOOLS_MAP } from '../data/tools'
import { SITE_URL, SITE_NAME } from '../config/app.config'

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
    title = 'PixTool - Free AI & Privacy-First Productivity Suite',
    description = 'The ultimate all-in-one productivity suite featuring professional AI generation tools, secure PDF management, and image editing. 100% browser-based with zero-upload privacy.',
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
    const fullUrl = path === '/' ? siteUrl : `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
    const isToolPath = path.includes('/image-tools') || path.includes('/pdf-tools') || path.includes('/temp-mail') || path.includes('/qr-') || path.includes('/typing-test') || path === '/fake-email' || path === '/disposable-email' || path === '/throwaway-email' || path === '/code-diff' || path.includes('/ai-tools') || path.includes('/math-tools')
    const shouldNoIndex = noIndex || path.startsWith('/pix-admin') || window.location.search.includes('q={search_term_string}') || window.location.search.includes('?q=')

    const brandTitle = title.includes('PixTool') ? title : `${title} | PixTool`

    const defaultScreenshot = getScreenshotPath(path)
    const ogImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`) : `${siteUrl}${defaultScreenshot}`
    const twImage = twitterImage ? (twitterImage.startsWith('http') ? twitterImage : `${siteUrl}${twitterImage.startsWith('/') ? twitterImage : `/${twitterImage}`}`) : `${siteUrl}${defaultScreenshot}`
    
    // Dynamic Alt text for images - critical for image SEO ranking
    const dynamicImageAlt = imageAlt || (toolName ? `Screenshot of PixTool ${toolName} - High-quality browser-based productivity tool` : `${title} - Professional online utility by UTHAKKAN`)

    // Enhanced keywords based on page type and tool
    const enhancedKeywords = useMemo(() => {
        const baseKeywords = 'free ai tools, ai content generator, best ai assistant 2026, privacy-first productivity, local image processing, secure pdf editor, dev tools, professional web utilities, LLM assistant, ai writing companion, secure local ai'

        const toolKeywords = {
            'image-tools': 'professional image editing, high-fidelity photo scaling, batch image optimization, local image conversion, privacy-focused photo editor',
            'pdf-tools': 'secure pdf management, client-side pdf merging, local pdf encryption, professional document splitting, high-performance pdf compression',
            'temp-mail': 'anonymous temporary email, secure disposable inbox, privacy-first mail generator, professional burner email services',
            'qr': 'branded qr code generator, secure offline qr scanner, local qr code creation, privacy-focused qr tools'
        }

        const matchedKeywords = []
        Object.keys(toolKeywords).forEach(key => {
            if (path.includes(key)) {
                matchedKeywords.push(toolKeywords[key])
            }
        })

        return [keywords, ...matchedKeywords, baseKeywords].filter(Boolean).join(', ')
    }, [keywords, path])

    // Generate JSON-LD schemas
    const schemas = useMemo(() => {
        const globalSchemas = []

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
                    "description": description || "All-in-one productivity suite with privacy-first tools.",
                    "sameAs": [
                        "https://www.linkedin.com/company/uthakkan",
                        "https://twitter.com/ajmal_uk_",
                        "https://www.instagram.com/ajmal_uk_",
                        "https://github.com/ajmaluk"
                    ]
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

        // Include WebApplication only on actual tool pages.
        if (isToolPath) {
            globalSchemas.push({
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": toolName ? `PixTool ${toolName}` : siteName,
                "url": fullUrl,
                "applicationCategory": path.includes('/pdf') ? "BusinessApplication" : "UtilitiesApplication",
                "operatingSystem": "All",
                "isAccessibleForFree": true,
                "author": { "@id": `${siteUrl}/#organization` },
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                }
            })
        }

        // BreadcrumbList
        const breadcrumbList = Array.isArray(breadcrumbs) ? [...breadcrumbs] : []
        if (breadcrumbList.length === 0 && path !== '/') {
            const parts = path.split('/').filter(Boolean)
            let currentPath = ''
            parts.forEach((part) => {
                currentPath += `/${part}`
                const name = part.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                breadcrumbList.push({ name, item: currentPath })
            })
        }

        if (breadcrumbList.length > 0) {
            globalSchemas.push({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": siteUrl
                    },
                    ...breadcrumbList.map((crumb, idx) => ({
                        "@type": "ListItem",
                        "position": idx + 2,
                        "name": crumb.name,
                        "item": crumb.item.startsWith('http') ? crumb.item : `${siteUrl}${crumb.item}`
                    }))
                ]
            })
        }

        // FAQPage
        if (faqs && Array.isArray(faqs) && faqs.length > 0) {
            globalSchemas.push({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.a
                    }
                }))
            })
        }

        // SoftwareApplication (Tool specific)
        if (path !== '/' && isToolPath) {
            const toolTitle = toolName || brandTitle || title
            globalSchemas.push({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": toolTitle,
                "description": description,
                "applicationCategory": path.includes('/pdf') ? "BusinessApplication" : "UtilitiesApplication",
                "url": fullUrl,
                "image": ogImage,
                "isAccessibleForFree": true,
                "softwareRequirements": "No installation or account required. Works 100% locally in your browser.",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                },
                "author": {
                    "@type": "Organization",
                    "name": siteName,
                    "url": siteUrl
                }
            })

            // Add HowTo schema for tool steps if provided
            if (toolSteps && Array.isArray(toolSteps) && toolSteps.length > 0) {
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
                    "step": toolSteps.map((step, idx) => ({
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
                "headline": title,
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
                "name": imageTitle || toolName || title,
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
                    "telephone": "+91-XXXXXXXXXX",
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

        // AggregateOffer schema for tool listing pages
        if (path === '/image-tools' || path === '/pdf-tools' || path === '/ai-tools' || path === '/math-tools' || path === '/utility-tools') {
            globalSchemas.push({
                "@context": "https://schema.org",
                "@type": "AggregateOffer",
                "@id": `${fullUrl}/#aggregate-offer`,
                "name": `${brandTitle} Collection`,
                "description": description,
                "image": ogImage,
                "offer": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock",
                    "url": fullUrl
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "bestRating": "5",
                    "worstRating": "1",
                    "ratingCount": "2500",
                    "reviewCount": "1800"
                }
            })
        }

        // Product schema for individual tools (high-impact for e-commerce-style rankings)
        if (path !== '/' && isToolPath && toolName) {
            globalSchemas.push({
                "@context": "https://schema.org",
                "@type": "Product",
                "@id": `${fullUrl}/#product`,
                "name": `${toolName} | PixTool`,
                "description": description,
                "image": ogImage,
                "brand": {
                    "@type": "Brand",
                    "name": siteName,
                    "url": siteUrl
                },
                "manufacturer": {
                    "@type": "Organization",
                    "name": siteName,
                    "url": siteUrl
                },
                "url": fullUrl,
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock",
                    "url": fullUrl,
                    "eligibleRegion": [
                        {
                            "@type": "Country",
                            "name": "IN"
                        },
                        {
                            "@type": "Country",
                            "name": "US"
                        },
                        {
                            "@type": "Country",
                            "name": "GB"
                        },
                        {
                            "@type": "Country",
                            "name": "AU"
                        }
                    ]
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.7",
                    "bestRating": "5",
                    "worstRating": "1",
                    "ratingCount": "850",
                    "reviewCount": "620"
                }
            })
        }

        // Combine into schemasToInject
        let schemasToInject = [...globalSchemas]
        if (schema) {
            const extraSchemas = Array.isArray(schema) ? schema : [schema]
            schemasToInject = schemasToInject.concat(extraSchemas)
        }

        return schemasToInject
    }, [title, description, path, fullUrl, ogImage, siteUrl, siteName, schema, articlePublishedTime, articleAuthor, articleSection, articleTags, readingTime, breadcrumbs, faqs, toolName, toolSteps, type, lastModified, screenshot, imageTitle, brandTitle, defaultScreenshot, dynamicImageAlt, isToolPath])

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

        updateMeta('description', description)
        updateMeta('keywords', enhancedKeywords)
        const robotsContent = shouldNoIndex
            ? 'noindex, nofollow, noarchive, nosnippet, noimageindex'
            : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        updateMeta('robots', robotsContent)
        updateMeta('googlebot', robotsContent)
        
        // Open Graph
        updateMeta('og:title', brandTitle, 'property')
        updateMeta('og:description', description, 'property')
        updateMeta('og:url', fullUrl, 'property')
        updateMeta('og:image', ogImage, 'property')
        updateMeta('og:image:alt', dynamicImageAlt, 'property')
        updateMeta('og:image:width', '1280', 'property')
        updateMeta('og:image:height', '720', 'property')
        updateMeta('og:image:type', 'image/webp', 'property')
        updateMeta('og:type', type, 'property')
        updateMeta('og:site_name', siteName, 'property')
        updateMeta('og:locale', 'en_US', 'property')
        updateMeta('og:locale:alternate', 'en_GB', 'property')
        updateMeta('og:locale:alternate', 'en_IN', 'property')

        // Twitter
        updateMeta('twitter:card', 'summary_large_image')
        updateMeta('twitter:title', brandTitle)
        updateMeta('twitter:description', description)
        updateMeta('twitter:image', twImage)
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
            if (articleTags && Array.isArray(articleTags)) {
                articleTags.forEach((tag) => {
                    const tagMeta = document.createElement('meta')
                    tagMeta.setAttribute('property', 'article:tag')
                    tagMeta.setAttribute('content', tag)
                    document.head.appendChild(tagMeta)
                })
            }
        }

        // GEO Tags for Local SEO
        updateMeta('geo.region', 'IN-KL')
        updateMeta('geo.placename', 'Kannur, Kerala, India')
        updateMeta('geo.position', '11.8745;75.3664')
        updateMeta('ICBM', '11.8745, 75.3664')

        // Additional meta tags for better indexing
        updateMeta('google', 'nositelinkssearchbox')
        updateMeta('googlebot-news', 'nosnippet')

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

    }, [brandTitle, description, enhancedKeywords, shouldNoIndex, fullUrl, ogImage, type, siteName, twImage, articlePublishedTime, lastModified, articleAuthor, articleSection, articleTags, dynamicImageAlt])

    const schemasToRender = shouldNoIndex ? [] : schemas

    return (
        <>
            {schemasToRender.map((s, idx) => (
                <script
                    key={idx}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
                />
            ))}
        </>
    )
}
