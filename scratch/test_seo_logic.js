const faqs = [
  { q: "Is PixTool really free?", a: "Yes, 100% free." },
  { question: "Are my files safe?", answer: "Absolutely." },
  { name: "Duplicate Test", text: "Duplicates should be removed." }
];

const toolDataFaqs = [
  { q: "Tool FAQ?", a: "Tool Answer." }
];

function normalizeFaq(faq) {
    const question = faq.q || faq.question || faq.name || '';
    const answer = faq.a || faq.answer || faq.text || '';
    return { name: question, acceptedAnswer: { "@type": "Answer", text: answer } };
}

function getFaqSchema(faqsProp, toolFaqs) {
    const rawFaqs = (faqsProp && faqsProp.length > 0) ? faqsProp : (toolFaqs || []);
    const faqEntities = rawFaqs
        .map(faq => {
            const question = faq.q || faq.question || faq.name || '';
            const answer = faq.a || faq.answer || faq.text || '';
            return {
                "@type": "Question",
                "name": question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": answer
                }
            };
        })
        .filter(faq => faq.name && faq.acceptedAnswer.text);

    if (faqEntities.length === 0) return null;

    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqEntities
    };
}

console.log("Test 1: Prop FAQs (q/a mixed)");
console.log(JSON.stringify(getFaqSchema(faqs, toolDataFaqs), null, 2));

console.log("\nTest 2: Fallback to Tool FAQs");
console.log(JSON.stringify(getFaqSchema(null, toolDataFaqs), null, 2));

console.log("\nTest 3: Empty inputs");
console.log(JSON.stringify(getFaqSchema([], []), null, 2));
