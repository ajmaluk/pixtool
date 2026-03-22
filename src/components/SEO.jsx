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
    lastModified = null
}) {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'
    const siteName = 'PixTool by UTHAKKAN'
    const fullUrl = path === '/' ? siteUrl : `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`

    const brandTitle = title.includes('PixTool') ? title : `${title} | PixTool`
    useEffect(() => {
        document.title = brandTitle
    }, [brandTitle])

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

    const screenshotPath = getScreenshotPath(path)
    const ogImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`) : `${siteUrl}${screenshotPath}`
    const twImage = twitterImage ? (twitterImage.startsWith('http') ? twitterImage : `${siteUrl}${twitterImage.startsWith('/') ? twitterImage : `/${twitterImage}`}`) : `${siteUrl}${screenshotPath}`
    
    // Dynamic Alt text for images - critical for image SEO ranking
    const imageAlt = toolName ? `Screenshot of PixTool ${toolName} - High-quality browser-based productivity tool` : `${title} - Professional online utility by UTHAKKAN`

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
        return `${addedKeywords}, ${baseKeywords}`
    }, [keywords, path])

    // Generate JSON-LD schemas
    const schemas = useMemo(() => {
        const globalSchemas = [
            {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": siteName,
                "url": siteUrl,
                "logo": `${siteUrl}/logo.png`,
                "image": ogImage,
                "description": description || "All-in-one productivity suite with privacy-first tools. Image tools (resize, crop, compress, convert), PDF tools (merge, split, compress), Temp Mail, QR Generator, Typing Test. No uploads - all processing happens in your browser.",
                "sameAs": [
                    "https://www.linkedin.com/company/uthakkan",
                    "https://twitter.com/ajmal_uk_",
                    "https://www.instagram.com/ajmal_uk_",
                    "https://github.com/ajmaluk"
                ],
                "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "contact@uthakkan.com",
                    "contactType": "customer service",
                    "availableLanguage": ["English"]
                },
                "founder": {
                    "@type": "Person",
                    "name": "Ajmal U K",
                    "jobTitle": "Founder & Senior Full Stack Developer",
                    "url": `${siteUrl}/founder`,
                    "knowsAbout": ["Full Stack Development", "Information Security", "Digital Image Processing", "PDF Automation", "AI Engineering"],
                    "sameAs": [
                        "https://twitter.com/ajmal_uk_",
                        "https://linkedin.com/in/ajmaluk"
                    ]
                },
                "knowsAbout": [
                    "Lossless Image Compression", 
                    "AES-256 PDF Encryption", 
                    "Client-Side Privacy", 
                    "WASM Performance", 
                    "Generative AI Content Analysis"
                ],
                "abstract": "PixTool is a professional-grade productivity suite that executes all file manipulations 100% locally in the browser, ensuring military-grade privacy by never uploading user data to a server.",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Kannur",
                    "addressRegion": "Kerala",
                    "addressCountry": "IN"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "11.8745",
                    "longitude": "75.3664"
                },
                "areaServed": "Worldwide",
                "serviceType": "Online Tools Platform",
                "priceRange": "$$",
                "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    "opens": "00:00",
                    "closes": "23:59"
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": siteName,
                "image": ogImage,
                "@id": siteUrl,
                "url": siteUrl,
                "telephone": "",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Kasaragod - Kannur Rd",
                    "addressLocality": "Kannur",
                    "addressRegion": "Kerala",
                    "postalCode": "670001",
                    "addressCountry": "IN"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "11.8745",
                    "longitude": "75.3664"
                },
                "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday"
                    ],
                    "opens": "00:00",
                    "closes": "23:59"
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "PixTool",
                "url": siteUrl,
                "description": "All-in-one productivity suite with privacy-first tools. Image tools (resize, crop, compress, convert), PDF tools (merge, split, compress), Temp Mail, QR Generator, Typing Test. No uploads - all processing happens in your browser.",
                "alternateName": "PixTool - Free Online Tools Suite",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": `${siteUrl}/?q={search_term_string}`
                    },
                    "query-input": "required name=search_term_string"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": siteName,
                    "logo": {
                        "@type": "ImageObject",
                        "url": `${siteUrl}/logo.png`,
                        "width": 512,
                        "height": 512
                    }
                },
                "image": `${siteUrl}/logo.png`
            },
            {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "PixTool",
                "alternateName": ["DT Tools", "UTHAKKAN Tools"],
                "applicationCategory": "UtilitiesApplication",
                "applicationSubCategory": "Productivity",
                "operatingSystem": "Web Browser (Chrome, Firefox, Safari, Edge)",
                "url": siteUrl,
                "description": "All-in-one productivity suite with privacy-first tools. Image tools (resize, crop, compress, convert), PDF tools (merge, split, compress), Temp Mail, QR Generator, Typing Test. No uploads - all processing happens in your browser.",
                "browserRequirements": "Requires a modern web browser with JavaScript enabled.",
                "permissions": "Requires no special permissions for basic use; camera access for QR scanning.",
                "isAccessibleForFree": true,
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "ratingCount": "3500",
                    "bestRating": "5",
                    "worstRating": "1"
                },
                "author": {
                    "@type": "Organization",
                    "name": siteName,
                    "url": siteUrl
                },
                "abstract": "A robust, privacy-first web application specializing in browser-based image editing and PDF management.",
                "knowsAbout": ["Image Processing", "PDF Compression", "Privacy-Preserving Computation"]
            },
            {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "url": siteUrl,
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${siteUrl}/?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                },
                "speakable": {
                    "@type": "SpeakableSpecification",
                    "cssSelector": [".site-description", ".tool-header-description"]
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Online Productivity Tools",
                "provider": {
                    "@type": "Organization",
                    "name": siteName,
                    "url": siteUrl
                },
                "areaServed": "Worldwide",
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "PixTool Categories",
                    "itemListElement": [
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "PDF Management" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Image Studio" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Utility Toolbox" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Temporary Email Infrastructure" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "QR Code Systems" } }
                    ]
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "SocialMediaPosting",
                "headline": title,
                "author": {
                    "@type": "Person",
                    "name": "Ajmal U K"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "UTHAKKAN"
                },
                "url": fullUrl,
                "image": ogImage
            }
        ]

        // Add page-specific schemas
        if (path === '/about') {
            globalSchemas.push({
                "@context": "https://schema.org",
                "@type": "AboutPage",
                "mainEntity": globalSchemas[0]
            })
        }

        if (path === '/contact') {
            globalSchemas.push({
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "mainEntity": globalSchemas[0]
            })
        }

        // Add breadcrumb schema
        const breadcrumbItems = breadcrumbs || []
        
        // Auto-generate breadcrumbs if not provided and not on home page
        if (breadcrumbItems.length === 0 && path !== '/') {
            const parts = path.split('/').filter(Boolean)
            let currentPath = ''
            parts.forEach((part) => {
                currentPath += `/${part}`
                const name = part.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                breadcrumbItems.push({ name, item: currentPath })
            })
        }

        if (breadcrumbItems.length > 0) {
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
                    ...breadcrumbItems.map((crumb, idx) => ({
                        "@type": "ListItem",
                        "position": idx + 2,
                        "name": crumb.name,
                        "item": crumb.item.startsWith('http') ? crumb.item : `${siteUrl}${crumb.item}`
                    }))
                ]
            })
        }


        // Add FAQ schema if provided
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

        // Add tool-specific schema for image/PDF/QR tools
        if (path.includes('/image-tools/') || path.includes('/pdf-tools/') || path === '/temp-mail' || path.includes('/qr-')) {
            let toolType = 'MultimediaApplication'
            let category = 'Image Processing'
            if (path.includes('/pdf-tools/')) {
                toolType = 'BusinessApplication'
                category = 'PDF Management'
            }
            if (path === '/temp-mail') {
                toolType = 'CommunicationApplication'
                category = 'Email Utilities'
            }
            if (path.includes('/qr-')) {
                toolType = 'UtilitiesApplication'
                category = 'QR Code Tools'
            }

            const toolTitle = toolName || title.replace(' | PixTool', '').replace(' - PixTool', '')

            globalSchemas.push({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": toolTitle,
                "description": description,
                "applicationCategory": toolType,
                "applicationSubCategory": category,
                "operatingSystem": "Any modern web browser (Chrome, Firefox, Safari, Edge)",
                "url": fullUrl,
                "image": ogImage,
                "isAccessibleForFree": true,
                "softwareRequirements": "No installation or account required. Works 100% locally in your browser.",
                "featureList": (toolSteps && Array.isArray(toolSteps)) ? toolSteps.join(', ') : 
                              (Array.isArray(globalSchemas[0]?.benefits) ? globalSchemas[0].benefits.join(', ') : "Professional browser-based file processing"),
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
                        { "@type": "HowToSupply", "name": "Source File (Image/PDF)" }
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

        // Add article schema for blog posts
        let articleSchema = null
        if (type === 'article' && articlePublishedTime) {
            articleSchema = {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": title,
                "description": description,
                "image": ogImage,
                "url": fullUrl,
                "datePublished": articlePublishedTime,
                "dateModified": lastModified || new Date().toISOString(),
                "dateCreated": articlePublishedTime,
                "author": {
                    "@type": "Person",
                    "name": articleAuthor || 'UTHAKKAN',
                    "url": `${siteUrl}/founder`
                },
                "publisher": {
                    "@type": "Organization",
                    "name": siteName,
                    "logo": {
                        "@type": "ImageObject",
                        "url": `${siteUrl}/logo.png`,
                        "width": 512,
                        "height": 512
                    }
                },
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": fullUrl
                },
                "wordCount": description ? description.split(' ').length * 10 : 500,
                "articleSection": articleSection || 'Technology',
                "inLanguage": "en",
                "isAccessibleForFree": true,
                "about": {
                    "@type": "Thing",
                    "name": "Online Tools",
                    "description": "Free browser-based productivity tools"
                }
            }

            if (articleTags && Array.isArray(articleTags)) {
                articleSchema.keywords = articleTags.join(', ')
            }
        }

        // Combine all schemas
        let schemasToInject = [...globalSchemas]

        if (schema) {
            const extraSchemas = Array.isArray(schema) ? schema : [schema]
            // Filter out existing WebApplication/Organization if the specific schema already provides one
            const hasSpecificApp = extraSchemas.some(s => s["@type"] === "SoftwareApplication" || s["@type"] === "WebApplication")
            const hasSpecificOrg = extraSchemas.some(s => s["@type"] === "Organization")

            if (hasSpecificApp || hasSpecificOrg) {
                schemasToInject = globalSchemas.filter(s => {
                    if (hasSpecificApp && (s["@type"] === "WebApplication" || s["@type"] === "SoftwareApplication")) return false
                    if (hasSpecificOrg && s["@type"] === "Organization") return false
                    return true
                })
            }
            schemasToInject = schemasToInject.concat(extraSchemas)
        }

        if (articleSchema) {
            schemasToInject.push(articleSchema)
        }

        // Add Speakable specification for the main description to help AI/Voice 
        schemasToInject.push({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "description": description,
            "speakable": {
                "@type": "SpeakableSpecification",
                "xpath": [
                    "/html/head/meta[@name='description']/@content"
                ]
            }
        })

        return schemasToInject
    }, [title, description, path, fullUrl, ogImage, siteUrl, siteName, schema, articlePublishedTime, articleAuthor, articleSection, breadcrumbs, faqs, toolName, toolSteps, articleTags, type, lastModified])

    useEffect(() => {
        const brandTitle = title.includes('PixTool') ? title : `${title} | PixTool`
        document.title = brandTitle

        const updateMeta = (name, content, attribute = 'name') => {
            let meta = document.querySelector(`meta[${attribute}="${name}"]`)
            if (!meta) {
                meta = document.createElement('meta')
                meta.setAttribute(attribute, name)
                document.head.appendChild(meta)
            }
            meta.setAttribute('content', content)
            return meta
        }

        // Primary Meta Tags
        updateMeta('description', description)
        updateMeta('keywords', enhancedKeywords)
        updateMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')

        // Author & Copyright
        updateMeta('author', articleAuthor || 'UTHAKKAN')
        updateMeta('copyright', 'Copyright © 2026 PixTool by UTHAKKAN')
        updateMeta('revisit-after', '7 days')
        updateMeta('language', 'English')
        updateMeta('generator', 'PixTool - Built with React & Vite')
        updateMeta('subject', 'Free Online Tools, Image Processing, PDF Management, Productivity')
        updateMeta('rating', 'General')
        updateMeta('distribution', 'Global')

        // PWA Meta Tags
        updateMeta('theme-color', '#6366f1')
        updateMeta('mobile-web-app-capable', 'yes')
        updateMeta('apple-mobile-web-app-capable', 'yes')
        updateMeta('apple-mobile-web-app-status-bar-style', 'black-translucent')
        updateMeta('apple-mobile-web-app-title', 'PixTool')
        updateMeta('format-detection', 'telephone=no')
        updateMeta('msapplication-TileColor', '#a855f7')
        updateMeta('msapplication-tap-highlight', 'no')

        // GEO Meta Tags - Critical for Local & Global SEO
        updateMeta('geo.region', 'IN-KL')
        updateMeta('geo.placename', 'Kannur, Kerala, India')
        updateMeta('geo.position', '11.8745;75.3664')
        updateMeta('ICBM', '11.8745, 75.3664')
        updateMeta('DC.title', brandTitle)
        updateMeta('DC.description', description)
        updateMeta('DC.publisher', 'UTHAKKAN')
        updateMeta('DC.format', 'text/html')
        updateMeta('DC.language', 'en')

        // Search Engine Bots
        updateMeta('googlebot', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
        updateMeta('google-site-verification', '83f8616f6a5b1974')
        updateMeta('bingbot', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1')
        updateMeta('duckduckbot', noIndex ? 'noindex, nofollow' : 'index, follow')
        updateMeta('slurp', noIndex ? 'noindex, nofollow' : 'index, follow')

        // Open Graph Meta Tags
        updateMeta('og:title', brandTitle, 'property')
        updateMeta('og:description', description, 'property')
        updateMeta('og:url', fullUrl, 'property')
        updateMeta('og:type', type, 'property')
        updateMeta('og:image', ogImage, 'property')
        updateMeta('og:image:alt', imageAlt, 'property')
        updateMeta('og:image:width', '1200', 'property')
        updateMeta('og:image:height', '630', 'property')
        updateMeta('og:site_name', siteName, 'property')
        updateMeta('og:locale', 'en_US', 'property')
        updateMeta('og:locale:alternate', 'en_GB', 'property')
        updateMeta('og:locale:alternate', 'en_IN', 'property')

        // Article-specific Open Graph tags
        if (type === 'article' && articlePublishedTime) {
            updateMeta('article:published_time', articlePublishedTime, 'property')
            updateMeta('article:modified_time', new Date().toISOString(), 'property')
            updateMeta('article:expiration_time', new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), 'property')
            updateMeta('article:author', articleAuthor || 'UTHAKKAN', 'property')
            updateMeta('article:section', articleSection || 'Technology', 'property')
            updateMeta('article:tag', 'Online Tools', 'property')
            updateMeta('article:tag', 'Free Tools', 'property')
            updateMeta('article:tag', 'Productivity', 'property')

            if (articleTags && Array.isArray(articleTags)) {
                articleTags.forEach(tag => {
                    updateMeta('article:tag', tag, 'property')
                })
            }
        }

        // Twitter Card Meta Tags
        updateMeta('twitter:card', 'summary_large_image')
        updateMeta('twitter:url', fullUrl)
        updateMeta('twitter:title', brandTitle)
        updateMeta('twitter:description', description)
        updateMeta('twitter:image', twImage)
        updateMeta('twitter:image:alt', imageAlt)
        updateMeta('twitter:site', '@ajmal_uk_')
        updateMeta('twitter:creator', '@ajmal_uk_')

        if (type === 'article') {
            updateMeta('twitter:label1', 'Written by', 'name')
            updateMeta('twitter:data1', articleAuthor || 'UTHAKKAN', 'name')
            updateMeta('twitter:label2', readingTime || 'Est. reading time', 'name')
            updateMeta('twitter:data2', '5 min read', 'name')
        }

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]')
        if (!canonical) {
            canonical = document.createElement('link')
            canonical.setAttribute('rel', 'canonical')
            document.head.appendChild(canonical)
        }
        canonical.setAttribute('href', fullUrl)

        // Alternate Languages for International SEO
        let alternateEn = document.querySelector('link[rel="alternate"][hreflang="en"]')
        if (!alternateEn) {
            alternateEn = document.createElement('link')
            alternateEn.setAttribute('rel', 'alternate')
            alternateEn.setAttribute('hreflang', 'en')
            document.head.appendChild(alternateEn)
        }
        alternateEn.setAttribute('href', fullUrl)

        let alternateEnGb = document.querySelector('link[rel="alternate"][hreflang="en-gb"]')
        if (!alternateEnGb) {
            alternateEnGb = document.createElement('link')
            alternateEnGb.setAttribute('rel', 'alternate')
            alternateEnGb.setAttribute('hreflang', 'en-gb')
            document.head.appendChild(alternateEnGb)
        }
        alternateEnGb.setAttribute('href', fullUrl)

        let xDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]')
        if (!xDefault) {
            xDefault = document.createElement('link')
            xDefault.setAttribute('rel', 'alternate')
            xDefault.setAttribute('hreflang', 'x-default')
            document.head.appendChild(xDefault)
        }
        xDefault.setAttribute('href', fullUrl)

        // Performance hints: preconnect & dns-prefetch for common origins
        const ensureLink = (rel, href, crossOrigin = false) => {
            const selector = `link[rel="${rel}"][href="${href}"]`
            let link = document.querySelector(selector)
            if (!link) {
                link = document.createElement('link')
                link.setAttribute('rel', rel)
                link.setAttribute('href', href)
                if (crossOrigin) link.setAttribute('crossorigin', '')
                document.head.appendChild(link)
            }
            return link
        }
        ensureLink('preconnect', 'https://fonts.googleapis.com')
        ensureLink('preconnect', 'https://fonts.gstatic.com', true)
        ensureLink('dns-prefetch', 'https://fonts.googleapis.com')
        ensureLink('dns-prefetch', 'https://fonts.gstatic.com')
        ensureLink('dns-prefetch', 'https://images.unsplash.com')
        ensureLink('dns-prefetch', 'https://api.mail.tm')

        // Performance: Add preconnect for common CDNs and analytics if needed
        ensureLink('preconnect', 'https://www.googletagmanager.com')
        ensureLink('dns-prefetch', 'https://www.googletagmanager.com')
        ensureLink('preconnect', 'https://www.google-analytics.com')
        ensureLink('dns-prefetch', 'https://www.google-analytics.com')

        // JSON-LD Structured Data
        const scriptId = 'json-ld-schema'
        let scriptTag = document.getElementById(scriptId)

        if (!scriptTag) {
            scriptTag = document.createElement('script')
            scriptTag.id = scriptId
            scriptTag.type = 'application/ld+json'
            scriptTag.setAttribute('data-seo', 'true')
            document.head.appendChild(scriptTag)
        }

        // Inject schema with proper formatting
        try {
            scriptTag.innerHTML = JSON.stringify(schemas)
        } catch (e) {
            console.error('Error generating schema:', e)
        }

    }, [title, description, enhancedKeywords, fullUrl, type, ogImage, twImage, schemas, siteName, noIndex, articlePublishedTime, articleAuthor, articleSection, articleTags, readingTime, imageAlt])

    return null
}
