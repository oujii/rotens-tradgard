'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'

interface Product {
    _id: string
    title: string
    price: number
    image: string
    stripeUrl?: string
    isPreOrder?: boolean
    tags?: string[]
}

interface ProductListProps {
    products: Product[]
}

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'title-asc'

export default function ProductList({ products }: ProductListProps) {
    const [activeTag, setActiveTag] = useState<string>('Alla')
    const [sortBy, setSortBy] = useState<SortOption>('newest')

    // Extract all unique tags
    const tags = useMemo(() => {
        const allTags = products.flatMap(p => p.tags || [])
        const uniqueTags = Array.from(new Set(allTags))
        return ['Alla', ...uniqueTags]
    }, [products])

    // Filter and Sort Logic
    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products]

        // Filtering
        if (activeTag !== 'Alla') {
            result = result.filter(p => p.tags?.includes(activeTag))
        }

        // Sorting
        result.sort((a, b) => {
            switch (sortBy) {
                case 'price-asc':
                    return a.price - b.price
                case 'price-desc':
                    return b.price - a.price
                case 'title-asc':
                    return a.title.localeCompare(b.title)
                default: // newest (fallback to original order or explicit date if available, here just original)
                    return 0
            }
        })

        return result
    }, [products, activeTag, sortBy])

    return (
        <div className="space-y-12">
            {/* FILTER & SORT BAR */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-stone-200 pb-8">
                {/* Tags */}
                <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
                    <span className="text-stone-400 text-xs uppercase tracking-widest font-bold whitespace-nowrap">Filter:</span>
                    <div className="flex gap-4">
                        {tags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className={`whitespace-nowrap pb-1 border-b-2 transition-all text-sm uppercase tracking-widest font-medium ${activeTag === tag
                                        ? 'border-brand text-brand-dark'
                                        : 'border-transparent text-stone-500 hover:text-brand hover:border-brand-light'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-4">
                    <label htmlFor="sort" className="text-stone-400 text-xs uppercase tracking-widest font-bold">Sortera:</label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="bg-transparent border-none text-brand-dark text-sm font-medium focus:ring-0 cursor-pointer"
                    >
                        <option value="newest">Senaste</option>
                        <option value="price-asc">Pris: Lägsta först</option>
                        <option value="price-desc">Pris: Högsta först</option>
                        <option value="title-asc">A-Ö</option>
                    </select>
                </div>
            </div>

            {/* PRODUCT GRID */}
            {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    {filteredAndSortedProducts.map((product) => (
                        <div key={product._id} className="bg-white group flex flex-col h-full overflow-hidden hover:shadow-xl transition-all duration-500 rounded-sm">
                            <div className="relative aspect-square overflow-hidden bg-stone-100">
                                {product.image && (
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                )}
                                {/* Pre-order Badge */}
                                {product.isPreOrder && (
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="bg-brand-dark/90 text-accent-pop text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest backdrop-blur-md shadow-lg rounded-sm">
                                            Leverans i vår
                                        </span>
                                    </div>
                                )}

                                {/* Hover overlay hint */}
                                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/5 transition-colors duration-500"></div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {product.tags?.map(t => (
                                        <span key={t} className="text-[10px] text-stone-400 uppercase tracking-widest">{t}</span>
                                    ))}
                                </div>

                                <h3 className="text-2xl font-serif text-brand-dark mb-4 group-hover:text-brand transition-colors leading-tight">
                                    {product.title}
                                </h3>

                                <div className="mt-auto pt-6 flex items-center justify-between border-t border-stone-100">
                                    <span className="text-xl font-medium text-stone-800 tracking-tight">{product.price} kr</span>
                                    {product.stripeUrl ? (
                                        <a
                                            href={product.stripeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-6 py-3 bg-brand text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-brand-dark hover:shadow-lg transition-all transform group-hover:translate-y-[-2px]"
                                        >
                                            {product.isPreOrder ? 'Förboka' : 'Köp nu'}
                                        </a>
                                    ) : (
                                        <span className="text-xs text-stone-400 uppercase tracking-widest font-bold">Ej i lager</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-32 bg-stone-100/50 rounded-sm border border-dashed border-stone-200">
                    <p className="text-stone-500 font-serif text-xl italic">Inga produkter matchar dina val just nu.</p>
                </div>
            )}
        </div>
    )
}
