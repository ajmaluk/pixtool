import { useEffect, useMemo } from 'react'

export default function SEO({
    title = 'PixTool - Free Online Productivity Suite',
    description = 'The ultimate all-in-one productivity suite featuring professional browser-based tools for PDF management, image editing, and utility workflows. No uploads, 100% private.',
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
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'
    const siteName = 'PixTool by UTHAKKAN'
    const fullUrl = path === '/' ? siteUrl : `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`

    const brandTitle = title.includes('PixTool') ? title : `${title} | PixTool`
    
    // Map path to screenshot filename for maximum Image SEO ranking
    const getScreenshotPath = (path) => {
        const SCREENSHOT_MAP = {
            '/': 'pixtool-all-in-one-productivity-suite.png',
            '/image-tools': 'professional-online-image-studio.png',
            '/pdf-tools': 'secure-pdf-management-suite.png',
            '/utility-tools': 'all-in-one-web-utility-toolbox.png',
            '/image-tools/resize': 'best-online-image-resizer-tool.png',
            '/image-tools/crop': 'professional-image-cropper-online.png',
            '/image-tools/rotate': 'free-online-image-rotator.png',
            '/image-tools/compress': 'high-quality-image-compressor-online.png',
            '/image-tools/convert': 'online-image-format-converter-webp-png-jpg.png',
            '/image-tools/watermark': 'add-watermark-to-photos-online-free.png',
            '/image-tools/flip': 'flip-and-mirror-images-online-instantly.png',
            '/image-tools/grayscale': 'convert-image-to-grayscale-online.png',
            '/pdf-tools/merge': 'fast-pdf-merger-no-upload-pixtool.png',
            '/pdf-tools/split': 'split-pdf-pages-online-securely.png',
            '/pdf-tools/compress': 'optimize-pdf-file-size-online.png',
            '/pdf-tools/protect': 'secure-pdf-with-password-online.png',
            '/pdf-tools/reorder': 'reorder-pdf-pages-online-free.png',
            '/pdf-tools/convert': 'convert-pdf-to-images-online-high-res.png',
            '/pdf-tools/watermark': 'add-text-watermark-to-pdf-online.png',
            '/temp-mail': 'disposable-temporary-email-generator.png',
            '/temp-mail/10-minute-mail': '10-minute-mail-free-disposable-inbox.png',
            '/temp-mail/change-email': 'change-temporary-email-address-online.png',
            '/qr-generator': 'best-free-qr-code-generator-online.png',
            '/qr-scanner': 'fast-online-qr-code-scanner-browser.png',
            '/typing-test': 'professional-typing-speed-test-online.png',
            '/fake-email': 'generate-fake-email-for-testing.png',
            '/disposable-email': 'burner-email-address-generator-privacy.png',
            '/throwaway-email': 'throwaway-email-inbox-online-free.png'
        }

        const cleanPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path
        return `/screenshots/${SCREENSHOT_MAP[cleanPath] || 'pixtool-all-in-one-productivity-suite.png'}`
    }

    const defaultScreenshot = getScreenshotPath(path)
    const ogImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`) : `${siteUrl}${defaultScreenshot}`
    const twImage = twitterImage ? (twitterImage.startsWith('http') ? twitterImage : `${siteUrl}${twitterImage.startsWith('/') ? twitterImage : `/${twitterImage}`}`) : `${siteUrl}${defaultScreenshot}`
    
    // Dynamic Alt text for images - critical for image SEO ranking
    const dynamicImageAlt = imageAlt || (toolName ? `Screenshot of PixTool ${toolName} - High-quality browser-based productivity tool` : `${title} - Professional online utility by UTHAKKAN`)

    // Enhanced keywords based on page type and tool
    const enhancedKeywords = useMemo(() => {
        const baseKeywords = 'free online tools, browser-based productivity, no upload tools, privacy-first web apps, online PDF editor, free image editor, daily tools for developers, best online utilities 2026'
        const toolKeywords = {
            'image-tools': 'resize image online free, crop photo online, compress image no quality loss, convert image format webp, batch image resizer, background remover alternative, online photo editor',
            'pdf-tools': 'merge pdf free online, split pdf browser, compress pdf 100kb, protect pdf password, watermark pdf documents, pdf to image converter high resolution, adobe acrobat alternative',
            'temp-mail': 'temporary email generator, disposable email address, 10 minute mail free, anonymous email inbox, protect email from spam, throwaway email account',
            'qr': 'qr code generator wifi, online qr scanner, custom qr code with logo, create qr for link, safe qr reader browser'
        }

        let addedKeywords = ''
        Object.keys(toolKeywords).forEach(key => {
            if (path.includes(key)) {
                addedKeywords += `, ${toolKeywords[key]}`
            }
        })

        if (keywords) {
            return `${keywords}, ${addedKeywords}, ${baseKeywords}`
        }
        return `${addedKeywords ? `${addedKeywords}, ` : ''}${baseKeywords}`
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
                        "url": `${siteUrl}/logo.png`,
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

        // Include WebApplication on all pages but link it to the organization
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

        // BreadcrumbList
        const breadcrumbList = breadcrumbs || []
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
        if (path !== '/' && (path.includes('/image-tools') || path.includes('/pdf-tools') || path.includes('/temp-mail') || path.includes('/qr-') || path.includes('/typing-test'))) {
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
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "ratingCount": "2500",
                    "bestRating": "5"
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

        // Article
        if (type === 'article' && articlePublishedTime) {
            globalSchemas.push({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": title,
                "datePublished": articlePublishedTime,
                "dateModified": lastModified || new Date().toISOString(),
                "author": {
                    "@type": "Person",
                    "name": articleAuthor || "UTHAKKAN"
                }
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

        // Combine into schemasToInject
        let schemasToInject = [...globalSchemas]
        if (schema) {
            const extraSchemas = Array.isArray(schema) ? schema : [schema]
            schemasToInject = schemasToInject.concat(extraSchemas)
        }

        // Speakable Specification
        schemasToInject.push({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "speakable": {
                "@type": "SpeakableSpecification",
                "xpath": ["/html/head/meta[@name='description']/@content"]
            }
        })

        return schemasToInject
    }, [title, description, path, fullUrl, ogImage, siteUrl, siteName, schema, articlePublishedTime, articleAuthor, breadcrumbs, faqs, toolName, toolSteps, type, lastModified, screenshot, imageAlt, imageTitle, brandTitle, defaultScreenshot, dynamicImageAlt])

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
        updateMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
        
        // Open Graph
        updateMeta('og:title', brandTitle, 'property')
        updateMeta('og:description', description, 'property')
        updateMeta('og:url', fullUrl, 'property')
        updateMeta('og:image', ogImage, 'property')
        updateMeta('og:type', type, 'property')
        updateMeta('og:site_name', siteName, 'property')

        // Twitter
        updateMeta('twitter:card', 'summary_large_image')
        updateMeta('twitter:title', brandTitle)
        updateMeta('twitter:description', description)
        updateMeta('twitter:image', twImage)

        // GEO Tags
        updateMeta('geo.region', 'IN-KL')
        updateMeta('geo.placename', 'Kannur, Kerala, India')
        updateMeta('geo.position', '11.8745;75.3664')

        // Canonical Link
        let canonical = document.querySelector('link[rel="canonical"]')
        if (!noIndex) {
            if (!canonical) {
                canonical = document.createElement('link')
                canonical.setAttribute('rel', 'canonical')
                document.head.appendChild(canonical)
            }
            canonical.setAttribute('href', fullUrl)
        } else if (canonical) {
            canonical.remove()
        }

    }, [brandTitle, description, enhancedKeywords, noIndex, fullUrl, ogImage, type, siteName, twImage])

    return (
        <>
            {schemas.map((s, idx) => (
                <script
                    key={idx}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
                />
            ))}
        </>
    )
}
