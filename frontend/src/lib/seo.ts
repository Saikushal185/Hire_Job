/**
 * SEO Utilities for HireMind
 * Provides type-safe metadata generation for Next.js pages
 */

import type { Metadata } from 'next';

const SITE_NAME = 'HireMind';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hiremind.app';
const DEFAULT_DESCRIPTION = 'AI-powered job matching platform with resume analysis';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string[];
    image?: string;
    noIndex?: boolean;
}

/**
 * Generate consistent metadata for all pages
 */
export function generateSEO({
    title,
    description = DEFAULT_DESCRIPTION,
    keywords = [],
    image = '/og-image.png',
    noIndex = false,
}: SEOProps): Metadata {
    const fullTitle = `${title} | ${SITE_NAME}`;

    return {
        title: fullTitle,
        description,
        keywords: ['jobs', 'resume', 'career', 'AI', 'job matching', ...keywords],
        authors: [{ name: 'HireMind Team' }],
        openGraph: {
            title: fullTitle,
            description,
            url: SITE_URL,
            siteName: SITE_NAME,
            images: [
                {
                    url: `${SITE_URL}${image}`,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [`${SITE_URL}${image}`],
        },
        robots: noIndex
            ? { index: false, follow: false }
            : { index: true, follow: true },
        alternates: {
            canonical: SITE_URL,
        },
    };
}

/**
 * Generate structured data for job listings
 */
export function generateJobStructuredData(job: {
    title: string;
    company: string;
    location: string;
    description: string;
    datePosted: string;
    salary?: { min: number; max: number };
}) {
    return {
        '@context': 'https://schema.org/',
        '@type': 'JobPosting',
        title: job.title,
        description: job.description,
        datePosted: job.datePosted,
        hiringOrganization: {
            '@type': 'Organization',
            name: job.company,
        },
        jobLocation: {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressLocality: job.location,
            },
        },
        ...(job.salary && {
            baseSalary: {
                '@type': 'MonetaryAmount',
                currency: 'USD',
                value: {
                    '@type': 'QuantitativeValue',
                    minValue: job.salary.min,
                    maxValue: job.salary.max,
                    unitText: 'YEAR',
                },
            },
        }),
    };
}
